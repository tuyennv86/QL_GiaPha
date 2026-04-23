<template>
    <component :is="layoutComponent">
    </component>
</template>
<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

import AdminLayout from './AdminLayout.vue';
import LoginLayout from './LoginLayout.vue';
import HomeLayout from './HomeLayout.vue';

const route = useRoute();

const layoutComponent = computed(() => {

    const layout = route.meta.layout || "home";

    switch (layout) {
        case "auth": return LoginLayout;
        case "admin": return AdminLayout;
        case "home":
        default: return HomeLayout;
    }

})
</script>