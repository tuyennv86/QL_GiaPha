import http from '@/api/http.api'

const getPersonTitles = async () => {
    const res = await http.get('person-titles')
    return res.data;
}

const getPersonTitleById = async (id) => {
    const res = await http.get(`person-titles/${id}`)
    return res.data;
}

const createPersonTitle = async (data) => {
    const res = await http.post('person-titles', data)
    return res.data;
}

const updatePersonTitle = async (id, data) => {
    const res = await http.patch(`person-titles/${id}`, data)
    return res.data;
}

const deletePersonTitle = async (id) => {
    const res = await http.delete(`person-titles/${id}`)
    return res.data;
}

export default {
    
    createPersonTitle,
    updatePersonTitle,
    deletePersonTitle,
        
    getPersonTitles,
    getPersonTitleById,
    }