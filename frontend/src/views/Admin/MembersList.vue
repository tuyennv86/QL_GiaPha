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
                    <button class="btn btn-primary btn-sm" @click.prevent="handAddPerson">
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
                        <th>Ảnh</th>
                        <th>Họ / Chi</th>
                        <th>Giới Tính</th>
                        <th>Thế Hệ</th>
                        <th>Năm Sinh</th>
                        <th>Năm Mất</th>
                        <th>Quê Quán</th>
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
                                    style="width: 28px; height: 28px;">{{ person.full_name.split(' ').slice(-1)[0][0] }}
                                </div>
                                <div>
                                    <div class="tbl-name-val">{{ person.full_name }}</div>
                                    <div class="tbl-name-sub">{{ person.biography }}</div>
                                </div>
                            </div>
                        </td>
                        <td>
                            <div v-if="person.avatar"
                                style="width: 40px; height: 40px; border-radius: 4px; overflow: hidden;">
                                <img v-if="person.avatar" :src="`${IMG_URL}${person.avatar}`" :alt="person.full_name"
                                    style="width: 100%; height: 100%; object-fit: cover;" />
                            </div>
                        </td>
                        <td>
                            <div class="tbl-name">
                                <div>
                                    <div class="tbl-name-val2" v-if="person.family">{{ person.family.family_name }}
                                    </div>
                                    <div class="tbl-name-sub" v-if="person.branch">{{ person.branch.branch_name }}</div>
                                </div>
                            </div>
                        </td>
                        <td>
                            <span class="badge b-blue" v-if="person.gender === 1"><i class="fas fa-mars"></i> Nam</span>
                            <span class="badge b-purple" v-else-if="person.gender === 0"><i class="fas fa-venus"></i>
                                Nữ</span>
                            <span class="badge b-gray" v-else><i class="fas fa-venus-mars"></i> Khác</span>
                            <span class="tbl-name-sub" v-if="person.person_type"> / </span>
                            <span class="tbl-name-sub" :class="'gen-' + person.generation" v-if="person.person_type">
                                {{ PERSON_TYPE_LABEL[person.person_type] }}</span>
                        </td>
                        <td><span class="badge" :class="'gen-' + person.generation">Đời {{ person.generation }}</span>
                        </td>
                        <td class="font-mono text-sm">{{ formatDate(person.birth_date) }}</td>
                        <td class="font-mono text-sm">{{ formatDate(person.death_date) }}</td>
                        <td class="text-secondary">{{ person.place_of_brith }}</td>
                        <td>
                            <span class="badge b-green" v-if="person.is_alive"><i class="fas fa-heart"></i>Còn
                                sống</span>
                            <span class="badge b-gray" v-else><i class="fas fa-skull"></i>Đã mất</span>
                        </td>
                        <td>
                            <button class="btn btn-ghost btn-xs text-pink" @click.prevent="openRelationship(person)"
                                title="Sửa mối quan hệ"><i class="fas fa-users-cog"></i></button>
                            <button class="btn btn-ghost btn-xs text-gold" @click.prevent="openEdit(person)"
                                title="Sử thông tin"> <i class="fas fa-pen"></i> </button>
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
    <AddPersonSilde v-model="showPanel" :person="selectedPerson" :branchs="branchStore.branches"
        :generations="generations" :families="familyStore.families" @save="handSave" @onDeleteImg="handDeleteImg"
        @changeFamily="handleChangeFamily">
    </AddPersonSilde>

    <ViewPersonSilde v-model="viewPanel" :person="viewPerson" :parentChild="parentChildStore.parentChild"
        :marriages="marriagesStore.marriagesList" :childList="childList" @edit-person="handEditPerson">
    </ViewPersonSilde>

    <EditPersonRelationship v-model="viewRelationshipPanel" :person="selectedRelationshipPerson" :personMen="personMen"
        :personWomen="personWomen" :parentChild="parentChildStore.parentChild" :marriages="marriagesStore.marriagesList"
        :personMarriages="personMarriages" @save="handSaveRelationship" @saveMarriage="handSaveMarriage"
        @deleteMarriage="handDeleteMarriage">
    </EditPersonRelationship>

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
import ViewPersonSilde from '@/components/SildePanel/Person/ViewPersonSilde.vue';
import AddPersonSilde from '@/components/SildePanel/Person/AddPersonSilde.vue';
import EditPersonRelationship from '@/components/SildePanel/Person/EditPersonRelationship.vue';

import { useFamilyStore } from '@/stores/family.store';
import { useBranchStore } from '@/stores/branch.store';
import { PERSON_TYPE_LABEL } from '@/constants/person-type-label';
import { useParentChildStore } from '@/stores/parent-child.store';
import { useMarriagesStore } from '@/stores/marriages.store';
import { PersonType } from '@/enum/person-type.enum';

const IMG_URL = import.meta.env.VITE_URL;

const { showToast } = useToast()
const { showConfirm } = useConfirm();
const personStore = usePersonStore();
const familyStore = useFamilyStore();
const branchStore = useBranchStore();
const parentChildStore = useParentChildStore();
const marriagesStore = useMarriagesStore();

const page = ref(1);
const limit = ref(20);// tổng số trang trên 1 bản ghi
const search = ref("");
const gender = ref("-1");
const generation = ref("0");
const is_alive = ref("-1");

const viewPanel = ref(false);
const viewPerson = ref(null);

const showPanel = ref(false);
const selectedPerson = ref(null);
const generations = ref([]);
const childList = ref([]);

const personMen = ref([]);
const personWomen = ref([]);


const viewRelationshipPanel = ref(false);
const selectedRelationshipPerson = ref(null);
const personMarriages = ref([]);

const loadBranchByFamily = async (family_id) => {
    await branchStore.getBranchByFamily(family_id);
};
const loadFamily = async () => {
    await familyStore.getAll();
};

const loadPersons = async () => {
    await personStore.searchPersons(page.value, limit.value, gender.value, generation.value, is_alive.value, search.value);
};

const getGeneration = async () => {
    await personStore.getGenerations();

    const list = [...personStore.generations];
    list.push(list.length > 0 ? Math.max(...list) + 1 : 1);
    generations.value = list;
};

onMounted(() => {
    loadPersons();

    getGeneration();
    loadFamily();

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
    const family_id = person.family_id;
    loadBranchByFamily(family_id).then(() => {
        selectedPerson.value = person;
        showPanel.value = true;
    });

};

const openRelationship = async (person) => {
    // lấy danh sách nam nữ để chọn làm bố mẹ có đời nhỏ hơn con cần sửa mối quan hệ
    personMen.value = await personStore.getPersonsByGender(1, person.generation - 1);
    personWomen.value = await personStore.getPersonsByGender(0, person.generation - 1);

    await parentChildStore.getByChildId(person.id); //lấy mối quan hệ cha mẹ con cái của người này
    await marriagesStore.getByPersonId(person.id, person.person_type); // lấy mối quan hệ vợ chồng của người này

    //console.log('marriages', marriagesStore.marriagesList);

    // lấy toàn bộ con dâu hoặc con rể có đời bằng đời person để chọn làm con nếu muốn sửa mối quan hệ
    personMarriages.value = await personStore.getMarriage(person.id);
    //console.log('parentChild', parentChildStore.parentChild);
    viewRelationshipPanel.value = true;
    selectedRelationshipPerson.value = person;
};

const handAddPerson = () => {
    selectedPerson.value = null;
    showPanel.value = true;
};

const openView = async (person) => {
    viewPanel.value = true;
    viewPerson.value = person;
    await parentChildStore.getByChildId(person.id);
    await marriagesStore.getByPersonId(person.id, person.person_type);
    childList.value = await parentChildStore.getAllChildrenByParent(person.id);
};

const handSave = async ({ form, imageFile, isEdit }) => {
    console.log('save person', form);
    if (isEdit) {
        try {
            await personStore.updatePerson(form.id, form, imageFile);

            showToast({ title: 'Cập nhật thành công', type: 'success' });
            await loadPersons();
        } catch (error) {
            showToast({ title: 'Đã có lỗi', sub: 'Lỗi :' + error, type: 'error' });
        }
    } else {
        try {
            await personStore.createPerson(form, imageFile);
            showToast({ title: 'Tạo thành công', type: 'success' });
            await loadPersons();
        } catch (error) {
            showToast({ title: 'Đã có lỗi', sub: 'Lỗi :' + error, type: 'error' });
        }
    }
};

const handEditPerson = (person) => {
    viewPanel.value = false;
    const family_id = person.family_id;
    loadBranchByFamily(family_id).then(() => {
        selectedPerson.value = person;
        showPanel.value = true;
    });
};

const handDeleteImg = async (personId) => {
    const ok = await showConfirm({ title: 'Xóa ảnh đại diện', desc: 'Bạn có chắc muốn Xóa ảnh đại diện của thành viên này không?', icon: '<i class="fas fa-image"></i>', btn: 'Xóa' })
    if (ok) {
        try {
            await personStore.deleteAvatar(personId);
            showToast({ title: 'Xóa ảnh đại diện thành công', type: 'success' });
        } catch (error) {
            showToast({ title: 'Đã có lỗi', sub: 'Lỗi :' + error, type: 'error' });
        }
    }
};

const handleChangeFamily = async (familyId) => {
    if (familyId) {
        branchStore.branches = [];
        await loadBranchByFamily(familyId);
    }

}

const handSaveRelationship = async (parent) => {
    // console.log('save relationship', parent);
    try {
        const payload = {
            father_id: parent.father_id,
            mother_id: parent.mother_id,
            child_id: parent.child_id,
            relationship_type: parent.relationship_type
        };
        if (parent.id) {
            if (!parent.father_id && !parent.mother_id) {
                // nếu không chọn bố mẹ nào thì xóa mối quan hệ
                await parentChildStore.remove(parent.id);
                showToast({ title: 'Xóa mối quan hệ thành công', type: 'success' });
                return;
            }
            await parentChildStore.update(parent.id, payload);
            showToast({ title: 'Cập nhật mối quan hệ thành công', type: 'success' });
        }
        else {
            await parentChildStore.create(payload);
            showToast({ title: 'Tạo mối quan hệ thành công', type: 'success' });
        }

    } catch (error) {
        showToast({ title: 'Đã có lỗi', sub: 'Lỗi :' + error, type: 'error' });
    }
}

const handSaveMarriage = async (marriage) => {

    try {
        const [person1_id, person2_id] =
            marriage.person_type === PersonType.SON || marriage.person_type === PersonType.DAUGHTER
                ? [marriage.person_id, marriage.spouse_id] : [marriage.spouse_id, marriage.person_id];

        const payload = {
            person1_id,
            person2_id,
            marriage_date: marriage.marriage_date,
            marriage_status: marriage.marriage_status,
            divorce_date: marriage.divorce_date,
            marriage_order: marriage.marriage_order,
            note: marriage.note
        };

        if (marriage.id) {
            if (!marriage.spouse_id) {
                // nếu không chọn vợ chồng nào thì xóa mối quan hệ
                await marriagesStore.remove(marriage.id);
                showToast({ title: 'Xóa mối quan hệ thành công', type: 'success' });
                return;
            }
            await marriagesStore.update(marriage.id, payload);
            showToast({ title: 'Cập nhật mối quan hệ thành công', type: 'success' });
        }
        else {
            await marriagesStore.create(payload);
            showToast({ title: 'Tạo mối quan hệ thành công', type: 'success' });
        }

    } catch (error) {
        showToast({ title: 'Đã có lỗi', sub: 'Lỗi :' + error, type: 'error' });
    }
}

const handDeleteMarriage = async (marriageId) => {
    const ok = await showConfirm({ title: 'Xóa mối quan hệ vợ chồng', desc: 'Bạn có chắc muốn Xóa mối quan hệ vợ chồng này không?', icon: '<i class="fas fa-ring"></i>', btn: 'Xóa' })
    if (ok) {
        try {
            await marriagesStore.remove(marriageId);
            showToast({ title: 'Xóa mối quan hệ thành công', type: 'success' });
        } catch (error) {
            showToast({ title: 'Đã có lỗi', sub: 'Lỗi :' + error, type: 'error' });
        }
    }
}

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