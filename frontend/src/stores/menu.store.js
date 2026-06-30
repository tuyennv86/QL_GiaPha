import menuService from '@/api/services/menu.service'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMenuStore = defineStore('menu', () => {
  const loading = ref(false)
  const error = ref(null)

  const menus = ref([])
  const menuRouters = ref([])  

  const getMyMenu = async () => {
    loading.value = true
    error.value = null
    try {
      const data = await menuService.getMyMenu()
      menus.value = data
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  const getMyMenuRouters = async () => {
    loading.value = true
    error.value = null
    try {
      const data = await menuService.getMyMenuPage()
      menuRouters.value = data      
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }
  const getMenuTree = async () => {
    loading.value = true;
    error.value = null
    try {
      const res = await menuService.getTreeMnu();
      return res.data;
    }
    catch (err) {
      error.value = err.message;
    }
    finally {
      loading.value = false;
    }
  }

  const getAll = async () => {
    loading.value = true;
    error.value = null
    try {
      const res = await menuService.getAll();
      return res.data;
    }
    catch (err) {
      error.value = err.message;
    }
    finally {
      loading.value = false;
    }
  }

  const getNotRoter = async () => {
    loading.value = true;
    error.value = null;
    try {
      const res = await menuService.getNotRoter();
      // console.log('menu store no root',res.data);
      return res.data;
    } catch (err) {
      error.value = err.message;
    }
    finally {
      loading.value = false;
    }
  }
  
  const getMenuPermissions = async () => {
    loading.value = true;
    error.value = null;
    try {
      const res = await menuService.getMenuPermissions();
      return res.data;
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
    menus,    
    menuRouters,
    getMyMenu,
    getMenuTree,
    getAll,
    getNotRoter,
    getMenuPermissions,
    getMyMenuRouters
  }
})
