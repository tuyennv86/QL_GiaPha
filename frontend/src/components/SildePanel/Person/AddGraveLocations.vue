<template>
    <SlidePanel v-model="visible">
        <!-- HEADER -->
        <template #header>
            <div>
                <div class="sp-title">
                    Cập nhật mộ phần : {{ person?.full_name }}
                </div>

            </div>
        </template>

        <!-- BODY -->
        <form @submit.prevent="handleSubmit">
            <div class="sp-body">
                <div class="form-row form-row-1" style="grid-template-columns: 1fr">
                    <div class="f-group">
                        <label class="f-label">Nghĩa trang <span class="f-req">*</span></label>
                        <input class="f-input" v-model="form.cemetery_name" />
                        <small v-if="errors.cemetery_name">{{ errors.cemetery_name }}</small>
                    </div>
                </div>
                <div class="form-row form-row-1">
                    <div class="f-group">
                        <label class="f-label">Khu vực</label>
                        <input class="f-input" v-model="form.area" />
                    </div>
                </div>
                <div class="form-row form-row-2">
                    <div class="f-group">
                        <label class="f-label">Hàng</label>
                        <input class="f-input" v-model="form.row_number" />
                    </div>
                    <div class="f-group">
                        <label class="f-label">Cột</label>
                        <input class="f-input" v-model="form.plot_number" />
                    </div>
                </div>
                <div class="form-row form-row-2">
                    <div class="f-group">
                        <label class="f-label">Kinh độ</label>
                        <input class="f-input" v-model="form.latitude" />
                    </div>
                    <div class="f-group">
                        <label class="f-label">Vĩ độ</label>
                        <input class="f-input" v-model="form.longitude" />
                    </div>
                </div>
                <div class="form-row form-row-1">
                    <div class="f-group">
                        <label class="f-label">Ảnh</label>
                        <input class="f-input" v-model="form.map_image" type="hidden" />
                        <!-- ẢNH PREVIEW -->
                        <img v-if="previewImage" :src="previewImage"
                            style="width: 150px; border-radius: 4px; overflow: hidden" />
                        <!-- ẢNH CŨ -->
                        <img v-else-if="form.map_image" :src="`${IMG_URL}${form.map_image}`" style="max-width: 150px" />

                        <p v-else class="ir-val">Chưa có ảnh</p>
                        <button class="btn btn-ghost" @click.prevent="onDeleteImg(form.id)" title="Xóa ảnh"
                            v-if="form.map_image">
                            <i class="fas fa-trash"></i>
                        </button>
                        <input ref="fileInput" type="file" class="mt-3" @change="onChangFile"
                            accept=".jpeg,.jpg,.png,.webp,.gif" />
                    </div>
                </div>
                <div class="form-row form-row-1">
                    <div class="f-group">
                        <label class="f-label">Ghi chú</label>
                        <textarea class="f-input" v-model="form.note" rows="3"></textarea>
                    </div>
                </div>

            </div>
        </form>

        <!-- FOOTER -->
        <template #footer>
            <button type="button" class="btn btn-ghost" @click="close">Hủy</button>
            <button type="button" class="btn btn-primary" @click="handleSubmit"
                v-permission="['person.edit', 'person.create']">
                💾 Cập nhật
            </button>
        </template>
    </SlidePanel>
</template>

<script setup>
import { reactive, watch, computed, ref } from "vue";
import SlidePanel from "../SlidePanel.vue";

const fileInput = ref(null);

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
    graveLocal: Object
});

const emit = defineEmits(["update:modelValue", "save", "onDeleteImg"]);

const visible = computed({
    get: () => props.modelValue,
    set: (val) => emit("update:modelValue", val),
});

const isEdit = computed(() => !!props.graveLocal?.id);

const form = reactive({
    id: null,
    person_id: null,
    cemetery_name: "",
    area: "",
    row_number: "",
    plot_number: "",
    latitude: null,
    longitude: null,
    map_image: "",
    note: "",
});


const errors = reactive({});

/* RESET */
const resetForm = () => {
    Object.assign(form, {
        id: null,
        person_id: null,
        cemetery_name: "",
        area: "",
        row_number: "",
        plot_number: "",
        latitude: null,
        longitude: null,
        map_image: "",
        note: "",
    });
    previewImage.value = null;
    imageFile.value = null;
    if (fileInput.value) {
        fileInput.value.value = "";
    }
    Object.keys(errors).forEach((k) => delete errors[k]);
};

/* LOAD DATA */
watch(
    () => props.graveLocal,
    (val) => {
        if (val) {
            Object.assign(form, {
                id: val.id,
                person_id: val.person_id,
                cemetery_name: val.cemetery_name || "",
                area: val.area || "",
                row_number: val.row_number || "",
                plot_number: val.plot_number || "",
                latitude: val.latitude || null,
                longitude: val.longitude || null,
                map_image: val.map_image || "",
                note: val.note || "",
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

    if (!form.cemetery_name) errors.cemetery_name = "Tên nghĩa trang không để trống!";
    return Object.keys(errors).length === 0;
};

/* SUBMIT */
const handleSubmit = () => {
    if (!validate()) return;
    if (!form.person_id)
        form.person_id = props.person?.id;
    emit("save", {
        imageFile: imageFile.value,
        form: { ...form },
        isEdit: isEdit.value
    });
    if (isEdit.value) {
        close();
    }
    // resetForm();
};

const onDeleteImg = (id) => {
    previewImage.value = null;
    form.map_image = "";
    emit("onDeleteImg", id);
};

const close = () => {
    visible.value = false;
};
</script>
