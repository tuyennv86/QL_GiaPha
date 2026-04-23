import http from '@/api/http.api'

const getMyMenu = async () => {
  const res = await http.get('menu/my-menu')
  return res.data
}
const getTreeMnu = async () => {
  return await http.get('menu/tree')
}

const getAll = async () => {
  return await http.get('menu')
}

export default {
  getMyMenu,
  getTreeMnu,
  getAll,
}
