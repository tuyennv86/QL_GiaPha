import { createRouter, createWebHistory } from 'vue-router'
import AdminLayout from '@/layouts/AdminLayout.vue'
import HomeLayout from '@/layouts/HomeLayout.vue'
import LoginLayout from '@/layouts/LoginLayout.vue'
import { useAuthStore } from '@/stores/auth.store'

const routes = [

    //================ HOME =================
    {
        path: "/",
        component: HomeLayout,
        children: [
            {
                path: "",
                name: "home",
                component: () => import("@/views/Home/HomeView.vue")
            }
        ]
    },

    //================ LOGIN =================
    {
        path: "/auth",
        component: LoginLayout,
        children: [
            {
                path: "login",
                name: "login",
                component: () => import("@/views/Auth/LoginView.vue")
            }
        ]
    },

    //================ ADMIN =================
    {
        path: "/admin",
        name: "admin",
        component: AdminLayout,
        meta: {
            requiresAuth: true
        },
        children: [
            // Dynamic Route sẽ thêm vào đây
        ]
    },

    {
        path: "/403",
        component: () => import("@/views/Admin/403Page.vue")
    },

    {
        path: "/:pathMatch(.*)*",
        redirect: "/"
    }

]


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// =============================================================================
// NAVIGATION GUARD
// =============================================================================
router.beforeEach((to) => {
  const auth = useAuthStore()

  // Đã login mà vào /auth/login → redirect về admin
  if (to.path === '/auth/login' && auth.accessToken) {
    return '/admin'
  }

  // Route cần login: check accessToken (đã restore từ localStorage)
  if (to.meta.requiresAuth && !auth.accessToken) {
    return '/auth/login'
  }

  // ── Check role (ví dụ: roles: ['Admin']) ──────────────────────────────────
  // Nếu route yêu cầu role cụ thể, user phải có ít nhất 1 trong số đó
  if (to.meta.menuId) {
      if (!auth.hasMenu(to.meta.menuId)) {
        return '/admin/403'
      }
    }

   
  // ── Check global permission ───────────────────────────────────────────────
  // Nếu route yêu cầu permission, user phải có TẤT CẢ (every)
  if (to.meta.permissions?.length) {
    const hasAll = to.meta.permissions.every((p) => auth.hasPermission(p))
    if (!hasAll) return '/admin/403'
  }

  // ── Check branch permission ───────────────────────────────────────────────
  if (to.meta.branchPermission) {
    if (!auth.hasBranchPermission(to.meta.branchPermission)) {
      return '/admin/403'
    }
  }

  return true
})

router.afterEach((to) => {
  document.title = to.meta.title || 'Gia phả số'
})

export default router
