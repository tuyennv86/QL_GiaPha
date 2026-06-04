<script setup>
import { computed } from 'vue'

const model = defineModel({
    type: Number,
    default: 0
})

const isOn = computed(() => model.value === 1)

const toggle = () => {
    model.value = model.value === 1 ? 0 : 1
}
</script>

<template>
    <div class="toggle-switch" :class="{ on: isOn }" @click="toggle" />
</template>

<style scoped src="./toggle-switch.css"></style>