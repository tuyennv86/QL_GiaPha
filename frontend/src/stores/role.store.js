import { defineStore } from 'pinia'
import roleService from '@/api/services/role.service'
import { ref } from 'vue'

export const useRoleStore = defineStore('role', () => {
  const loading = ref(false)
  const error = ref(null)

  const roles = ref([])
  const total = ref(0)

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

  const getSeached = async (page, limit, search) => {
    loading.value = true
    try {
      const data = await roleService.getSearched(page, limit, search)
      roles.value = data.items
      total.value = data.total
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  const getById = async (id) => {
    loading.value = true
    try {
      const data = await roleService.getById(id)
      return data
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  const create = async (data) => {
    loading.value = true
    try {
      const newRole = await roleService.create(data)
      roles.value.push(newRole)
      return newRole
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  const update = async (id, data) => {
    loading.value = true
    try {
      const updatedRole = await roleService.update(id, data)
      roles.value = roles.value.map((r) => (r.id === id ? updatedRole : r))
      return updatedRole
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  const deleteRole = async (id) => {
    loading.value = true
    try {
      await roleService.deleteRole(id)
      roles.value = roles.value.filter((r) => r.id !== id)
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  const assignPermissions = async (id, permissions) => {
    loading.value = true
    try {
      await roleService.assignPermissions(id, permissions)
      const role = roles.value.find((r) => r.id === id)
      if (role) {
        role.permissions = permissions
      }
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  const rolesWithUserCount = async (search) => {
    loading.value = true
    try {
      const data = await roleService.rolesWithUserCount(search)
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
    total,

    getAll,
    getSeached,
    getById,
    create,
    update,
    deleteRole,
    assignPermissions,
    rolesWithUserCount,
  }
})
