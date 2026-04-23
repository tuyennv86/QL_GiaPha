<template>
    <!-- ====== BACKUP ====== -->
    <div class="page">
        <div class="ph">
            <div class="ph-eyebrow">Quản Trị Hệ Thống</div>
            <div class="ph-row">
                <div>
                    <div class="ph-title">Sao Lưu &amp; Phục Hồi</div>
                </div><button class="btn btn-primary btn-sm"> 💾 Tạo Bản Sao Lưu Ngay </button>
            </div>
        </div>
        <div class="grid-2" style="gap: 2px; margin-bottom: 2px;">
            <div class="card">
                <div class="card-head">
                    <div class="card-title">⚙️ Cấu Hình Tự Động</div>
                </div>
                <div class="card-body">
                    <div
                        style="display: flex; justify-content: space-between; align-items: center; padding: 10px 0px; border-bottom: 1px solid rgb(42, 42, 42);">
                        <div>
                            <div class="text-sm fw-6">Sao lưu tự động</div>
                            <div class="text-xs text-dim mt-4">Tự động sao lưu theo lịch</div>
                        </div>
                        <div>
                            <div class="toggle-switch on"></div>
                        </div><!---->
                    </div>
                    <div
                        style="display: flex; justify-content: space-between; align-items: center; padding: 10px 0px; border-bottom: 1px solid rgb(42, 42, 42);">
                        <div>
                            <div class="text-sm fw-6">Tần suất</div>
                            <div class="text-xs text-dim mt-4">Thực hiện sao lưu mỗi bao lâu</div>
                        </div><!---->
                        <div><select class="f-select" style="width: auto; padding: 6px 10px; font-size: 12px;">
                                <option>Mỗi ngày</option>
                                <option>Mỗi tuần</option>
                                <option>Mỗi 12 giờ</option>
                            </select></div>
                    </div>
                    <div
                        style="display: flex; justify-content: space-between; align-items: center; padding: 10px 0px; border-bottom: 1px solid rgb(42, 42, 42);">
                        <div>
                            <div class="text-sm fw-6">Giữ trong bao lâu</div>
                            <div class="text-xs text-dim mt-4">Tự động xoá bản sao lưu cũ</div>
                        </div><!---->
                        <div><select class="f-select" style="width: auto; padding: 6px 10px; font-size: 12px;">
                                <option>7 ngày</option>
                                <option>14 ngày</option>
                                <option>30 ngày</option>
                                <option>90 ngày</option>
                            </select></div>
                    </div>
                    <div
                        style="display: flex; justify-content: space-between; align-items: center; padding: 10px 0px; border-bottom: 1px solid rgb(42, 42, 42);">
                        <div>
                            <div class="text-sm fw-6">Lưu lên Cloud</div>
                            <div class="text-xs text-dim mt-4">Sao lưu lên Google Drive / S3</div>
                        </div>
                        <div>
                            <div class="toggle-switch on"></div>
                        </div><!---->
                    </div>
                    <div
                        style="display: flex; justify-content: space-between; align-items: center; padding: 10px 0px; border-bottom: 1px solid rgb(42, 42, 42);">
                        <div>
                            <div class="text-sm fw-6">Mã hóa bản sao lưu</div>
                            <div class="text-xs text-dim mt-4">Bảo vệ file sao lưu bằng mã hóa AES-256</div>
                        </div>
                        <div>
                            <div class="toggle-switch"></div>
                        </div><!---->
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="card-head">
                    <div class="card-title">📊 Thống Kê Sao Lưu</div>
                </div>
                <div class="card-body" style="padding: 12px 20px;">
                    <div class="info-row">
                        <div class="ir-key">Sao lưu cuối</div>
                        <div class="ir-val text-gold">Hôm nay 03:00 AM</div>
                    </div>
                    <div class="info-row">
                        <div class="ir-key">Kích thước</div>
                        <div class="ir-val font-mono">245.7 MB</div>
                    </div>
                    <div class="info-row">
                        <div class="ir-key">Tổng bản lưu</div>
                        <div class="ir-val">5 bản</div>
                    </div>
                    <div class="info-row">
                        <div class="ir-key">Dung lượng dùng</div>
                        <div class="ir-val font-mono">1.2 GB</div>
                    </div>
                    <div class="info-row">
                        <div class="ir-key">Giữ lâu nhất</div>
                        <div class="ir-val">30 ngày</div>
                    </div>
                    <div class="info-row">
                        <div class="ir-key">Trạng thái</div>
                        <div class="ir-val"><span class="badge b-green">● Hoạt động</span></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="card">
            <div class="card-head">
                <div class="card-title">📁 Danh Sách Bản Sao Lưu</div><span class="text-sm text-secondary">5 bản</span>
            </div>
            <table class="tbl">
                <thead>
                    <tr>
                        <th>Tên File</th>
                        <th>Kích Thước</th>
                        <th>Thời Gian</th>
                        <th>Loại</th>
                        <th>Trạng Thái</th>
                        <th>Thao Tác</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><span class="font-mono text-sm"
                                style="color: var(--blue);">backup_20240115_030000.sql.gz</span></td>
                        <td class="font-mono text-sm text-secondary">245.7 MB</td>
                        <td class="font-mono text-sm text-secondary">15/01/2024 03:00</td>
                        <td><span class="badge b-blue">Tự động</span></td>
                        <td><span class="badge b-green">✓ Hoàn thành</span></td>
                        <td>
                            <div class="flex gap-4"><button class="btn btn-ghost btn-xs">⬇ Tải</button><button
                                    class="btn btn-secondary btn-xs"> ↺ Phục Hồi </button><button
                                    class="btn btn-danger btn-xs">🗑</button></div>
                        </td>
                    </tr>
                    <tr>
                        <td><span class="font-mono text-sm"
                                style="color: var(--blue);">backup_20240114_030000.sql.gz</span></td>
                        <td class="font-mono text-sm text-secondary">243.2 MB</td>
                        <td class="font-mono text-sm text-secondary">14/01/2024 03:00</td>
                        <td><span class="badge b-blue">Tự động</span></td>
                        <td><span class="badge b-green">✓ Hoàn thành</span></td>
                        <td>
                            <div class="flex gap-4"><button class="btn btn-ghost btn-xs">⬇ Tải</button><button
                                    class="btn btn-secondary btn-xs"> ↺ Phục Hồi </button><button
                                    class="btn btn-danger btn-xs">🗑</button></div>
                        </td>
                    </tr>
                    <tr>
                        <td><span class="font-mono text-sm"
                                style="color: var(--blue);">backup_20240113_manual.sql.gz</span></td>
                        <td class="font-mono text-sm text-secondary">241.8 MB</td>
                        <td class="font-mono text-sm text-secondary">13/01/2024 11:30</td>
                        <td><span class="badge b-gold">Thủ công</span></td>
                        <td><span class="badge b-green">✓ Hoàn thành</span></td>
                        <td>
                            <div class="flex gap-4"><button class="btn btn-ghost btn-xs">⬇ Tải</button><button
                                    class="btn btn-secondary btn-xs"> ↺ Phục Hồi </button><button
                                    class="btn btn-danger btn-xs">🗑</button></div>
                        </td>
                    </tr>
                    <tr>
                        <td><span class="font-mono text-sm"
                                style="color: var(--blue);">backup_20240112_030000.sql.gz</span></td>
                        <td class="font-mono text-sm text-secondary">240.1 MB</td>
                        <td class="font-mono text-sm text-secondary">12/01/2024 03:00</td>
                        <td><span class="badge b-blue">Tự động</span></td>
                        <td><span class="badge b-green">✓ Hoàn thành</span></td>
                        <td>
                            <div class="flex gap-4"><button class="btn btn-ghost btn-xs">⬇ Tải</button><button
                                    class="btn btn-secondary btn-xs"> ↺ Phục Hồi </button><button
                                    class="btn btn-danger btn-xs">🗑</button></div>
                        </td>
                    </tr>
                    <tr>
                        <td><span class="font-mono text-sm"
                                style="color: var(--blue);">backup_20240101_newyear.sql.gz</span></td>
                        <td class="font-mono text-sm text-secondary">235.0 MB</td>
                        <td class="font-mono text-sm text-secondary">01/01/2024 00:05</td>
                        <td><span class="badge b-gold">Thủ công</span></td>
                        <td><span class="badge b-green">✓ Hoàn thành</span></td>
                        <td>
                            <div class="flex gap-4"><button class="btn btn-ghost btn-xs">⬇ Tải</button><button
                                    class="btn btn-secondary btn-xs"> ↺ Phục Hồi </button><button
                                    class="btn btn-danger btn-xs">🗑</button></div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>