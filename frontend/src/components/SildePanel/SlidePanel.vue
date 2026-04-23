<template>
    <div>
        <!-- OVERLAY -->
        <div class="panel-overlay" :class="{ open: modelValue }"></div>

        <!-- PANEL -->
        <div class="slide-panel" :class="{ open: modelValue }" @click.stop>
            <!-- HEADER -->
            <div class="sp-head">
                <slot name="header">
                    <div class="sp-title">Panel</div>
                </slot>
                <button type="button" class="modal-close" @click="close">✕</button>
            </div>

            <!-- BODY -->
            <div class="sp-body">
                <slot />
            </div>

            <!-- FOOTER -->
            <div class="sp-foot">
                <slot name="footer" />
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    modelValue: Boolean
})

const emit = defineEmits(['update:modelValue'])

const close = () => {
    emit('update:modelValue', false)
}
</script>