import http from '@/api/http.api'

const login = async (data) => {
  return http.post('auth/login', data)
}

const refresh = async (refreshToken) => {
  return http.post('auth/refresh', {
    refresh_token: refreshToken,
  })
}

const logout = async () => {
  return http.post('auth/logout')
}
const me = async () => {
  return http.get('auth/profile')
}
export default {
  login,
  logout,
  refresh,
  me,
}
