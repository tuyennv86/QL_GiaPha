<template>
    <!-- ====== SETTINGS ====== -->
    <div class="page">
        <div class="ph">
            <div class="ph-eyebrow">Quản Trị Hệ Thống</div>
            <div class="ph-title">Cài Đặt Hệ Thống</div>
        </div>

        <div class="tab-row">
            <button class="tab">
                Chung
            </button>
            <button class="tab">
                Hiển Thị
            </button>
            <button class="tab">
                Email
            </button>
            <button class="tab">
                Nâng Cao
            </button>
        </div>

        <div>
            <div class="grid-2" style="gap: 2px;">
                <div class="card">
                    <div class="card-head">
                        <div class="card-title">🏠 Thông Tin Dòng Họ</div>
                    </div>
                    <div class="card-body">
                        <div class="form-row form-row-1" style="grid-template-columns: 1fr;">
                            <div class="f-group"><label class="f-label">Tên Dòng Họ <span
                                        class="f-req">*</span></label><input class="f-input"></div>
                        </div>
                        <div class="form-row form-row-2">
                            <div class="f-group"><label class="f-label">Năm Thành Lập</label><input class="f-input">
                            </div>
                            <div class="f-group"><label class="f-label">Quê Gốc</label><input class="f-input"></div>
                        </div>
                        <div class="f-group"><label class="f-label">Mô Tả / Lịch Sử</label><textarea class="f-textarea"
                                rows="3"></textarea></div>
                        <div class="mt-16"><button class="btn btn-primary btn-sm"> 💾 Lưu Thay Đổi </button></div>
                    </div>
                </div>
                <div class="card">
                    <div class="card-head">
                        <div class="card-title">🎛️ Cấu Hình Chung</div>
                    </div>
                    <div class="card-body">
                        <div class="divider" style="margin: 0px 0px 12px;"></div>
                        <div
                            style="display: flex; justify-content: space-between; align-items: center; padding: 10px 0px; border-bottom: 1px solid rgb(42, 42, 42);">
                            <div>
                                <div class="text-sm fw-6">Cho phép đăng ký mới</div>
                                <div class="text-xs text-dim mt-4">Cho phép người dùng tự đăng ký tài khoản</div>
                            </div>
                            <div class="toggle-switch"></div>
                        </div>
                        <div
                            style="display: flex; justify-content: space-between; align-items: center; padding: 10px 0px; border-bottom: 1px solid rgb(42, 42, 42);">
                            <div>
                                <div class="text-sm fw-6">Yêu cầu duyệt thủ công</div>
                                <div class="text-xs text-dim mt-4">Mọi thay đổi cần admin duyệt trước khi lưu</div>
                            </div>
                            <div class="toggle-switch on"></div>
                        </div>
                        <div
                            style="display: flex; justify-content: space-between; align-items: center; padding: 10px 0px; border-bottom: 1px solid rgb(42, 42, 42);">
                            <div>
                                <div class="text-sm fw-6">Cây phả hệ công khai</div>
                                <div class="text-xs text-dim mt-4">Cho phép người ngoài xem cây gia phả</div>
                            </div>
                            <div class="toggle-switch"></div>
                        </div>
                        <div
                            style="display: flex; justify-content: space-between; align-items: center; padding: 10px 0px; border-bottom: 1px solid rgb(42, 42, 42);">
                            <div>
                                <div class="text-sm fw-6">Thông báo email</div>
                                <div class="text-xs text-dim mt-4">Gửi email khi có hoạt động mới</div>
                            </div>
                            <div class="toggle-switch on"></div>
                        </div>
                        <div
                            style="display: flex; justify-content: space-between; align-items: center; padding: 10px 0px; border-bottom: 1px solid rgb(42, 42, 42);">
                            <div>
                                <div class="text-sm fw-6">Chế độ bảo trì</div>
                                <div class="text-xs text-dim mt-4">Tạm thời ngưng truy cập người dùng thường</div>
                            </div>
                            <div class="toggle-switch"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- <div v-if="settingTab === 'email'">
            <div class="card" style="max-width: 600px">
                <div class="card-head">
                    <div class="card-title">📧 Cấu Hình Email</div>
                </div>
                <div class="card-body">
                    <div class="form-row form-row-2">
                        <div class="f-group">
                            <label class="f-label">SMTP Host</label><input class="f-input" v-model="emailSettings.host"
                                placeholder="smtp.gmail.com" />
                        </div>
                        <div class="f-group">
                            <label class="f-label">Port</label><input class="f-input" v-model="emailSettings.port"
                                placeholder="587" />
                        </div>
                        <div class="f-group">
                            <label class="f-label">Username</label><input class="f-input" v-model="emailSettings.user"
                                placeholder="admin@giaoha.vn" />
                        </div>
                        <div class="f-group">
                            <label class="f-label">Password</label><input type="password" class="f-input"
                                v-model="emailSettings.pass" placeholder="••••••••" />
                        </div>
                    </div>
                    <div class="f-group mb-16">
                        <label class="f-label">Email Gửi Đi</label>
                        <input class="f-input" v-model="emailSettings.from" placeholder="noreply@giaoha.vn" />
                    </div>
                    <div class="flex gap-8">
                        <button class="btn btn-secondary btn-sm">
                            📨 Gửi Email Test
                        </button>
                        <button class="btn btn-primary btn-sm" @click="saveSettings">
                            💾 Lưu
                        </button>
                    </div>
                </div>
            </div>
        </div> -->

        <!-- <div v-if="settingTab === 'advanced'">
            <div class="grid-2" style="gap: 2px">
                <div class="card">
                    <div class="card-head">
                        <div class="card-title">⚠️ Vùng Nguy Hiểm</div>
                    </div>
                    <div class="card-body">
                        <div v-for="a in dangerZone" :key="a.label" style="
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding: 12px 0;
                        border-bottom: 1px solid #2a2a2a;
                      ">
                            <div>
                                <div class="text-sm fw-6" style="color: var(--text-primary)">
                                    {{ a.label }}
                                </div>
                                <div class="text-xs text-dim mt-4">{{ a.desc }}</div>
                            </div>
                            <button class="btn btn-danger btn-xs">{{ a.btn }}</button>
                        </div>
                    </div>
                </div>
                <div class="card">
                    <div class="card-head">
                        <div class="card-title">🔧 Debug & Thông Tin</div>
                    </div>
                    <div class="card-body" style="padding: 12px 20px">
                        <div class="info-row">
                            <div class="ir-key">Phiên bản</div>
                            <div class="ir-val font-mono">v2.1.0</div>
                        </div>
                        <div class="info-row">
                            <div class="ir-key">Node ENV</div>
                            <div class="ir-val">
                                <span class="inline-code">production</span>
                            </div>
                        </div>
                        <div class="info-row">
                            <div class="ir-key">DB Version</div>
                            <div class="ir-val font-mono">PostgreSQL 15.4</div>
                        </div>
                        <div class="info-row">
                            <div class="ir-key">Cache</div>
                            <div class="ir-val font-mono">Redis 7.2</div>
                        </div>
                        <div class="info-row">
                            <div class="ir-key">Storage</div>
                            <div class="ir-val">2.4 GB / 50 GB</div>
                        </div>
                        <div class="mt-16">
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: 4.8%; background: var(--green)"></div>
                            </div>
                            <div class="text-xs text-dim mt-4">
                                4.8% dung lượng đã dùng
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div> -->

        <!-- <div v-if="settingTab === 'display'">
            <div class="card" style="max-width: 600px">
                <div class="card-head">
                    <div class="card-title">🎨 Cài Đặt Hiển Thị</div>
                </div>
                <div class="card-body">
                    <div class="f-group mb-16">
                        <label class="f-label">Màu Chủ Đạo</label>
                        <div class="flex gap-8 mt-4">
                            <div v-for="c in ['#C9A84C', '#78a9ff', '#42be65', '#be95ff', '#ff832b']" :key="c" style="
                          width: 32px;
                          height: 32px;
                          border-radius: 3px;
                          cursor: pointer;
                          border: 2px solid transparent;
                        " :style="{ background: c, borderColor: settings.accentColor === c ? '#fff' : 'transparent' }"
                                @click="settings.accentColor = c"></div>
                        </div>
                    </div>
                    <div class="f-group mb-16">
                        <label class="f-label">Số Hàng Mỗi Trang</label>
                        <select class="f-select" v-model="settings.pageSize">
                            <option :value="10">10 hàng</option>
                            <option :value="20">20 hàng</option>
                            <option :value="50">50 hàng</option>
                        </select>
                    </div>
                    <div class="f-group mb-16">
                        <label class="f-label">Định Dạng Ngày</label>
                        <select class="f-select" v-model="settings.dateFormat">
                            <option>DD/MM/YYYY</option>
                            <option>YYYY-MM-DD</option>
                            <option>MM/DD/YYYY</option>
                        </select>
                    </div>
                    <button class="btn btn-primary btn-sm" @click="saveSettings">
                        💾 Lưu
                    </button>
                </div>
            </div>
        </div> -->
    </div>
</template>