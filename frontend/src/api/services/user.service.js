import http from '@/api/http.api'

const getAll = async (page, limit, search) => {
  const res = await http.get('users', {
    params: { page, limit, search },
  })
  return res.data
}
const updateActive = async (id) => {
  const res = await http.patch(`users/${id}/updateActive`)
  return res.data
}

const deleteUser = async (id) => {
  const res = await http.delete(`users/${id}`)
  return res.data
}

const getById = async (id) => {
  const res = await http.get(`users/${id}`)
  return res.data
}

const viewUser = async (id) => {
  const res = await http.get(`users/${id}/view`)
  return res.data
}

const addUser = async (user) => {
  const res = await http.post(`users`, user)
  return res.data
}

const saveUser = async (id, user) => {
  const res = await http.patch(`users/${id}`, user)
  return res.data
}

export default {
  updateActive,
  getAll,
  deleteUser,
  getById,
  viewUser,
  saveUser,
  addUser,
}
