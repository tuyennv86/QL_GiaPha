<template>
    <SlidePanel v-model="visible">
        <!-- HEADER -->
        <template #header>
            <div>
                <div class="sp-title" v-if="user">
                    Thông tin tài khoản : {{ user.username }}
                </div>
            </div>
        </template>

        <!-- BODY -->
        <form>
            <div class="form" v-if="user">
                <div class="f-group">Họ tên : {{ user.full_name }}</div>
                <div class="divider"></div>

                <div class="f-group">Email : {{ user.email }}</div>
                <div class="divider"></div>

                <div class="f-group">Điện thoại : {{ user.phone }}</div>
                <div class="divider"></div>

                <div class="f-group" v-if="user.family">
                    Dòng họ : {{ user.family.family_name }}
                </div>
                <div class="divider"></div>

                <div class="section-label">Vai trò :</div>

                <div class="f-group" v-if="user.roles">
                    <label v-for="item in user.roles" :key="item.id">{{ item.role_name }}</label>
                </div>
                <div class="divider"></div>

                <div class="f-group">
                    <div class="flex-center gap-6" v-if="user.is_active">
                        <div class="status-dot sd-green"></div><span class="text-sm text-green">Hoạt
                            động</span>
                    </div>
                    <div class="flex-center gap-6" v-else>
                        <div class="status-dot sd-red"></div><span class="text-sm text-red">Đình
                            chỉ</span>
                    </div>
                </div>
                <div class="divider"></div>

                <div class="f-group">Ngày tạo : {{ formatDateTime(user.created_at) }}</div>
                <div class="divider"></div>
                <div class="f-group">Đăng nhập cuối : {{ formatDateTime(user.last_login) }}</div>
            </div>
        </form>

        <!-- FOOTER -->
        <template #footer>
            <button type="button" class="btn btn-ghost" @click="close">Đóng</button>
        </template>
    </SlidePanel>
</template>

<script setup>
import { computed } from 'vue';
import SlidePanel from './SlidePanel.vue';
import { formatDateTime } from '@/utils/formatDate';

const props = defineProps({
    modelValue: Boolean,
    user: {
        type: Object,
        default: () => ({})
    }
})

const emit = defineEmits(['update:modelValue', 'save'])

const visible = computed({
    get: () => props.modelValue,
    set: (val) => emit('update:modelValue', val)
})


const close = () => {
    visible.value = false
}

</script>