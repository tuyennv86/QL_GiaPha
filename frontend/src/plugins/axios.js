import http, { setupInterceptors } from '@/api/http.api'
import { useAuthStore } from '@/stores/auth.store'

export default {
  install(app) {
    const authStore = useAuthStore()

    setupInterceptors(authStore)

    app.config.globalProperties.$http = http
    app.provide('http', http)
  },
}
