import http from '@/api/http.api'

const getByPersonId = async (personId) => {   
    const response = await http.get(`/grave-location/person/${personId}`)    
    return response.data   
}

const removeByPersonId = async (personId) => {
    const response = await http.delete(`/grave-location/person/${personId}`)
    return response.data
}

const create = async (graveLocation, file) => {

    const formData = buildFormData(graveLocation, file)
    
    const response = await http.post('/grave-location', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
    return response.data
}

const updated = async (id, graveLocation, file) => {

    const formData = buildFormData(graveLocation, file)
    console.log('formData', formData)

    const response = await http.patch(`/grave-location/${id}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })

    return response.data
}
const deleteImage = async (graveLocationId) => {    
    const response = await http.delete(`/grave-location/${graveLocationId}/image`)
    return response.data
}

const buildFormData = (grave, map_image) => {
  const formData = new FormData()

  Object.keys(grave).forEach((key) => {
  
    if (key === 'id') return

    let value = grave[key]

    if (value === null || value === undefined) return
    // Boolean fields — ép string tường minh
    if (typeof value === 'boolean') {
      formData.append(key, value ? 'true' : 'false')
      return
    }
    // xử lý riêng date fields
    if (key === 'created_at' || key === 'created_at') {

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

  if (map_image) {
    formData.append('map_image', map_image)
  }

  return formData
}

export default {
    getByPersonId,
    removeByPersonId,
    create,
    updated,
    deleteImage
}