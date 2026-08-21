<template>
    <SlidePanel v-model="visible">
        <!-- HEADER -->
        <template #header>
            <div>
                <div class="sp-title">
                    {{ isEdit ? "Chỉnh Sửa Chi / Nhánh" : "Thêm Mới Chi / Nhánh" }}
                </div>
                <div class="sp-sub">
                    {{ family?.family_name }}
                </div>
            </div>
        </template>

        <!-- BODY -->
        <form @submit.prevent="handleSubmit">
            <div class="sp-body">
                <div class="form-row form-row-1" style="grid-template-columns: 1fr">
                    <div class="f-group">
                        <label class="f-label">Tên chi họ <span class="f-req">*</span></label>
                        <input class="f-input" v-model="form.branch_name" />
                        <small v-if="errors.branch_name">{{ errors.branch_name }}</small>
                    </div>
                    <div class="f-group">
                        <label class="f-label">Thứ tự <span class="f-req">*</span></label>
                        <input class="f-input" v-model="form.branch_order" type="number" />
                        <small v-if="errors.branch_order">{{ errors.branch_order }}</small>
                    </div>

                    <div class="f-group">
                        <label class="f-label">Mô tả</label>
                        <textarea v-model="form.description" rows="3" class="f-textarea" />
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
                v-permission="['family.edit', 'family.create']">
                💾 {{ isEdit ? "Cập nhật" : "Thêm mới" }}
            </button>
        </template>
    </SlidePanel>
</template>
<script setup>
import { reactive, watch, computed } from "vue";
import SlidePanel from "../SlidePanel.vue";


const props = defineProps({
    modelValue: Boolean,
    family: Object,
    branch: Object
});

const emit = defineEmits(["update:modelValue", "save"]);

const visible = computed({
    get: () => props.modelValue,
    set: (val) => emit("update:modelValue", val),
});

const isEdit = computed(() => !!props.branch?.id);

const form = reactive({
    id: null,
    family_id: null,
    branch_name: '',
    branch_order: 0,
    description: ''
});

const errors = reactive({});

/* RESET */
const resetForm = () => {
    Object.assign(form, {
        id: null,
        family_id: null,
        branch_name: '',
        branch_order: 0,
        description: ''
    });

    Object.keys(errors).forEach((k) => delete errors[k]);
};

/* LOAD DATA */
watch(
    () => props.branch,
    (val) => {
        if (val) {
            Object.assign(form, {
                id: val.id,
                branch_name: val.branch_name,
                branch_order: val.branch_order,
                description: val.description
            });
        } else {
            resetForm();
        }
    },
    { immediate: true }
);

/* RESET khi đóng panel */
watch(() => visible.value,
    (val) => {
        if (!val) resetForm();
    }
);

/* VALIDATE */
const validate = () => {
    Object.keys(errors).forEach((k) => delete errors[k]);
    if (!form.branch_name) errors.branch_name = "Tên chi họ không được bỏ trống!";

    if (form.branch_order === "" || form.branch_order === null || form.branch_order === undefined) {
        errors.branch_order = "Thứ tự không được bỏ trống!";
    } else if (Number.isNaN(Number(form.branch_order))) {
        errors.branch_order = "Thứ tự phải là số!";
    }
    return Object.keys(errors).length === 0;
};

/* SUBMIT */
const handleSubmit = () => {
    if (!validate()) return;
    if (!form.family_id) form.family_id = props.family?.id;
    emit("save", {
        form: { ...form },
        isEdit: isEdit.value
    });
    if (isEdit.value) {
        close();
    }
    resetForm();
};


const close = () => {
    visible.value = false;
};
</script>