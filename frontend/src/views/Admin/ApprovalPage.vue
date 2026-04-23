<template>
    <!-- ====== APPROVAL ====== -->
    <div class="page">
        <div class="ph">
            <div class="ph-eyebrow">Quản Trị Hệ Thống</div>
            <div class="ph-row">
                <div>
                    <div class="ph-title">Duyệt Yêu Cầu</div>
                    <div class="ph-sub">
                        3 yêu cầu đang chờ xử lý
                    </div>
                </div>
            </div>
        </div>

        <div style="display: flex; flex-direction: column; gap: 2px;">
            <div class="card">
                <div class="card-body" style="padding: 16px 20px;">
                    <div class="flex-between">
                        <div class="flex-center gap-12"><span style="font-size: 28px;">👤</span>
                            <div>
                                <div class="flex-center gap-8 mb-4"><span class="fw-6"
                                        style="font-size: 14px; color: var(--text-primary);">Thêm thành viên: Nguyễn Văn
                                        Mới</span><span class="badge b-gold">Thành Viên</span></div>
                                <div class="text-sm text-secondary"> Yêu cầu bởi <strong
                                        style="color: var(--gold);">Trần Thị Quản</strong> — 2 giờ trước</div>
                                <div class="text-sm text-secondary mt-4">Yêu cầu thêm thành viên mới đời thứ 5 vào dòng
                                    họ.</div>
                            </div>
                        </div>
                        <div class="flex gap-8"><button class="btn btn-danger btn-sm"> ✕ Từ Chối </button><button
                                class="btn btn-primary btn-sm"> ✓ Duyệt </button></div>
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="card-body" style="padding: 16px 20px;">
                    <div class="flex-between">
                        <div class="flex-center gap-12"><span style="font-size: 28px;">✏️</span>
                            <div>
                                <div class="flex-center gap-8 mb-4"><span class="fw-6"
                                        style="font-size: 14px; color: var(--text-primary);">Sửa thông tin: Nguyễn Đức
                                        Hùng</span><span class="badge b-gold">Chỉnh Sửa</span></div>
                                <div class="text-sm text-secondary"> Yêu cầu bởi <strong style="color: var(--gold);">Lê
                                        Văn Biên</strong> — 5 giờ trước</div>
                                <div class="text-sm text-secondary mt-4">Cập nhật năm sinh và nghề nghiệp của thành
                                    viên.</div>
                            </div>
                        </div>
                        <div class="flex gap-8"><button class="btn btn-danger btn-sm"> ✕ Từ Chối </button><button
                                class="btn btn-primary btn-sm"> ✓ Duyệt </button></div>
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="card-body" style="padding: 16px 20px;">
                    <div class="flex-between">
                        <div class="flex-center gap-12"><span style="font-size: 28px;">🗑️</span>
                            <div>
                                <div class="flex-center gap-8 mb-4"><span class="fw-6"
                                        style="font-size: 14px; color: var(--text-primary);">Xoá sự kiện: Họp mặt
                                        2022</span><span class="badge b-gold">Sự Kiện</span></div>
                                <div class="text-sm text-secondary"> Yêu cầu bởi <strong
                                        style="color: var(--gold);">Phạm Thị Xem</strong> — 1 ngày trước</div>
                                <div class="text-sm text-secondary mt-4">Yêu cầu xoá sự kiện đã quá hạn.</div>
                            </div>
                        </div>
                        <div class="flex gap-8"><button class="btn btn-danger btn-sm"> ✕ Từ Chối </button><button
                                class="btn btn-primary btn-sm"> ✓ Duyệt </button></div>
                    </div>
                </div>
            </div><!---->
        </div>

        <div class="mt-20">
            <div class="ph-title" style="font-size: 16px; margin-bottom: 16px">
                📋 Lịch Sử Duyệt
            </div>
            <div class="card">
                <table class="tbl">
                    <thead>
                        <tr>
                            <th>Yêu Cầu</th>
                            <th>Loại</th>
                            <th>Người Yêu Cầu</th>
                            <th>Xử Lý Bởi</th>
                            <th>Thời Gian</th>
                            <th>Kết Quả</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="fw-6" style="color: var(--text-primary);">Thêm Nguyễn Phúc An</td>
                            <td><span class="badge b-gold">Thành Viên</span></td>
                            <td class="text-secondary">Admin</td>
                            <td class="text-secondary">Super Admin</td>
                            <td class="font-mono text-sm text-secondary">15/01/2024</td>
                            <td><span class="badge b-green">Đã duyệt</span></td>
                        </tr>
                        <tr>
                            <td class="fw-6" style="color: var(--text-primary);">Sửa thông tin sự kiện</td>
                            <td><span class="badge b-gold">Sự Kiện</span></td>
                            <td class="text-secondary">Editor</td>
                            <td class="text-secondary">Admin</td>
                            <td class="font-mono text-sm text-secondary">10/01/2024</td>
                            <td><span class="badge b-green">Đã duyệt</span></td>
                        </tr>
                        <tr>
                            <td class="fw-6" style="color: var(--text-primary);">Xoá thành viên trùng</td>
                            <td><span class="badge b-gold">Thành Viên</span></td>
                            <td class="text-secondary">Admin</td>
                            <td class="text-secondary">Super Admin</td>
                            <td class="font-mono text-sm text-secondary">05/01/2024</td>
                            <td><span class="badge b-red">Từ chối</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>