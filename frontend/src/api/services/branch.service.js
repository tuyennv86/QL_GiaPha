import http from '@/api/http.api'

const getBranches = async () => {
  const response = await http.get('/familybrannches')
  return response.data
}
const getBrancheByFamily = async (familyId) => {
  const response = await http.get(`/familybrannches/family/${familyId}`)
  return response.data
}
const getBrancheById = async (id) => {
  const response = await http.get(`/familybrannches/${id}`)
  return response.data
}

const deleteBranche = async (id) => {
  const response = await http.delete(`/familybrannches/${id}`)
  return response.data
}

const createBranche = async (data) => {
  const response = await http.post('/familybrannches', data)
  return response.data
}

const updateBranche = async (id, data) => {
  const response = await http.patch(`/familybrannches/${id}`, data)
  return response.data
}

export default {
  getBrancheById,
  getBranches,
  getBrancheByFamily,

  deleteBranche,
  createBranche,
  updateBranche
}
