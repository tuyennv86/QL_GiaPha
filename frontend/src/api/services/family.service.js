import http from '../http.api'

const getAll = async () => {
  const res = await http.get('family')
  return res.data
}
export default {
  getAll,
}
