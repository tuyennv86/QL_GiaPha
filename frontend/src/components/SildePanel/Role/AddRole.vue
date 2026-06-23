<template>
    <SlidePanel v-model="visible">
        <!-- HEADER -->
        <template #header>
            <div>
                <div class="sp-title">
                    {{ isEdit ? "Chỉnh Sửa Thành Viên" : "Thêm Mới Thành Viên" }}
                </div>
                <div class="sp-sub" v-if="isEdit">
                    {{ form.role_name }}
                </div>
            </div>
        </template>

        <!-- BODY -->
        <form @submit.prevent="handleSubmit">
            <div class="sp-body">
                <div class="form-row form-row-1" style="grid-template-columns: 1fr">
                    <div class="f-group">
                        <label class="f-label">Vai trò <span class="f-req">*</span></label>
                        <input class="f-input" v-model="form.role_name" />
                        <small v-if="errors.permission_name">{{ errors.role_name }}</small>
                    </div>

                    <div class="f-group">
                        <label class="f-label">Mô tả<span class="f-req">*</span></label>
                        <input class="f-input" v-model="form.description" />
                        <small v-if="errors.description">{{ errors.description }}</small>
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
            <button type="button" class="btn btn-primary" @click="handleSubmit">
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
    role: Object
});

const emit = defineEmits(["update:modelValue", "save"]);

const visible = computed({
    get: () => props.modelValue,
    set: (val) => emit("update:modelValue", val),
});

const isEdit = computed(() => !!props.role?.id);

const form = reactive({
    id: null,
    role_name: null,
    description: null
});

const errors = reactive({});

/* RESET */
const resetForm = () => {
    Object.assign(form, {
        id: null,
        role_name: null,
        description: null
    });

    Object.keys(errors).forEach((k) => delete errors[k]);
};

/* LOAD DATA */
watch(
    () => props.role,
    (val) => {
        if (val) {
            Object.assign(form, {
                id: val.id,
                role_name: val.role_name,
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

    if (!form.role_name) errors.role_name = "Tên vai trò không được bỏ trống!";
    if (!form.description) errors.description = "Mô tả không được bỏ trống!";
    return Object.keys(errors).length === 0;
};

/* SUBMIT */
const handleSubmit = () => {
    if (!validate()) return;

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
