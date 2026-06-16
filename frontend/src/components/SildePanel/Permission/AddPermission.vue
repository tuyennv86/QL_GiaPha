<template>
    <SlidePanel v-model="visible">
        <!-- HEADER -->
        <template #header>
            <div>
                <div class="sp-title">
                    {{ isEdit ? "Chỉnh Sửa Thành Viên" : "Thêm Mới Thành Viên" }}
                </div>
                <div class="sp-sub" v-if="isEdit">
                    {{ form.permission_name }}
                </div>
            </div>
        </template>

        <!-- BODY -->
        <form @submit.prevent="handleSubmit">
            <div class="sp-body">
                <div class="form-row form-row-1" style="grid-template-columns: 1fr">
                    <div class="f-group">
                        <label class="f-label">Tên quyền <span class="f-req">*</span></label>
                        <input class="f-input" v-model="form.permission_name" />
                        <small v-if="errors.permission_name">{{ errors.permission_name }}</small>
                    </div>

                    <div class="f-group">
                        <label class="f-label">Mã quyền <span class="f-req">*</span></label>
                        <input class="f-input" v-model="form.permission_code" />
                        <small v-if="errors.permission_code">{{ errors.permission_code }}</small>
                    </div>

                    <div class="f-group">
                        <label class="f-label">Mô tả<span class="f-req">*</span></label>
                        <input class="f-input" v-model="form.description" />
                        <small v-if="errors.description">{{ errors.description }}</small>
                    </div>
                    <div class="f-group">
                        <label class="f-label">Kiểu</label>
                        <select class="f-select" v-model="form.scope">
                            <option :value="null">-- Không chọn --</option>
                            <option v-for="item in PERMISSION_SCOPE_OPTIONS" :key="item.value" :value="item.value">
                                {{ item.label }}
                            </option>
                        </select>
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
import { PERMISSION_SCOPE_OPTIONS } from "@/constants/permission-scope-option.js"


const props = defineProps({
    modelValue: Boolean,
    permission: Object,
});

const emit = defineEmits(["update:modelValue", "save"]);

const visible = computed({
    get: () => props.modelValue,
    set: (val) => emit("update:modelValue", val),
});

const isEdit = computed(() => !!props.permission?.id);

const form = reactive({
    id: null,
    permission_code: null,
    permission_name: null,
    description: null,
    scope: null
});


const errors = reactive({});

/* RESET */
const resetForm = () => {
    Object.assign(form, {
        id: null,
        permission_code: null,
        permission_name: null,
        description: null,
        scope: null
    });

    Object.keys(errors).forEach((k) => delete errors[k]);
};

/* LOAD DATA */
watch(
    () => props.permission,
    (val) => {
        if (val) {
            Object.assign(form, {
                id: val.id,
                permission_code: val.permission_code,
                permission_name: val.permission_name,
                description: val.description,
                scope: val.scope,
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

    if (!form.permission_name) errors.permission_name = "Tên quyền không được bỏ trống!";
    if (!form.permission_code) errors.permission_code = "Mã quyền không được bỏ trống!";
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
    close();
    resetForm();
};


const close = () => {
    visible.value = false;
};
</script>
