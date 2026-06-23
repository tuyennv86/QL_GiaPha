import { defineStore } from 'pinia';
import roleMenuService from "@/api/services/role-menu.service";

export const useRoleMenuStore = defineStore('roleMenu', ()=>{

    const getRoleMenusByRoleId = async (roleId) => {
        return await roleMenuService.getByRoleId(roleId);
    }
    const saveRoleMenus = async (payload) => {
        return await roleMenuService.createRoleMenu(payload);
    }

    return {
        getRoleMenusByRoleId,
        saveRoleMenus
    }
})