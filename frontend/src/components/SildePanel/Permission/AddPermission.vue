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
                        <label class="f-label">Module <span class="f-req">*</span></label>
                        <select class="f-select" v-model="form.module">
                            <option v-for="menu in menus" :key="menu.id" :value="menu.module_name">
                                {{ menu.menu_name }}
                            </option>
                        </select>
                        <small>{{ form.module }}</small>
                        <small v-if="errors.module">{{ errors.module }}</small>
                    </div>
                    <div class="f-group">
                        <label class="f-label">Quyền<span class="f-req">*</span></label>
                        <!-- lấy phần cuối sau dấu . -->
                        <select class="f-select" v-model="actionSelect">
                            <option value="view">Xem</option>
                            <option value="create">Thêm</option>
                            <option value="edit">Sửa</option>
                            <option value="delete">Xóa</option>
                            <option value="export">Export</option>
                            <option value="import">Import</option>
                            <option value="assign">Phân quyền</option>
                            <option value="approve">Duyệt</option>
                        </select>
                        <small>{{ form.permission_code }}</small>
                        <small v-if="errors.permission_code">{{ errors.permission_code }}</small>
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
            <button type="button" class="btn btn-primary" @click="handleSubmit"
                v-permission="['permission.create', 'permission.edit']">
                💾 {{ isEdit ? "Cập nhật" : "Thêm mới" }}
            </button>
        </template>
    </SlidePanel>
</template>

<script setup>
import { reactive, watch, computed, ref } from "vue";
import SlidePanel from "../SlidePanel.vue";


const props = defineProps({
    modelValue: Boolean,
    permission: Object,
    menus: Array
});
const actionSelect = ref("");

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
    module: null
});

watch(
    () => [form.module, actionSelect.value],
    ([newModule, newAction]) => {
        if (newModule && newAction) {
            form.permission_code = `${newModule}.${newAction}`;
        } else if (newAction) {
            form.permission_code = newAction; // Nếu chưa chọn module thì tạm thời lấy action
        } else {
            form.permission_code = null;
        }
    }
);


const errors = reactive({});

/* RESET */
const resetForm = () => {
    Object.assign(form, {
        id: null,
        permission_code: null,
        permission_name: null,
        description: null,
        module: null
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
                permission_code: val.module + '.' + val.permission_code.split('.').pop(),
                permission_name: val.permission_name,
                description: val.description,
                module: val.module,
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
    if (!form.module) errors.module = "Module không được bỏ trống!";
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
