<template>
    <div ref="wrapper" class="position-relative w-100">
        <!-- INPUT -->
        <div class="form-control d-flex justify-content-between align-items-center"
            style="cursor: pointer; min-height: 38px" @click.stop="toggle">
            <span class="text-truncate">
                {{ selectedLabel }}
            </span>

            <div class="d-flex align-items-center gap-2">
                <span v-if="modelValue.length" class="text-muted" style="cursor: pointer" @click.stop="clear">
                    ×
                </span>
                <span>▾</span>
            </div>
        </div>

        <!-- DROPDOWN -->
        <div v-if="open" class="dropdown-menu show w-100 shadow-sm mt-1 p-0" @click.stop
            style="max-height: 280px; overflow-y: auto">
            <!-- CHECK ALL -->
            <div class="dropdown-item fw-semibold d-flex align-items-center gap-2">
                <input ref="checkAllRef" type="checkbox" class="form-check-input" :checked="isAllChecked"
                    @change="toggleAll" />
                <span>Select all</span>
            </div>

            <div class="dropdown-divider"></div>

            <!-- ITEMS -->
            <div v-for="item in options" :key="itemValue(item)" class="dropdown-item d-flex align-items-center gap-2">
                <input type="checkbox" class="form-check-input" :checked="isChecked(item)" @change="toggleItem(item)" />
                <span>{{ itemLabel(item) }}</span>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'

/* ================= PROPS ================= */
const props = defineProps({
    modelValue: {
        type: Array,
        default: () => []
    },
    options: {
        type: Array,
        required: true
    },
    optionLabel: {
        type: String,
        default: 'label'
    },
    optionValue: {
        type: String,
        default: 'value'
    },
    maxDisplay: {
        type: Number,
        default: 3
    }
})

/* ================= EMIT ================= */
const emit = defineEmits(['update:modelValue'])

/* ================= STATE ================= */
const open = ref(false)
const wrapper = ref(null)
const checkAllRef = ref(null)

/* ================= HELPERS ================= */
const itemLabel = (item) => item[props.optionLabel]
const itemValue = (item) => item[props.optionValue]

/* ================= COMPUTED ================= */
const selectedItems = computed(() =>
    props.options.filter(o =>
        props.modelValue.includes(itemValue(o))
    )
)

const selectedLabel = computed(() => {
    if (!selectedItems.value.length) return 'Select items'

    const labels = selectedItems.value
        .slice(0, props.maxDisplay)
        .map(itemLabel)

    const more = selectedItems.value.length - labels.length

    return more > 0
        ? `${labels.join(', ')} +${more} more`
        : labels.join(', ')
})

const isAllChecked = computed(() =>
    props.options.length > 0 &&
    props.modelValue.length === props.options.length
)

const isIndeterminate = computed(() =>
    props.modelValue.length > 0 &&
    props.modelValue.length < props.options.length
)

/* ================= METHODS ================= */
const toggle = () => {
    open.value = !open.value
}

const isChecked = (item) =>
    props.modelValue.includes(itemValue(item))

const toggleItem = (item) => {
    const value = itemValue(item)
    const newValue = [...props.modelValue]
    const index = newValue.indexOf(value)

    index === -1
        ? newValue.push(value)
        : newValue.splice(index, 1)

    emit('update:modelValue', newValue)
}

const toggleAll = () => {
    emit(
        'update:modelValue',
        isAllChecked.value
            ? []
            : props.options.map(itemValue)
    )
}

const clear = () => {
    emit('update:modelValue', [])
}

/* ================= CLICK OUTSIDE (FIX) ================= */
const clickOutside = (e) => {
    if (!wrapper.value) return
    if (!wrapper.value.contains(e.target)) {
        open.value = false
    }
}

/* ================= WATCH INDETERMINATE ================= */
watch(
    isIndeterminate,
    (val) => {
        if (checkAllRef.value) {
            checkAllRef.value.indeterminate = val
        }
    },
    { immediate: true }
)

/* ================= LIFECYCLE ================= */
onMounted(() => {
    document.addEventListener('mousedown', clickOutside)
})

onBeforeUnmount(() => {
    document.removeEventListener('mousedown', clickOutside)
})
</script>
<style scoped>
/* WRAPPER */
.form-control {
    border-radius: 6px;
    border: 1px solid #3D3D3D;
    background: #1C1C1C;
    transition: all 0.2s ease;
    padding: 6px 10px;
}

.form-control:hover {
    border-color: #409eff;
}

.form-control:focus-within {
    border-color: #409eff;
    box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.15);
}

/* TEXT */
.text-truncate {
    font-size: 14px;
    color: #ecf5ff;
}

/* CLEAR BUTTON */
.text-muted {
    font-size: 16px;
    color: #ecf5ff;
    transition: 0.2s;
}

.text-muted:hover {
    color: #ff4d4f;
}

/* DROPDOWN */
.dropdown-menu {
    border-radius: 10px;
    border: 1px solid #06080e;
    background: #1C1C1C;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
    overflow: hidden;
}

/* ITEM */
.dropdown-item {
    padding: 8px 12px;
    font-size: 14px;
    transition: all 0.15s ease;
}

.dropdown-item:hover {
    background-color: #1C1C1C;
}

/* CHECKBOX */
.form-check-input {
    cursor: pointer;
    width: 16px;
    height: 16px;
}

/* SELECT ALL */
.dropdown-item.fw-semibold {
    background: #110d0d;
    font-weight: 600;
    border-bottom: 1px solid #050505;
}

/* DIVIDER */
.dropdown-divider {
    margin: 4px 0;
}

/* SCROLLBAR (optional đẹp hơn) */
.dropdown-menu::-webkit-scrollbar {
    width: 6px;
}

.dropdown-menu::-webkit-scrollbar-thumb {
    background: #dcdfe6;
    border-radius: 4px;
}

.dropdown-menu::-webkit-scrollbar-thumb:hover {
    background: #c0c4cc;
}

/* ICON DROPDOWN */
span:last-child {
    font-size: 12px;
    color: #dcdfe6;
    transition: transform 0.2s ease;
}

/* rotate arrow when open */
.position-relative .form-control.open span:last-child {
    transform: rotate(180deg);
}

/* TAG STYLE (nếu sau này muốn hiển thị tag) */
.tag {
    background: #ecf5ff;
    color: #409eff;
    border-radius: 4px;
    padding: 2px 6px;
    font-size: 12px;
}
</style>