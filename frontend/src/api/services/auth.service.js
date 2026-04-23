import http from '@/api/http.api'

const login = async (data) => {
  return http.post('auth/login', data)
}

const refresh = async (refreshToken) => {
  // Gửi refresh_token trong body.
  // Access token (kể cả expired) sẽ được tự động gắn vào Authorization header
  // bởi request interceptor trong http.api.js — strategy phía server sẽ đọc nó
  // để xác định userId mà không cần gửi thêm trường nào.
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
