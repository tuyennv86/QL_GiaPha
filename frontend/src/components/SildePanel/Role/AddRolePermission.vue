<template>
    <SlidePanel v-model="visible">
        <!-- HEADER -->
        <template #header>
            <div>
                <div class="sp-title">Phân quyền vai trò</div>
                <div v-if="role" class="sp-sub">{{ role.role_name }}</div>
            </div>
        </template>
        <!-- BODY -->
        <div class="sp-body">
            <div class="permission-tree">
                <div v-for="group in menuTree" :key="group.id" class="group">
                    <!-- GROUP -->
                    <div class="group-title">
                        <label>
                            <input type="checkbox" :checked="isGroupSelected(group)"
                                @change="toggleGroup(group, $event.target.checked)" />
                            <i :class="group.icon"></i> {{ group.menu_name }}
                        </label>
                    </div>
                    <!-- MENUS -->
                    <div v-for="menu in group.children" :key="menu.id" class="menu-item">
                        <div class="menu-header">
                            <label class="menu-check">
                                <input type="checkbox" :checked="selectedMenus.includes(menu.id)"
                                    @change="toggleMenu(menu.id, $event.target.checked)" />
                                <i :class="menu.icon"></i> {{ menu.menu_name }}
                            </label>
                        </div>
                        <div v-if="menu.permissions?.length" class="permission-list">
                            <label v-for="permission in menu.permissions" :key="permission.id">
                                <input type="checkbox" :checked="selectedPermissions.includes(permission.id)"
                                    @change="togglePermission(menu, permission.id, $event.target.checked)" />
                                {{ getActionName(permission.permission_code) }}
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- FOOTER -->
        <template #footer>
            <button class="btn btn-ghost" @click="close">Hủy</button>
            <button class="btn btn-primary" @click="handleSubmit">💾 Lưu phân quyền</button>
        </template>
    </SlidePanel>
</template>


<script setup>
import { computed, ref, watch } from "vue";
import SlidePanel from "../SlidePanel.vue";

const props = defineProps({
    modelValue: Boolean,

    role: {
        type: Object,
        default: null,
    },
    menus: {
        type: Array,
        default: () => [],
    },
    roleMenus: {
        type: Array,
        default: () => [],
    },
    rolePermissions: {
        type: Array,
        default: () => [],
    },
});

const emit = defineEmits([
    "update:modelValue",
    "save",
]);

/* PANEL */

const visible = computed({
    get: () => props.modelValue,
    set: (value) =>
        emit("update:modelValue", value),
});

/* STATE */

const selectedMenus = ref([]);
const selectedPermissions = ref([]);

/* LOAD ROLE MENUS */

watch(
    () => props.roleMenus, (val) => {
        selectedMenus.value = (val || []).map(item => item.menu_id);
    },
    {
        immediate: true
    }
);
/* LOAD ROLE PERMISSIONS */

watch(() => props.rolePermissions, (val) => {
    selectedPermissions.value = (val || []).map(item => item.permission_id);
},
    {
        immediate: true
    }
);

/* BUILD TREE */

const menuTree = computed(() => {

    const map = {};
    const roots = [];

    props.menus.forEach(menu => {
        map[menu.id] = {
            ...menu,
            children: [],
        };
    });

    props.menus.forEach(menu => {
        if (menu.parent_id && map[menu.parent_id]) {
            map[menu.parent_id].children.push(
                map[menu.id]
            );
        } else {
            roots.push(map[menu.id]);
        }
    });
    return roots;

});

/* MENU */

const toggleMenu = (menuId, checked) => {

    const menu = props.menus.find(x => x.id === menuId);
    if (!menu) return;
    if (checked) {
        if (!selectedMenus.value.includes(menuId)) {
            selectedMenus.value.push(menuId);
        }
        // auto check parent
        if (menu.parent_id && !selectedMenus.value.includes(menu.parent_id)) {
            selectedMenus.value.push(menu.parent_id);
        }

    } else {
        selectedMenus.value = selectedMenus.value.filter(id => id !== menuId);
        // remove permissions
        if (menu.permissions?.length) {
            const permissionIds = menu.permissions.map(p => p.id);
            selectedPermissions.value = selectedPermissions.value.filter(id => !permissionIds.includes(id));
        }

        // remove parent if no child selected

        if (menu.parent_id) {
            const siblings = props.menus.filter(x => x.parent_id === menu.parent_id);

            const hasSelected = siblings.some(x => selectedMenus.value.includes(x.id));

            if (!hasSelected) {
                selectedMenus.value = selectedMenus.value.filter(id => id !== menu.parent_id);
            }
        }
    }
};

const isGroupSelected = (group) => {
    return selectedMenus.value.includes(group.id);
};

const toggleGroup = (group, checked) => {

    if (checked) {
        // root
        if (!selectedMenus.value.includes(group.id)) {
            selectedMenus.value.push(group.id);
        }
        // children
        group.children.forEach(
            menu => {
                if (!selectedMenus.value.includes(menu.id)) {
                    selectedMenus.value.push(menu.id);
                }
            });

    } else {
        // remove root
        selectedMenus.value = selectedMenus.value.filter(id => id !== group.id);

        // remove children + permissions

        group.children.forEach(menu => {
            selectedMenus.value = selectedMenus.value.filter(id => id !== menu.id);
            if (menu.permissions?.length) {
                const permissionIds = menu.permissions.map(p => p.id);
                selectedPermissions.value = selectedPermissions.value.filter(id => !permissionIds.includes(id));
            }
        });
    }

};

/* PERMISSION */

const togglePermission = (menu, permissionId, checked) => {

    if (checked) {
        if (!selectedPermissions.value.includes(permissionId)
        ) {
            selectedPermissions.value.push(permissionId);
        }
        // menu
        if (!selectedMenus.value.includes(menu.id)) {
            selectedMenus.value.push(menu.id);
        }
        // parent
        if (menu.parent_id && !selectedMenus.value.includes(menu.parent_id)) {
            selectedMenus.value.push(menu.parent_id);
        }

    } else {
        selectedPermissions.value = selectedPermissions.value.filter(id => id !== permissionId);
    }

};
/* LABEL */

const getActionName = (permissionCode) => {

    const action = permissionCode.split(".")[1];

    const map = {
        view: "Xem",
        create: "Thêm",
        edit: "Sửa",
        delete: "Xóa",
        import: "Import",
        export: "Export",
        assign: "Phân quyền",
        approve: "Duyệt",
    };

    return (
        map[action] || action
    );
};

/* SAVE */

const handleSubmit = () => {

    emit("save", {
        roleId: props.role?.id,
        menuIds: [...selectedMenus.value],
        permissionIds: [...selectedPermissions.value]
    });

    close();
};

const close = () => {
    visible.value = false;
};
</script>

<style scoped>
.permission-tree {
    padding: 10px;
}

.group {
    margin-bottom: 24px;
}

.group-title {
    font-weight: 700;
    color: var(--text-primary);
    padding-bottom: 8px;
    border-bottom: 1px solid var(--border);
    margin-bottom: 12px;
    display: flex;
    gap: 8px;
    align-items: center;
}

.group-title label {
    display: flex;
    gap: 10px;
    align-items: center;
    cursor: pointer;
}

.menu-item {
    margin-left: 24px;
    margin-bottom: 14px;
}

.menu-header {
    color: #dddfe2;
    margin-bottom: 8px;
    display: flex;
    gap: 8px;
    align-items: center;
}

.menu-check {
    display: flex;
    gap: 10px;
    align-items: center;
    cursor: pointer;
    font-weight: 600;
}

.permission-list {
    margin-left: 28px;

    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

.permission-list label {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 6px 12px;
    border: 1px solid #494a4d;
    border-radius: 6px;
    cursor: pointer;
    transition: 0.2s;
}

.permission-list label:hover {
    background: #080808;
}

.permission-list input {
    cursor: pointer;
}
</style>
