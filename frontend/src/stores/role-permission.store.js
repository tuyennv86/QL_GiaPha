import { defineStore } from 'pinia';
import rolePermissionService from "@/api/services/role-permission.service";

export const useRolePermissionStore = defineStore('rolePermission', () => {
    
    const getRolePermissionsByRoleId = async (roleId) => {
        return await rolePermissionService.getByRoleId(roleId);
    }
    const saveRolePermissions = async (payload) => {
        return await rolePermissionService.createRolePermission(payload);
    }
    return {
        getRolePermissionsByRoleId,
        saveRolePermissions
    }
})