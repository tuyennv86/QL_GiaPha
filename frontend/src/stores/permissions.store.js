import { defineStore } from "pinia";
import { ref } from "vue";
import permissionsService from "@/api/services/permissions.service";

export const usePermissionStore = defineStore('permission', () => {
    const error = ref(null)    
    const loading = ref(false);

    const permissions = ref([])

    const getAll = async () => {
        loading.value = true;
        error.value = null;
        try {
            const data = await permissionsService.getAll();
            return data;
        } catch (err) {
            error.value = err.message;
        }
        finally {
            loading.value = false;
        }
    }

    const getBySearch = async (search) => {
        loading.value = true;
        error.value = null;
        try {
            const data = await permissionsService.getBySearch(search);
            permissions.value = data;
        } catch (err) {
            error.value = err.message;
        }
        finally {
            loading.value = false;
        }
    }

    const deletePermission = async (id) => {
        loading.value = true;
        error.value = null;
        try {
           const message = await permissionsService.deletePermission(id);
            permissions.value = permissions.value.filter((p) => p.id !== id)      
            return message;
        } catch (err) {
            error.value = err.message;
        }
        finally {
            loading.value = false;
        }
    }

    const deleteMultiple = async (ids) => {
        loading.value = true;
        error.value = null;
        try {
           const message = await permissionsService.deleteMultiple(ids);
            permissions.value = permissions.value.filter((p) => !ids.includes(p.id))      
            return message;
        } catch (err) {
            error.value = err.message;
            throw err;
        }
        finally {
            loading.value = false;
        }
    }

    const addPermission = async (permission) => {
        loading.value = true;
        error.value = null;
        try {
            const data = await permissionsService.addPermission(permission);
             permissions.value.push(data)      
        } catch (err) {
            error.value = err.message;
        }
        finally {
            loading.value = false;
        }
    }

    const updatePermission = async (id, permission) => {
        loading.value = true;
        error.value = null;
        try {
            const data = await permissionsService.updatePermission(id, permission);
            const index = permissions.value.findIndex((p) => p.id === id)
            if (index !== -1) {
                permissions.value[index] = data
            }
        } catch (err) {
            error.value = err.message;
        }
        finally {
            loading.value = false;
        }
    }

    return {
        error,
        loading,
        permissions,

        getBySearch,
        getAll,
        deletePermission,
        addPermission,
        updatePermission,
        deleteMultiple
    }
})