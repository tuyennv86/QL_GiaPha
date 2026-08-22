import { defineStore } from "pinia";
import { ref } from "vue";
import titleService from "@/api/services/titles.service";

export const useTitlesStore = defineStore('titles', () => {
    const loading = ref(false);
    const error = ref(null);
    const titles = ref([]);

    const getAll = async () => {
        loading.value = true;
        error.value = null;
        try {
            const data = await titleService.getAll();
            titles.value = data;
        } catch (err) {
            error.value = err.message;
        } finally {
            loading.value = false;
        }
    }

    const getById = async (id) => {
        loading.value = true;
        error.value = null;
        try {
            const data = await titleService.getById(id);
           return data;
        } catch (err) {
            error.value = err.message;
        } finally {
            loading.value = false;
        }
    }

    const getSearch = async (search) => {
        loading.value = true;
        error.value = null;
        try {
            const data = await titleService.getSearch(search);
            titles.value = data;
        } catch (err) {
            error.value = err.message;
        } finally {
            loading.value = false;
        }
    }

    const create = async (data) => {
        loading.value = true;
        error.value = null;
        try {
            const response = await titleService.create(data);
            titles.value.push(response);
            return response;
        } catch (err) {
            error.value = err.message;
        } finally {
            loading.value = false;
        }
    }

    const update = async (id, data) => {
        loading.value = true;
        error.value = null;
        try {
            const response = await titleService.update(id, data);
            const index = titles.value.findIndex(title => title.id === id);
            if (index !== -1) {
                titles.value[index] = response;
            }
            return response;
        } catch (err) {
            error.value = err.message;
        } finally {
            loading.value = false;
        }
    }

    const remove = async (id) => {
        loading.value = true;
        error.value = null;
        try {
            const response = await titleService.remove(id);
            titles.value = titles.value.filter(title => title.id !== id);
            return response.message;
        } catch (err) {
            error.value = err.message;
        } finally {
            loading.value = false;
        }
    }

    return {
        loading,
        error,
        titles,

        getAll,
        getById,
        getSearch,
        create,
        update,
        remove
    }
});