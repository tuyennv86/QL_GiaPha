import { defineStore } from 'pinia'
import { ref } from 'vue'
import branchService from '@/api/services/branch.service'

export const useBranchStore = defineStore('branch', () => {
  const loading = ref(false)
  const error = ref(null)
  const branches = ref([])

  const getBranches = async () => {
    loading.value = true
    error.value = null
    try {
      const data = await branchService.getBranches()
      branches.value = data
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  const getBranchByFamily = async (familyId) => {
    loading.value = true
    error.value = null
    try {
      const data = await branchService.getBrancheByFamily(familyId)
      branches.value = data
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,
    branches,
    getBranches,
    getBranchByFamily,
  }
})
