import http from '../http.api'

const getAll = async () => {
  const res = await http.get('family')
  return res.data
}
const getFamilies = async (search) => {
  const res = await http.get(`family/search`, { params: { search } })
  return res.data
}

const deleteFamily = async (id) => {
  const res = await http.delete(`family/${id}`)
  return res.data
}

const getFamilyById = async (id) => {
  const res = await http.get(`family/${id}`)
  return res.data
}

const createFamily = async (familyData) => {
  const res = await http.post('family', familyData)
  return res.data
}

const updateFamily = async (id, familyData) => {
  const res = await http.patch(`family/${id}`, familyData)
  return res.data
}

export default {
  getAll,
  getFamilyById,
  getFamilies,
  deleteFamily,
  createFamily,
  updateFamily
}
