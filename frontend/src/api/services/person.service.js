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

const deleteMultiple = async (ids) => {
  const res = await http.delete('/person/delete-multiple', {
    data: {
      listId: ids,
    },
  })

  return res.data
}

const exportExcel = async (selectedIds) => {
  const response = await http.post(
    'person/export-excel',
    {
      listId: selectedIds,
    },
    {
      responseType: 'blob',
    },
  )
  return response
}

const exportExcelAll = async () => {
  const response = await http.post(
    'person/export-all-excel',
    {},
    {
      responseType: 'blob',
    },
  )
  return response
}

const importExcel = async (file) => {
  const formData = new FormData()

  formData.append('file', file)

  const response = await http.post('person/import-excel', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response.data
}

export default {
  getAll,
  getById,
  search,
  generation,
  exportExcel,
  exportExcelAll,
  importExcel,
  create,
  update,
  deletePerson,
  deleteMultiple,
}
