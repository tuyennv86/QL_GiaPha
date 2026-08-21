<template>
    <div class="page">
        <div class="ph">
            <div class="ph-eyebrow">Quản Trị Hệ Thống</div>
            <div class="ph-row">
                <div>
                    <div class="ph-title">Quản Lý Phân Quyền</div>
                    <div class="ph-sub">
                        Ma trận quyền hạn cho từng vai trò trong hệ thống
                    </div>
                </div>
                <button class="btn btn-primary btn-sm" @click="openAdd" v-permission="'permission.create'">
                    <i class="fas fa-calendar-plus"></i> Thêm mới quyền
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
            <div class="card mb-16" style="border-color: var(--gold)" v-if="selected.length > 0">
                <div class="card-body" style="padding: 12px 20px">
                    <div class="flex-center gap-12">
                        <span class="text-gold fw-6">{{ selected.length }} đã chọn</span>
                        <button class="btn btn-danger btn-sm" @click.prevent="handDeleteAllCheck"
                            v-permission="'permission.delete'">
                            <i class="fas fa-trash"></i> Xoá Chọn
                        </button>
                        <button class="btn btn-ghost btn-sm" @click.prevent="handUncheckAll">
                            <i class="fas fa-tasks"></i> Bỏ chọn
                        </button>
                    </div>
                </div>
            </div>
            <div class="card" v-if="permissionStore.permissions.length > 0">
                <table class="tbl">
                    <thead>
                        <tr>
                            <th style="width: 40px;"><input type="checkbox" style="cursor: pointer;" ref="checkAllRef"
                                    :checked="isAllChecked" @change="handleCheckAll"></th>
                            <th>Tên quyền</th>
                            <th>Module</th>
                            <th>Mã Code</th>
                            <th>Mô tả</th>
                            <th>Thao Tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="permission in permissionStore.permissions" :key="permission.id">
                            <td><input type="checkbox" :value="permission.id" v-model="selected"
                                    style="cursor: pointer;">
                            </td>
                            <td>
                                {{ permission.permission_name }}
                            </td>
                            <td>{{ permission.module }}</td>
                            <td>
                                {{ permission.permission_code }}
                            </td>
                            <td>
                                {{ permission.description }}
                            </td>

                            <td>
                                <div class="flex gap-4">
                                    <button class="btn btn-ghost btn-xs text-gold" @click.prevent="openEdit(permission)"
                                        v-permission="'permission.edit'"> <i class="fas fa-pen"></i> </button>
                                    <button class="btn btn-danger btn-xs"
                                        @click.prevent="deletePermission(permission.id)"
                                        v-permission="'permission.delete'"><i class="fas fa-trash"></i></button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <BasePagination v-model:currentPage="page" :totalItems="permissionStore.total" :pageSize="limit"
                    @change="onPageChange" :delta="4"></BasePagination>
            </div>

        </div>

    </div>
    <AddPermission v-model="viewModel" :permission="selectPermission" :menus="menuList" @save="handSave">
    </AddPermission>
    <ToastCompo></ToastCompo>
    <ConfirmDialog></ConfirmDialog>
</template>
<script setup>
import { usePermissionStore } from '@/stores/permissions.store';
import { onMounted, ref, watch, computed } from 'vue';
import BasePagination from '@/components/BasePagination.vue';
import ToastCompo from '@/components/Toast/ToastCompo.vue';
import { useToast } from '@/components/Toast/useToast';
import ConfirmDialog from '@/components/confirm/ConfirmDialog.vue';
import { useConfirm } from '@/components/confirm/useConfirm';
import AddPermission from '@/components/SildePanel/Permission/AddPermission.vue';
import { useMenuStore } from '@/stores/menu.store';

const permissionStore = usePermissionStore();
const menuStore = useMenuStore();

const { showToast } = useToast()
const { showConfirm } = useConfirm();

const search = ref('');
const viewModel = ref(false);
const selectPermission = ref(null);
const menuList = ref([]);

const page = ref(1);
const limit = ref(30);// tổng số trang trên 1 bản ghi

// check all checkbox

const selected = ref([])
const checkAllRef = ref(null)

const isAllChecked = computed(() => {
    return (
        permissionStore.permissions.length > 0 && selected.value.length === permissionStore.permissions.length
    )
})

const isIndeterminate = computed(() => {
    return (
        selected.value.length > 0 &&
        selected.value.length < permissionStore.permissions.length
    )
})

const updateIndeterminate = () => {
    if (checkAllRef.value) {
        checkAllRef.value.indeterminate = isIndeterminate.value
    }
}

watch(selected, updateIndeterminate, { deep: true })

onMounted(updateIndeterminate)

const handleCheckAll = (e) => {
    if (e.target.checked) {
        selected.value = permissionStore.permissions.map(x => x.id)
    } else {
        selected.value = []
    }
}
const handUncheckAll = () => {
    selected.value = [];
}
//end check all checkbox

const loadData = () => {
    permissionStore.getSearchPage(search.value, page.value, limit.value);
};

onMounted(() => {
    loadData();
});

watch(search, () => {
    page.value = 1;
    loadData();
}
);

const onPageChange = (newPage) => {
    page.value = newPage;
    loadData();
};

const openAdd = async () => {
    viewModel.value = true;
    selectPermission.value = null;
    menuList.value = await menuStore.getNotRoter();
};

const openEdit = async (permission) => {
    viewModel.value = true;
    selectPermission.value = permission;
    menuList.value = await menuStore.getNotRoter();
};

const handSave = async ({ form, isEdit }) => {
    const payload = { ...form };
    delete payload.id;
    try {
        if (isEdit) {
            await permissionStore.updatePermission(form.id, payload);

            showToast({ title: 'Cập nhật quyền!', sub: "Cập nhật thành công", type: 'success' })
        } else {
            await permissionStore.addPermission(payload);
            showToast({ title: 'Tạo mới quyền!', sub: "Thêm mới thành công", type: 'success' })
        }
    } catch (error) {
        showToast({ title: 'Đã có lỗi', sub: 'Lỗi :' + error, type: 'error' })
    }
}

const deletePermission = async (id) => {
    const ok = await showConfirm({ title: 'Xóa quyền', desc: 'Bạn có chắc muốn xóa QUYỀN này không?', icon: '<i class="fas fa-trash-alt"></i>', btn: 'Xóa' })
    if (ok) {
        try {
            const mess = await permissionStore.deletePermission(id);
            showToast({ title: 'Xóa quyền!', sub: mess.message, type: 'success' })
        } catch (error) {
            showToast({ title: 'Đã có lỗi', sub: 'Lỗi :' + error, type: 'error' })
        }
    }
};

const handDeleteAllCheck = async () => {
    // console.log(selected.value);
    const ok = await showConfirm({ title: 'Xóa quyền', desc: `Bạn có chắc muốn Xóa ${selected.value.length} quyền này không?`, icon: '<i class="fas fa-trash-alt"></i>', btn: 'Xóa' })
    if (ok) {
        try {
            const res = await permissionStore.deleteMultiple(selected.value);
            showToast({ title: 'Xóa quyền!', sub: res.message, type: 'success' })
            selected.value = [];
        } catch (error) {
            showToast({ title: 'Đã có lỗi', sub: 'Lỗi :' + error, type: 'error' })
        }
    }
};
</script>