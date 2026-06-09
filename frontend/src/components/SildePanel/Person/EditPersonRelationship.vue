<template>
    <SlidePanel v-model="visible">
        <!-- HEADER -->
        <template #header>
            <div>
                <div class="sp-title">
                    {{ person?.full_name }} - <span class="badge" :class="'gen-' + person?.generation">Đời {{
                        person?.generation
                    }}</span>
                </div>
                <div class="sp-sub">
                    Cập nhật các mối quan hệ
                </div>
            </div>
        </template>

        <!-- BODY -->

        <div class="sp-body">
            <template v-if="person?.person_type === PersonType.SON || person?.person_type === PersonType.DAUGHTER">
                <form @submit.prevent="handleSubmit">
                    <!-- nếu là con dâu hoặc con dể thì không cần chọn bố mẹ -->

                    <div class="form-row form-row-2">
                        <div class="f-group">
                            <label class="f-label">Bố</label>
                            <SearchSelect v-model="form.father_id" :options="personMen" label-field="full_name"
                                value-field="id" placeholder="Chọn bố" @change="onChangeMen" />
                            <div class="sp-sub" v-if="parentChild">{{ parentChild.father_name }}</div>
                        </div>
                        <div class="f-group">
                            <label class="f-label">Mẹ</label>
                            <SearchSelect v-model="form.mother_id" :options="personWomen" label-field="full_name"
                                value-field="id" placeholder="Chọn mẹ" @change="onChangeWomen" />
                            <div class="sp-sub" v-if="parentChild">{{ parentChild.mother_name }}</div>
                        </div>
                    </div>
                    <div class="form-row form-row-1">
                        <div class="f-group">

                            <label class="f-label"> {{ form.relationship_type === 0 ? 'Con đẻ' : 'Con nuôi' }}</label>
                            <ToggleSwitchNumber v-model="form.relationship_type"></ToggleSwitchNumber>
                        </div>
                    </div>
                    <div class="form-row form-row-1">
                        <button type="submit" class="btn btn-primary">
                            💾 Cập nhật
                        </button>
                    </div>
                </form>
                <div class="divider"></div>
            </template>
            <!-- cập nhật thông tin vợ chồng -->
            <div class="form-row form-row-1">
                <div class="section-label">{{ person?.gender === 1 ? 'Vợ' : 'Chồng' }}</div>
            </div>
            <div class="form-row form-row-1">
                <div class="marriage-list">
                    <div v-for="marriage in marriages" :key="marriage.id" class="marriage-card">
                        <div class="marriage-card__header">
                            <div>
                                <div class="marriage-card__name">
                                    {{
                                        person?.person_type === PersonType.SON || person?.person_type ===
                                            PersonType.DAUGHTER
                                            ? marriage.person2_name : marriage.person1_name
                                    }}
                                </div>

                                <div class="marriage-card__meta">
                                    💍 Ngày cưới: {{ formatDate(marriage.marriage_date) }}
                                </div>
                            </div>

                            <span class="marriage-status" :class="{
                                active: marriage.marriage_status === 0,
                                divorce: marriage.marriage_status === 1,
                                deceased: marriage.marriage_status === 2
                            }">
                                {{
                                    marriage.marriage_status === 0 ? 'Đang hôn nhân' : marriage.marriage_status === 1 ?
                                        'Ly hôn' : 'Đã mất'
                                }}
                            </span>
                        </div>

                        <div v-if="marriage.marriage_status !== 0" class="marriage-card__event">
                            {{
                                marriage.marriage_status === 1 ? `Ly hôn: ${formatDate(marriage.divorce_date)}`
                                    : `${person?.gender === 1 ? 'Vợ' : 'Chồng'} mất: ${formatDate(marriage.divorce_date)}`
                            }}
                        </div>

                        <div v-if="marriage.note" class="marriage-card__note">
                            {{ marriage.note }}
                        </div>

                        <div class="marriage-card__actions">
                            <button class="btn btn-ghost btn-xs text-gold" @click="editMarriage(marriage)">
                                <i class="fas fa-pen"></i> Sửa
                            </button>

                            <button class="btn btn-danger btn-xs" @click="deleteMarriage(marriage.id)">
                                <i class="fas fa-trash"></i> Xóa
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="divider"></div>

            <div class="section-label">
                {{ marriageForm.id ? 'Chỉnh sửa hôn nhân' : 'Thêm hôn nhân mới' }}
            </div>
            <form @submit.prevent="saveMarriage">

                <div class="marriage-editor">

                    <div class="form-row form-row-1">
                        <div class="f-group">
                            <label class="f-label">
                                {{ person?.gender === 1 ? 'Vợ' : 'Chồng' }}
                            </label>

                            <SearchSelect v-model="marriageForm.spouse_id" :options="personMarriages"
                                label-field="full_name" value-field="id"
                                :placeholder="person?.gender === 1 ? 'Chọn vợ' : 'Chọn chồng'" />
                            <small v-if="errors.spouse_id">{{ errors.spouse_id }}</small>
                        </div>
                    </div>

                    <div class="form-row form-row-2">
                        <div class="f-group">
                            <label class="f-label">Ngày cưới</label>
                            <VueDatePicker v-model="marriageForm.marriage_date" :year-range="[0, 9999]" dark
                                :formats="{ input: 'dd/MM/yyyy' }" :locale="vi" />
                            <small v-if="errors.marriage_date">{{ errors.marriage_date }}</small>
                        </div>

                        <div class="f-group">
                            <label class="f-label">Trạng thái</label>

                            <select v-model="marriageForm.marriage_status" class="f-select">
                                <option :value="0">Đang hôn nhân</option>
                                <option :value="1">Ly hôn</option>
                                <option :value="2">Vợ/Chồng mất</option>
                            </select>
                        </div>
                    </div>

                    <div v-if="marriageForm.marriage_status !== 0" class="form-row form-row-1">
                        <div class="f-group">
                            <label class="f-label">
                                {{
                                    marriageForm.marriage_status === 1 ? 'Ngày ly hôn' : 'Ngày mất'
                                }}
                            </label>
                            <VueDatePicker v-model="marriageForm.divorce_date" :year-range="[0, 9999]" dark
                                :formats="{ input: 'dd/MM/yyyy' }" :locale="vi" />
                            <small v-if="errors.divorce_date">{{ errors.divorce_date }}</small>
                        </div>
                    </div>

                    <div class="form-row form-row-1">
                        <div class="f-group">
                            <label class="f-label">Ghi chú</label>

                            <textarea v-model="marriageForm.note" rows="3" class="f-textarea" />
                        </div>
                    </div>

                    <div class="marriage-editor-actions">
                        <button class="btn btn-secondary" @click="resetMarriageForm" type="button">
                            Làm mới
                        </button>

                        <button class="btn btn-primary" type="submit">
                            💾 Lưu hôn nhân
                        </button>
                    </div>
                </div>
            </form>

        </div>


        <!-- FOOTER -->
        <template #footer>
            <button type="button" class="btn btn-ghost" @click="close">Đóng</button>

        </template>
    </SlidePanel>
</template>
<script setup>
import { computed, reactive, watch } from "vue";
import SlidePanel from "../SlidePanel.vue";
import SearchSelect from "@/components/common/SearchSelect.vue";
import ToggleSwitchNumber from "@/components/common/ToggleSwitchNumber.vue";
import { VueDatePicker } from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { vi } from "date-fns/locale";
import { PersonType } from "@/enum/person-type.enum.js"
import { formatDate } from "@/utils/formatDate.js";

const props = defineProps({
    modelValue: Boolean,
    person: Object,
    personMen: Array,
    personWomen: Array,
    parentChild: Object, // thông tin quan hệ cha mẹ con, nếu có thì sẽ hiển thị ở phần cập nhật cha mẹ con
    marriages: Array, // danh sách các hôn nhân của người này
    personMarriages: Array // danh sách những người có thể làm vợ/chồng của người này (cùng thế hệ, khác giới, khác loại)
});

const marriageForm = reactive({
    id: null,
    person_type: null,
    person_id: null,
    spouse_id: null,
    marriage_date: null,
    marriage_status: 0,
    divorce_date: null,
    note: ""
});

const resetMarriageForm = () => {
    marriageForm.id = null;
    marriageForm.person_type = null;
    marriageForm.person_id = null;
    marriageForm.spouse_id = null;
    marriageForm.marriage_date = null;
    marriageForm.marriage_status = 0;
    marriageForm.divorce_date = null;
    marriageForm.note = "";
};

const editMarriage = (marriage) => {
    resetMarriageForm();
    // console.log("editMarriage", marriage);    
    const spouseId = marriage.person1_id === props.person.id ? marriage.person2_id : marriage.person1_id;
    Object.assign(marriageForm, {
        id: marriage.id,
        person_type: props.person.person_type,
        person_id: props.person.id,
        spouse_id: spouseId,
        marriage_date: marriage.marriage_date,
        marriage_status: marriage.marriage_status,
        divorce_date: marriage.divorce_date,
        marriage_order: 1, // tạm thời để 1, sau này có thể thêm trường order để phân biệt vợ chồng thứ nhất, thứ hai...
        note: marriage.note
    });
    //console.log("marriageForm", marriageForm);
};


const form = reactive({
    id: null,
    father_id: null,
    mother_id: null,
    child_id: null,
    relationship_type: 0
});

const resetForm = () => {
    form.id = null;
    form.father_id = null;
    form.mother_id = null;
    form.child_id = null;
    form.relationship_type = 0;
};

watch(
    () => props.parentChild,
    (val) => {
        if (val) {
            Object.assign(form, {
                id: val.id,
                father_id: val.father_id,
                mother_id: val.mother_id,
                child_id: val.child_id,
                relationship_type: val.relationship_type
            });
        } else {
            resetForm();
        }
    },
    { immediate: true }
);

const emit = defineEmits(["update:modelValue", "save", "saveMarriage", "deleteMarriage"]);

const visible = computed({
    get: () => props.modelValue,
    set: (val) => emit("update:modelValue", val),
});

const onChangeMen = (val) => {
    form.father_id = val ? val.id : null;
};

const onChangeWomen = (val) => {
    form.mother_id = val ? val.id : null;
};


/* SUBMIT */
const handleSubmit = () => {
    form.child_id = props.person.id;
    emit("save", { ...form });
    //close();

};
const errors = reactive({});
const validate = () => {
    Object.keys(errors).forEach((k) => delete errors[k]);

    if (!marriageForm.spouse_id) errors.spouse_id = "Bạn phải chọn 1 người!";
    if (!marriageForm.marriage_date) errors.marriage_date = "Ngày cưới không được để trống!";
    if (form.marriage_date && form.divorce_date && new Date(form.divorce_date) < new Date(form.marriage_date)) {
        errors.marriage_date = "Ngày cưới phải nhỏ hơn ngày ly hôn/ngày mất!";
        errors.divorce_date = "Ngày ly hôn/ngày mất phải lớn hơn ngày cưới!";
    }
    if (marriageForm.marriage_status !== 0 && !marriageForm.divorce_date) {
        errors.divorce_date = "Bạn phải chọn ngày ly hôn/ngày mất!";
    }
    return Object.keys(errors).length === 0;
};

const saveMarriage = () => {
    if (!validate()) return;
    marriageForm.person_id = props.person.id;
    marriageForm.person_type = props.person.person_type;
    emit("saveMarriage", { ...marriageForm });
    resetMarriageForm();
    //close();
};

const deleteMarriage = (marriageId) => {
    // if (confirm("Bạn có chắc chắn muốn xóa hôn nhân này?")) {
    emit("deleteMarriage", marriageId);
    resetMarriageForm();
    // }
};

const close = () => {
    resetForm();
    resetMarriageForm();
    visible.value = false;
};
</script>

<style scoped>
.marriage-list {
    display: flex;
    flex-direction: column;
    gap: 14px;
}

.marriage-card {
    background: #1f1f1f;
    border: 1px solid var(--border);
    border-left: 2px solid var(--gold);
    padding: 14px;
    transition: all .2s;
}

.marriage-card:hover {
    border-color: var(--gold);
    background: #252525;
}

.marriage-card__header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 12px;
}

.marriage-card__name {
    color: var(--text-primary);
    font-weight: 600;
    font-size: 15px;
}

.marriage-card__meta {
    margin-top: 4px;
    color: var(--text-secondary);
    font-size: 12px;
}

.marriage-card__event {
    margin-top: 8px;
    color: #ff8389;
    font-size: 12px;
}

.marriage-card__note {
    margin-top: 10px;
    padding: 10px;
    background: rgba(201, 168, 76, .08);
    border-left: 2px solid var(--gold);
    color: var(--text-secondary);
    font-size: 12px;
}

.marriage-card__actions {
    margin-top: 12px;
    display: flex;
    justify-content: flex-end;
    gap: 8px;
}

.marriage-status {
    padding: 4px 10px;
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
}

.marriage-status.active {
    background: rgba(66, 190, 101, .15);
    color: var(--green);
}

.marriage-status.divorce {
    background: rgba(218, 30, 40, .15);
    color: #ff8389;
}

.marriage-status.deceased {
    background: rgba(141, 141, 141, .15);
    color: #bdbdbd;
}

.marriage-editor {
    background: #1c1c1c;
    border: 1px solid var(--border);
    padding: 16px;
}

.marriage-editor-actions {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 12px;
}
</style>