<template>
    <SlidePanel v-model="visible">
        <!-- HEADER -->
        <template #header>
            <div>
                <div class="sp-title">
                    {{ person?.full_name }} - <span class="badge" :class="'gen-' + person?.generation">Đời {{
                        person?.generation
                        }}</span>
                </div>
                <div class="sp-sub">
                    Cập nhật các mối quan hệ
                </div>
            </div>
        </template>

        <!-- BODY -->
        <form @submit.prevent="handleSubmit">
            <div class="sp-body">
                <!-- nếu là con dâu hoặc con dể thì không cần chọn bố mẹ -->
                <template v-if="person?.person_type === PersonType.SON || person?.person_type === PersonType.DAUGHTER">
                    <div class="form-row form-row-2">
                        <div class="f-group">
                            <label class="f-label">Bố</label>
                            <SearchSelect v-model="form.father_id" :options="personMen" label-field="full_name"
                                value-field="id" placeholder="Chọn bố" @change="onChangeMen" />
                            <div class="sp-sub" v-if="parentChild">{{ parentChild.father_name }}</div>
                        </div>
                        <div class="f-group">
                            <label class="f-label">Mẹ</label>
                            <SearchSelect v-model="form.mother_id" :options="personWomen" label-field="full_name"
                                value-field="id" placeholder="Chọn mẹ" @change="onChangeWomen" />
                            <div class="sp-sub" v-if="parentChild">{{ parentChild.mother_name }}</div>
                        </div>
                    </div>
                    <div class="form-row form-row-1">
                        <div class="f-group">

                            <label class="f-label"> {{ form.relationship_type === 0 ? 'Con đẻ' : 'Con nuôi' }}</label>
                            <ToggleSwitchNumber v-model="form.relationship_type"></ToggleSwitchNumber>
                        </div>
                    </div>
                </template>
                <!-- cập nhật thông tin vợ chồng -->
                <div class="form-row form-row-1">
                    <div class="divider"></div>
                    <div class="section-label">Vợ / chồng</div>
                </div>

                <div class="form-row form-row-2">
                    <div class="f-group">
                        <label class="f-label">{{ person?.gender === 1 ? 'Cập nhật vợ' : 'Cập nhật chồng' }}</label>
                        <SearchSelect v-model="form.spouse_id" :options="personMen.concat(personWomen)"
                            label-field="full_name" value-field="id" placeholder="Chọn vợ hoặc chồng" />
                    </div>
                </div>



            </div>
        </form>

        <!-- FOOTER -->
        <template #footer>
            <button type="button" class="btn btn-ghost" @click="close">Hủy</button>
            <button type="button" class="btn btn-primary" @click="handleSubmit">
                💾 Cập nhật
            </button>
        </template>
    </SlidePanel>
</template>
<script setup>
import { computed, reactive, watch } from "vue";
import SlidePanel from "../SlidePanel.vue";
import SearchSelect from "@/components/common/SearchSelect.vue";
import ToggleSwitchNumber from "@/components/common/ToggleSwitchNumber.vue";
import { PersonType } from "@/enum/person-type.enum.js"

const props = defineProps({
    modelValue: Boolean,
    person: Object,
    personMen: Array,
    personWomen: Array,
    parentChild: Object
});

const form = reactive({
    id: null,
    father_id: null,
    mother_id: null,
    child_id: null,
    relationship_type: 0
});

const resetForm = () => {
    form.id = null;
    form.father_id = null;
    form.mother_id = null;
    form.child_id = null;
    form.relationship_type = 0;
};

watch(
    () => props.parentChild,
    (val) => {
        if (val) {
            Object.assign(form, {
                id: val.id,
                father_id: val.father_id,
                mother_id: val.mother_id,
                child_id: val.child_id,
                relationship_type: val.relationship_type
            });
        } else {
            resetForm();
        }
    },
    { immediate: true }
);

const emit = defineEmits(["update:modelValue", "save"]);

const visible = computed({
    get: () => props.modelValue,
    set: (val) => emit("update:modelValue", val),
});

const onChangeMen = (val) => {
    form.father_id = val ? val.id : null;
};

const onChangeWomen = (val) => {
    form.mother_id = val ? val.id : null;
};


/* SUBMIT */
const handleSubmit = () => {
    form.child_id = props.person.id;
    emit("save", { ...form });
    close();

};

const close = () => {
    resetForm();
    visible.value = false;
};
</script>