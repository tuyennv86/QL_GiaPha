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

const buildFormData = (person, avatar) => {
  const formData = new FormData()

  // append object fields
  Object.keys(person).forEach((key) => {
    if (key === 'id') return // id không cần gửi lên server
    const value = person[key]

    // null/undefined bỏ qua
    if (value === null || value === undefined) return

    // array/object
    if (typeof value === 'object' && !(value instanceof File)) {
      formData.append(key, JSON.stringify(value))
    } else {
      formData.append(key, value)
    }
  })

  // append avatar
  if (avatar) {
    formData.append('avatar', avatar)
  }

  return formData
}

const create = async (person, avatar) => {
  const formData = buildFormData(person, avatar)

  const res = await http.post('/person', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

  return res.data
}

const update = async (id, person, avatar) => {
  const formData = buildFormData(person, avatar)

  const res = await http.patch(`/person/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

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

const deleteAvatar = async (id) => {
  const res = await http.delete(`/person/${id}/avatar`)
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
  deleteAvatar,
}
