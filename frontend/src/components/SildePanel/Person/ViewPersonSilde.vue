<template>
    <SlidePanel v-model="visible">
        <!-- HEADER -->
        <template #header>
            <div>
                <div v-if="person">
                    <div class="sp-title">Chi Tiết Thành Viên</div>
                    <div class="sp-sub">{{ person.full_name }}</div>
                </div>
            </div>
        </template>

        <!-- BODY -->
        <div v-if="person">
            <div class="section-block">
                <div class="section-label"><span v-if="person.family">{{ person.family.family_name }}</span><span
                        v-if="person.branch"> / {{
                            person.branch.branch_name }}</span></div>
                <div class="info-rows">
                    <div class="info-row">
                        <div class="ir-key">Họ &amp; Tên</div>
                        <div class="ir-val">{{ person.full_name }}</div>
                    </div>
                    <div class="info-row">
                        <div class="ir-key">Ảnh</div>
                        <div class="ir-val"></div>
                    </div>
                    <div class="info-row">
                        <div class="ir-key">Giới Tính</div>
                        <div class="ir-val" v-if="person.gender === 1"> <i class="fas fa-mars"></i> Nam</div>
                        <div class="ir-val" v-else-if="person.gender === 0"> <i class="fas fa-venus"></i> Nữ</div>
                        <div class="ir-val" v-else><i class="fas fa-venus-mars"></i> Khác</div>
                    </div>
                    <div class="info-row">
                        <div class="ir-key">Thế Hệ</div>
                        <div class="ir-val"><span class="badge" :class="'gen-' + person.generation">Đời {{
                            person.generation
                                }}</span>
                        </div>
                    </div>
                    <div class="info-row">
                        <div class="ir-key">Năm Sinh</div>
                        <div class="ir-val font-mono">{{ formatDate(person.birth_date) }}</div>
                    </div>
                    <div class="info-row">
                        <div class="ir-key">Năm Mất</div>
                        <div class="ir-val font-mono">{{ formatDate(person.death_date) }}</div>
                    </div>
                    <div class="info-row">
                        <div class="ir-key">Quê Quán</div>
                        <div class="ir-val">{{ person.place_of_birth }}</div>
                    </div>
                    <div class="info-row">
                        <div class="ir-key">Nghề Nghiệp</div>
                        <div class="ir-val">{{ person.job }}</div>
                    </div>
                    <div class="info-row">
                        <div class="ir-key">Vai Trò</div>
                        <div class="ir-val">{{ person.biography }}</div>
                    </div>
                    <div class="info-row">
                        <div class="ir-key">Ghi chú</div>
                        <div class="ir-val">{{ person.note }}</div>
                    </div>
                    <div class="info-row">
                        <div class="ir-key">Tình Trạng</div>
                        <div class="ir-val"><span class="badge b-green" v-if="person.is_alive"><i
                                    class="fas fa-heart"></i>
                                Còn sống</span>
                            <span class="badge b-gray" v-else><i class="fas fa-skull"></i> Đã mất</span>
                        </div>
                    </div>
                </div>
            </div><!----><!---->
        </div>

        <!-- FOOTER -->
        <template #footer>
            <button type="button" class="btn btn-ghost" @click="close">Đóng</button>
        </template>
    </SlidePanel>
</template>

<script setup>
import { computed } from 'vue';
import SlidePanel from '../SlidePanel.vue';
import { formatDate } from '@/utils/formatDate';

const props = defineProps({
    modelValue: Boolean,
    person: {
        type: Object,
        default: () => ({})
    }
})

const emit = defineEmits(['update:modelValue', 'save'])

const visible = computed({
    get: () => props.modelValue,
    set: (val) => emit('update:modelValue', val)
})


const close = () => {
    visible.value = false
}

</script>