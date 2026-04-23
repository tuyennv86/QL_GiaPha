<template>
    <!-- ====== DASHBOARD ====== -->
    <div class="page">
        <div class="ph">
            <div class="ph-eyebrow">Tổng Quan Hệ Thống</div>
            <div class="ph-row">
                <div>
                    <div class="ph-title">Admin Dashboard</div>
                    <div class="ph-sub">
                        Cập nhật lúc 14:44:45 — Hệ thống hoạt động bình thường
                    </div>
                </div>
                <div class="flex gap-8">
                    <button class="btn btn-ghost btn-sm">
                        💾 Sao Lưu Ngay
                    </button>
                    <button class="btn btn-primary btn-sm">
                        + Thêm Nội Dung
                    </button>
                </div>
            </div>
        </div>

        <!-- KPIs -->
        <div class="kpi-row">
            <div class="kpi" style="--accent: var(--gold)">
                <div class="kpi-icon">👥</div>
                <div class="kpi-val">14</div>
                <div class="kpi-label">Tổng Thành Viên</div>
                <div class="kpi-delta delta-up">↑ 3 tuần này</div>
            </div>
            <div class="kpi" style="--accent: var(--blue)">
                <div class="kpi-icon">🔑</div>
                <div class="kpi-val"> 12 </div>
                <div class="kpi-label">Tài Khoản Admin</div>
                <div class="kpi-delta delta-neutral">→ Ổn định</div>
            </div>
            <div class="kpi" style="--accent: var(--red)">
                <div class="kpi-icon">⏳</div>
                <div class="kpi-val"> 5 </div>
                <div class="kpi-label">Chờ Duyệt</div>
                <div class="kpi-delta delta-down">↑ Cần xử lý</div>
            </div>
            <div class="kpi" style="--accent: var(--green)">
                <div class="kpi-icon">💾</div>
                <div class="kpi-val">
                    98<span style="font-size: 16px">%</span>
                </div>
                <div class="kpi-label">Uptime Hệ Thống</div>
                <div class="kpi-delta delta-up">↑ Hoạt động tốt</div>
            </div>
            <div class="kpi" style="--accent: var(--purple)">
                <div class="kpi-icon">📤</div>
                <div class="kpi-val">12</div>
                <div class="kpi-label">Xuất Dữ Liệu</div>
                <div class="kpi-delta delta-neutral">Tháng này</div>
            </div>
        </div>

        <div class="grid-3-2 gap-2" style="gap: 2px">
            <!-- Activity Log -->
            <div class="card">
                <div class="card-head">
                    <div>
                        <div class="card-title">📋 Hoạt Động Gần Đây</div>
                        <div class="card-sub">Nhật ký hệ thống realtime</div>
                    </div>
                    <span class="card-action">Xem tất cả →</span>
                </div>
                <div class="card-body" style="padding: 0 20px">
                    <div class="activity-list">
                        <div class="activity-item">
                            <div class="ai-dot" style="background: rgb(190, 149, 255);"></div>
                            <div class="ai-body">
                                <div class="ai-text"><strong>Admin</strong> đăng nhập vào hệ thống</div>
                                <div class="flex-center gap-6 mt-4"><span class="ai-time">08:32 hôm nay</span><span
                                        class="ai-action">LOGIN</span></div>
                            </div>
                        </div>
                        <div class="activity-item">
                            <div class="ai-dot" style="background: rgb(66, 190, 101);"></div>
                            <div class="ai-body">
                                <div class="ai-text"><strong>Trần Thị Quản</strong> thêm thành viên <strong>Nguyễn Văn
                                        Mới</strong></div>
                                <div class="flex-center gap-6 mt-4"><span class="ai-time">07:15 hôm nay</span><span
                                        class="ai-action">CREATE</span></div>
                            </div>
                        </div>
                        <div class="activity-item">
                            <div class="ai-dot" style="background: rgb(120, 169, 255);"></div>
                            <div class="ai-body">
                                <div class="ai-text"><strong>Lê Văn Biên</strong> chỉnh sửa hồ sơ <strong>Nguyễn Đức
                                        Hùng</strong></div>
                                <div class="flex-center gap-6 mt-4"><span class="ai-time">Hôm qua 16:40</span><span
                                        class="ai-action">UPDATE</span></div>
                            </div>
                        </div>
                        <div class="activity-item">
                            <div class="ai-dot" style="background: rgb(201, 168, 76);"></div>
                            <div class="ai-body">
                                <div class="ai-text"><strong>Admin</strong> xuất dữ liệu dòng họ (Excel)</div>
                                <div class="flex-center gap-6 mt-4"><span class="ai-time">Hôm qua 14:00</span><span
                                        class="ai-action">EXPORT</span></div>
                            </div>
                        </div>
                        <div class="activity-item">
                            <div class="ai-dot" style="background: rgb(255, 131, 137);"></div>
                            <div class="ai-body">
                                <div class="ai-text"><strong>Phạm Thị Xem</strong> đăng nhập thất bại 3 lần</div>
                                <div class="flex-center gap-6 mt-4"><span class="ai-time">Hôm qua 09:00</span><span
                                        class="ai-action">FAILED</span></div>
                            </div>
                        </div>
                        <div class="activity-item">
                            <div class="ai-dot" style="background: rgb(66, 190, 101);"></div>
                            <div class="ai-body">
                                <div class="ai-text">Hệ thống tự động sao lưu dữ liệu</div>
                                <div class="flex-center gap-6 mt-4"><span class="ai-time">03:00 hôm nay</span><span
                                        class="ai-action">BACKUP</span></div>
                            </div>
                        </div>
                    </div>
                    <!-- <div class="activity-list">
                      <div class="activity-item" v-for="a in activities.slice(0, 6)" :key="a.id">
                            <div class="ai-dot" :style="{ background: a.color }"></div>
                            <div class="ai-body">
                                <div class="ai-text" v-html="a.text"></div>
                                <div class="flex-center gap-6 mt-4">
                                    <span class="ai-time">{{ a.time }}</span>
                                    <span class="ai-action">{{ a.action }}</span>
                                </div>
                            </div>
                        </div>
                    </div> -->
                </div>
            </div>

            <!-- Right column -->
            <div style="display: flex; flex-direction: column; gap: 2px">
                <!-- System Health -->
                <div class="card">
                    <div class="card-head">
                        <div class="card-title">🖥️ Tình Trạng Hệ Thống</div>
                        <div class="flex-center gap-6">
                            <div class="status-dot sd-green"></div>
                            <span class="text-xs text-secondary">Online</span>
                        </div>
                    </div>
                    <div class="card-body" style="padding: 12px 20px;">
                        <div class="health-row">
                            <div class="status-dot sd-green"></div>
                            <div class="health-name">Database</div>
                            <div class="health-val">12ms</div>
                            <div class="badge b-green">OK</div>
                        </div>
                        <div class="health-row">
                            <div class="status-dot sd-green"></div>
                            <div class="health-name">Web Server</div>
                            <div class="health-val">99.9%</div>
                            <div class="badge b-green">OK</div>
                        </div>
                        <div class="health-row">
                            <div class="status-dot sd-green"></div>
                            <div class="health-name">File Storage</div>
                            <div class="health-val">4.8%</div>
                            <div class="badge b-green">OK</div>
                        </div>
                        <div class="health-row">
                            <div class="status-dot sd-green"></div>
                            <div class="health-name">Backup Service</div>
                            <div class="health-val">03:00 AM</div>
                            <div class="badge b-green">OK</div>
                        </div>
                        <div class="health-row">
                            <div class="status-dot sd-yellow"></div>
                            <div class="health-name">Email Service</div>
                            <div class="health-val">Pending</div>
                            <div class="badge b-gold">Cảnh báo</div>
                        </div>
                    </div>
                    <!-- <div class="card-body" style="padding: 12px 20px">
                       <div class="health-row" v-for="h in healthStats" :key="h.name">
                            <div class="status-dot" :class="h.dot"></div>
                            <div class="health-name">{{ h.name }}</div>
                            <div class="health-val">{{ h.val }}</div>
                            <div class="badge" :class="h.badge">{{ h.status }}</div>
                        </div>
                    </div> -->
                </div>

                <!-- Gen Distribution -->
                <div class="card">
                    <div class="card-head">
                        <div class="card-title">📊 Phân Bố Thế Hệ</div>
                    </div>
                    <div class="card-body">
                        <div class="mb-12">
                            <div class="flex-between text-sm mb-4"><span class="text-secondary">Đời 1</span><span
                                    class="font-mono text-xs text-gold">1 người</span></div>
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: 7.14286%; background: rgb(201, 168, 76);">
                                </div>
                            </div>
                        </div>
                        <div class="mb-12">
                            <div class="flex-between text-sm mb-4"><span class="text-secondary">Đời 2</span><span
                                    class="font-mono text-xs text-gold">3 người</span></div>
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: 21.4286%; background: rgb(120, 169, 255);">
                                </div>
                            </div>
                        </div>
                        <div class="mb-12">
                            <div class="flex-between text-sm mb-4"><span class="text-secondary">Đời 3</span><span
                                    class="font-mono text-xs text-gold">3 người</span></div>
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: 21.4286%; background: rgb(66, 190, 101);">
                                </div>
                            </div>
                        </div>
                        <div class="mb-12">
                            <div class="flex-between text-sm mb-4"><span class="text-secondary">Đời 4</span><span
                                    class="font-mono text-xs text-gold">4 người</span></div>
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: 28.5714%; background: rgb(190, 149, 255);">
                                </div>
                            </div>
                        </div>
                        <div class="mb-12">
                            <div class="flex-between text-sm mb-4"><span class="text-secondary">Đời 5</span><span
                                    class="font-mono text-xs text-gold">3 người</span></div>
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: 21.4286%; background: rgb(255, 131, 43);">
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--<div class="card-body">
                         <div v-for="g in genStats" :key="g.label" class="mb-12">
                            <div class="flex-between text-sm mb-4">
                                <span class="text-secondary">{{ g.label }}</span>
                                <span class="font-mono text-xs text-gold">{{ g.count }} người</span>
                            </div>
                            <div class="progress-bar">
                                <div class="progress-fill"
                                    :style="{ width: (g.count / members.length * 100) + '%', background: g.color }">
                                </div>
                            </div>
                        </div> 
                    </div>-->
                </div>

                <!-- Quick Stats -->
                <div class="card">
                    <div class="card-head">
                        <div class="card-title">⚡ Thống Kê Nhanh</div>
                    </div>
                    <div class="card-body" style="padding: 12px 20px;">
                        <div class="info-row">
                            <div class="ir-key">Nam / Nữ</div>
                            <div class="ir-val">9 / 5</div>
                        </div>
                        <div class="info-row">
                            <div class="ir-key">Còn sống</div>
                            <div class="ir-val text-green">5 thành viên </div>
                        </div>
                        <div class="info-row">
                            <div class="ir-key">Đã mất</div>
                            <div class="ir-val text-secondary">9 thành viên </div>
                        </div>
                        <div class="info-row">
                            <div class="ir-key">Sự kiện</div>
                            <div class="ir-val">6 sự kiện</div>
                        </div>
                        <div class="info-row">
                            <div class="ir-key">Sao lưu cuối</div>
                            <div class="ir-val text-gold">Hôm nay 03:00</div>
                        </div>
                    </div>
                    <!-- <div class="card-body" style="padding: 12px 20px">
                        <div class="info-row">
                            <div class="ir-key">Nam / Nữ</div>
                            <div class="ir-val">
                                {{members.filter(m => m.gender === 'Nam').length}} / {{
                                    members.filter(m => m.gender === 'Nữ').length}}
                            </div>
                        </div>
                        <div class="info-row">
                            <div class="ir-key">Còn sống</div>
                            <div class="ir-val text-green">
                                {{members.filter(m => m.alive).length}} thành viên
                            </div>
                        </div>
                        <div class="info-row">
                            <div class="ir-key">Đã mất</div>
                            <div class="ir-val text-secondary">
                                {{members.filter(m => !m.alive).length}} thành viên
                            </div>
                        </div>
                        <div class="info-row">
                            <div class="ir-key">Sự kiện</div>
                            <div class="ir-val">{{ events.length }} sự kiện</div>
                        </div>
                        <div class="info-row">
                            <div class="ir-key">Sao lưu cuối</div>
                            <div class="ir-val text-gold">Hôm nay 03:00</div>
                        </div>
                    </div> -->
                </div>
            </div>
        </div>
    </div>
</template>