<template>
    <SlidePanel v-model="visible">
        <!-- HEADER -->
        <template #header>
            <div>
                <div class="sp-title">
                    Cập nhập chức vụ
                </div>
                <div class="sp-sub">
                    {{ person?.full_name }}
                </div>
            </div>
        </template>
        <!-- DANH SÁCH CHỨC VỤ -->
        <div class="sp-body">
            <div class="title-list">
                <div class="section-title">
                    Danh sách chức vụ
                    <span class="count">({{ person?.personTitles?.length || 0 }})</span>
                </div>

                <div v-if="person?.personTitles?.length" class="title-items">
                    <div v-for="title in person.personTitles" :key="title.id" class="title-item">
                        <div class="title-info">
                            <div class="title-name">
                                {{ title.title_name }}
                                <i class="fa-solid fa-crown"
                                    :class="title.is_active ? 'text-gold' : 'text-secondary'"></i>
                            </div>

                            <div class="title-date">
                                {{ formatDate(title.start_date) || '---' }}
                                --
                                {{ formatDate(title.end_date) || '---' }}
                            </div>
                        </div>

                        <div class="title-actions">
                            <button type="button" class="btn-icon edit" @click="editTitle(title)">
                                <i class="fa-solid fa-pen"></i>
                            </button>

                            <button type="button" class="btn-icon delete" @click="deleteTitle(title.id)">
                                <i class="fa-solid fa-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>

                <div v-else class="empty-list">
                    Chưa có chức vụ nào.
                </div>
            </div>
        </div>

        <div class="divider"></div>
        <!-- BODY -->
        <form @submit.prevent="handleSubmit">
            <div class="sp-body">
                <div class="form-row form-row-1" style="grid-template-columns: 1fr">
                    <div class="f-group">
                        <label class="f-label">Chức vụ <span class="f-req">*</span></label>
                        <select class="f-select" v-model="form.title_id">
                            <option v-for="title in titles" :key="title.id" :value="title.id">
                                {{ title.title_name }}
                            </option>
                        </select>
                        <small v-if="errors.title_id">{{ errors.title_id }}</small>

                    </div>
                    <div class="f-group">
                        <label class="f-label">Chi nhánh </label>
                        <select class="f-select" v-model="form.branch_id">
                            <option :value="null">-- Không chọn --</option>
                            <option v-for="ban in branchs" :key="ban.id" :value="ban.id">
                                {{ ban.branch_name }}
                            </option>
                        </select>

                    </div>
                    <div class="f-group">
                        <label class="f-label">Từ ngày <span class="f-req">*</span></label>
                        <VueDatePicker v-model="form.start_date" :year-range="[0, 9999]" dark teleport="body"
                            :formats="{ input: 'dd/MM/yyyy' }" :locale="vi" />
                        <small v-if="errors.start_date">{{ errors.start_date }}</small>
                    </div>
                    <div class="f-group">
                        <label class="f-label">Đến ngày</label>
                        <VueDatePicker v-model="form.end_date" :year-range="[0, 9999]" dark teleport="body"
                            :formats="{ input: 'dd/MM/yyyy' }" :locale="vi" />
                    </div>

                    <div class="f-group">
                        <label class="f-label"> {{ form.is_active ? 'Đương chức' : 'Thôi chức' }}</label>
                        <ToggleSwitch v-model="form.is_active"></ToggleSwitch>
                    </div>

                </div>
                <div class="form-row form-row-1">
                    <br />
                </div>
            </div>
        </form>

        <!-- FOOTER -->
        <template #footer>
            <button type="button" class="btn btn-ghost" @click="close">Hủy</button>
            <button type="button" class="btn btn-primary" @click="handleSubmit"
                v-permission="['titles.edit', 'titles.create']">
                💾 {{ form.id ? "Cập nhật" : "Thêm mới" }}
            </button>
        </template>
    </SlidePanel>
</template>
<script setup>
import { reactive, watch, computed } from "vue";
import SlidePanel from "../SlidePanel.vue";
import ToggleSwitch from "@/components/common/ToggleSwitch.vue";
import { VueDatePicker } from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { vi } from "date-fns/locale";
import { formatDate } from "@/utils/formatDate.js";

const props = defineProps({
    modelValue: Boolean,
    person: Object,
    titles: Array,
    branchs: Array

});

const emit = defineEmits(["update:modelValue", "save", "deleteTitle"]);

const visible = computed({
    get: () => props.modelValue,
    set: (val) => emit("update:modelValue", val),
});


const form = reactive({
    id: null,
    title_id: null,
    person_id: null,
    title_name: '',
    branch_id: null,
    start_date: null,
    end_date: null,
    is_active: false
});

const errors = reactive({});

/* RESET */
const resetForm = () => {
    Object.assign(form, {
        id: null,
        title_id: null,
        person_id: null,
        title_name: '',
        branch_id: null,
        start_date: null,
        end_date: null,
        is_active: false
    });

    Object.keys(errors).forEach((k) => delete errors[k]);
};



/* RESET khi đóng panel */
watch(() => visible.value,
    (val) => {
        if (!val) resetForm();
    }
);

/* VALIDATE */
const validate = () => {
    Object.keys(errors).forEach((k) => delete errors[k]);

    if (!form.start_date) errors.start_date = "Ngày bắt đầu không được bỏ trống!";
    if (!form.title_id) errors.title_id = "Hãy chọn chức vụ!";
    return Object.keys(errors).length === 0;
};

const editTitle = (title) => {
    resetForm();
    Object.assign(form, {
        id: title.id,
        title_id: title.title_id,
        title_name: title.title_name,
        branch_id: title.branch_id,
        start_date: title.start_date,
        end_date: title.end_date,
        is_active: title.is_active
    });
};

/* SUBMIT */
const handleSubmit = () => {
    if (!validate()) return;
    const id = form.id;

    const payload = {
        title_id: form.title_id,
        person_id: props.person.id,
        branch_id: form.branch_id,
        start_date: form.start_date,
        end_date: form.end_date,
        is_active: form.is_active
    };
    emit("save", {
        form: { ...payload }, id
    });
    resetForm();
};

const deleteTitle = (titleId) => {
    emit("deleteTitle", titleId);
};

const close = () => {
    visible.value = false;
};
</script>
<style scoped>
.section-title {
    font-size: 15px;
    font-weight: 600;
    color: #fff;
    margin-bottom: 12px;
}

.count {
    color: #999;
    font-weight: normal;
}

.title-items {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 18px;
}

.title-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #232323;
    border: 1px solid #363636;
    border-radius: 10px;
    padding: 12px;
    transition: .2s;
}

.title-item:hover {
    border-color: #caa84b;
    background: #2b2b2b;
}

.title-info {
    flex: 1;
    min-width: 0;
}

.title-name {
    color: #fff;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 6px;
}

.text-gold {
    color: #d4af37;
}

.title-date {
    margin-top: 4px;
    font-size: 13px;
    color: #aaa;
}

.title-actions {
    display: flex;
    gap: 8px;
}

.btn-icon {
    width: 34px;
    height: 34px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    background: #343434;
    color: #ddd;
    transition: .2s;
}

.btn-icon:hover {
    transform: translateY(-1px);
}

.btn-icon.edit:hover {
    background: #caa84b;
    color: #111;
}

.btn-icon.delete:hover {
    background: #c0392b;
    color: #fff;
}

.empty-list {
    text-align: center;
    color: #888;
    padding: 18px;
    border: 1px dashed #444;
    border-radius: 10px;
}

.divider {
    height: 1px;
    background: #333;
    margin: 8px 0 18px;
}

:deep(.dp__menu) {
    z-index: 99999 !important;
}
</style>