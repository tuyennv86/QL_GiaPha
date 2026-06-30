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

const getMenuPermissions = async () => {
  return await http.get('menu/menu-permissions')
}

const getNotRoter = async () => {
  return await http.get('menu/not-router')
}

const getMyMenuPage = async () => {
  const res = await http.get('menu/my-menu-page')
  // console.log('getMyMenuPage res.data', res.data)
  return res.data
}


export default {
  getMyMenu,
  getMyMenuPage,
  getTreeMnu,
  getAll,
  getNotRoter,
  getMenuPermissions
}
