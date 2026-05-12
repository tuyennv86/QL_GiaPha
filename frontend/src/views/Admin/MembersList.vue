<template>
    <!-- ====== MEMBERS ADMIN ====== -->
    <div class="page">
        <div class="ph">
            <div class="ph-eyebrow">Quản Lý Nội Dung</div>
            <div class="ph-row">
                <div>
                    <div class="ph-title">Quản Lý Thành Viên</div>
                    <div class="ph-sub">
                        14/14 thành viên được hiển thị
                    </div>
                </div>
                <div class="flex gap-8">
                    <button class="btn btn-secondary btn-sm" @click.prevent="handExportAll">
                        <i class="far fa-file-excel text-red"></i>⬇ Xuất Excel
                    </button>
                    <label class="import-btn">
                        <i class="fas fa-file-import"></i>
                        <span>Import Excel</span>
                        <input type="file" accept=".xlsx,.xls" @change="handleImport" hidden />
                    </label>

                    <div v-if="personStore.loading">
                        Đang import...
                    </div>
                    <button class="btn btn-primary btn-sm">
                        <i class="fas fa-plus"></i> Thêm Thành Viên
                    </button>
                </div>
            </div>
        </div>

        <!-- Filters -->
        <div class="card mb-16">
            <div class="card-body" style="padding: 14px 20px">
                <div class="select-bar">
                    <div class="search-bar" style="max-width: 260px">
                        <span style="color: var(--text-dim)">🔍</span>
                        <input placeholder="Tìm kiếm tên, quê quán..." v-model="search" />
                    </div>
                    <select class="f-select" style="width: auto; padding: 8px 12px" v-model="generation">
                        <option :value="0">Tất cả đời</option>
                        <option v-for="gen in personStore.generations" :key="gen" :value="gen">Đời {{ gen }}</option>
                    </select>
                    <select class="f-select" style="width: auto; padding: 8px 12px" v-model="gender">
                        <option :value="-1">Tất cả giới tính</option>
                        <option :value="1">Nam</option>
                        <option :value="0">Nữ</option>
                        <option :value="2">Khác</option>
                    </select>
                    <select class="f-select" style="width: auto; padding: 8px 12px" v-model="is_alive">
                        <option :value="-1">Tất cả tình trạng</option>
                        <option :value="1">Còn sống</option>
                        <option :value="0">Đã mất</option>
                    </select>
                    <button class="btn btn-secondary btn-sm" @click.prevent="loadPersons">
                        <i class="fas fa-search"></i> Tìm kiếm
                    </button>
                </div>
            </div>
        </div>

        <!-- Bulk actions bar -->
        <div class="card mb-16" style="border-color: var(--gold)" v-if="selected.length > 0">
            <div class="card-body" style="padding: 12px 20px">
                <div class="flex-center gap-12">
                    <span class="text-gold fw-6">{{ selected.length }} đã chọn</span>
                    <button class="btn btn-secondary btn-sm" @click.prevent="handExportExcell"><i
                            class="far fa-file-excel"></i> Xuất
                        Chọn</button>
                    <button class="btn btn-danger btn-sm" @click.prevent="handDeleteAllCheck">
                        <i class="fas fa-trash"></i> Xoá Chọn
                    </button>
                    <button class="btn btn-ghost btn-sm" @click.prevent="handUncheckAll">
                        <i class="fas fa-tasks"></i> Bỏ chọn
                    </button>
                </div>
            </div>
        </div>

        <div class="card">
            <table class="tbl">
                <thead>
                    <tr>
                        <th style="width: 40px;"><input type="checkbox" style="cursor: pointer;" ref="checkAllRef"
                                :checked="isAllChecked" @change="handleCheckAll"></th>
                        <th>Họ Tên</th>
                        <th>Giới Tính</th>
                        <th>Thế Hệ</th>
                        <th>Năm Sinh</th>
                        <th>Năm Mất</th>
                        <th>Quê Quán</th>
                        <th>Nghề Nghiệp</th>
                        <th>Tình Trạng</th>
                        <th>Thao Tác</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="person in personStore.persons" :key="person.id">
                        <td><input type="checkbox" :value="person.id" v-model="selected" style="cursor: pointer;"></td>
                        <td>
                            <div class="tbl-name">
                                <div class="tbl-ava" :class="'gen-' + person.generation"
                                    style="width: 28px; height: 28px;">{{
                                        person.full_name.split(' ').slice(-1)[0][0] }}</div>
                                <div>
                                    <div class="tbl-name-val">{{ person.full_name }}</div>
                                    <div class="tbl-name-sub">{{ person.biography }}</div>
                                </div>
                            </div>
                        </td>
                        <td>
                            <span class="badge b-blue" v-if="person.gender === 1"><i class="fas fa-mars"></i> Nam</span>
                            <span class="badge b-purple" v-else-if="person.gender === 0"><i class="fas fa-venus"></i>
                                Nữ</span>
                            <span class="badge b-gray" v-else><i class="fas fa-venus-mars"></i> Khác</span>
                        </td>
                        <td><span class="badge" :class="'gen-' + person.generation">Đời {{ person.generation }}</span>
                        </td>
                        <td class="font-mono text-sm">{{ formatDate(person.birth_date) }}</td>
                        <td class="font-mono text-sm">{{ formatDate(person.death_date) }}</td>
                        <td class="text-secondary">{{ person.place_of_brith }}</td>
                        <td class="text-secondary">{{ person.job }}</td>
                        <td>
                            <span class="badge b-green" v-if="person.is_alive"><i class="fas fa-heart"></i> Sống</span>
                            <span class="badge b-gray" v-else><i class="fas fa-skull"></i> Mất</span>
                        </td>
                        <td>
                            <button class="btn btn-ghost btn-xs text-gold" @click.prevent="openEdit(person)"> <i
                                    class="fas fa-pen"></i> </button>
                            <button class="btn btn-ghost btn-xs text-green" @click.prevent="openView(person)"> <i
                                    class="fas fa-eye"></i> </button>
                            <button class="btn btn-danger btn-xs" @click.prevent="deletePerson(person.id)"><i
                                    class="fas fa-trash"></i></button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <BasePagination v-model:currentPage="page" :totalItems="personStore.total" :pageSize="limit"
                @change="onPageChange" :delta="4"></BasePagination>
        </div>
    </div>
    <ToastCompo></ToastCompo>
    <ConfirmDialog></ConfirmDialog>
</template>
<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { usePersonStore } from '@/stores/person.store';

import ConfirmDialog from '@/components/confirm/ConfirmDialog.vue';
import { useConfirm } from '@/components/confirm/useConfirm';
import ToastCompo from '@/components/Toast/ToastCompo.vue';
import { useToast } from '@/components/Toast/useToast';
import BasePagination from '@/components/BasePagination.vue';
import { formatDate } from '@/utils/formatDate';

const { showToast } = useToast()
const { showConfirm } = useConfirm();
const personStore = usePersonStore();

const page = ref(1);
const limit = ref(20);// tổng số trang trên 1 bản ghi
const search = ref("");
const gender = ref("-1");
const generation = ref("0");
const is_alive = ref("-1");

const loadPersons = async () => {
    await personStore.searchPersons(page.value, limit.value, gender.value, generation.value, is_alive.value, search.value);
};

const getGeneration = async () => {
    await personStore.getGenerations();
};

onMounted(() => {
    loadPersons();
    getGeneration();
});

watch(search, () => {
    page.value = 1;
    loadPersons();
});

const onPageChange = (newPage) => {
    page.value = newPage;
    loadPersons();
};

// check all checkbox

const selected = ref([])
const checkAllRef = ref(null)

const isAllChecked = computed(() => {
    return (
        personStore.persons.length > 0 && selected.value.length === personStore.persons.length
    )
})

const isIndeterminate = computed(() => {
    return (
        selected.value.length > 0 &&
        selected.value.length < personStore.persons.length
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
        selected.value = personStore.persons.map(x => x.id)
    } else {
        selected.value = []
    }
}
const handUncheckAll = () => {
    selected.value = [];
}
//end check all checkbox

const handExportExcell = async () => {
    try {
        await personStore.exportExcel(selected.value);
        showToast({ title: 'Đã xuất danh sách ra file excell', type: 'success' })
    } catch (error) {
        showToast({ title: 'Đã có lỗi', sub: 'Lỗi :' + error, type: 'error' })
    }
};

const handExportAll = async () => {
    try {
        await personStore.exportExcelAll();
        showToast({ title: 'Đã xuất danh sách ra file excell', type: 'success' })
    } catch (error) {
        showToast({ title: 'Đã có lỗi', sub: 'Lỗi :' + error, type: 'error' })
    }
};

const handDeleteAllCheck = async () => {
    const ok = await showConfirm({ title: 'Xóa thành viên', desc: `Bạn có chắc muốn Xóa ${selected.value.length} thành viên này không?`, icon: '<i class="fas fa-user-slash"></i>', btn: 'Xóa' })
    if (ok) {
        try {
            const res = await personStore.deleteMultiplePersons(selected.value);
            showToast({ title: 'Xóa user', sub: res.message, type: 'success' })
            selected.value = [];
        } catch (error) {
            showToast({ title: 'Đã có lỗi', sub: 'Lỗi :' + error, type: 'error' })
        }
    }
};

const handleImport = async (event) => {
    const file = event.target.files[0];

    if (!file) return;

    try {
        const response = await personStore.importFromExcel(file,);
        showToast({ title: 'Import thành công', sub: response.message, type: 'success', });
    } catch (error) {
        showToast({ title: 'Lỗi import', sub: error.response?.data?.message || error.message, type: 'error', });
    } finally {
        event.target.value = '';
    }
};

const deletePerson = async (id) => {
    const ok = await showConfirm({ title: 'Xóa thành viên', desc: 'Bạn có chắc muốn Xóa thành viên này không?', icon: '<i class="fas fa-user-slash"></i>', btn: 'Xóa' })
    if (ok) {

        try {
            const res = await personStore.deletePerson(id);
            showToast({ title: 'Xóa user', sub: res.message, type: 'success' })
        } catch (error) {
            showToast({ title: 'Đã có lỗi', sub: 'Lỗi :' + error, type: 'error' })
        }
    }
};

const openEdit = (person) => {
    console.log('Open edit for person:', person);
    showToast({ title: 'Chức năng đang phát triển', type: 'info' })
};

const openView = (person) => {
    console.log('Open view for person:', person);
    showToast({ title: 'Chức năng đang phát triển', type: 'info' })
};


</script>

<style scoped>
.import-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;

    padding: 10px 16px;

    background: #21bd5a;
    color: white;

    border-radius: 4px;
    cursor: pointer;

    font-size: 13px;
    font-weight: 500;

    transition: all 0.2s ease;
}

.import-btn:hover {
    background: #15803d;
}

.import-btn i {
    font-size: 16px;
}
</style>