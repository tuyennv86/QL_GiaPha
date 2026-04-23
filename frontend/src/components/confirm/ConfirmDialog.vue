<template>
    <div class="modal-bg" :class="{ open: !!confirmDialog }" @click.self="confirmDialog = null">
        <div class="confirm-box" v-if="confirmDialog">
            <div class="confirm-icon" v-html="confirmDialog.icon"></div>
            <div class="confirm-title">{{ confirmDialog.title }}</div>
            <div class="confirm-desc">{{ confirmDialog.desc }}</div>
            <div class="confirm-btns">
                <button class="btn btn-secondary" @click="confirmDialog = null">
                    Hủy
                </button>
                <button class="btn btn-danger" @click="confirmDialog.action(); confirmDialog = null">
                    {{ confirmDialog.btn }}
                </button>
            </div>
        </div>
    </div>
</template>
<script setup>
import { useConfirm } from './useConfirm';
const { confirmDialog } = useConfirm();

</script>