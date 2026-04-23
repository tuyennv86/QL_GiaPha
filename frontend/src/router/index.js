import { createRouter, createWebHistory } from 'vue-router'
import LayoutLoader from '@/layouts/LayoutLoader.vue'
import { useAuthStore } from '@/stores/auth.store'

const routes = [
  {
    path: '/',
    component: LayoutLoader,
    children: [
      // Admin
      {
        path: '/admin/dashboard',
        name: 'Dashboard',
        component: () => import('@/views/Admin/DashboardPage.vue'),
        meta: { requiresAuth: true, layout: 'admin', title: 'Admin Panel - Gia phả số' },
      },
      {
        path: '/admin/members',
        name: 'Members',
        component: () => import('@/views/Admin/MembersList.vue'),
        meta: {
          requiresAuth: true,
          layout: 'admin',
          title: 'Admin Panel - Danh sách các thành viên',
        },
      },
      {
        path: '/admin/events',
        name: 'Events',
        component: () => import('@/views/Admin/EvensPage.vue'),
        meta: { requiresAuth: true, layout: 'admin', title: 'Admin Panel - Danh sách các sự kiện' },
      },
      {
        path: '/admin/activity',
        name: 'Activity',
        component: () => import('@/views/Admin/ActivityLogPage.vue'),
        meta: { requiresAuth: true, layout: 'admin', title: 'Admin Panel - Nhật ký hoạt động' },
      },
      {
        path: '/admin/media',
        name: 'Media',
        component: () => import('@/views/Admin/MediasPage.vue'),
        meta: { requiresAuth: true, layout: 'admin', title: 'Admin Panel - Media' },
      },
      {
        path: '/admin/users',
        name: 'Users',
        component: () => import('@/views/Admin/UsersPage.vue'),
        meta: { requiresAuth: true, layout: 'admin', title: 'Admin Panel - Quản trị người dùng' },
      },
      {
        path: '/admin/roles',
        name: 'Roles',
        component: () => import('@/views/Admin/RolesPage.vue'),
        meta: { requiresAuth: true, layout: 'admin', title: 'Admin Panel - Vai trò người dùng' },
      },
      {
        path: '/admin/premissions',
        name: 'premissions',
        component: () => import('@/views/Admin/PremissionsPage.vue'),
        meta: { requiresAuth: true, layout: 'admin', title: 'Admin Panel - Phân quyền người dùng' },
      },
      {
        path: '/admin/approval',
        name: 'Approval',
        component: () => import('@/views/Admin/ApprovalPage.vue'),
        meta: { requiresAuth: true, layout: 'admin', title: 'Admin Panel - Duyệt yêu cầu' },
      },
      {
        path: '/admin/settings',
        name: 'Settings',
        component: () => import('@/views/Admin/SettingsPage.vue'),
        meta: { requiresAuth: true, layout: 'admin', title: 'Admin Panel - Cài đặt hệ thống' },
      },
      {
        path: '/admin/backup',
        name: 'Backup',
        component: () => import('@/views/Admin/BackupPage.vue'),
        meta: {
          requiresAuth: true,
          layout: 'admin',
          title: 'Admin Panel - Sao lưu và phục hồi hệ thống',
        },
      },
      {
        path: '/admin/security',
        name: 'Security',
        component: () => import('@/views/Admin/SecurityPage.vue'),
        meta: { requiresAuth: true, layout: 'admin', title: 'Admin Panel - Bảo mật hệ thống' },
      },
      {
        path: '/admin/403',
        name: 'Forbidden',
        component: () => import('@/views/Admin/403Page.vue'),
        meta: { layout: 'admin', requiresAuth: true, title: '403 bạn không có quyền truy cập' },
      },

      // Auth
      {
        path: '/auth/login',
        name: 'Login',
        component: () => import('@/views/Auth/LoginView.vue'),
        meta: { layout: 'auth', title: 'Đăng nhập' },
      },

      // Home
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/Home/HomeView.vue'),
        meta: { layout: 'home', title: 'Trang chủ gia phả dòng họ' },
      },

      // Redirects
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

// =========================
// NAVIGATION GUARD
// =========================
router.beforeEach((to) => {
  const auth = useAuthStore()

  // Đã login mà vào /auth/login → redirect về admin
  if (to.path === '/auth/login' && auth.accessToken) {
    return '/admin'
  }

  //Route cần login: check accessToken (đã restore từ localStorage)
  //KHÔNG cần check auth.user vì initAuth() đã chạy xong trước khi
  //router được mount (xem main.js)
  if (to.meta.requiresAuth && !auth.accessToken) {
    return '/auth/login'
  }

  //Check global permission
  if (to.meta.permissions) {
    if (!auth.hasPermission(to.meta.permissions)) {
      return '/admin/403'
    }
  }

  //Check branch permission
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
