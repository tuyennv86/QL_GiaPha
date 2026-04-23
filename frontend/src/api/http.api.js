import axios from 'axios'

const api_url = import.meta.env.VITE_API_URL

const http = axios.create({
  baseURL: api_url,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
})

let isRefreshing = false
let failedQueue = []

const processQueue = (error, token = null) => {
  failedQueue.forEach((p) => (error ? p.reject(error) : p.resolve(token)))
  failedQueue = []
}

export const setupInterceptors = (authStore, router) => {
  // =========================
  // REQUEST
  // =========================
  http.interceptors.request.use((config) => {
    const token = authStore.accessToken ?? localStorage.getItem('access_token')

    // Khi gọi /auth/refresh: KHÔNG gắn access token (để strategy tự lấy từ header riêng)
    // Thực ra với strategy mới ta CẦN gửi access token (dù hết hạn) để lấy userId
    // → Luôn gắn token nếu có, kể cả với /auth/refresh
    if (token) {
      config.headers = config.headers || {}
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  })

  // =========================
  // RESPONSE
  // =========================
  http.interceptors.response.use(
    (res) => res,
    async (error) => {
      const original = error.config

      if (!error.response) return Promise.reject(error)

      const status = error.response.status

      // Refresh fail → logout
      if (original?.url?.includes('/auth/refresh')) {
        authStore.logout(true)
        return Promise.reject(error)
      }

      if (status !== 401) return Promise.reject(error)

      if (original._retry) {
        authStore.logout(true)
        return Promise.reject(error)
      }

      const storedRefresh = authStore.refreshToken ?? localStorage.getItem('refresh_token')

      if (!storedRefresh) {
        authStore.logout(true)
        return Promise.reject(error)
      }

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        })
          .then((token) => {
            // Fix: dùng spread thay vì gán trực tiếp để tránh lỗi nếu headers undefined
            original.headers = { ...(original.headers || {}), Authorization: `Bearer ${token}` }
            return http(original)
          })
          .catch((err) => Promise.reject(err))
      }

      original._retry = true
      isRefreshing = true

      try {
        const newToken = await authStore.refresh()

        if (!newToken) throw new Error('Refresh failed')

        processQueue(null, newToken)

        // Fix: dùng spread thay vì gán trực tiếp
        original.headers = { ...(original.headers || {}), Authorization: `Bearer ${newToken}` }
        return http(original)
      } catch (err) {
        processQueue(err, null)
        authStore.logout(true)
        return Promise.reject(err)
      } finally {
        isRefreshing = false
      }
    },
  )
}

export default http
