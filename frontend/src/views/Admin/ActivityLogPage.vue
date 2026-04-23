<template>
    <!-- ====== ACTIVITY LOG ====== -->
    <div class="page">
        <div class="ph">
            <div class="ph-eyebrow">Hệ Thống</div>
            <div class="ph-row">
                <div>
                    <div class="ph-title">Nhật Ký Hoạt Động</div>
                    <div class="ph-sub">
                        Toàn bộ lịch sử thao tác trên hệ thống
                    </div>
                </div>
                <div class="flex gap-8">
                    <button class="btn btn-secondary btn-sm">⬇ Xuất Log</button>
                    <button class="btn btn-danger btn-sm">🗑 Xoá Log Cũ</button>
                </div>
            </div>
        </div>

        <div class="card mb-16">
            <div class="card-body" style="padding: 14px 20px">
                <div class="select-bar">
                    <div class="search-bar">
                        <span style="color: var(--text-dim)">🔍</span>
                        <input placeholder="Tìm theo hành động, người dùng..." />
                    </div>
                    <select class="f-select" style="width: auto; padding: 8px 12px">
                        <option>Tất cả loại</option>
                        <option>CREATE</option>
                        <option>UPDATE</option>
                        <option>DELETE</option>
                        <option>LOGIN</option>
                        <option>EXPORT</option>
                    </select>
                    <select class="f-select" style="width: auto; padding: 8px 12px">
                        <option>7 ngày gần đây</option>
                        <option>30 ngày</option>
                        <option>3 tháng</option>
                    </select>
                </div>
            </div>
        </div>

        <div class="card">
            <table class="tbl">
                <thead>
                    <tr>
                        <th>Thời Gian</th>
                        <th>Người Dùng</th>
                        <th>Hành Động</th>
                        <th>Đối Tượng</th>
                        <th>IP</th>
                        <th>Chi Tiết</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="font-mono text-xs text-secondary">2024-01-15 08:32:15</td>
                        <td>
                            <div class="flex-center gap-6">
                                <div class="tbl-ava"
                                    style="width: 22px; height: 22px; font-size: 9px; background: var(--gold) 22; color: var(--gold);">
                                    A</div><span class="text-sm">Admin</span>
                            </div>
                        </td>
                        <td><span class="inline-code" style="color: rgb(190, 149, 255);">LOGIN</span></td>
                        <td class="text-secondary text-sm">Hệ thống</td>
                        <td class="font-mono text-xs text-dim">192.168.1.1</td>
                        <td class="text-dim text-xs">Đăng nhập thành công</td>
                    </tr>
                    <tr>
                        <td class="font-mono text-xs text-secondary">2024-01-15 07:15:30</td>
                        <td>
                            <div class="flex-center gap-6">
                                <div class="tbl-ava"
                                    style="width: 22px; height: 22px; font-size: 9px; background: var(--gold) 22; color: var(--gold);">
                                    T</div><span class="text-sm">Trần Thị Quản</span>
                            </div>
                        </td>
                        <td><span class="inline-code" style="color: rgb(66, 190, 101);">CREATE</span></td>
                        <td class="text-secondary text-sm">Members:15</td>
                        <td class="font-mono text-xs text-dim">192.168.1.5</td>
                        <td class="text-dim text-xs">Thêm Nguyễn Văn Mới</td>
                    </tr>
                    <tr>
                        <td class="font-mono text-xs text-secondary">2024-01-14 16:40:10</td>
                        <td>
                            <div class="flex-center gap-6">
                                <div class="tbl-ava"
                                    style="width: 22px; height: 22px; font-size: 9px; background: var(--gold) 22; color: var(--gold);">
                                    L</div><span class="text-sm">Lê Văn Biên</span>
                            </div>
                        </td>
                        <td><span class="inline-code" style="color: rgb(120, 169, 255);">UPDATE</span></td>
                        <td class="text-secondary text-sm">Members:10</td>
                        <td class="font-mono text-xs text-dim">192.168.1.8</td>
                        <td class="text-dim text-xs">Cập nhật nghề nghiệp</td>
                    </tr>
                    <tr>
                        <td class="font-mono text-xs text-secondary">2024-01-14 14:00:00</td>
                        <td>
                            <div class="flex-center gap-6">
                                <div class="tbl-ava"
                                    style="width: 22px; height: 22px; font-size: 9px; background: var(--gold) 22; color: var(--gold);">
                                    A</div><span class="text-sm">Admin</span>
                            </div>
                        </td>
                        <td><span class="inline-code" style="color: rgb(120, 169, 255);">EXPORT</span></td>
                        <td class="text-secondary text-sm">Members (all)</td>
                        <td class="font-mono text-xs text-dim">192.168.1.1</td>
                        <td class="text-dim text-xs">Xuất 14 thành viên</td>
                    </tr>
                    <tr>
                        <td class="font-mono text-xs text-secondary">2024-01-14 09:00:22</td>
                        <td>
                            <div class="flex-center gap-6">
                                <div class="tbl-ava"
                                    style="width: 22px; height: 22px; font-size: 9px; background: var(--gold) 22; color: var(--gold);">
                                    P</div><span class="text-sm">Phạm Thị Xem</span>
                            </div>
                        </td>
                        <td><span class="inline-code" style="color: rgb(190, 149, 255);">LOGIN</span></td>
                        <td class="text-secondary text-sm">Hệ thống</td>
                        <td class="font-mono text-xs text-dim">203.123.45.67</td>
                        <td class="text-dim text-xs">Đăng nhập thất bại</td>
                    </tr>
                    <tr>
                        <td class="font-mono text-xs text-secondary">2024-01-14 03:00:00</td>
                        <td>
                            <div class="flex-center gap-6">
                                <div class="tbl-ava"
                                    style="width: 22px; height: 22px; font-size: 9px; background: var(--gold) 22; color: var(--gold);">
                                    S</div><span class="text-sm">System</span>
                            </div>
                        </td>
                        <td><span class="inline-code" style="color: rgb(120, 169, 255);">BACKUP</span></td>
                        <td class="text-secondary text-sm">Database</td>
                        <td class="font-mono text-xs text-dim">localhost</td>
                        <td class="text-dim text-xs">Sao lưu tự động 245MB</td>
                    </tr>
                    <tr>
                        <td class="font-mono text-xs text-secondary">2024-01-13 11:20:00</td>
                        <td>
                            <div class="flex-center gap-6">
                                <div class="tbl-ava"
                                    style="width: 22px; height: 22px; font-size: 9px; background: var(--gold) 22; color: var(--gold);">
                                    A</div><span class="text-sm">Admin</span>
                            </div>
                        </td>
                        <td><span class="inline-code" style="color: rgb(66, 190, 101);">CREATE</span></td>
                        <td class="text-secondary text-sm">Users:5</td>
                        <td class="font-mono text-xs text-dim">192.168.1.1</td>
                        <td class="text-dim text-xs">Tạo tài khoản Hoàng Minh Thư</td>
                    </tr>
                    <tr>
                        <td class="font-mono text-xs text-secondary">2024-01-12 15:00:00</td>
                        <td>
                            <div class="flex-center gap-6">
                                <div class="tbl-ava"
                                    style="width: 22px; height: 22px; font-size: 9px; background: var(--gold) 22; color: var(--gold);">
                                    T</div><span class="text-sm">Trần Thị Quản</span>
                            </div>
                        </td>
                        <td><span class="inline-code" style="color: rgb(255, 131, 137);">DELETE</span></td>
                        <td class="text-secondary text-sm">Events:old</td>
                        <td class="font-mono text-xs text-dim">192.168.1.5</td>
                        <td class="text-dim text-xs">Xoá 2 sự kiện cũ</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>