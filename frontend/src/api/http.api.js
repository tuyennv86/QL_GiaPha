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
    // Đọc từ store trước, fallback localStorage
    // (phòng trường hợp store chưa restore kịp)
    const token = authStore.accessToken ?? localStorage.getItem('access_token')
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

      // Lỗi mạng (không có response)
      if (!error.response) return Promise.reject(error)

      const status = error.response.status

      //Chính endpoint refresh bị lỗi → logout, không retry vô tận
      if (original?.url?.includes('/auth/refresh')) {
        authStore.logout(true)
        return Promise.reject(error)
      }

      // Không phải 401 → trả lỗi bình thường
      if (status !== 401) return Promise.reject(error)

      // Đã retry rồi vẫn 401 → logout
      if (original._retry) {
        authStore.logout(true)
        return Promise.reject(error)
      }

      // ✅ Lấy refresh token từ store hoặc localStorage
      const storedRefresh = authStore.refreshToken ?? localStorage.getItem('refresh_token')

      if (!storedRefresh) {
        authStore.logout(true)
        return Promise.reject(error)
      }

      // =========================
      // ĐANG REFRESH → queue lại
      // =========================
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        })
          .then((token) => {
            original.headers = original.headers || {}
            original.headers.Authorization = `Bearer ${token}`
            return http(original)
          })
          .catch((err) => Promise.reject(err))
      }

      original._retry = true
      isRefreshing = true

      try {
        // ✅ Đảm bảo store có refreshToken trước khi gọi
        if (!authStore.refreshToken) {
          authStore.refreshToken = storedRefresh
        }

        const newToken = await authStore.refresh()
        if (!newToken) throw new Error('Refresh failed: no token returned')

        processQueue(null, newToken)

        original.headers = original.headers || {}
        original.headers.Authorization = `Bearer ${newToken}`
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
