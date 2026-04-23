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
            <div class="card">
                <div class="card-head">
                    <div class="flex-center gap-8"><span style="font-size: 20px;">👑</span>
                        <div>
                            <div class="card-title">Super Admin</div>
                            <div class="card-sub">1 tài khoản</div>
                        </div>
                    </div><span class="badge role-superadmin">Super Admin</span>
                </div>
                <div class="card-body">
                    <div style="font-size: 13px; color: var(--text-secondary); margin-bottom: 12px;">Toàn quyền trên hệ
                        thống. Có thể thực hiện mọi thao tác bao gồm xoá dữ liệu và quản lý tài khoản.</div>
                    <div class="tag-list"><span class="chip">Toàn quyền</span><span class="chip">Quản lý
                            users</span><span class="chip">Cài đặt hệ thống</span><span class="chip">Sao lưu</span>
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="card-head">
                    <div class="flex-center gap-8"><span style="font-size: 20px;">🛡️</span>
                        <div>
                            <div class="card-title">Admin</div>
                            <div class="card-sub">2 tài khoản</div>
                        </div>
                    </div><span class="badge role-admin">Admin</span>
                </div>
                <div class="card-body">
                    <div style="font-size: 13px; color: var(--text-secondary); margin-bottom: 12px;">Quản lý nội dung và
                        người dùng ở mức hạn chế. Không thể thay đổi cấu hình hệ thống lõi.</div>
                    <div class="tag-list"><span class="chip">Quản lý nội dung</span><span class="chip">Duyệt yêu
                            cầu</span><span class="chip">Xuất dữ liệu</span><span class="chip">Sao lưu</span></div>
                </div>
            </div>
            <div class="card">
                <div class="card-head">
                    <div class="flex-center gap-8"><span style="font-size: 20px;">✏️</span>
                        <div>
                            <div class="card-title">Biên tập viên</div>
                            <div class="card-sub">2 tài khoản</div>
                        </div>
                    </div><span class="badge role-editor">Editor</span>
                </div>
                <div class="card-body">
                    <div style="font-size: 13px; color: var(--text-secondary); margin-bottom: 12px;">Biên tập viên có
                        thể thêm và sửa nội dung nhưng không thể xoá hoặc truy cập tính năng quản trị.</div>
                    <div class="tag-list"><span class="chip">Thêm thành viên</span><span class="chip">Sửa nội
                            dung</span><span class="chip">Quản lý sự kiện</span></div>
                </div>
            </div>
            <div class="card">
                <div class="card-head">
                    <div class="flex-center gap-8"><span style="font-size: 20px;">👁️</span>
                        <div>
                            <div class="card-title">Xem</div>
                            <div class="card-sub">1 tài khoản</div>
                        </div>
                    </div><span class="badge role-viewer">Viewer</span>
                </div>
                <div class="card-body">
                    <div style="font-size: 13px; color: var(--text-secondary); margin-bottom: 12px;">Chỉ có quyền xem dữ
                        liệu. Dành cho thành viên gia đình muốn tra cứu thông tin.</div>
                    <div class="tag-list"><span class="chip">Xem thành viên</span><span class="chip">Xem sự kiện</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>