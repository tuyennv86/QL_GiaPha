import http from '../http.api'

const getAll = async () => {
  const res = await http.get('roles')
  return res.data
}

const getSearched = async (page, limit, search) => {
  const res = await http.get(`roles/search`, {
    params: { page, limit, search },
  })
  return res.data
}

const getById = async (id) => {
  const res = await http.get(`roles/${id}`)
  return res.data
}

const create = async (data) => {
  const res = await http.post('roles', data)
  return res.data
}

const update = async (id, data) => {
  const res = await http.patch(`roles/${id}`, data)
  return res.data
}

const deleteRole = async (id) => {
  const res = await http.delete(`roles/${id}`)
  return res.data
}

const assignPermissions = async (id, permissions) => {
  const res = await http.post(`roles/${id}/permissions`, { permissions })
  return res.data
}

const rolesWithUserCount = async () => {
  const res = await http.get('roles/rolesWithUserCount')
  return res.data
}

export default {
  getAll,
  getSearched,
  getById,
  create,
  update,
  deleteRole,
  assignPermissions,
  rolesWithUserCount,
}
