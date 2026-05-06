import userService from '@/api/services/user.service'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const loading = ref(false)
  const error = ref(null)

  const users = ref([])
  const total = ref(0)

  const getAll = async (page, limit, search) => {
    loading.value = true
    error.value = null
    try {
      const data = await userService.getAll(page, limit, search)
      total.value = data.total
      users.value = data.items
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  const getAllByRole = async (roleId, page, limit, search) => {
    loading.value = true
    error.value = null
    try {
      const data = await userService.getAllByRole(roleId, page, limit, search)
      total.value = data.total
      users.value = data.items
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }
  const updateActive = async (id) => {
    loading.value = true
    error.value = null
    try {
      const user = users.value.find((u) => u.id === id)
      if (!user) return
      const isActive = !user.is_active
      await userService.updateActive(id)
      users.value = users.value.map((u) => (u.id === id ? { ...u, is_active: isActive } : u))
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  const deleteUser = async (id) => {
    loading.value = true
    error.value = null
    try {
      const message = await userService.deleteUser(id)
      users.value = users.value.filter((u) => u.id !== id)
      return message
    } catch (error) {
      error.value = error.message
    } finally {
      loading.value = false
    }
  }

  const getById = async (id) => {
    loading.value = true
    error.value = null
    try {
      return await userService.getById(id)
      //user.value = data
    } catch (error) {
      error.value = error.message
    } finally {
      loading.value = false
    }
  }

  const viewUser = async (id) => {
    loading.value = true
    error.value = null
    try {
      return await userService.viewUser(id)
      //user.value = data
    } catch (error) {
      error.value = error.message
    } finally {
      loading.value = false
    }
  }

  const addUser = async (user) => {
    loading.value = true
    error.value = null
    try {
      const data = await userService.addUser(user)
      users.value.push(data)
    } catch (error) {
      error.value = error.message
    } finally {
      loading.value = false
    }
  }

  const saveUser = async (id, user) => {
    loading.value = true
    error.value = null
    try {
      const data = await userService.saveUser(id, user)
      users.value = users.value.filter((r) => r.id !== id)
      users.value.unshift(data)
    } catch (error) {
      error.value = error.message
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,
    users,
    total,

    getAll,
    getAllByRole,
    updateActive,
    deleteUser,
    getById,
    viewUser,
    saveUser,
    addUser,
  }
})
