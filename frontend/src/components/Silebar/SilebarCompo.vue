<template>
    <aside class="sidebar">
        <div class="sidebar-brand">
            <div class="brand-row">
                <div class="brand-icon-box">🏛️</div>
                <div>
                    <div class="brand-name">Gia Phả<br />Admin</div>
                </div>
            </div>
            <div><span class="brand-role">SUPER ADMIN</span></div>
        </div>

        <!-- MENU -->
        <template v-for="group in menuStore.menus" :key="group.id">
            <div class="nav-group">
                <div class="nav-group-label">
                    {{ group.menu_name }}
                </div>
                <SidebarItem v-for="child in group.children" :key="child.id" :item="child" />
            </div>
        </template>

        <div class="sidebar-user" @click.prevent="handleLogout">
            <div class="user-ava"> {{ authStore.user?.full_name.split(' ')[0][0] }}
                {{ authStore.user?.full_name.split(' ').slice(-1)[0][0] }}
            </div>
            <div>
                <div class="user-info-name">{{ authStore.user?.full_name }}</div>
                <div class="user-info-role">{{ authStore.user?.email }}</div>
            </div>
            <div class="user-logout"><i class="fas fa-power-off"></i></div>
        </div>
    </aside>
    <ConfirmDialog></ConfirmDialog>
</template>

<script setup>
import SidebarItem from './SidebarItem.vue';
import ConfirmDialog from '@/components/confirm/ConfirmDialog.vue';
import { useConfirm } from '@/components/confirm/useConfirm';

import { useMenuStore } from '@/stores/menu.store';
import { useAuthStore } from '@/stores/auth.store';
import { onMounted } from 'vue';

const menuStore = useMenuStore();
const authStore = useAuthStore();
const { showConfirm } = useConfirm();

onMounted(async () => {
    if (!menuStore.menus.length) {
        await menuStore.getMyMenu();
    }
})
// onMounted(() => {
//     console.log('User info on sidebar mount:');
//     console.log(authStore.user)
// })

const handleLogout = async () => {
    // Xử lý đăng xuất ở đây
    const ok = await showConfirm({ title: 'Đăng xuất', desc: 'Bạn có chắc muốn đăng xuất khỏi Admin Panel?', icon: '<i class="fas fa-power-off"></i>', btn: 'Dăng xuất' })
    if (ok) {
        authStore.logout();
    }
}


</script>