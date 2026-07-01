import { useAuthStore } from "@/stores/auth.store";

function hasPermission(auth, value) {

    // person.create
    if (typeof value === "string") {
        return auth.hasPermission(value);
    }

    // ['edit','delete'] => OR
    if (Array.isArray(value)) {
        return value.some(p => auth.hasPermission(p));
    }

    // { any:[...] } chỉ cần có 1 quyền trong mảng là đủ
    if (value.any) {
        return value.any.some(p => auth.hasPermission(p));
    }

    // { all:[...] } phải đủ tất cả quyền trong mảng mới đủ
    if (value.all) {
        return value.all.every(p => auth.hasPermission(p));
    }

    return false;
}

export default {
    mounted(el, binding) {

        const auth = useAuthStore();
        const allow = hasPermission(auth, binding.value);

        // mặc định: remove
        if (!binding.arg) {
            if (!allow) {
                el.remove();
            }
            return;
        }

        // click
        if (binding.arg === "click") {

            if (!allow) {

                el.style.cursor = "not-allowed";
                el.style.opacity = "0.6";

                el.addEventListener(
                    "click",
                    (e) => {
                        e.preventDefault();
                        e.stopImmediatePropagation();
                    },
                    true
                );
            }
        }

        // disable
        if (binding.arg === "disable") {

            if (!allow) {
                el.disabled = true;
                el.classList.add("disabled");
            }

        }

    }
};

// <!-- Chỉ tạo -->
// <button v-permission="'person.create'">
//     Thêm
// </button>

// <!-- Có sửa HOẶC xóa -->
// <button v-permission="['person.edit','person.delete']">
//     Thao tác
// </button>

// <!-- Chỉ cần có 1 quyền trong đó là đủ -->
// <button
//     v-permission="{
//         any:['person.edit','person.delete','person.create']
//     }">
//     Quản trị
// </button>

// <!-- Phải có cả sửa và xóa -->
// <button
//     v-permission="{
//         all:['person.edit','person.delete']
//     }">
//     Quản trị
// </button>

//vẫn hiển thị không tương tác được nếu không có quyền
//v-permission:click="'user.edit'"

//disable nếu không có quyền
//v-permission:disable="'person.edit'"