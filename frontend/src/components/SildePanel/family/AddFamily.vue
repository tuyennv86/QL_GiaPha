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
                        <label class="f-label">Tên dòng họ <span class="f-req">*</span></label>
                        <input class="f-input" v-model="form.family_name" />
                        <small v-if="errors.family_name">{{ errors.family_name }}</small>
                    </div>

                    <div class="f-group">
                        <label class="f-label">Người sáng lập<span class="f-req">*</span></label>
                        <input class="f-input" v-model="form.ancestor_name" />
                        <small v-if="errors.ancestor_name">{{ errors.ancestor_name }}</small>
                    </div>

                    <div class="f-group">
                        <label class="f-label">Địa chỉ<span class="f-req">*</span></label>
                        <input class="f-input" v-model="form.origin_location" />
                        <small v-if="errors.origin_location">{{ errors.origin_location }}</small>
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
    family: Object
});

const emit = defineEmits(["update:modelValue", "save"]);

const visible = computed({
    get: () => props.modelValue,
    set: (val) => emit("update:modelValue", val),
});

const isEdit = computed(() => !!props.family?.id);

const form = reactive({
    id: null,
    family_name: '',
    ancestor_name: '',
    origin_location: '',
    description: ''
});

const errors = reactive({});

/* RESET */
const resetForm = () => {
    Object.assign(form, {
        id: null,
        family_name: '',
        ancestor_name: '',
        origin_location: '',
        description: ''
    });

    Object.keys(errors).forEach((k) => delete errors[k]);
};

/* LOAD DATA */
watch(
    () => props.family,
    (val) => {
        if (val) {
            Object.assign(form, {
                id: val.id,
                family_name: val.family_name,
                ancestor_name: val.ancestor_name,
                origin_location: val.origin_location,
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

    if (!form.family_name) errors.family_name = "Tên dòng họ không được bỏ trống!";
    if (!form.ancestor_name) errors.ancestor_name = "Người sáng lập không được bỏ trống!";
    if (!form.origin_location) errors.origin_location = "Địa chỉ không được bỏ trống!";
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