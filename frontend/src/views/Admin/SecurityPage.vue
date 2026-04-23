<template>
    <!-- ====== SECURITY ====== -->
    <div class="page">
        <div class="ph">
            <div class="ph-eyebrow">Quản Trị Hệ Thống</div>
            <div class="ph-title">Bảo Mật Hệ Thống</div>
        </div>
        <div class="grid-2" style="gap: 2px; margin-bottom: 2px;">
            <div class="card">
                <div class="card-head">
                    <div class="card-title">🔐 Chính Sách Mật Khẩu</div>
                </div>
                <div class="card-body">
                    <div
                        style="display: flex; justify-content: space-between; align-items: center; padding: 10px 0px; border-bottom: 1px solid rgb(42, 42, 42);">
                        <div>
                            <div class="text-sm fw-6">Độ dài mật khẩu tối thiểu</div>
                            <div class="text-xs text-dim mt-4">Số ký tự tối thiểu</div>
                        </div><!---->
                        <div style="display: flex; align-items: center; gap: 6px;"><input class="f-input" type="number"
                                style="width: 60px; padding: 6px; text-align: center;"><span class="text-xs text-dim">ký
                                tự</span></div>
                    </div>
                    <div
                        style="display: flex; justify-content: space-between; align-items: center; padding: 10px 0px; border-bottom: 1px solid rgb(42, 42, 42);">
                        <div>
                            <div class="text-sm fw-6">Yêu cầu chữ hoa</div>
                            <div class="text-xs text-dim mt-4">Mật khẩu phải có ít nhất 1 chữ hoa</div>
                        </div>
                        <div>
                            <div class="toggle-switch on"></div>
                        </div><!---->
                    </div>
                    <div
                        style="display: flex; justify-content: space-between; align-items: center; padding: 10px 0px; border-bottom: 1px solid rgb(42, 42, 42);">
                        <div>
                            <div class="text-sm fw-6">Yêu cầu ký tự đặc biệt</div>
                            <div class="text-xs text-dim mt-4">Mật khẩu phải có !@#$...</div>
                        </div>
                        <div>
                            <div class="toggle-switch"></div>
                        </div><!---->
                    </div>
                    <div
                        style="display: flex; justify-content: space-between; align-items: center; padding: 10px 0px; border-bottom: 1px solid rgb(42, 42, 42);">
                        <div>
                            <div class="text-sm fw-6">Mật khẩu hết hạn sau</div>
                            <div class="text-xs text-dim mt-4">Tự động yêu cầu đổi mật khẩu</div>
                        </div><!---->
                        <div style="display: flex; align-items: center; gap: 6px;"><input class="f-input" type="number"
                                style="width: 60px; padding: 6px; text-align: center;"><span
                                class="text-xs text-dim">ngày</span></div>
                    </div>
                    <div
                        style="display: flex; justify-content: space-between; align-items: center; padding: 10px 0px; border-bottom: 1px solid rgb(42, 42, 42);">
                        <div>
                            <div class="text-sm fw-6">Khoá sau thất bại liên tiếp</div>
                            <div class="text-xs text-dim mt-4">Số lần thử sai tối đa</div>
                        </div><!---->
                        <div style="display: flex; align-items: center; gap: 6px;"><input class="f-input" type="number"
                                style="width: 60px; padding: 6px; text-align: center;"><span
                                class="text-xs text-dim">lần</span></div>
                    </div>
                    <div
                        style="display: flex; justify-content: space-between; align-items: center; padding: 10px 0px; border-bottom: 1px solid rgb(42, 42, 42);">
                        <div>
                            <div class="text-sm fw-6">Xác thực 2 bước</div>
                            <div class="text-xs text-dim mt-4">Bắt buộc 2FA cho tài khoản admin</div>
                        </div>
                        <div>
                            <div class="toggle-switch"></div>
                        </div><!---->
                    </div>
                    <div class="mt-16"><button class="btn btn-primary btn-sm"> 💾 Lưu Chính Sách </button></div>
                </div>
            </div>
            <div class="card">
                <div class="card-head">
                    <div class="card-title">🛡️ Trạng Thái Bảo Mật</div>
                </div>
                <div class="card-body" style="padding: 12px 20px;">
                    <div class="health-row">
                        <div class="status-dot sd-green"></div>
                        <div class="health-name">Kết nối HTTPS</div>
                        <div class="badge b-green">An toàn</div>
                    </div>
                    <div class="health-row">
                        <div class="status-dot sd-green"></div>
                        <div class="health-name">Mã hóa Database</div>
                        <div class="badge b-green">An toàn</div>
                    </div>
                    <div class="health-row">
                        <div class="status-dot sd-green"></div>
                        <div class="health-name">Backup mã hóa</div>
                        <div class="badge b-green">An toàn</div>
                    </div>
                    <div class="health-row">
                        <div class="status-dot sd-red"></div>
                        <div class="health-name">Xác thực 2 bước</div>
                        <div class="badge b-red">Cảnh báo</div>
                    </div>
                    <div class="health-row">
                        <div class="status-dot sd-green"></div>
                        <div class="health-name">Rate Limiting</div>
                        <div class="badge b-green">An toàn</div>
                    </div>
                    <div class="health-row">
                        <div class="status-dot sd-green"></div>
                        <div class="health-name">SQL Injection Protection</div>
                        <div class="badge b-green">An toàn</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="card">
            <div class="card-head">
                <div class="card-title">🚫 IP Đăng Nhập Thất Bại Gần Đây</div>
            </div>
            <table class="tbl">
                <thead>
                    <tr>
                        <th>IP Address</th>
                        <th>Số Lần Thất Bại</th>
                        <th>Lần Cuối</th>
                        <th>Quốc Gia</th>
                        <th>Thao Tác</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="font-mono text-sm text-red">203.123.45.67</td>
                        <td><span class="badge b-red">12 lần</span></td>
                        <td class="font-mono text-sm text-secondary">2024-01-14 09:15</td>
                        <td class="text-secondary text-sm">🇨🇳 China</td>
                        <td><button class="btn btn-danger btn-xs"> 🚫 Chặn IP </button></td>
                    </tr>
                    <tr>
                        <td class="font-mono text-sm text-red">45.33.32.156</td>
                        <td><span class="badge b-red">8 lần</span></td>
                        <td class="font-mono text-sm text-secondary">2024-01-13 22:30</td>
                        <td class="text-secondary text-sm">🇷🇺 Russia</td>
                        <td><button class="btn btn-danger btn-xs"> 🚫 Chặn IP </button></td>
                    </tr>
                    <tr>
                        <td class="font-mono text-sm text-red">198.51.100.42</td>
                        <td><span class="badge b-red">3 lần</span></td>
                        <td class="font-mono text-sm text-secondary">2024-01-12 14:20</td>
                        <td class="text-secondary text-sm">🇺🇸 USA</td>
                        <td><button class="btn btn-danger btn-xs"> 🚫 Chặn IP </button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>