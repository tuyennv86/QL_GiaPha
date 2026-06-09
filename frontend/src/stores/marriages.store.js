import { defineStore } from 'pinia';
import { ref } from 'vue';
import marriagesService from '@/api/services/marriages.service';

export const useMarriagesStore = defineStore('marriages', () => {
    
    const error = ref(null)    
    const loading = ref(false);

    const marriagesList = ref([]);    
    const marriage = ref(null);
    
    // const getAll = async () => {
    //     loading.value = true;
    //     error.value = null;

    //     try {
    //         const data = await marriagesService.getAll();    
    //         marriagesList.value = data;
    //     } catch (err) {
    //         error.value = err.message;
    //     }  
    //     finally {
    //         loading.value = false;
    //     }
    // }
    
    const getByPersonId = async (personId, personType) => {
        loading.value = true;
        error.value = null;
        try {
            const data = await marriagesService.getByPersonId(personId, personType);    
            marriagesList.value = data;
       
        } catch (err) {
            error.value = err.message;
        }        
        finally {
            loading.value = false;
        }
    }
    
    const getById = async (id) => {
        loading.value = true;
        error.value = null;
        try {
            const data = await marriagesService.getById(id);    
            marriage.value = data;
        } catch (err) {
            error.value = err.message;
        }        
        finally {
            loading.value = false;
        }
    }
    
    const create = async (data) => {
        loading.value = true;
        error.value = null;
        try {
        const newMarriage = await marriagesService.create(data);    
            marriagesList.value.push(newMarriage);
        } catch (err) {
            error.value = err.message;
        }  
        finally {
            loading.value = false;
        }
    }
    
    const update = async (id, data) => {
        loading.value = true;
        error.value = null;
        try {
            const updatedMarriage = await marriagesService.update(id, data);
            const index = marriagesList.value.findIndex(m => m.id === id);
            if (index !== -1) marriagesList.value[index] = updatedMarriage;
            if (marriage.value?.id === id) marriage.value = updatedMarriage;
        } catch (err) {
            error.value = err.message;
        }
            finally {
                loading.value = false;
        }   
    }
        
    const remove = async (id) => {
        loading.value = true;
        error.value = null;
        try {
            await marriagesService.remove(id);    
            marriagesList.value = marriagesList.value.filter(m => m.id !== id);
            if (marriage.value?.id === id) marriage.value = null;
        } catch (err) {
            error.value = err.message;
        }        
        finally {
            loading.value = false;
        }
    }
        
    return {
        marriagesList,        
        marriage,
        error,
        loading,
        // getAll,
        getByPersonId,
        getById,
        create,
        update,
        remove
    }
});