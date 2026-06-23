import http from '@/api/http.api'

const getAll = async () => {
    const res = await http.get('permissions');
    return res.data;
}

const getBySearch = async (search) => {
    const res = await http.get(`permissions/search`, {
        params: {
            search
        }
    });
    return res.data;
}

const getSerachPageding = async (search, page, limit) => {
    const res = await http.get(`permissions/search-pageding`, {
        params: {
            search,
            page,
            limit
        }
    });
    return res.data;
}

//gọi api xóa permission
const deletePermission = async (id) => {
    const res = await http.delete(`permissions/${id}`);
    return res.data;
}

const deleteMultiple = async (ids) => {
    const res = await http.delete('permissions/delete-multiple', {
        data: {
        ids: ids,
        },
    });
    return res.data;
}
//gọi api thêm mới permission
const addPermission = async (permission) => {
    const res = await http.post('permissions', permission);
    return res.data;
}

const updatePermission = async (id, permission) => {
    const res = await http.patch(`permissions/${id}`, permission);
    return res.data;
}

export default {
    getAll,
    getBySearch,
    getSerachPageding,
    deletePermission,
    addPermission,
    updatePermission,
    deleteMultiple
}
