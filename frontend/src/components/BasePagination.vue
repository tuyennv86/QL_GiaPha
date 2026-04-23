<template>
    <div class="card-body" style="padding: 12px 20px; border-top: 1px solid var(--border);" v-if="totalPages > 1">
        <div class="flex-between" style="align-items: center; flex-wrap: wrap; gap: 10px;">
            <!-- Text -->
            <div style="font-size: 12px; color: var(--text-secondary);">
                Hiển thị
                <strong style="color: var(--text-primary);">
                    {{ startItem }}–{{ endItem }}
                </strong>
                trong
                <strong style="color: var(--text-primary);">
                    {{ totalItems }}
                </strong>
                tài khoản
            </div>

            <!-- Pagination -->
            <div class="flex gap-4" style="align-items: center;">
                <!-- First -->
                <button class="btn btn-ghost btn-xs" title="Trang đầu" @click="goToPage(1)"
                    :disabled="currentPage === 1">
                    «
                </button>

                <!-- Prev -->
                <button class="btn btn-ghost btn-xs" title="Trang trước" @click="goToPage(currentPage - 1)"
                    :disabled="currentPage === 1">
                    ‹
                </button>

                <!-- Pages -->
                <button v-for="(page, index) in pages" :key="index" class="btn btn-xs"
                    :class="page === currentPage ? 'btn-primary' : 'btn-ghost'" style="min-width: 32px;"
                    @click="typeof page === 'number' && goToPage(page)" :disabled="page === '...'">
                    {{ page }}
                </button>

                <!-- Next -->
                <button class="btn btn-ghost btn-xs" title="Trang sau" @click="goToPage(currentPage + 1)"
                    :disabled="currentPage === totalPages">
                    ›
                </button>

                <!-- Last -->
                <button class="btn btn-ghost btn-xs" title="Trang cuối" @click="goToPage(totalPages)"
                    :disabled="currentPage === totalPages">
                    »
                </button>
            </div>

            <!-- Jump -->
            <div class="flex-center gap-8" style="font-size: 12px; color: var(--text-secondary);">
                Trang
                <input type="number" :min="1" :max="totalPages" v-model.number="inputPage"
                    @keyup.enter="goToPage(inputPage)" @blur="goToPage(inputPage)" style="
              width: 52px;
              background: rgb(28, 28, 28);
              border: 1px solid var(--border);
              color: var(--text-primary);
              padding: 4px 8px;
              font-size: 12px;
              text-align: center;
              outline: none;
            " />
                / {{ totalPages }}
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, ref, watch } from "vue";

const props = defineProps({
    totalItems: { type: Number, required: true },
    currentPage: { type: Number, default: 1 },
    pageSize: { type: Number, default: 10 },
    delta: { type: Number, default: 1 } // số trang xung quanh current
});

const emit = defineEmits(["update:currentPage", "change"]);

const totalPages = computed(() =>
    Math.ceil(props.totalItems / props.pageSize)
);

const inputPage = ref(props.currentPage);

watch(() => props.currentPage,
    (val) => {
        inputPage.value = val;
    }
);

// range item
const startItem = computed(() =>
    props.totalItems === 0 ? 0 : (props.currentPage - 1) * props.pageSize + 1
);

const endItem = computed(() =>
    Math.min(props.currentPage * props.pageSize, props.totalItems)
);

// logic pagination có ...
const pages = computed(() => {
    const total = totalPages.value;
    const current = props.currentPage;
    const delta = props.delta;

    const range = [];
    const result = [];

    for (let i = 1; i <= total; i++) {
        if (
            i === 1 ||
            i === total ||
            (i >= current - delta && i <= current + delta)
        ) {
            range.push(i);
        }
    }

    let prev = null;

    for (let i of range) {
        if (prev !== null) {
            if (i - prev === 2) {
                result.push(prev + 1);
            } else if (i - prev > 2) {
                result.push("...");
            }
        }
        result.push(i);
        prev = i;
    }

    return result;
});

function goToPage(page) {
    const total = totalPages.value;

    if (!page || page < 1) page = 1;
    if (page > total) page = total;

    if (page === props.currentPage) return;

    emit("update:currentPage", page);
    emit("change", page);
}
</script>