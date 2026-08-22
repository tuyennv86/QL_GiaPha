<template>
    <SlidePanel v-model="visible">
        <!-- HEADER -->
        <template #header>
            <div>
                <div class="sp-title">
                    {{ isEdit ? "Chỉnh Sửa Dòng Họ" : "Thêm Mới Dòng Họ" }}
                </div>
                <div class="sp-sub" v-if="isEdit">
                    {{ form.family_name }}
                </div>
            </div>
        </template>

        <!-- BODY -->
        <form @submit.prevent="handleSubmit">
            <div class="sp-body">
                <div class="form-row form-row-1" style="grid-template-columns: 1fr">
                    <div class="f-group">
                        <label class="f-label">Tên chức vụ <span class="f-req">*</span></label>
                        <input class="f-input" v-model="form.title_name" />
                        <small v-if="errors.title_name">{{ errors.title_name }}</small>
                    </div>

                    <div class="f-group">
                        <label class="f-label">Trạng thái<span class="f-req">*</span></label>
                        <input class="f-input" v-model="form.scope_level" type="number" />
                        <small v-if="errors.scope_level">{{ errors.scope_level }}</small>
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
                v-permission="['titles.edit', 'titles.create']">
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
    title: Object
});

const emit = defineEmits(["update:modelValue", "save"]);

const visible = computed({
    get: () => props.modelValue,
    set: (val) => emit("update:modelValue", val),
});

const isEdit = computed(() => !!props.title?.id);

const form = reactive({
    id: null,
    title_name: '',
    scope_level: 0,
    description: ''
});

const errors = reactive({});

/* RESET */
const resetForm = () => {
    Object.assign(form, {
        id: null,
        title_name: '',
        scope_level: 0,
        description: ''
    });

    Object.keys(errors).forEach((k) => delete errors[k]);
};

/* LOAD DATA */
watch(
    () => props.title,
    (val) => {
        if (val) {
            Object.assign(form, {
                id: val.id,
                title_name: val.title_name,
                scope_level: val.scope_level,
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

    if (!form.title_name) errors.title_name = "Tên chức vụ không được bỏ trống!";
    if (!form.description) errors.description = "Mô tả chức vụ không được bỏ trống!";
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