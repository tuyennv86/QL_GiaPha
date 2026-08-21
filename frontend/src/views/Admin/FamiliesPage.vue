<template>
    <!-- ====== Families ====== -->
    <div class="page">
        <div class="ph">
            <div class="ph-eyebrow">Quản Trị Hệ Thống</div>
            <div class="ph-row">
                <div>
                    <div class="ph-title">Quản lý dòng họ</div>
                    <div class="ph-sub">Quản lý các dòng họ và các chi của họ</div>
                </div>
                <button class="btn btn-primary btn-sm" @click="openAdd" v-permission="'family.create'">
                    <i class="fas fa-plus-circle"></i> Thêm dòng họ
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
                            <th>Gia tộc</th>
                            <th>Địa chỉ</th>
                            <th>Mô tả</th>
                            <th>Thao Tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-for="family in familyStore.families" :key="family.id">
                            <tr>
                                <td>
                                    <div class="tbl-name">
                                        <button class="expand-btn" @click="toggleFamily(family.id)"
                                            :title="expandedFamilies[family.id] ? 'Thu gọn' : 'Mở rộng'">
                                            <i class="fas"
                                                :class="expandedFamilies[family.id] ? 'fa-chevron-down' : 'fa-chevron-right'">
                                            </i>
                                        </button>
                                        <div>
                                            <div class="tbl-name-val">{{ family.family_name }}</div>
                                            <div class="tbl-name-sub">
                                                Sáng lập: {{ family.ancestor_name }}
                                            </div>
                                        </div>

                                    </div>
                                </td>
                                <td>
                                    {{ family.origin_location }}
                                </td>
                                <td>
                                    {{ family.description }}
                                </td>
                                <td>
                                    <div class="flex gap-4">
                                        <button class="btn btn-ghost btn-xs text-gold" @click.prevent="openEdit(family)"
                                            v-permission="'family.edit'" title="Sửa dòng họ"> <i class="fas fa-pen"></i>
                                        </button>
                                        <button class="btn btn-danger btn-xs" @click.prevent="deleteFamily(family.id)"
                                            v-permission="'family.delete'" title="Xóa dòng họ"><i
                                                class="fas fa-trash"></i></button>
                                        <button class="btn btn-ghost btn-xl text-green"
                                            @click.prevent="openAddBranch(family)" title="Thêm chi mới"> <i
                                                class="fa-solid fa-person-circle-plus"></i></button>

                                    </div>
                                </td>
                            </tr>
                            <tr v-if="expandedFamilies[family.id]" class="branch-row">

                                <td colspan="4">
                                    <div class="branch-box">

                                        <div class="branch-title">
                                            <i class="fas fa-sitemap"></i>
                                            Danh sách chi họ : {{ family.family_name }}
                                        </div>

                                        <div v-if="family.branches?.length">
                                            <div v-for="branch in family.branches" :key="branch.id" class="branch-item">

                                                <div class="branch-name-col">
                                                    <div class="branch-name">{{ branch.branch_name }}</div>
                                                </div>

                                                <div class="branch-desc-col">
                                                    {{ branch.description }}
                                                </div>

                                                <div class="branch-actions">
                                                    <button class="btn btn-ghost btn-xs text-gold" title="Sửa chi / họ"
                                                        @click.prevent="openEditBranch(branch, family)">
                                                        <i class="fas fa-pen"></i>
                                                    </button>

                                                    <button class="btn btn-danger btn-xs" title="Xóa chi / họ"
                                                        @click.prevent="deletebranch(branch.id)">
                                                        <i class="fas fa-trash"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        <div v-else class="branch-empty">
                                            Chưa có chi nào
                                        </div>

                                    </div>
                                </td>
                            </tr>
                        </template>
                    </tbody>
                </table>
            </div>

        </div>
    </div>
    <AddFamily v-model="viewModel" :family="selectFamily" @save="handSave"></AddFamily>
    <AddBranch v-model="viewModelBranch" :branch="selectBranch" :family="familyBranch" @save="handSaveBranch">
    </AddBranch>

    <ToastCompo></ToastCompo>
    <ConfirmDialog></ConfirmDialog>

</template>
<script setup>
import { onMounted, ref, watch } from "vue";
import ToastCompo from '@/components/Toast/ToastCompo.vue';
import { useToast } from '@/components/Toast/useToast';
import ConfirmDialog from '@/components/confirm/ConfirmDialog.vue';
import { useConfirm } from '@/components/confirm/useConfirm';
import AddFamily from '@/components/SildePanel/family/AddFamily.vue';
import AddBranch from "@/components/SildePanel/family/AddBranch.vue";
import { useFamilyStore } from '@/stores/family.store';


const expandedFamilies = ref({})

const toggleFamily = (id) => {
    expandedFamilies.value[id] = !expandedFamilies.value[id]
}

const familyStore = useFamilyStore();


const { showToast } = useToast()
const { showConfirm } = useConfirm();


const viewModel = ref(false);
const selectFamily = ref(null);

const viewModelBranch = ref(false);
const selectBranch = ref(null);
const familyBranch = ref(null);


const search = ref("");

const loadData = async () => {
    await familyStore.getFamilies(search.value);
};


onMounted(async () => {
    await loadData();
});

watch(search, () => {
    console.log("search changed:", search.value);
    loadData();
});

const openAdd = () => {
    selectFamily.value = null;
    viewModel.value = true;
};
const openEdit = (family) => {
    selectFamily.value = family;
    viewModel.value = true;
};

const handSave = ({ form, isEdit }) => {
    console.log("handSave called with form:", form, "isEdit:", isEdit);
    const { id, ...payload } = form;
    try {
        if (isEdit) {
            familyStore.updateFamily(id, payload);
            showToast({ title: 'Cập nhật dòng họ!', sub: "Cập nhật dòng họ thành công", type: 'success' })
        } else {
            familyStore.createFamily(payload);
            showToast({ title: 'Tạo mới dòng họ!', sub: "Thêm mới dòng họ thành công", type: 'success' })
        }
    } catch (error) {
        showToast({ title: 'Đã có lỗi', sub: 'Lỗi :' + error, type: 'error' })
    }
};

const deleteFamily = async (id) => {
    const ok = await showConfirm({ title: 'Xóa quyền', desc: 'Bạn có chắc muốn xóa DÒNG Họ này không?', icon: '<i class="fas fa-trash-alt"></i>', btn: 'Xóa' })

    if (ok) {
        try {
            const mess = await familyStore.deleteFamily(id);
            showToast({ title: 'Xóa dòng họ!', sub: mess, type: 'success' })
        } catch (error) {
            showToast({ title: 'Đã có lỗi', sub: 'Lỗi :' + error, type: 'error' })
        }
    }
};

// load branches edit

const openAddBranch = (family) => {
    selectBranch.value = null;
    familyBranch.value = family;
    viewModelBranch.value = true;
};
const openEditBranch = (branch, family) => {
    selectBranch.value = branch;
    familyBranch.value = family;
    viewModelBranch.value = true;
};

const handSaveBranch = ({ form, isEdit }) => {
    const { id, ...payload } = form;
    try {
        if (isEdit) {
            familyStore.updateBranch(id, payload);
            showToast({ title: 'Cập nhật chi họ!', sub: "Cập nhật chi họ thành công", type: 'success' })
        } else {
            familyStore.createBranch(payload);
            showToast({ title: 'Tạo mới chi họ!', sub: "Thêm mới chi họ thành công", type: 'success' })
        }
    } catch (error) {
        showToast({ title: 'Đã có lỗi', sub: 'Lỗi :' + error, type: 'error' })
    }
};

const deletebranch = async (id) => {
    const ok = await showConfirm({ title: 'Xóa chi họ', desc: 'Bạn có chắc muốn xóa CHI HỌ này không?', icon: '<i class="fas fa-trash-alt"></i>', btn: 'Xóa' })

    if (ok) {
        try {
            const mess = await familyStore.deleteBranch(id);
            showToast({ title: 'Xóa chi họ!', sub: mess, type: 'success' })
        } catch (error) {
            showToast({ title: 'Đã có lỗi', sub: 'Lỗi :' + error, type: 'error' })
        }
    }
};

</script>
<style scoped>
.expand-btn {
    width: 28px;
    height: 28px;
    border: none;
    background: transparent;
    color: #d4af37;
    cursor: pointer;
    border-radius: 6px;
    transition: .2s;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 10px;
}

.expand-btn:hover {
    background: rgba(212, 175, 55, .12);
}

.tbl-name {
    display: flex;
    align-items: flex-start;
}

.branch-row td {
    padding: 0;
    border-top: none;
}

.branch-box {
    margin: 0 12px 12px 60px;
    padding: 14px 18px;
    background: rgba(255, 255, 255, .03);
    border-left: 3px solid #d4af37;
    border-radius: 8px;
    animation: fadeDown .2s ease;
}

.branch-title {
    display: flex;
    align-items: center;
    gap: 8px;
    color: #d4af37;
    font-weight: 600;
    margin-bottom: 10px;
}

.branch-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    border-top: 1px solid rgba(255, 255, 255, .08);
}

.branch-item:first-child {
    border-top: none;
}

.branch-name {
    color: #fff;
    font-weight: 600;
}

.branch-desc {
    font-size: 12px;
    color: #9ca3af;
}

.branch-actions {
    display: flex;
    gap: 6px;
}

.branch-empty {
    color: #9ca3af;
    padding: 8px 0;
}

.branch-item {
    display: grid;
    grid-template-columns: 260px 1fr auto;
    align-items: center;
    gap: 16px;
    padding: 12px 0;
    border-top: 1px solid rgba(255, 255, 255, .08);
}

.branch-item:first-child {
    border-top: none;
}

.branch-name-col {
    min-width: 220px;
}

.branch-name {
    color: #fff;
    font-weight: 600;
}

.branch-desc-col {
    color: #b7bec8;
    font-size: 13px;
}

.branch-actions {
    display: flex;
    gap: 6px;
}

@keyframes fadeDown {
    from {
        opacity: 0;
        transform: translateY(-6px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>