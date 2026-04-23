import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { useAuthStore } from '@/stores/auth.store'
import { setupInterceptors } from '@/api/http.api'

async function bootstrap() {
  const app = createApp(App)
  const pinia = createPinia()

  app.use(pinia)

  const authStore = useAuthStore()

  //1. Gắn interceptors trước
  setupInterceptors(authStore, router)

  //2. Restore token + fetch profile TRƯỚC khi router mount
  //   Nhờ vậy khi router.beforeEach chạy, user đã có sẵn
  await authStore.initAuth()

  //3. Mount router + app SAU khi init xong
  app.use(router)
  app.mount('#app')
}

bootstrap()
