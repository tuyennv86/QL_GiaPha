import menuService from '@/api/services/menu.service'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMenuStore = defineStore('menu', () => {
  const loading = ref(false)
  const error = ref(null)

  const menus = ref([])

  const getMyMenu = async () => {
    loading.value = true
    error.value = null
    try {
      const data = await menuService.getMyMenu()
      menus.value = data
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,
    menus,
    getMyMenu,
  }
})
