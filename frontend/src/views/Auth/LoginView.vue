<template>
    <div class="login-badge">🔐 Cổng Quản Trị</div>
    <div class="login-title">Đăng Nhập Admin</div>
    <div class="login-sub">Chỉ dành cho quản trị viên hệ thống</div>

    <div class="login-error" v-if="authStore.loginError">⚠️ {{ authStore.loginError }}</div>
    <Form v-slot="{ isSubmitting }" :initial-values="{
        username: '',
        password: ''
    }" :validation-schema="validationSchema" @submit="handleLogin" class="form-login">
        <div class="login-field">
            <label class="login-label" name="username">Tên Đăng Nhập</label>
            <Field class="login-input" type="text" placeholder="Nhập tên đăng nhập" name="username" />
            <ErrorMessage name="username" />
        </div>
        <div class="login-field">
            <label class="login-label" name="password">Mật Khẩu</label>
            <Field class="login-input" type="password" placeholder="Nhập mật khẩu" name="password" />
            <ErrorMessage name="password" />
        </div>
        <button :disabled="isSubmitting" class="login-btn">
            {{ isSubmitting ? 'Đang đăng nhập...' : '→ Đăng Nhập Hệ Thống' }}
        </button>
    </Form>
</template>
<script setup>
import { useAuthStore } from '@/stores/auth.store';
import { useRouter } from 'vue-router'
import { Field, Form, ErrorMessage } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as zod from 'zod';

const validationSchema = toTypedSchema(
    zod.object({
        username: zod
            .string()
            .min(1, { message: 'Tên đăng nhập không được để trống!' })
            .min(5, { message: 'Tên đăng nhập tối thiếu 5 ký tự!' }),
        password: zod
            .string()
            .min(1, { message: 'Mật khẩu không được để trống!' })
            .min(6, { message: 'Mật khẩu tối thiểu phải 6 ký tự!' }),
    })
);

// import { ref } from 'vue';
const router = useRouter();

const authStore = useAuthStore();
// const credentials = ref({
//     username: '',
//     password: '',
// });

const handleLogin = async (values) => {
    try {
        authStore.loginError = null;
        await authStore.login(values);
        router.push('/admin/dashboard')
    } catch (error) {
        authStore.loginError = error.message;
    }
};

</script>