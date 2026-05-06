import { createRouter, createWebHistory } from 'vue-router'
import LayoutLoader from '@/layouts/LayoutLoader.vue'
import { useAuthStore } from '@/stores/auth.store'

const routes = [
  {
    path: '/',
    component: LayoutLoader,
    children: [
      // ── Admin ────────────────────────────────────────────────────────────────
      {
        path: '/admin/dashboard',
        name: 'Dashboard',
        component: () => import('@/views/Admin/DashboardPage.vue'),
        meta: {
          requiresAuth: true,
          layout: 'admin',
          title: 'Admin Panel - Gia phả số',
          // Dashboard: ai login cũng xem được, không cần permission riêng
        },
      },
      {
        path: '/admin/events',
        name: 'Events',
        component: () => import('@/views/Admin/EvensPage.vue'),
        meta: {
          requiresAuth: true,
          layout: 'admin',
          title: 'Admin Panel - Danh sách các sự kiện',
          permissions: ['event.view'],
        },
      },
      {
        path: '/admin/members',
        name: 'Members',
        component: () => import('@/views/Admin/MembersList.vue'),
        meta: {
          requiresAuth: true,
          layout: 'admin',
          title: 'Admin Panel - Danh sách các thành viên',
          permissions: ['member.view'],
        },
      },
      {
        path: '/admin/media',
        name: 'Media',
        component: () => import('@/views/Admin/MediasPage.vue'),
        meta: {
          requiresAuth: true,
          layout: 'admin',
          title: 'Admin Panel - Media',
          permissions: ['media.view'],
        },
      },
      {
        path: '/admin/users',
        name: 'Users',
        component: () => import('@/views/Admin/UsersPage.vue'),
        meta: {
          requiresAuth: true,
          layout: 'admin',
          title: 'Admin Panel - Quản trị người dùng',
          permissions: ['user.view'],
        },
      },
      {
        path: '/admin/roles',
        name: 'Roles',
        component: () => import('@/views/Admin/RolesPage.vue'),
        meta: {
          requiresAuth: true,
          layout: 'admin',
          title: 'Admin Panel - Vai trò người dùng',
          permissions: ['role.view'],
        },
      },
      {
        path: '/admin/premissions',
        name: 'premissions',
        component: () => import('@/views/Admin/PremissionsPage.vue'),
        meta: {
          requiresAuth: true,
          layout: 'admin',
          title: 'Admin Panel - Phân quyền người dùng',
          permissions: ['permission.view'],
        },
      },
      {
        path: '/admin/approval',
        name: 'Approval',
        component: () => import('@/views/Admin/ApprovalPage.vue'),
        meta: {
          requiresAuth: true,
          layout: 'admin',
          title: 'Admin Panel - Duyệt yêu cầu',
          permissions: ['approval.view'],
        },
      },
      {
        path: '/admin/settings',
        name: 'Settings',
        component: () => import('@/views/Admin/SettingsPage.vue'),
        meta: {
          requiresAuth: true,
          layout: 'admin',
          title: 'Admin Panel - Cài đặt hệ thống',
          roles: ['Admin'], // Cài đặt hệ thống: chỉ Admin
        },
      },
      {
        path: '/admin/backup',
        name: 'Backup',
        component: () => import('@/views/Admin/BackupPage.vue'),
        meta: {
          requiresAuth: true,
          layout: 'admin',
          title: 'Admin Panel - Sao lưu và phục hồi hệ thống',
          roles: ['Admin'], // Backup: chỉ Admin
        },
      },
      {
        path: '/admin/security',
        name: 'Security',
        component: () => import('@/views/Admin/SecurityPage.vue'),
        meta: {
          requiresAuth: true,
          layout: 'admin',
          title: 'Admin Panel - Bảo mật hệ thống',
          roles: ['Admin'], // Security: chỉ Admin
        },
      },
      {
        path: '/admin/403',
        name: 'Forbidden',
        component: () => import('@/views/Admin/403Page.vue'),
        meta: { layout: 'admin', requiresAuth: true, title: '403 bạn không có quyền truy cập' },
      },

      // ── Auth ─────────────────────────────────────────────────────────────────
      {
        path: '/auth/login',
        name: 'Login',
        component: () => import('@/views/Auth/LoginView.vue'),
        meta: { layout: 'auth', title: 'Đăng nhập' },
      },

      // ── Home ─────────────────────────────────────────────────────────────────
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/Home/HomeView.vue'),
        meta: { layout: 'home', title: 'Trang chủ gia phả dòng họ' },
      },

      // ── Redirects ─────────────────────────────────────────────────────────────
      { path: '/auth', redirect: { name: 'Login' } },
      { path: '/admin', redirect: { name: 'Dashboard' } },
      { path: '/:pathMatch(.*)*', redirect: '/auth/login' },
    ],
  },
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
  if (to.meta.roles?.length) {
    const hasRequiredRole = to.meta.roles.some((r) => auth.hasRole(r))
    if (!hasRequiredRole) return '/admin/403'
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
