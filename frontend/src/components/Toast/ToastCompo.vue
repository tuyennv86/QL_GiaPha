<template>
    <!-- <div class="toast-container"> -->
    <div v-for="toast in toasts" :key="toast.id" class="toast show" :class="'t-' + toast.type">
        <span class="toast-icon">{{ toast.icon }}</span>
        <div>
            <div class="toast-title">{{ toast.title }}</div>
            <div class="toast-sub" v-if="toast.sub">{{ toast.sub }}</div>
        </div>
    </div>
    <!-- </div> -->
</template>

<script setup>
import { useToast } from '@/components/Toast/useToast'

const { toasts } = useToast()
</script>
