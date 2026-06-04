<script setup>
const model = defineModel({ type: Boolean, default: false })
</script>
<template>
    <div class="toggle-switch" :class="{ 'on': model }" @click="model = !model"></div>
</template>
<style scoped src="./toggle-switch.css"></style>