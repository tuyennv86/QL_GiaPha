<template>
    <div class="search-select" ref="containerRef">
        <input v-model="searchText" type="text" class="search-input" :placeholder="placeholder"
            @focus="showDropdown = true" />

        <div v-if="showDropdown" class="dropdown">
            <div v-for="item in displayOptions" :key="item[valueField] ?? '__null__'" class="dropdown-item"
                @click="selectItem(item)">
                {{ item[labelField] }}
            </div>

            <div v-if="displayOptions.length === 0" class="empty">
                Không có dữ liệu
            </div>
        </div>
    </div>
</template>

<script setup>
import {
    ref,
    computed,
    watch,
    onMounted,
    onBeforeUnmount
} from 'vue'

const props = defineProps({
    modelValue: {
        type: [String, Number, Boolean, null],
        default: null
    },

    options: {
        type: Array,
        default: () => []
    },

    labelField: {
        type: String,
        default: 'label'
    },

    valueField: {
        type: String,
        default: 'value'
    },

    placeholder: {
        type: String,
        default: 'Tìm kiếm...'
    },

    allowNull: {
        type: Boolean,
        default: true
    },

    nullLabel: {
        type: String,
        default: '-- Không chọn --'
    }
})

const emit = defineEmits([
    'update:modelValue',
    'change'
])

const containerRef = ref(null)
const showDropdown = ref(false)
const searchText = ref('')

function normalizeText(text) {
    return String(text ?? '')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .trim()
}

const normalizedOptions = computed(() =>
    props.options.map(item => ({
        ...item,
        _searchText: normalizeText(
            item[props.labelField]
        )
    }))
)

const filteredOptions = computed(() => {
    const keyword = normalizeText(
        searchText.value
    )

    if (!keyword) {
        return normalizedOptions.value
    }

    return normalizedOptions.value.filter(item =>
        item._searchText.includes(keyword)
    )
})

const displayOptions = computed(() => {
    const result = [...filteredOptions.value]

    if (props.allowNull) {
        result.unshift({
            [props.labelField]: props.nullLabel,
            [props.valueField]: null
        })
    }

    return result
})

watch(
    () => props.modelValue,
    value => {
        const selected =
            props.options.find(
                item =>
                    item[props.valueField] === value
            )

        searchText.value = selected
            ? selected[props.labelField]
            : ''
    },
    {
        immediate: true
    }
)

function selectItem(item) {
    const value =
        item[props.valueField]

    searchText.value =
        value === null
            ? ''
            : item[props.labelField]

    emit(
        'update:modelValue',
        value
    )

    emit('change', item)

    showDropdown.value = false
}

function handleClickOutside(event) {
    if (
        containerRef.value &&
        !containerRef.value.contains(
            event.target
        )
    ) {
        showDropdown.value = false
    }
}

onMounted(() => {
    document.addEventListener(
        'click',
        handleClickOutside
    )
})

onBeforeUnmount(() => {
    document.removeEventListener(
        'click',
        handleClickOutside
    )
})
</script>

<style scoped>
.search-select {
    position: relative;
    width: 100%;
}

.search-input {
    width: 100%;
    padding: 8px;
    border: 1px solid #615f5f;
    background: #1C1C1C;
    color: #ffffff;
}

.dropdown {
    position: absolute;
    z-index: 1000;
    width: 100%;
    max-height: 250px;
    overflow-y: auto;
    background: rgb(34, 33, 33);
    border: 1px solid #080808;
}

.dropdown-item {
    padding: 10px;
    cursor: pointer;
}

.dropdown-item:hover {
    background: #4e4d4d;
}

.empty {
    padding: 10px;
    color: #999;
}
</style>
<!--<template>
    
    <SearchSelect v-model="parent.father_id" :options="personMen" label-field="full_name" value-field="id" //
        placeholder="Chọn bố" @change="onChangeMen" />

</template>
  <script setup>
 const onChangeMen = (val) => {
 parent.father_id = val ? val.id : null;
 };
 </script> -->