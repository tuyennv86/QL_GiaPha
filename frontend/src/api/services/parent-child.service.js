import http from '@/api/http.api';

const getAll = async () => {
    const res = await http.get('parent-child');
    return res.data;
}

const getById = async (id) => {
    const res = await http.get(`parent-child/${id}`);
    return res.data;
}

const getByChildId = async (childId) => {
    const res = await http.get(`parent-child/child/${childId}`);
    return res.data;
}

const create = async (data) => {
    return await http.post('parent-child', data);
}

const update = async (id, data) => {
    const res = await http.patch(`parent-child/${id}`, data);
    return res.data;
}

const remove = async (id) => {
    await http.delete(`parent-child/${id}`);
}

export default {
    getAll,
    getById,
    getByChildId,
    create,
    update,
    remove
}