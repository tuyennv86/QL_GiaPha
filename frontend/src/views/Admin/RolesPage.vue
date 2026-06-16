<template>
    <!-- ====== ROLES ====== -->
    <div class="page">
        <div class="ph">
            <div class="ph-eyebrow">Quản Trị Hệ Thống</div>
            <div class="ph-row">
                <div>
                    <div class="ph-title">Quản lý vai Trò</div>
                    <div class="ph-sub">Ma trận quyền hạn cho từng vai trò trong hệ thống</div>
                </div>
                <button class="btn btn-primary btn-sm" @click="openAdd">
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
                                    <button class="btn btn-ghost btn-xs text-gold" @click.prevent="openEdit(user)"> <i
                                            class="fas fa-pen"></i> </button>
                                    <!-- <button class="btn btn-ghost btn-xs text-green" @click.prevent="openView(user)"> <i
                                            class="fas fa-eye"></i> </button> -->
                                    <button class="btn btn-danger btn-xs" @click.prevent="deleteUser(user.id)"><i
                                            class="fas fa-trash"></i></button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>

        <div class="card mb-16">
            <div class="card-head">
                <div class="card-title">📋 Ma Trận Quyền Hạn</div>
            </div>
            <div class="card-body" style="padding: 0; overflow-x: auto">
                <table class="perm-matrix">
                    <thead>
                        <tr>
                            <th style="width: 200px">Chức Năng</th>
                            <th v-for="permission in permisstions" :key="permission.id">
                                {{ permission.permission_name }}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="menu in menuList" :key="menu.id">
                            <td style="text-align: left; font-weight: 500; color: var(--text-primary)">
                                {{ menu.menu_name }}
                            </td>
                            <td v-for="permission in permisstions" :key="permission.id">
                                <input type="checkbox" :checked="hasPermission(menu.id, permission.id)"
                                    @change="togglePermission(menu.id, permission.id)" />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

</template>
<script setup>
import { onMounted, ref, watch } from "vue";
import { useRoleStore } from "@/stores/role.store";
import { useMenuStore } from "@/stores/menu.store";
import { usePermissionStore } from "@/stores/permissions.store";

const roleStore = useRoleStore();
const menuStore = useMenuStore();
const permissionsStore = usePermissionStore();

const menuList = ref([]);
const permisstions = ref([]);

const search = ref("");

const loadData = async () => {
    await roleStore.rolesWithUserCount(search.value);
};
const loadMenu = async () => {
    menuList.value = await menuStore.getNotRoter();
    permisstions.value = await permissionsStore.getAll();
};

onMounted(async () => {
    await loadData();
    await loadMenu();
});

watch(search, () => {
    loadData();
});

const hasPermission = (menuId, permissionId) => {
    // Kiểm tra nếu menu đã có quyền này
    // const menu = menuList.value.find((m) => m.id === menuId);
    // return menu && menu.permissions.some((p) => p.id === permissionId);
};

const togglePermission = async (menuId, permissionId) => {
    // const menu = menuList.value.find((m) => m.id === menuId);
    // if (!menu) return;

    // const hasPerm = hasPermission(menuId, permissionId);
    // if (hasPerm) {
    //     // Gỡ bỏ quyền
    //     await menuStore.revokePermission(menuId, permissionId);
    // } else {
    //     // Cấp quyền
    //     await menuStore.grantPermission(menuId, permissionId);
    // }
    // // Cập nhật lại danh sách menu sau khi thay đổi quyền
    // await loadMenu();
};

</script>
