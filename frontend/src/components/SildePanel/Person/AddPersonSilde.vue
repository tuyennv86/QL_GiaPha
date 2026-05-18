<template>
    <SlidePanel v-model="visible">
        <!-- HEADER -->
        <template #header>
            <div>
                <div class="sp-title">
                    {{ isEdit ? 'Chỉnh Sửa Thành Viên' : 'Thêm Mới Thành Viên' }}
                </div>
                <div class="sp-sub" v-if="isEdit">
                    {{ form.full_name }}
                </div>
            </div>
        </template>

        <!-- BODY -->
        <form @submit.prevent="handleSubmit">
            <div class="sp-body"><!---->
                <div>
                    <div class="form-row form-row-1" style="grid-template-columns: 1fr;">
                        <div class="f-group"><label class="f-label">Họ &amp; Tên <span class="f-req">*</span></label>
                            <input class="f-input" v-model="form.full_name">
                            <small v-if="errors.full_name">{{ errors.full_name }}</small>
                        </div>
                    </div>
                    <div class="form-row form-row-2">
                        <div class="f-group"><label class="f-label">Dòng họ</label>
                            <select class="f-select" v-model="form.family_id">
                                <option v-for="fam in families" :key="fam.id" :value="fam.id">{{ fam.family_name }}
                                </option>
                            </select>
                        </div>
                        <div class="f-group"><label class="f-label">Chi họ (Ngành)</label>
                            <select class="f-select" v-model="form.branch_id">
                                <option :value="null">-- Không chọn --</option>
                                <option v-for="ban in branchs" :key="ban.id" :value="ban.id">{{ ban.branch_name }}
                                </option>
                            </select>
                        </div>
                    </div>
                    <div class="form-row form-row-2">
                        <div class="f-group"><label class="f-label">Giới Tính</label>
                            <select class="f-select" v-model="form.gender">
                                <option :value="1">Nam</option>
                                <option :value="0">Nữ</option>
                                <option :value="2">Khác</option>
                            </select>
                        </div>
                        <div class="f-group"><label class="f-label">Thế Hệ</label>
                            <select class="f-select" v-model="form.generation">
                                <option :value="g" v-for="g in generations" :key="g">Đời {{ g }}</option>
                            </select>
                        </div>
                        <div class="f-group"><label class="f-label">Loại</label>
                            <select class="f-select" v-model="form.person_type">
                                <option :value="null">-- Không chọn --</option>
                                <option v-for="item in PERSON_TYPE_OPTIONS" :key="item.value" :value="item.value">
                                    {{ item.label }}
                                </option>
                            </select>
                        </div>
                        <div class="f-group">
                            <label class="f-label">Ảnh đại diện</label>
                            <input class="f-input" v-model="form.avatar" type="hidden">
                            <img src="" alt="">
                        </div>
                        <div class="f-group"><label class="f-label">Năm Sinh</label>
                            <!-- <input class="f-input" type="number"> -->
                            <VueDatePicker v-model="form.birth_date" :year-range="[0, 9999]" dark
                                :formats="{ input: 'dd/MM/yyyy HH:mm' }" :locale="vi" />
                        </div>
                        <div class="f-group"><label class="f-label">Năm Mất</label>
                            <!-- <input class="f-input" type="number"> -->
                            <VueDatePicker v-model="form.death_date" :year-range="[0, 9999]" dark
                                :formats="{ input: 'dd/MM/yyyy HH:mm' }" :locale="vi" />
                        </div>
                    </div>
                    <div class="form-row form-row-1" style="grid-template-columns: 1fr;">
                        <div class="f-group"><label class="f-label">Quê Quán</label>
                            <input class="f-input" v-model="form.place_of_birth">
                        </div>
                        <div class="f-group"><label class="f-label">Nghề Nghiệp</label>
                            <input class="f-input" v-model="form.job">
                        </div>
                        <div class="f-group"><label class="f-label">Vai Trò</label>
                            <input class="f-input" v-model="form.biography">
                        </div>
                        <div class="f-group"><label class="f-label">Ghi Chú</label>
                            <textarea class="f-textarea" rows="3" v-model="form.note"></textarea>
                        </div>
                        <div class="f-group"><label class="f-label" v-if="form.is_alive"> Còn sống</label><label
                                class="f-label" v-else> Đã mất</label>
                            <ToggleSwitch v-model="form.is_alive"></ToggleSwitch>
                        </div>
                    </div>
                </div>
            </div>
        </form>

        <!-- FOOTER -->
        <template #footer>
            <button type="button" class="btn btn-ghost" @click="close">Hủy</button>
            <button type="button" class="btn btn-primary" @click="handleSubmit">
                💾 {{ isEdit ? 'Cập nhật' : 'Thêm mới' }}
            </button>
        </template>
    </SlidePanel>
</template>

<script setup>
import { reactive, watch, computed } from 'vue'
import SlidePanel from '../SlidePanel.vue'
import ToggleSwitch from '@/components/common/ToggleSwitch.vue'
import { PERSON_TYPE_OPTIONS } from '@/constants/person-type-options'
import { VueDatePicker } from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import { vi } from "date-fns/locale"

const props = defineProps({
    modelValue: Boolean,
    person: Object,
    branchs: Array,
    families: Array,
    generations: Array
})

const emit = defineEmits(['update:modelValue', 'save'])

const visible = computed({
    get: () => props.modelValue,
    set: (val) => emit('update:modelValue', val)
})

const isEdit = computed(() => !!props.person?.id)

const form = reactive({
    id: null,
    family_id: null,
    branch_id: null,
    full_name: '',
    gender: null,
    birth_date: null,
    death_date: null,
    biography: '',
    avatar: '',
    generation: null,
    is_alive: true,
    job: '',
    place_of_birth: '',
    note: '',
    person_type: null
})

const errors = reactive({})

/* RESET */
const resetForm = () => {
    Object.assign(form, {
        id: null,
        family_id: null,
        branch_id: null,
        full_name: '',
        gender: null,
        birth_date: null,
        death_date: null,
        biography: '',
        avatar: '',
        generation: null,
        is_alive: true,
        job: '',
        place_of_birth: '',
        note: '',
        person_type: null
    })
    Object.keys(errors).forEach(k => delete errors[k])
}

/* LOAD DATA */
watch(
    () => props.person,
    (val) => {
        if (val) {
            Object.assign(form, {
                id: val.id,
                family_id: val.family_id,
                branch_id: val.branch_id,
                full_name: val.full_name,
                gender: val.gender,
                birth_date: val.birth_date,
                death_date: val.death_date,
                biography: val.biography,
                avatar: val.avatar,
                generation: val.generation,
                is_alive: val.is_alive,
                job: val.job,
                place_of_birth: val.place_of_birth,
                note: val.note,
                person_type: val.person_type
            })
        } else {
            resetForm()
        }
    },
    { immediate: true }
)

/* RESET khi đóng panel */
watch(
    () => visible.value,
    (val) => {
        if (!val) resetForm()
    }
)

/* VALIDATE */
const validate = () => {
    Object.keys(errors).forEach(k => delete errors[k])

    if (!form.full_name) errors.full_name = 'Họ tên không để trống!'
    // if (!form.email) errors.email = 'Email không để trống!'
    // if (!form.phone) errors.phone = 'Điện thoại không để trống!'

    // if (!isEdit.value) {
    //     if (!form.username) errors.username = 'UserName không để trống!'

    //     if (!form.password || form.password.length < 8) {
    //         errors.password = 'Mật khẩu tối thiểu 8 ký tự'
    //     }
    //     if (form.password !== form.password2) {
    //         errors.password2 = 'Hai mật khẩu không trùng nhau'
    //     }
    // }

    return Object.keys(errors).length === 0
}

/* SUBMIT */
const handleSubmit = () => {
    if (!validate()) return

    emit("save", {
        form: { ...form },
        isEdit: isEdit.value
    });
    close();
    resetForm();
}

const close = () => {
    visible.value = false;
}
</script>