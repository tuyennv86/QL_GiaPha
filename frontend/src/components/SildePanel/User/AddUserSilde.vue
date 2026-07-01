<template>
    <SlidePanel v-model="visible">
        <!-- HEADER -->
        <template #header>
            <div>
                <div class="sp-title">
                    {{ isEdit ? 'Chỉnh Sửa Tài Khoản' : 'Thêm Mới Tài Khoản' }}
                </div>
                <div class="sp-sub" v-if="isEdit">
                    {{ form.username }}
                </div>
            </div>
        </template>

        <!-- BODY -->
        <form @submit.prevent="handleSubmit">
            <div class="form">

                <div class="f-group">
                    <label>Họ Tên *</label>
                    <input v-model="form.full_name" class="f-input" />
                    <small v-if="errors.full_name">{{ errors.full_name }}</small>
                </div>

                <div class="f-group" v-if="!isEdit">
                    <label>UserName * </label>
                    <input v-model="form.username" class="f-input" />
                    <small v-if="errors.username">{{ errors.username }}</small>
                </div>

                <div class="f-group">
                    <label>Email * </label>
                    <input v-model="form.email" type="email" class="f-input" />
                    <small v-if="errors.email">{{ errors.email }}</small>
                </div>

                <div class="f-group">
                    <label>Điện thoại *</label>
                    <input v-model="form.phone" type="number" class="f-input" />
                    <small v-if="errors.phone">{{ errors.phone }}</small>
                </div>

                <div class="divider"></div>
                <div class="section-label">Dòng họ</div>

                <div class="f-group">
                    <select v-model="form.family_id" class="f-select">
                        <option :value="null">-- Chọn --</option>
                        <option v-for="f in families" :key="f.id" :value="f.id">
                            {{ f.family_name }}
                        </option>
                    </select>
                    <small v-if="errors.family_id">{{ errors.family_id }}</small>
                </div>

                <div class="divider"></div>
                <div class="section-label">Vai trò</div>

                <div class="f-group">
                    <MultiSelectDropdown v-model="form.role_ids" :options="roles" optionLabel="role_name"
                        optionValue="id" />
                </div>
                <div class="divider"></div>
                <div class="f-group">
                    <label>
                        <input v-model="form.is_active" type="checkbox" />
                        Hoạt động
                    </label>
                </div>
                <div class="divider"></div>
                <!-- PASSWORD -->
                <template v-if="!isEdit">
                    <div class="f-group">
                        <label>Mật khẩu *</label>
                        <input v-model="form.password" type="password" class="f-input" />
                        <small v-if="errors.password">{{ errors.password }}</small>
                    </div>

                    <div class="f-group">
                        <label>Xác nhận mật khẩu</label>
                        <input v-model="form.password2" type="password" class="f-input" />
                        <small v-if="errors.password2">{{ errors.password2 }}</small>
                    </div>
                </template>

            </div>
        </form>

        <!-- FOOTER -->
        <template #footer>
            <button type="button" class="btn btn-ghost" @click="close">Hủy</button>
            <button type="button" class="btn btn-primary" @click="handleSubmit"
                v-permission="['user.edit', 'user.create']">
                💾 {{ isEdit ? 'Cập nhật' : 'Thêm mới' }}
            </button>
        </template>
    </SlidePanel>
</template>

<script setup>
import { reactive, watch, computed } from 'vue'
import SlidePanel from '../SlidePanel.vue'
import MultiSelectDropdown from '@/components/MultiSelectDropdown.vue'

const props = defineProps({
    modelValue: Boolean,
    user: Object,
    roles: Array,
    families: Array
})

const emit = defineEmits(['update:modelValue', 'save'])

const visible = computed({
    get: () => props.modelValue,
    set: (val) => emit('update:modelValue', val)
})

const isEdit = computed(() => !!props.user?.id)

const form = reactive({
    id: null,
    username: '',
    full_name: '',
    email: '',
    password: '',
    password2: '',
    phone: '',
    family_id: null,
    is_active: false,
    role_ids: []
})

const errors = reactive({})

/* RESET */
const resetForm = () => {
    Object.assign(form, {
        id: null,
        username: '',
        full_name: '',
        email: '',
        password: '',
        password2: '',
        phone: '',
        family_id: null,
        is_active: false,
        role_ids: []
    })
    Object.keys(errors).forEach(k => delete errors[k])
}

/* LOAD DATA */
watch(
    () => props.user,
    (val) => {
        if (val) {
            Object.assign(form, {
                id: val.id,
                username: val.username,
                full_name: val.full_name,
                email: val.email,
                phone: val.phone,
                family_id: val.family_id || null,
                is_active: val.is_active,
                role_ids: val.user_roles ? val.user_roles.map(r => r.role_id) : []
            })
        } else {
            resetForm()
        }
    },
    { immediate: true }
)

/* RESET khi đóng panel */
watch(
    () => visible.value,
    (val) => {
        if (!val) resetForm()
    }
)

/* VALIDATE */
const validate = () => {
    Object.keys(errors).forEach(k => delete errors[k])

    if (!form.full_name) errors.full_name = 'Họ tên không để trống!'
    if (!form.email) errors.email = 'Email không để trống!'
    if (!form.phone) errors.phone = 'Điện thoại không để trống!'

    if (!isEdit.value) {
        if (!form.username) errors.username = 'UserName không để trống!'

        if (!form.password || form.password.length < 8) {
            errors.password = 'Mật khẩu tối thiểu 8 ký tự'
        }
        if (form.password !== form.password2) {
            errors.password2 = 'Hai mật khẩu không trùng nhau'
        }
    }

    return Object.keys(errors).length === 0
}

/* SUBMIT */
const handleSubmit = () => {
    if (!validate()) return

    emit("save", {
        form: { ...form },
        isEdit: isEdit.value
    });
    if (isEdit.value) {
        close();
    }
    resetForm();
}

const close = () => {
    visible.value = false;
}
</script>