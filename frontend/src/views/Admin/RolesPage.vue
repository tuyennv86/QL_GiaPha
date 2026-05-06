<template>
    <!-- ====== ROLES ====== -->
    <div class="page">
        <div class="ph">
            <div class="ph-eyebrow">Quản Trị Hệ Thống</div>
            <div class="ph-row">
                <div>
                    <div class="ph-title">Phân Quyền & Vai Trò</div>
                    <div class="ph-sub">
                        Ma trận quyền hạn cho từng vai trò trong hệ thống
                    </div>
                </div>
            </div>
        </div>

        <div class="card mb-16">
            <div class="card-head">
                <div class="card-title">📋 Ma Trận Quyền Hạn</div>
            </div>
            <div class="card-body" style="padding: 0; overflow-x: auto">
                <table class="perm-matrix">
                    <thead>
                        <tr>
                            <th style="width: 200px;">Chức Năng</th>
                            <th>Super Admin</th>
                            <th>Admin</th>
                            <th>Biên Tập Viên</th>
                            <th>Xem</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="text-align: left; font-weight: 500; color: var(--text-primary);">Xem thành viên
                            </td>
                            <td><span class="perm-check perm-yes">✓</span></td>
                            <td><span class="perm-check perm-yes">✓</span></td>
                            <td><span class="perm-check perm-yes">✓</span></td>
                            <td><span class="perm-check perm-yes">✓</span></td>
                        </tr>
                        <tr>
                            <td style="text-align: left; font-weight: 500; color: var(--text-primary);">Thêm thành viên
                            </td>
                            <td><span class="perm-check perm-yes">✓</span></td>
                            <td><span class="perm-check perm-yes">✓</span></td>
                            <td><span class="perm-check perm-partial">~</span></td>
                            <td><span class="perm-check perm-no">✗</span></td>
                        </tr>
                        <tr>
                            <td style="text-align: left; font-weight: 500; color: var(--text-primary);">Sửa thành viên
                            </td>
                            <td><span class="perm-check perm-yes">✓</span></td>
                            <td><span class="perm-check perm-yes">✓</span></td>
                            <td><span class="perm-check perm-partial">~</span></td>
                            <td><span class="perm-check perm-no">✗</span></td>
                        </tr>
                        <tr>
                            <td style="text-align: left; font-weight: 500; color: var(--text-primary);">Xoá thành viên
                            </td>
                            <td><span class="perm-check perm-yes">✓</span></td>
                            <td><span class="perm-check perm-yes">✓</span></td>
                            <td><span class="perm-check perm-no">✗</span></td>
                            <td><span class="perm-check perm-no">✗</span></td>
                        </tr>
                        <tr>
                            <td style="text-align: left; font-weight: 500; color: var(--text-primary);">Quản lý sự kiện
                            </td>
                            <td><span class="perm-check perm-yes">✓</span></td>
                            <td><span class="perm-check perm-yes">✓</span></td>
                            <td><span class="perm-check perm-yes">✓</span></td>
                            <td><span class="perm-check perm-no">✗</span></td>
                        </tr>
                        <tr>
                            <td style="text-align: left; font-weight: 500; color: var(--text-primary);">Quản lý người
                                dùng</td>
                            <td><span class="perm-check perm-yes">✓</span></td>
                            <td><span class="perm-check perm-partial">~</span></td>
                            <td><span class="perm-check perm-no">✗</span></td>
                            <td><span class="perm-check perm-no">✗</span></td>
                        </tr>
                        <tr>
                            <td style="text-align: left; font-weight: 500; color: var(--text-primary);">Phân quyền</td>
                            <td><span class="perm-check perm-yes">✓</span></td>
                            <td><span class="perm-check perm-no">✗</span></td>
                            <td><span class="perm-check perm-no">✗</span></td>
                            <td><span class="perm-check perm-no">✗</span></td>
                        </tr>
                        <tr>
                            <td style="text-align: left; font-weight: 500; color: var(--text-primary);">Cài đặt hệ thống
                            </td>
                            <td><span class="perm-check perm-yes">✓</span></td>
                            <td><span class="perm-check perm-partial">~</span></td>
                            <td><span class="perm-check perm-no">✗</span></td>
                            <td><span class="perm-check perm-no">✗</span></td>
                        </tr>
                        <tr>
                            <td style="text-align: left; font-weight: 500; color: var(--text-primary);">Sao lưu / Phục
                                hồi</td>
                            <td><span class="perm-check perm-yes">✓</span></td>
                            <td><span class="perm-check perm-yes">✓</span></td>
                            <td><span class="perm-check perm-no">✗</span></td>
                            <td><span class="perm-check perm-no">✗</span></td>
                        </tr>
                        <tr>
                            <td style="text-align: left; font-weight: 500; color: var(--text-primary);">Xuất dữ liệu
                            </td>
                            <td><span class="perm-check perm-yes">✓</span></td>
                            <td><span class="perm-check perm-yes">✓</span></td>
                            <td><span class="perm-check perm-partial">~</span></td>
                            <td><span class="perm-check perm-no">✗</span></td>
                        </tr>
                        <tr>
                            <td style="text-align: left; font-weight: 500; color: var(--text-primary);">Xem nhật ký</td>
                            <td><span class="perm-check perm-yes">✓</span></td>
                            <td><span class="perm-check perm-yes">✓</span></td>
                            <td><span class="perm-check perm-no">✗</span></td>
                            <td><span class="perm-check perm-no">✗</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div class="grid-2" style="gap: 2px;">

            <div class="card" v-for="role in roleStore.roles" :key="role.id">
                <div class="card-head">
                    <div class="flex-center gap-8"><span style="font-size: 20px;"><i
                                class="fas fa-pencil-alt"></i></span>
                        <div>
                            <div class="card-title">{{ role.role_name }}</div>
                            <div class="card-sub">{{ role.users_count }} tài khoản</div>
                        </div>
                    </div><span class="badge role-superadmin">{{ role.role_name }}</span>
                </div>
                <div class="card-body">
                    <div style="font-size: 13px; color: var(--text-secondary); margin-bottom: 12px;">{{ role.description
                        }}</div>
                </div>
            </div>

        </div>
    </div>
</template>
<script setup>
import { onMounted } from 'vue';
import { useRoleStore } from '@/stores/role.store';

const roleStore = useRoleStore();


const loadData = async () => {
    await roleStore.rolesWithUserCount();
};

onMounted(async () => {
    await loadData();
    //    document.title = 'Vai Trò & Phân Quyền - Quản Trị Hệ Thống';

});

</script>