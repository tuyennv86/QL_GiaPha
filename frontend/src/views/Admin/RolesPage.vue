<template>
    <!-- ====== ROLES ====== -->
    <div class="page">
        <div class="ph">
            <div class="ph-eyebrow">Quản Trị Hệ Thống</div>
            <div class="ph-row">
                <div>
                    <div class="ph-title">Quản lý vai Trò</div>
                    <div class="ph-sub">Gán từng quyền hạn cho các vai trò</div>
                </div>
                <button class="btn btn-primary btn-sm" @click="openAdd" v-permission="'role.create'">
                    <i class="fas fa-plus-circle"></i> Thêm vai trò
                </button>
            </div>

        </div>

        <div class="grid mb-16" style="gap: 2px;">
            <!-- Filters -->
            <div class="card mb-16">
                <div class="card-body" style="padding: 14px 20px">
                    <div class="select-bar">
                        <div class="search-bar" style="max-width: 260px">
                            <span style="color: var(--text-dim)">🔍</span>
                            <input placeholder="Nhập thông tin tìm kiếm..." v-model="search" />
                        </div>
                        <button class="btn btn-danger btn-sm" @click="loadData">
                            <i class="fas fa-search"></i> Tìm kiếm
                        </button>
                    </div>
                </div>
            </div>
            <div class="card">
                <table class="tbl">
                    <thead>
                        <tr>
                            <th>Vai trò</th>
                            <th>Mô tả</th>
                            <th>Thao Tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="role in roleStore.roles" :key="role.id">
                            <td>
                                <div class="tbl-name">
                                    <div>
                                        <div class="tbl-name-val">
                                            <span class="badge"
                                                :class="'role-' + role.role_name.toLowerCase().replace(/\s+/g, '-')">
                                                {{ role.role_name }}
                                            </span>
                                        </div>
                                        <div class="tbl-name-sub font-mono">{{ role.users_count }} (user)</div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                {{ role.description }}
                            </td>
                            <td>
                                <div class="flex gap-4">
                                    <button class="btn btn-ghost btn-xs text-gold" @click.prevent="openEdit(role)"
                                        v-permission="'role.edit'" title="Sửa vai trò"> <i class="fas fa-pen"></i>
                                    </button>
                                    <button class="btn btn-ghost btn-xs text-green" v-permission="'role.edit'"
                                        @click.prevent="openPermission(role)" title="Cập nhật quyến"> <i
                                            class="fas fa-user-shield"></i>
                                    </button>
                                    <button class="btn btn-danger btn-xs" @click.prevent="deleteRole(role.id)"
                                        v-permission="'role.delete'" title="Xóa vai trò"><i
                                            class="fas fa-trash"></i></button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
    </div>
    <AddRole v-model="viewModel" :role="selectRole" @save="handSave"></AddRole>

    <AddRolePermission v-model="viewModelPermission" :role="selectRolePermission" :menus="menuPermissions"
        :role-menus="roleMenus" :role-permissions="rolePermissions" @save="handSavePermission">
    </AddRolePermission>

    <ToastCompo></ToastCompo>
    <ConfirmDialog></ConfirmDialog>
</template>
<script setup>
import { onMounted, ref, watch } from "vue";
import AddRole from "@/components/SildePanel/Role/AddRole.vue";
import AddRolePermission from "@/components/SildePanel/Role/AddRolePermission.vue";
import { useRoleStore } from "@/stores/role.store";
import { useMenuStore } from "@/stores/menu.store";
import ToastCompo from '@/components/Toast/ToastCompo.vue';
import { useToast } from '@/components/Toast/useToast';
import ConfirmDialog from '@/components/confirm/ConfirmDialog.vue';
import { useConfirm } from '@/components/confirm/useConfirm';
import { useRoleMenuStore } from "@/stores/role-menu.store";
import { useRolePermissionStore } from "@/stores/role-permission.store";

const roleStore = useRoleStore();
const menuStore = useMenuStore();
const { showToast } = useToast()
const { showConfirm } = useConfirm();
const roleMenuStore = useRoleMenuStore();
const rolePermissionStore = useRolePermissionStore();


const viewModel = ref(false);
const selectRole = ref(null);

const viewModelPermission = ref(false);
const selectRolePermission = ref(null);
const menuPermissions = ref([]);
const roleMenus = ref([]);
const rolePermissions = ref([]);


const search = ref("");

const loadData = async () => {
    await roleStore.rolesWithUserCount(search.value);
};


onMounted(async () => {
    await loadData();
});

watch(search, () => {
    loadData();
});

const openAdd = () => {
    selectRole.value = null;
    viewModel.value = true;
};
const openEdit = (role) => {
    selectRole.value = role;
    viewModel.value = true;
};

const handSave = ({ form, isEdit }) => {
    const { id, ...payload } = form;
    try {
        if (isEdit) {
            roleStore.updateRole(id, payload);
            showToast({ title: 'Cập nhật vai trò!', sub: "Cập nhật vai trò thành công", type: 'success' })
        } else {
            roleStore.addRole(payload);
            showToast({ title: 'Tạo mới vai trò!', sub: "Thêm mới vai trò thành công", type: 'success' })
        }
    } catch (error) {
        showToast({ title: 'Đã có lỗi', sub: 'Lỗi :' + error, type: 'error' })
    }
};

const deleteRole = async (id) => {
    const ok = await showConfirm({ title: 'Xóa quyền', desc: 'Bạn có chắc muốn xóa VAI TRÒ này không?', icon: '<i class="fas fa-trash-alt"></i>', btn: 'Xóa' })

    if (ok) {
        try {
            await roleStore.deleteRole(id);
            showToast({ title: 'Xóa quyền!', sub: "Xóa vai trò thành công", type: 'success' })
        } catch (error) {
            showToast({ title: 'Đã có lỗi', sub: 'Lỗi :' + error, type: 'error' })
        }
    }
};

const openPermission = async (role) => {
    menuPermissions.value = await menuStore.getMenuPermissions();
    roleMenus.value = await roleMenuStore.getRoleMenusByRoleId(role.id);
    rolePermissions.value = await rolePermissionStore.getRolePermissionsByRoleId(role.id);
    selectRolePermission.value = role;
    viewModelPermission.value = true;
};

const handSavePermission = async ({ roleId, menuIds, permissionIds }) => {
    try {
        const payloadRoleMenus = {
            role_id: roleId,
            menu_ids: menuIds
        };
        roleMenuStore.saveRoleMenus(payloadRoleMenus);
        const payloadRolePermissions = {
            role_id: roleId,
            permission_ids: permissionIds
        };
        rolePermissionStore.saveRolePermissions(payloadRolePermissions);
        showToast({ title: 'Cập nhật!', sub: "Cập nhật thành công", type: 'success' })
    } catch (error) {
        showToast({ title: 'Đã có lỗi', sub: 'Lỗi :' + error, type: 'error' })
    }
    console.log("Saving permissions for roleId:", roleId, "menuIds:", menuIds, "permissionIds:", permissionIds);

};

</script>
