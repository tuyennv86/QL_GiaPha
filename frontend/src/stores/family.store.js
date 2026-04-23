import familyService from '@/api/services/family.service'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useFamilyStore = defineStore('family', () => {
  const loading = ref(false)
  const error = ref(null)

  const families = ref([])

  const getAll = async () => {
    loading.value = true
    error.value = null
    try {
      const data = await familyService.getAll()
      families.value = data
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }
  return {
    loading,
    error,
    families,
    getAll,
  }
})
