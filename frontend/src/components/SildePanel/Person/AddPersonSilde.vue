<template>
    <SlidePanel v-model="visible">
        <!-- HEADER -->
        <template #header>
            <div>
                <div class="sp-title">
                    {{ isEdit ? "Chỉnh Sửa Thành Viên" : "Thêm Mới Thành Viên" }}
                </div>
                <div class="sp-sub" v-if="isEdit">
                    {{ form.full_name }}
                </div>
            </div>
        </template>

        <!-- BODY -->
        <form @submit.prevent="handleSubmit">
            <div class="sp-body">
                <div class="form-row form-row-1" style="grid-template-columns: 1fr">
                    <div class="f-group">
                        <label class="f-label">Họ &amp; Tên <span class="f-req">*</span></label>
                        <input class="f-input" v-model="form.full_name" />
                        <small v-if="errors.full_name">{{ errors.full_name }}</small>
                    </div>
                </div>
                <div class="form-row form-row-2">
                    <div class="f-group">
                        <label class="f-label">Dòng họ</label>
                        <select class="f-select" v-model="form.family_id">
                            <option v-for="fam in families" :key="fam.id" :value="fam.id">
                                {{ fam.family_name }}
                            </option>
                        </select>
                    </div>
                    <div class="f-group">
                        <label class="f-label">Chi họ (Ngành)</label>
                        <select class="f-select" v-model="form.branch_id">
                            <option :value="null">-- Không chọn --</option>
                            <option v-for="ban in branchs" :key="ban.id" :value="ban.id">
                                {{ ban.branch_name }}
                            </option>
                        </select>
                    </div>
                </div>
                <div class="form-row form-row-2">
                    <div class="f-group">
                        <label class="f-label">Giới Tính</label>
                        <select class="f-select" v-model="form.gender">
                            <option :value="1">Nam</option>
                            <option :value="0">Nữ</option>
                            <option :value="2">Khác</option>
                        </select>
                    </div>
                    <div class="f-group">
                        <label class="f-label">Thế Hệ</label>
                        <select class="f-select" v-model="form.generation">
                            <option :value="g" v-for="g in generations" :key="g">Đời {{ g }}</option>
                        </select>
                    </div>
                    <div class="f-group">
                        <label class="f-label">Kiểu</label>
                        <select class="f-select" v-model="form.person_type">
                            <!-- <option :value="null">-- Không chọn --</option> -->
                            <option v-for="item in PERSON_TYPE_OPTIONS" :key="item.value" :value="item.value">
                                {{ item.label }}
                            </option>
                        </select>
                    </div>

                    <div class="f-group">
                        <label class="f-label">Năm Sinh <span class="f-req">*</span></label>
                        <VueDatePicker v-model="form.birth_date" :year-range="[0, 9999]" dark
                            :formats="{ input: 'dd/MM/yyyy HH:mm' }" :locale="vi" />
                        <small v-if="errors.birth_date">{{ errors.birth_date }}</small>
                    </div>
                    <div class="f-group">
                        <label class="f-label">Năm Mất</label>
                        <VueDatePicker v-model="form.death_date" :year-range="[0, 9999]" dark
                            :formats="{ input: 'dd/MM/yyyy HH:mm' }" :locale="vi" />
                    </div>
                </div>
                <div class="form-row form-row-1">
                    <div class="f-group">
                        <label class="f-label">Ảnh đại diện</label>
                        <input class="f-input" v-model="form.avatar" type="hidden" />
                        <!-- ẢNH PREVIEW -->
                        <img v-if="previewImage" :src="previewImage"
                            style="width: 150px; border-radius: 4px; overflow: hidden" />
                        <!-- ẢNH CŨ -->
                        <img v-else-if="form.avatar" :src="`${IMG_URL}${form.avatar}`" style="max-width: 150px" />

                        <p v-else class="ir-val">Chưa có ảnh</p>
                        <button class="btn btn-ghost" @click.prevent="onDeleteImg(form.id)" title="Xóa ảnh"
                            v-if="form.avatar">
                            <i class="fas fa-trash"></i>
                        </button>
                        <input type="file" class="mt-3" @change="onChangFile" accept=".jpeg,.jpg,.png,.webp,.gif" />
                    </div>
                </div>
                <div class="form-row form-row-1">
                    <br />
                </div>
                <div class="form-row form-row-1" style="grid-template-columns: 1fr">
                    <div class="f-group">
                        <label class="f-label">Quê Quán</label>
                        <input class="f-input" v-model="form.place_of_birth" />
                    </div>
                    <div class="f-group">
                        <label class="f-label">Nghề Nghiệp</label>
                        <input class="f-input" v-model="form.job" />
                    </div>
                    <div class="f-group">
                        <label class="f-label">Vai Trò</label>
                        <input class="f-input" v-model="form.biography"
                            placeholder="Ví dụ: Tổ tiên, vợ hoặc chồng, con ..." />
                    </div>
                    <div class="f-group">
                        <label class="f-label">Ghi Chú</label>
                        <textarea class="f-textarea" rows="3" v-model="form.note"></textarea>
                    </div>
                    <div class="f-group">
                        <label class="f-label" v-if="form.is_alive"> Còn sống</label><label class="f-label" v-else>Đã
                            mất</label>
                        <ToggleSwitch v-model="form.is_alive"></ToggleSwitch>
                    </div>
                </div>
            </div>
        </form>

        <!-- FOOTER -->
        <template #footer>
            <button type="button" class="btn btn-ghost" @click="close">Hủy</button>
            <button type="button" class="btn btn-primary" @click="handleSubmit">
                💾 {{ isEdit ? "Cập nhật" : "Thêm mới" }}
            </button>
        </template>
    </SlidePanel>
</template>

<script setup>
import { reactive, watch, computed, ref } from "vue";
import SlidePanel from "../SlidePanel.vue";
import ToggleSwitch from "@/components/common/ToggleSwitch.vue";
import { PERSON_TYPE_OPTIONS } from "@/constants/person-type-options";
import { VueDatePicker } from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { vi } from "date-fns/locale";

const IMG_URL = import.meta.env.VITE_URL;
const previewImage = ref(null);
const imageFile = ref(null);

const onChangFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    imageFile.value = file;
    previewImage.value = URL.createObjectURL(file);
};

const props = defineProps({
    modelValue: Boolean,
    person: Object,
    branchs: Array,
    families: Array,
    generations: Array,
});

const emit = defineEmits(["update:modelValue", "save", "onDeleteImg", "changeFamily"]);

const visible = computed({
    get: () => props.modelValue,
    set: (val) => emit("update:modelValue", val),
});

const isEdit = computed(() => !!props.person?.id);

const form = reactive({
    id: null,
    family_id: null,
    branch_id: null,
    full_name: "",
    gender: null,
    birth_date: null,
    death_date: null,
    biography: "",
    avatar: "",
    generation: null,
    is_alive: null,
    job: "",
    place_of_birth: "",
    note: "",
    person_type: null,
});


const errors = reactive({});

/* RESET */
const resetForm = () => {
    Object.assign(form, {
        id: null,
        family_id: null,
        branch_id: null,
        full_name: "",
        gender: null,
        birth_date: null,
        death_date: null,
        biography: "",
        avatar: "",
        generation: null,
        is_alive: null,
        job: "",
        place_of_birth: "",
        note: "",
        person_type: null,
    });
    previewImage.value = null;
    imageFile.value = null;
    Object.keys(errors).forEach((k) => delete errors[k]);
};

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
                person_type: val.person_type,
            });
        } else {
            resetForm();
        }
    },
    { immediate: true }
);

/* RESET khi đóng panel */
watch(() => visible.value,
    (val) => {
        if (!val) resetForm();
    }
);

/* VALIDATE */
const validate = () => {
    Object.keys(errors).forEach((k) => delete errors[k]);

    if (!form.full_name) errors.full_name = "Họ tên không để trống!";
    if (!form.birth_date) errors.birth_date = "Năm sinh không để trống!";
    if (form.birth_date && form.death_date && new Date(form.birth_date) > new Date(form.death_date)) {
        errors.birth_date = "Năm sinh phải nhỏ hơn năm mất!";
        errors.death_date = "Năm mất phải lớn hơn năm sinh!";
    }
    return Object.keys(errors).length === 0;
};

/* SUBMIT */
const handleSubmit = () => {
    if (!validate()) return;

    emit("save", {
        imageFile: imageFile.value,
        form: { ...form },
        isEdit: isEdit.value
    });
    close();
    resetForm();
};

const onDeleteImg = (id) => {
    previewImage.value = null;
    form.imageUrl = "";
    emit("onDeleteImg", id);
};
// cập nhật branch khi đổi family
watch(() => form.family_id,
    async (val) => {
        emit("changeFamily", val);
    }
);

const close = () => {
    visible.value = false;
};
</script>
