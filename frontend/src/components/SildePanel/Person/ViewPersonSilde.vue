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
                        <div class="ir-val"> <img v-if="person.avatar" :src="`${IMG_URL}${person.avatar}`"
                                style="width: 150px; border-radius: 4px; overflow: hidden;" />
                        </div>
                    </div>
                    <div class="info-row">
                        <div class="ir-key">Giới Tính</div>
                        <div class="ir-val" v-if="person.gender === 1"> <i class="fas fa-mars"></i> Nam</div>
                        <div class="ir-val" v-else-if="person.gender === 0"> <i class="fas fa-venus"></i> Nữ</div>
                        <div class="ir-val" v-else><i class="fas fa-venus-mars"></i> Khác</div>
                    </div>
                    <div class="info-row">
                        <div class="ir-key">Kiểu</div>
                        <div class="ir-val">{{ PERSON_TYPE_LABEL[person.person_type] }}</div>
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
                    <template v-if="parentChild">
                        <div class="divider"></div>
                        <div class="section-label">Bố / mẹ</div>
                        <div class="info-row">
                            <div class="ir-key">Bố</div>
                            <div class="ir-val" v-if="parentChild.father_name">{{ parentChild.father_name }}</div>
                        </div>
                        <div class="info-row">
                            <div class="ir-key">Mẹ</div>
                            <div class="ir-val" v-if="parentChild.mother_name">{{ parentChild.mother_name }}</div>
                        </div>
                        <div class="info-row">
                            <div class="ir-key"></div>
                            <div class="ir-val" v-if="parentChild.relationship_type === 0">Con đẻ</div>
                            <div class="ir-val" v-else-if="parentChild.relationship_type === 1">Con nuôi</div>
                        </div>
                    </template>
                    <template v-if="marriages.length > 0">
                        <div class="divider"></div>
                        <div class="section-label"> {{ person?.gender === 1 ? 'Vợ' : 'Chồng' }}</div>

                        <div v-for="marriage in marriages" :key="marriage.id" class="marriage-card">
                            <div class="marriage-card__header">
                                <div>
                                    <div class="marriage-card__name">
                                        {{
                                            person?.person_type === PersonType.SON || person?.person_type ===
                                                PersonType.DAUGHTER
                                                ? marriage.person2_name : marriage.person1_name
                                        }}
                                    </div>

                                    <div class="marriage-card__meta">
                                        💍 Ngày cưới: {{ formatDate(marriage.marriage_date) }}
                                    </div>
                                </div>

                                <span class="marriage-status" :class="{
                                    active: marriage.marriage_status === 0,
                                    divorce: marriage.marriage_status === 1,
                                    deceased: marriage.marriage_status === 2
                                }">
                                    {{
                                        marriage.marriage_status === 0 ? 'Đang hôn nhân' : marriage.marriage_status === 1 ?
                                            'Ly hôn' : 'Đã mất'
                                    }}
                                </span>
                            </div>

                            <div v-if="marriage.marriage_status !== 0" class="marriage-card__event">
                                {{
                                    marriage.marriage_status === 1 ? `Ly hôn: ${formatDate(marriage.divorce_date)}`
                                        : `${person?.gender === 1 ? 'Vợ' : 'Chồng'} mất: ${formatDate(marriage.divorce_date)}`
                                }}
                            </div>

                            <div v-if="marriage.note" class="marriage-card__note">
                                {{ marriage.note }}
                            </div>
                        </div>
                    </template>

                </div>
            </div>
        </div>

        <!-- FOOTER -->
        <template #footer>
            <button type="button" class="btn btn-ghost" @click="close">Đóng</button>
            <button type="button" class="btn btn-primary" @click.prevent="openEdit(person)">
                <i class="fas fa-pen"></i> Chỉnh sửa
            </button>
        </template>
    </SlidePanel>
</template>

<script setup>
import { computed } from 'vue';
import SlidePanel from '../SlidePanel.vue';
import { formatDate } from '@/utils/formatDate';
import { PERSON_TYPE_LABEL } from '@/constants/person-type-label';
import { PersonType } from "@/enum/person-type.enum.js"

const IMG_URL = import.meta.env.VITE_URL;

const props = defineProps({
    modelValue: Boolean,
    person: {
        type: Object,
        default: () => ({})
    },
    parentChild: {
        type: Object,
        default: () => ({})
    },
    marriages: Array // danh sách các hôn nhân của người này
})

const emit = defineEmits(['update:modelValue', 'edit-person'])

const visible = computed({
    get: () => props.modelValue,
    set: (val) => emit('update:modelValue', val)
})


const close = () => {
    visible.value = false
}

const openEdit = (person) => {
    emit('edit-person', person)
    close()
}

</script>
<style scoped>
.marriage-list {
    display: flex;
    flex-direction: column;
    gap: 14px;
}

.marriage-card {
    background: #1f1f1f;
    border: 1px solid var(--border);
    border-left: 2px solid var(--gold);
    padding: 14px;
    transition: all .2s;
}

.marriage-card__header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 12px;
}

.marriage-card__name {
    color: var(--text-primary);
    font-weight: 600;
    font-size: 15px;
}

.marriage-card__meta {
    margin-top: 4px;
    color: var(--text-secondary);
    font-size: 12px;
}

.marriage-card__event {
    margin-top: 8px;
    color: #ff8389;
    font-size: 12px;
}

.marriage-card__note {
    margin-top: 10px;
    padding: 10px;
    background: rgba(201, 168, 76, .08);
    border-left: 2px solid var(--gold);
    color: var(--text-secondary);
    font-size: 12px;
}
</style>