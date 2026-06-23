import http from '@/api/http.api'

const getByRoleId = async (roleId) => {
    const res = await http.get(`role-menus/role/${roleId}`);
    return res.data;
}
const createRoleMenu = async (payload) => {
    const res = await http.post('role-menus', payload);
    return res.data;
}


export default {
    getByRoleId,
    createRoleMenu,
}