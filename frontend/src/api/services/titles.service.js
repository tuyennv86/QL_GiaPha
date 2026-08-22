import http from '@/api/http.api'

const getAll = async() => {
    const response = await http.get('/titles');
    return response.data;
}
const getById = async(id) => {
    const response = await http.get(`/titles/${id}`);
    return response.data;
}

const getSearch = async (search) => {
    const response = await http.get(`/titles/search/${search}`);
    return response.data;
}
const create = async (data) => {
    const response = await http.post('/titles', data);
    return response.data;
}

const update = async (id, data) => {
    const response = await http.patch(`/titles/${id}`, data);
    return response.data;
}

const remove = async (id) => {
    const response = await http.delete(`/titles/${id}`);
    return response.data;
}

export default {
    
        getAll,
        getById,
        getSearch,
        create,
        update,
        remove
    }