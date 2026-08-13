import { defineStore } from 'pinia'
import { ref } from 'vue'
import graveLocationService from '@/api/services/grave-location.service'

export const useGraveLocationStore = defineStore('graveLocation', () => {

    const graveLocations = ref([])
    const loading = ref(false)
    const error = ref(null)
    
    const getByPersonId = async (personId) => {
        loading.value = true
        error.value = null
        try {
            const data = await graveLocationService.getByPersonId(personId);         
          return data;
        } catch (err) {
            error.value = err.message
        } finally {
            loading.value = false
        }
    }

    const removeByPersonId = async (personId) => {
        loading.value = true
        error.value = null
        try {
            await graveLocationService.removeByPersonId(personId);
            graveLocations.value = graveLocations.value.filter(gl => gl.personId !== personId);
        } catch (err) {
            error.value = err.message
        } finally {
            loading.value = false
        }
    }
    
    const create = async (graveLocation, file) => {
        loading.value = true
        error.value = null
        try {
            const data = await graveLocationService.create(graveLocation, file);
            graveLocations.value.push(data);
        } catch (err) {
            error.value = err.message
        } finally {
            loading.value = false
        }
    }

    const update = async (id, graveLocation, file) => {
        loading.value = true
        error.value = null
        try {
            const data = await graveLocationService.updated(id, graveLocation,file);
            const index = graveLocations.value.findIndex(gl => gl.id === id);
            if (index !== -1) {
                graveLocations.value[index] = data;
            }
        } catch (err) {
            error.value = err.message
        } finally {
            loading.value = false
        }
    }
    const deleteImage = async (graveLocationId) => {
        loading.value = true
        error.value = null
        try {
           const message = await graveLocationService.deleteImage(graveLocationId);
            return message;
        } catch (err) {
            error.value = err.message
        } finally {
            loading.value = false
        }
    }

    return {
        graveLocations,
        loading,
        error,
        getByPersonId,
        removeByPersonId,
        create,
        update,
        deleteImage
    }
});