<template>
    <!-- ====== Titles ====== -->
    <div class="page">
        <div class="ph">
            <div class="ph-eyebrow">Quản Trị Hệ Thống</div>
            <div class="ph-row">
                <div>
                    <div class="ph-title">Quản lý chức vụ</div>
                    <div class="ph-sub">Quản lý các chức vụ trong dòng họ</div>
                </div>
                <button class="btn btn-primary btn-sm" @click="openAdd" v-permission="'titles.create'">
                    <i class="fas fa-plus-circle"></i> Thêm chức vụ
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
                        <button class="btn btn-danger btn-sm" @click.prevent="loadData">
                            <i class="fas fa-search"></i> Tìm kiếm
                        </button>
                    </div>
                </div>
            </div>
            <div class="card">
                <table class="tbl">
                    <thead>
                        <tr>
                            <th>Chức vụ</th>
                            <th>Thứ tự</th>
                            <th>Mô tả</th>
                            <th>Thao Tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="title in titleStore.titles" :key="title.id">
                            <td>
                                <div class="tbl-name-val">{{ title.title_name }}</div>
                            </td>
                            <td>{{ title.scope_level }}</td>
                            <td>
                                {{ title.description }}
                            </td>
                            <td>
                                <div class="flex gap-4">
                                    <button class="btn btn-ghost btn-xs text-gold" @click.prevent="openEdit(title)"
                                        v-permission="'titles.edit'" title="Sửa chức vụ"> <i class="fas fa-pen"></i>
                                    </button>

                                    <button class="btn btn-danger btn-xs" @click.prevent="deleteTitle(title.id)"
                                        v-permission="'titles.delete'" title="Xóa chức vụ"><i
                                            class="fas fa-trash"></i></button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
    </div>
    <AddTitles v-model="viewModel" :title="selectTitle" @save="handSave"></AddTitles>
    <ToastCompo></ToastCompo>
    <ConfirmDialog></ConfirmDialog>
</template>
<script setup>
import { onMounted, ref, watch } from "vue";
import ToastCompo from '@/components/Toast/ToastCompo.vue';
import { useToast } from '@/components/Toast/useToast';
import ConfirmDialog from '@/components/confirm/ConfirmDialog.vue';
import { useConfirm } from '@/components/confirm/useConfirm';
import { useTitlesStore } from "@/stores/titles.store";
import AddTitles from "@/components/SildePanel/titles/AddTitles.vue";

const { showToast } = useToast()
const { showConfirm } = useConfirm();
const titleStore = useTitlesStore();


const viewModel = ref(false);
const selectTitle = ref(null);

const search = ref("");

const loadData = async () => {
    await titleStore.getSearch(search.value);
};

onMounted(async () => {
    await loadData();
});

watch(search, () => {
    loadData();
});

const openAdd = () => {
    selectTitle.value = null;
    viewModel.value = true;
};
const openEdit = (title) => {
    selectTitle.value = title;
    viewModel.value = true;
};

const handSave = ({ form, isEdit }) => {
    const { id, ...payload } = form;
    try {
        if (isEdit) {
            titleStore.update(id, payload);
            showToast({ title: 'Cập nhật chức vụ!', sub: "Cập nhật chức vụ thành công", type: 'success' })
        } else {
            titleStore.create(payload);
            showToast({ title: 'Tạo mới chức vụ!', sub: "Thêm mới chức vụ thành công", type: 'success' })
        }
    } catch (error) {
        showToast({ title: 'Đã có lỗi', sub: 'Lỗi :' + error, type: 'error' })
    }
};

const deleteTitle = async (id) => {
    const ok = await showConfirm({ title: 'Xóa quyền', desc: 'Bạn có chắc muốn xóa CHỨC VỤ này không?', icon: '<i class="fas fa-trash-alt"></i>', btn: 'Xóa' })

    if (ok) {
        try {
            const mess = await titleStore.remove(id);
            showToast({ title: 'Xóa chức vụ!', sub: mess, type: 'success' })
        } catch (error) {
            showToast({ title: 'Đã có lỗi', sub: 'Lỗi :' + error, type: 'error' })
        }
    }
};
</script>