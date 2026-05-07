import http from '../http.api'

const getAll = async () => {
  const res = await http.get('/person')
  return res.data
}
const getById = async (id) => {
  const res = await http.get(`/person/${id}`)
  return res.data
}

const search = async (page, limit, gender, generation, is_alive, search) => {
  const res = await http.get(`/person/search`, {
    params: { page, limit, gender, generation, is_alive, search },
  })
  return res.data
}

const generation = async () => {
  const res = await http.get(`/person/generation`)
  return res.data
}
const create = async (person) => {
  const res = await http.post('/person', person)
  return res.data
}

const update = async (id, person) => {
  const res = await http.patch(`/person/${id}`, person)
  return res.data
}

const deletePerson = async (id) => {
  const res = await http.delete(`/person/${id}`)
  return res.data
}
export default {
  getAll,
  getById,
  search,
  generation,

  create,
  update,
  deletePerson,
}
