import http from "../http.api";

const getAll = async () => {
    const res = await http.get('marriages');
    return res.data;
}

const getByPersonId = async (personId) => {
    const res = await http.get(`marriages/person/${personId}`);
    return res.data;
}
const getById = async (id) => {
    const res = await http.get(`marriages/${id}`);
    return res.data;
}

const create = async (data) => {
    const res = await http.post('marriages', data);
    return res.data;
}

const update = async (id, data) => {
    const res = await http.patch(`marriages/${id}`, data);
    return res.data;
}

const remove = async (id) => {
    await http.delete(`marriages/${id}`);
}

export default {
    getAll,
    getByPersonId,
    getById,
    create,
    update,
    remove
};