import http from '@/api/http.api'

const getAll = async () => {
  const res = await http.get('/person')
  return res.data
}
const getById = async (id) => {
  const res = await http.get(`/person/${id}`)
  return res.data
}

const search = async (page, limit, gender, generation, is_alive, person_type, search) => {
  const res = await http.get(`/person/search`, {
    params: { page, limit, gender, generation, is_alive, person_type, search },
  })
  return res.data
}

const getByGender = async (gender, generation) => {
  const res = await http.get(`person/gender/${gender}/generation/${generation}`);
  return res.data
}

const generation = async () => {
  const res = await http.get(`/person/generation`)
  return res.data
}
const getMarriage = async (id) => {
  const res = await http.get(`/person/marriage/${id}`)
  return res.data
}

const buildFormData = (person, avatar) => {
  const formData = new FormData()

  Object.keys(person).forEach((key) => {
  
    if (key === 'id') return

    let value = person[key]

    if (value === null || value === undefined) return
    // Boolean fields — ép string tường minh
    if (typeof value === 'boolean') {
      formData.append(key, value ? 'true' : 'false')
      return
    }
    // xử lý riêng date fields
    if (key === 'birth_date' || key === 'death_date') {

      if (value) {
        value = new Date(value).toISOString()
        formData.append(key, value)
      }

      return
    }

    // object / array
    if (
      typeof value === 'object' &&
      !(value instanceof File)
    ) {
      formData.append(key, JSON.stringify(value))
    } else {
      formData.append(key, value)
    }
  })

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
  getByGender,
  search,
  generation,
  getMarriage,
  exportExcel,
  exportExcelAll,
  importExcel,
  create,
  update,
  deletePerson,
  deleteMultiple,
  deleteAvatar,
}
