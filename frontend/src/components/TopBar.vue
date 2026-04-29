<template>
    <div class="topbar">
        <div class="topbar-path">Admin <span>/ Dashboard</span></div>
        <div class="topbar-spacer"></div>
        <div class="topbar-actions">
            <button class="tb-btn" title="Tìm kiếm">🔍</button>
            <button class="tb-btn" title="Thông báo">
                🔔
                <span class="tb-notif-dot"></span>
            </button>
            <button class="tb-btn" title="Xem trang chính">
                🌐
            </button>
            <div class="tb-user">
                <div class="tb-user-ava">{{ authStore.user?.full_name.split(' ')[0][0] }}
                    {{ authStore.user?.full_name.split(' ').slice(-1)[0][0] }}</div>
                <div class="tb-user-name">{{ authStore.user?.full_name }}</div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { useAuthStore } from '@/stores/auth.store';
const authStore = useAuthStore();
</script>