<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import '@fortawesome/fontawesome-free/css/all.min.css'
const props = defineProps({
    item: Object
})

const route = useRoute()

const isOpen = ref(false)

const hasChildren = computed(() => {
    return props.item.children && props.item.children.length > 0
})

// active theo path
const isActive = computed(() => {
    return route.path === props.item.route
})

// auto mở menu cha nếu active
watch(
    () => route.path,
    () => {
        if (isActive.value) {
            isOpen.value = true
        }
    },
    { immediate: true }
)
</script>

<template>
    <div>
        <!-- ✅ MENU KHÔNG CÓ CHILD -->
        <router-link v-if="!hasChildren" :to="item.route" class="nav-item" :class="{ active: isActive }">
            <span class="ni"><i :class="item.icon"></i></span>

            {{ item.menu_name }}

            <!-- badge -->
            <span v-if="item.badge" class="nav-badge badge-gray">
                {{ item.badge }}
            </span>
        </router-link>

        <!-- ✅ MENU CÓ CHILD -->
        <div v-else>
            <div class="nav-item" :class="{ active: isActive }" @click="isOpen = !isOpen">
                <span class="ni"><i :class="item.icon"></i></span>

                {{ item.menu_name }}

                <!-- <span style="margin-left:auto">
                    {{ isOpen ? '▼' : '▶' }}
                </span> -->
            </div>

            <!-- children -->
            <div v-show="isOpen" style="padding-left: 10px">
                <SidebarItem v-for="child in item.children" :key="child.id" :item="child" />
            </div>
        </div>
    </div>
</template>
