import http from '@/api/http.api'

const getByRoleId = async (roleId) => {
    const res = await http.get(`role-permission/role/${roleId}`);
    return res.data;
}
const createRolePermission = async (payload) => {
    const res = await http.post('role-permission', payload);
    return res.data;
}

export default {
    getByRoleId,
    createRolePermission
}