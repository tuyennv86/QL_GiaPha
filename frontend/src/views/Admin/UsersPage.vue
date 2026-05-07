<template>
    <!-- ====== USERS ADMIN ====== -->
    <div class="page">
        <div class="ph">
            <div class="ph-eyebrow">Quản Trị Hệ Thống</div>
            <div class="ph-row">
                <div>
                    <div class="ph-title">Tài Khoản Người Dùng</div>
                    <div class="ph-sub">
                        Quản lý quyền truy cập và vai trò hệ thống
                    </div>
                </div>
                <button class="btn btn-primary btn-sm" @click="openAdd">
                    + Tạo Tài Khoản
                </button>
            </div>
        </div>
        <!-- Filters -->
        <div class="card mb-16">
            <div class="card-body" style="padding: 14px 20px">
                <div class="select-bar">
                    <div class="search-bar" style="max-width: 260px">
                        <span style="color: var(--text-dim)">🔍</span>
                        <input placeholder="Nhập thông tin tìm kiếm..." v-model="search" />
                    </div>
                    <select class="f-select" style="width: auto; padding: 8px 12px" v-model="roleId">
                        <option :value="0">Tất cả các vai trò</option>
                        <option v-for="role in roleStore.roles" :key="role.id" :value="role.id">{{ role.role_name }}
                        </option>
                    </select>
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
                        <th>Tài Khoản</th>
                        <th>UserName</th>
                        <th>Vai Trò</th>
                        <th>Họ Dòng</th>
                        <th>Trạng Thái</th>
                        <th>Đăng Nhập Cuối</th>
                        <th>Ngày Tạo</th>
                        <th>Thao Tác</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in userStore.users" :key="user.id">
                        <td>
                            <div class="tbl-name">
                                <div class="tbl-ava">
                                    {{ user.full_name.split(' ')[0][0] }}{{ user.full_name.split(' ').slice(-1)[0][0] }}
                                </div>
                                <div>
                                    <div class="tbl-name-val">{{ user.full_name }}</div>
                                    <div class="tbl-name-sub font-mono">{{ user.email }} - {{ user.phone }}</div>
                                </div>
                            </div>
                        </td>
                        <td>
                            {{ user.username }}
                        </td>
                        <td><span class="badge" :class="'role-' + role.role_name.toLowerCase().replace(/\s+/g, '-')"
                                v-for="role in user.roles" :key="role.id">{{
                                    role.role_name }} </span></td>
                        <td class="text-secondary"><span v-if="user.family">{{ user.family.family_name }}</span></td>
                        <td @click.prevent="updateActive(user.id)">
                            <div class="flex-center gap-6" v-if="user.is_active">
                                <div class="status-dot sd-green"></div><span class="text-sm text-green">Hoạt
                                    động</span>
                            </div>
                            <div class="flex-center gap-6" v-else>
                                <div class="status-dot sd-red"></div><span class="text-sm text-red">Đình
                                    chỉ</span>
                            </div>
                        </td>
                        <td class="font-mono text-sm text-secondary">{{ formatDateTime(user.last_login) }}</td>
                        <td class="font-mono text-sm text-secondary">{{ formatDate(user.created_at) }}</td>
                        <td>
                            <div class="flex gap-4">
                                <button class="btn btn-ghost btn-xs text-gold" @click.prevent="openEdit(user)"> <i
                                        class="fas fa-pen"></i> </button>
                                <button class="btn btn-ghost btn-xs text-green" @click.prevent="openView(user)"> <i
                                        class="fas fa-eye"></i> </button>
                                <button class="btn btn-danger btn-xs" @click.prevent="deleteUser(user.id)"><i
                                        class="fas fa-trash"></i></button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>

            <BasePagination v-model:currentPage="page" :totalItems="userStore.total" :pageSize="limit"
                @change="onPageChange" :delta="4"></BasePagination>
        </div>
    </div>
    <AddUserSilde v-model="showPanel" :user="selectedUser" :roles="roleStore.roles" :families="familyStore.families"
        @save="handleSave">
    </AddUserSilde>

    <ViewUserSilde v-model="viewPanel" :user="viewUser"></ViewUserSilde>

    <ToastCompo></ToastCompo>
    <ConfirmDialog></ConfirmDialog>
</template>
<script setup>
import BasePagination from '@/components/BasePagination.vue';
import ToastCompo from '@/components/Toast/ToastCompo.vue';
import AddUserSilde from '@/components/SildePanel/AddUserSilde.vue';
import ViewUserSilde from '@/components/SildePanel/ViewUserSilde.vue';
import { useToast } from '@/components/Toast/useToast';
import { useUserStore } from '@/stores/user.store';
import ConfirmDialog from '@/components/confirm/ConfirmDialog.vue';
import { useConfirm } from '@/components/confirm/useConfirm';
import { useRoleStore } from '@/stores/role.store';
import { useFamilyStore } from '@/stores/family.store';
import { onMounted, ref, watch } from 'vue';
import { formatDate, formatDateTime } from '@/utils/formatDate';

const { showToast } = useToast()
const { showConfirm } = useConfirm();

const page = ref(1);
const limit = ref(10);// tổng số trang trên 1 bản ghi
const search = ref("");
const roleId = ref("0");

const showPanel = ref(false);
const selectedUser = ref(null);

const viewPanel = ref(false);
const viewUser = ref(null);

const userStore = useUserStore();
const roleStore = useRoleStore();
const familyStore = useFamilyStore();

const loadData = async () => {
    await userStore.getAllByRole(roleId.value, page.value, limit.value, search.value);
}

watch(search, () => {
    page.value = 1;
    loadData();
})

onMounted(async () => {
    await loadData();
    await roleStore.getAll();
    await familyStore.getAll();
})

const onPageChange = (newPage) => {
    page.value = newPage;
    loadData();
}

const updateActive = async (userId) => {
    const ok = await showConfirm({ title: 'Cập nhật trạng thái', desc: 'Bạn có chắc muốn cạp nhật trạng thái không?', icon: '<i class="fas fa-sync"></i>', btn: 'Cập nhật' })
    if (ok) {
        try {
            await userStore.updateActive(userId)
            showToast({ title: 'Đã cập nhật', sub: 'Đã cập nhật trạng thái', type: 'success' })
        } catch (err) {
            showToast({ title: 'Đã có lỗi', sub: 'Lỗi :' + err, type: 'error' })
        }
    }
}

const deleteUser = async (userId) => {
    const ok = await showConfirm({ title: 'Xóa người dùng', desc: 'Bạn có chắc muốn xóa không?', icon: '<i class="fas fa-trash-alt"></i>', btn: 'Xóa' })

    if (ok) {
        try {
            const mess = await userStore.deleteUser(userId);
            showToast({ title: 'Xóa user', sub: mess.message, type: 'success' })
        } catch (error) {
            showToast({ title: 'Đã có lỗi', sub: 'Lỗi :' + error, type: 'error' })
        }
    }
}
// open Sile thêm mới
const openAdd = () => {
    selectedUser.value = null;
    showPanel.value = true;
}
// open silde sửa thông tin user
const openEdit = async (user) => {
    const data = await userStore.getById(user.id);
    console.log(data);
    selectedUser.value = data;
    showPanel.value = true;
}

//save user
const handleSave = async ({ form, isEdit }) => {
    // console.log("Edit :", isEdit);
    // console.log('Form', form);
    if (isEdit) {
        try {
            // remote password và username
            const payload = { ...form }
            delete payload.id
            delete payload.password
            delete payload.password2
            delete payload.username

            await userStore.saveUser(form.id, payload);
            showToast({ title: 'Cập nhật user', sub: 'Cập nhật thành công!', type: 'success' });
        } catch (err) {
            showToast({ title: 'Đã có lỗi', sub: 'Lỗi :' + err, type: 'error' })
        }
    }
    else {
        try {
            await userStore.addUser(form);
            showToast({ title: 'Thêm mới user', sub: 'Thêm mới thành công!', type: 'success' });
        } catch (err) {
            showToast({ title: 'Đã có lỗi', sub: 'Lỗi :' + err, type: 'error' })
        }
    }

}

// view user
const openView = async (user) => {
    viewPanel.value = true;
    const data = await userStore.viewUser(user.id);
    viewUser.value = data;
}
</script>