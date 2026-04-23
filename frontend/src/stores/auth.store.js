import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import authService from '@/api/services/auth.service'

export const useAuthStore = defineStore('auth', () => {
  const loginError = ref(null)

  const accessToken = ref(localStorage.getItem('access_token'))
  const refreshToken = ref(localStorage.getItem('refresh_token'))
  const user = ref(null)
  const currentBranchId = ref(null)

  const roles = computed(() => user.value?.roles || [])
  const permissions = computed(() => user.value?.permissions || [])
  const branchPermissions = computed(() => user.value?.branch_permissions || [])
  const isSuperAdmin = computed(() => roles.value.includes('Admin'))

  const hasRole = (role) => roles.value.includes(role)

  const hasPermission = (perm) => {
    if (isSuperAdmin.value) return true
    return permissions.value.includes(perm)
  }

  const hasBranchRole = (branchId, roleName) =>
    branchPermissions.value.some((b) => b.branch_id === branchId && b.role_name === roleName)

  const hasBranchPermission = (perm, branchId = currentBranchId.value) => {
    if (isSuperAdmin.value) return true
    if (permissions.value.includes(perm)) return true
    const branchRole = branchPermissions.value.find((b) => b.branch_id === branchId)
    if (!branchRole) return false
    return branchRole.role_name === 'Branch Admin'
  }

  const login = async (payload) => {
    loginError.value = null
    try {
      const { data } = await authService.login(payload)
      accessToken.value = data.access_token
      refreshToken.value = data.refresh_token
      user.value = data.user

      if (data.user.branch_permissions?.length) {
        currentBranchId.value = data.user.branch_permissions[0].branch_id
      }

      localStorage.setItem('access_token', data.access_token)
      localStorage.setItem('refresh_token', data.refresh_token)
    } catch (err) {
      loginError.value = err.message
      throw err
    }
  }

  const refresh = async () => {
    const token = refreshToken.value ?? localStorage.getItem('refresh_token')
    if (!token) return null

    if (!refreshToken.value) refreshToken.value = token

    try {
      const { data } = await authService.refresh(token)
      if (!data?.access_token) {
        // API không trả access_token
        return null
      }

      accessToken.value = data.access_token
      refreshToken.value = data.refresh_token
      if (data.user) user.value = data.user

      localStorage.setItem('access_token', data.access_token)
      localStorage.setItem('refresh_token', data.refresh_token)
      return data.access_token
    } catch (err) {
      return null
    }
  }

  // INIT (F5 / reload)
  const initAuth = async () => {
    const storedAccess = localStorage.getItem('access_token')
    const storedRefresh = localStorage.getItem('refresh_token')

    // Đồng bộ store <- localStorage
    if (!accessToken.value && storedAccess) accessToken.value = storedAccess
    if (!refreshToken.value && storedRefresh) refreshToken.value = storedRefresh

    if (!accessToken.value) {
      return
    }

    try {
      const { data } = await authService.me()
      user.value = data

      if (data.branch_permissions?.length) {
        currentBranchId.value = data.branch_permissions[0].branch_id
      }
    } catch (err) {
      const status = err?.response?.status
      const hasRefresh = !!(refreshToken.value ?? storedRefresh)

      if (hasRefresh) {
        const newToken = await refresh()

        if (newToken) {
          try {
            const { data } = await authService.me()
            user.value = data

            if (data.branch_permissions?.length) {
              currentBranchId.value = data.branch_permissions[0].branch_id
            }
          } catch (e2) {
            const s2 = e2?.response?.status
            if (s2 === 401 || s2 === 403) {
              logout(true)
            }
          }
        } else {
          //refresh thất bại → logout')
          logout(true)
        }
      } else {
        //không có refresh token → logout')
        logout(true)
      }
    }
  }

  const logout = (isExpired = false) => {
    try {
      if (!isExpired) {
        authService.logout().catch(() => {})
      }
    } finally {
      accessToken.value = null
      refreshToken.value = null
      user.value = null
      currentBranchId.value = null

      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
      window.location.replace('/auth/login')
    }
  }

  const setBranch = (branchId) => {
    currentBranchId.value = branchId
  }

  return {
    accessToken,
    refreshToken,
    user,
    roles,
    permissions,
    branchPermissions,
    currentBranchId,
    isSuperAdmin,
    loginError,

    login,
    refresh,
    logout,
    initAuth,
    setBranch,

    hasRole,
    hasPermission,
    hasBranchPermission,
    hasBranchRole,
  }
})
