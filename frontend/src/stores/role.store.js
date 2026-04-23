import { defineStore } from 'pinia'
import roleService from '@/api/services/role.service'
import { ref } from 'vue'

export const useRoleStore = defineStore('role', () => {
  const loading = ref(false)
  const error = ref(null)

  const roles = ref([])

  const getAll = async () => {
    loading.value = true
    try {
      const data = await roleService.getAll()
      roles.value = data
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,
    roles,
    getAll,
  }
})
