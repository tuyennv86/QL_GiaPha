import { defineStore } from 'pinia';
import { ref } from 'vue';
import parentChildService from '@/api/services/parent-child.service';

export const useParentChildStore = defineStore('parentChild', () => {

    const error = ref(null)    
    const loading = ref(false);

    const parentChildList = ref([]);
    const parentChild = ref(null);

    const getAll = async () => {
        loading.value = true;
        error.value = null;

        try {
            const data = await parentChildService.getAll();    
            parentChildList.value = data;
        } catch (err) {
            error.value = err.message;
        }  
        finally {
            loading.value = false;
        }
    }

    const getByChildId = async (childId) => {
        loading.value = true;
        error.value = null;
        try {
            const data = await parentChildService.getByChildId(childId);    
            parentChild.value = data;
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
            const data = await parentChildService.getById(id);    
            parentChild.value = data;
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
           const newParent = await parentChildService.create(data);    
            parentChildList.value.push(newParent);
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
            const updatedParent = await parentChildService.update(id, data);    
            const index = parentChildList.value.findIndex(p => p.id === id);
            if (index !== -1) {
                parentChildList.value[index] = updatedParent;
            }
        } catch (err) {
            error.value = err.message;
        }        
        finally {
            loading.value = false;
        }
    }

    return {    
        loading,
        error,
        parentChildList,
        parentChild,
        getAll,
        getById,
        getByChildId,
        create,
        update
    }
});