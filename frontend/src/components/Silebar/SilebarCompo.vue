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

        <div class="sidebar-user">
            <div class="user-ava">AD</div>
            <div>
                <div class="user-info-name">Super Admin</div>
                <div class="user-info-role">admin@giaoha.vn</div>
            </div>
            <div class="user-logout">⎋</div>
        </div>
    </aside>
</template>

<script setup>
import SidebarItem from './SidebarItem.vue';
import { useMenuStore } from '@/stores/menu.store';
import { onMounted } from 'vue';

const menuStore = useMenuStore();

onMounted(async () => {
    if (!menuStore.menus.length) {
        await menuStore.getMyMenu();
    }
})

// group menu cấp 1
// const rootMenus = computed(() => {
//     return [...menuStore.menus].sort((a, b) => a.sort_order - b.sort_order)
// })

</script>