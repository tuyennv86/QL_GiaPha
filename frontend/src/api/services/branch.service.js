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
export default {
  getBrancheById,
  getBranches,
  getBrancheByFamily,
}
