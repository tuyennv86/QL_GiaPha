import familyService from '@/api/services/family.service'
import branchService from '@/api/services/branch.service'
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

  const getFamilies = async (search) => {
    loading.value = true
    error.value = null
    try {
      const data = await familyService.getFamilies(search)
      families.value = data
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  const getFamilyById = async (id) => {
    loading.value = true
    error.value = null
    try {
      const data = await familyService.getFamilyById(id)
      return data;
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  const deleteFamily = async (id) => {
    loading.value = true
    error.value = null
    try {
      const data = await familyService.deleteFamily(id)
      families.value = families.value.filter(family => family.id !== id)
      return data.message;
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }
  const createFamily = async (familyData) => {
    loading.value = true
    error.value = null
    try {
      const data = await familyService.createFamily(familyData)
      families.value.push(data)
      return data;
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  const updateFamily = async (id, familyData) => {
    loading.value = true
    error.value = null
    try {
      const data = await familyService.updateFamily(id, familyData)
      const index = families.value.findIndex(family => family.id === id)
      if (index !== -1) {
        families.value[index] = data
      }
      return data;
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  // cập nhập family khi có sự thay đổi trong branch, ví dụ khi xóa branch thì cập nhật lại family

const updateBranch = async (id, branch) => {
  loading.value = true;
  error.value = null;

    try {
      const updatedBranch = await branchService.updateBranche(id, branch);      
      for (const family of families.value) {
        const branchIndex = family.branches.findIndex(b => b.id === id);

        if (branchIndex !== -1) {
          family.branches.splice(branchIndex, 1, updatedBranch);
          break;
        }
      }
    } catch (err) {
      error.value = err.message;
      throw err;
    } finally {
      loading.value = false;
    }
  };  

  const createBranch = async (branchData) => {
    loading.value = true;
    error.value = null;

    try {
      const newBranch = await branchService.createBranche(branchData);      
      const family = families.value.find(f => f.id === newBranch.family_id);
      if (family) {
        family.branches.push(newBranch);
      }

      return newBranch.message;
    } catch (err) {
      error.value = err.message;
      throw err;
    } finally {
      loading.value = false;
    }
  };
  
  const deleteBranch = async (id) => {
    loading.value = true;
    error.value = null;

    try {
      const res = await branchService.deleteBranche(id);

      for (const family of families.value) {
        const branchIndex = family.branches.findIndex(b => b.id === id);

        if (branchIndex !== -1) {
          family.branches.splice(branchIndex, 1);
          break;
        }
      }
      return res.message;
    } catch (err) {
      error.value = err.message;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    error,
    families,
    getAll,
    getFamilyById,
    getFamilies,
    deleteFamily,
    createFamily,
    updateFamily,

    updateBranch,
    deleteBranch,
    createBranch

  }
})
