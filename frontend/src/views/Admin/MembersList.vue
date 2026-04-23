<template>
    <!-- ====== MEMBERS ADMIN ====== -->
    <div class="page">
        <div class="ph">
            <div class="ph-eyebrow">Quản Lý Nội Dung</div>
            <div class="ph-row">
                <div>
                    <div class="ph-title">Quản Lý Thành Viên</div>
                    <div class="ph-sub">
                        14/14 thành viên được hiển thị
                    </div>
                </div>
                <div class="flex gap-8">
                    <button class="btn btn-secondary btn-sm">
                        ⬇ Xuất Excel
                    </button>
                    <button class="btn btn-secondary btn-sm">📤 Import</button>
                    <button class="btn btn-primary btn-sm">
                        + Thêm Thành Viên
                    </button>
                </div>
            </div>
        </div>

        <!-- Filters -->
        <div class="card mb-16">
            <div class="card-body" style="padding: 14px 20px">
                <div class="select-bar">
                    <div class="search-bar" style="max-width: 260px">
                        <span style="color: var(--text-dim)">🔍</span>
                        <input placeholder="Tìm kiếm tên, quê quán..." />
                    </div>
                    <select class="f-select" style="width: auto; padding: 8px 12px">
                        <option value="">Tất cả đời</option>
                        <option>Đời 1</option>
                        <option>Đời 2</option>
                        <option>Đời 3</option>
                        <option>Đời 4</option>
                        <option>Đời 5</option>
                    </select>
                    <select class="f-select" style="width: auto; padding: 8px 12px">
                        <option value="">Tất cả giới tính</option>
                        <option>Nam</option>
                        <option>Nữ</option>
                    </select>
                    <select class="f-select" style="width: auto; padding: 8px 12px">
                        <option value="">Tất cả tình trạng</option>
                        <option value="living">Còn sống</option>
                        <option value="deceased">Đã mất</option>
                    </select>
                    <button class="btn btn-ghost btn-sm">
                        ↺ Reset
                    </button>
                </div>
            </div>
        </div>

        <!-- Bulk actions bar -->
        <div class="card mb-16" style="border-color: var(--gold)">
            <div class="card-body" style="padding: 12px 20px">
                <div class="flex-center gap-12">
                    <span class="text-gold fw-6">10 đã chọn</span>
                    <button class="btn btn-secondary btn-sm">📋 Xuất Chọn</button>
                    <button class="btn btn-danger btn-sm">
                        🗑 Xoá Chọn
                    </button>
                    <button class="btn btn-ghost btn-sm">
                        Bỏ chọn
                    </button>
                </div>
            </div>
        </div>

        <div class="card">
            <table class="tbl">
                <thead>
                    <tr>
                        <th style="width: 40px;"><input type="checkbox" style="cursor: pointer;"></th>
                        <th>Họ Tên</th>
                        <th>Giới Tính</th>
                        <th>Thế Hệ</th>
                        <th>Năm Sinh</th>
                        <th>Quê Quán</th>
                        <th>Nghề Nghiệp</th>
                        <th>Tình Trạng</th>
                        <th>Thao Tác</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><input type="checkbox" value="1" style="cursor: pointer;"></td>
                        <td>
                            <div class="tbl-name">
                                <div class="tbl-ava b-blue" style="width: 28px; height: 28px;">T</div>
                                <div>
                                    <div class="tbl-name-val">Nguyễn Văn Tổ</div>
                                    <div class="tbl-name-sub">Tổ tiên</div>
                                </div>
                            </div>
                        </td>
                        <td><span class="badge b-blue">♂ Nam</span></td>
                        <td><span class="badge gen-1">Đời 1</span></td>
                        <td class="font-mono text-sm">1820</td>
                        <td class="text-secondary">Hà Nam</td>
                        <td class="text-secondary">Nông dân</td>
                        <td><span class="badge b-gray">○ Mất</span></td>
                        <td>
                            <div class="flex gap-4"><button class="btn btn-ghost btn-xs"> ✏️ </button><button
                                    class="btn btn-ghost btn-xs"> 👁 </button><button class="btn btn-danger btn-xs"> 🗑
                                </button></div>
                        </td>
                    </tr>
                    <tr>
                        <td><input type="checkbox" value="2" style="cursor: pointer;"></td>
                        <td>
                            <div class="tbl-name">
                                <div class="tbl-ava b-blue" style="width: 28px; height: 28px;">H</div>
                                <div>
                                    <div class="tbl-name-val">Nguyễn Văn Hai</div>
                                    <div class="tbl-name-sub">Con trai cả</div>
                                </div>
                            </div>
                        </td>
                        <td><span class="badge b-blue">♂ Nam</span></td>
                        <td><span class="badge gen-2">Đời 2</span></td>
                        <td class="font-mono text-sm">1845</td>
                        <td class="text-secondary">Hà Nam</td>
                        <td class="text-secondary">Thương nhân</td>
                        <td><span class="badge b-gray">○ Mất</span></td>
                        <td>
                            <div class="flex gap-4"><button class="btn btn-ghost btn-xs"> ✏️ </button><button
                                    class="btn btn-ghost btn-xs"> 👁 </button><button class="btn btn-danger btn-xs"> 🗑
                                </button></div>
                        </td>
                    </tr>
                    <tr>
                        <td><input type="checkbox" value="3" style="cursor: pointer;"></td>
                        <td>
                            <div class="tbl-name">
                                <div class="tbl-ava b-blue" style="width: 28px; height: 28px;">B</div>
                                <div>
                                    <div class="tbl-name-val">Nguyễn Văn Ba</div>
                                    <div class="tbl-name-sub">Con trai thứ</div>
                                </div>
                            </div>
                        </td>
                        <td><span class="badge b-blue">♂ Nam</span></td>
                        <td><span class="badge gen-2">Đời 2</span></td>
                        <td class="font-mono text-sm">1850</td>
                        <td class="text-secondary">Nam Định</td>
                        <td class="text-secondary">Giáo học</td>
                        <td><span class="badge b-gray">○ Mất</span></td>
                        <td>
                            <div class="flex gap-4"><button class="btn btn-ghost btn-xs"> ✏️ </button><button
                                    class="btn btn-ghost btn-xs"> 👁 </button><button class="btn btn-danger btn-xs"> 🗑
                                </button></div>
                        </td>
                    </tr>
                    <tr>
                        <td><input type="checkbox" value="4" style="cursor: pointer;"></td>
                        <td>
                            <div class="tbl-name">
                                <div class="tbl-ava b-purple" style="width: 28px; height: 28px;">T</div>
                                <div>
                                    <div class="tbl-name-val">Nguyễn Thị Tư</div>
                                    <div class="tbl-name-sub">Con gái</div>
                                </div>
                            </div>
                        </td>
                        <td><span class="badge b-purple">♀ Nữ</span></td>
                        <td><span class="badge gen-2">Đời 2</span></td>
                        <td class="font-mono text-sm">1855</td>
                        <td class="text-secondary">Hà Nam</td>
                        <td class="text-secondary">Nội trợ</td>
                        <td><span class="badge b-gray">○ Mất</span></td>
                        <td>
                            <div class="flex gap-4"><button class="btn btn-ghost btn-xs"> ✏️ </button><button
                                    class="btn btn-ghost btn-xs"> 👁 </button><button class="btn btn-danger btn-xs"> 🗑
                                </button></div>
                        </td>
                    </tr>
                    <tr>
                        <td><input type="checkbox" value="5" style="cursor: pointer;"></td>
                        <td>
                            <div class="tbl-name">
                                <div class="tbl-ava b-blue" style="width: 28px; height: 28px;">N</div>
                                <div>
                                    <div class="tbl-name-val">Nguyễn Văn Năm</div>
                                    <div class="tbl-name-sub">Cháu đích tôn</div>
                                </div>
                            </div>
                        </td>
                        <td><span class="badge b-blue">♂ Nam</span></td>
                        <td><span class="badge gen-3">Đời 3</span></td>
                        <td class="font-mono text-sm">1878</td>
                        <td class="text-secondary">Hà Nội</td>
                        <td class="text-secondary">Công chức</td>
                        <td><span class="badge b-gray">○ Mất</span></td>
                        <td>
                            <div class="flex gap-4"><button class="btn btn-ghost btn-xs"> ✏️ </button><button
                                    class="btn btn-ghost btn-xs"> 👁 </button><button class="btn btn-danger btn-xs"> 🗑
                                </button></div>
                        </td>
                    </tr>
                    <tr>
                        <td><input type="checkbox" value="6" style="cursor: pointer;"></td>
                        <td>
                            <div class="tbl-name">
                                <div class="tbl-ava b-purple" style="width: 28px; height: 28px;">S</div>
                                <div>
                                    <div class="tbl-name-val">Nguyễn Thị Sáu</div>
                                    <div class="tbl-name-sub">Cháu gái</div>
                                </div>
                            </div>
                        </td>
                        <td><span class="badge b-purple">♀ Nữ</span></td>
                        <td><span class="badge gen-3">Đời 3</span></td>
                        <td class="font-mono text-sm">1882</td>
                        <td class="text-secondary">Hà Nội</td>
                        <td class="text-secondary">Giáo viên</td>
                        <td><span class="badge b-gray">○ Mất</span></td>
                        <td>
                            <div class="flex gap-4"><button class="btn btn-ghost btn-xs"> ✏️ </button><button
                                    class="btn btn-ghost btn-xs"> 👁 </button><button class="btn btn-danger btn-xs"> 🗑
                                </button></div>
                        </td>
                    </tr>
                    <tr>
                        <td><input type="checkbox" value="7" style="cursor: pointer;"></td>
                        <td>
                            <div class="tbl-name">
                                <div class="tbl-ava b-blue" style="width: 28px; height: 28px;">B</div>
                                <div>
                                    <div class="tbl-name-val">Nguyễn Văn Bảy</div>
                                    <div class="tbl-name-sub">Cháu trai</div>
                                </div>
                            </div>
                        </td>
                        <td><span class="badge b-blue">♂ Nam</span></td>
                        <td><span class="badge gen-3">Đời 3</span></td>
                        <td class="font-mono text-sm">1890</td>
                        <td class="text-secondary">Nam Định</td>
                        <td class="text-secondary">Bác sĩ</td>
                        <td><span class="badge b-gray">○ Mất</span></td>
                        <td>
                            <div class="flex gap-4"><button class="btn btn-ghost btn-xs"> ✏️ </button><button
                                    class="btn btn-ghost btn-xs"> 👁 </button><button class="btn btn-danger btn-xs"> 🗑
                                </button></div>
                        </td>
                    </tr>
                    <tr>
                        <td><input type="checkbox" value="8" style="cursor: pointer;"></td>
                        <td>
                            <div class="tbl-name">
                                <div class="tbl-ava b-blue" style="width: 28px; height: 28px;">M</div>
                                <div>
                                    <div class="tbl-name-val">Nguyễn Đức Minh</div>
                                    <div class="tbl-name-sub">Chắt trai</div>
                                </div>
                            </div>
                        </td>
                        <td><span class="badge b-blue">♂ Nam</span></td>
                        <td><span class="badge gen-4">Đời 4</span></td>
                        <td class="font-mono text-sm">1920</td>
                        <td class="text-secondary">Hà Nội</td>
                        <td class="text-secondary">Kỹ sư</td>
                        <td><span class="badge b-gray">○ Mất</span></td>
                        <td>
                            <div class="flex gap-4"><button class="btn btn-ghost btn-xs"> ✏️ </button><button
                                    class="btn btn-ghost btn-xs"> 👁 </button><button class="btn btn-danger btn-xs"> 🗑
                                </button></div>
                        </td>
                    </tr>
                    <tr>
                        <td><input type="checkbox" value="9" style="cursor: pointer;"></td>
                        <td>
                            <div class="tbl-name">
                                <div class="tbl-ava b-purple" style="width: 28px; height: 28px;">L</div>
                                <div>
                                    <div class="tbl-name-val">Nguyễn Thị Lan</div>
                                    <div class="tbl-name-sub">Chắt gái</div>
                                </div>
                            </div>
                        </td>
                        <td><span class="badge b-purple">♀ Nữ</span></td>
                        <td><span class="badge gen-4">Đời 4</span></td>
                        <td class="font-mono text-sm">1925</td>
                        <td class="text-secondary">Hà Nội</td>
                        <td class="text-secondary">Y tá</td>
                        <td><span class="badge b-gray">○ Mất</span></td>
                        <td>
                            <div class="flex gap-4"><button class="btn btn-ghost btn-xs"> ✏️ </button><button
                                    class="btn btn-ghost btn-xs"> 👁 </button><button class="btn btn-danger btn-xs"> 🗑
                                </button></div>
                        </td>
                    </tr>
                    <tr>
                        <td><input type="checkbox" value="10" style="cursor: pointer;"></td>
                        <td>
                            <div class="tbl-name">
                                <div class="tbl-ava b-blue" style="width: 28px; height: 28px;">H</div>
                                <div>
                                    <div class="tbl-name-val">Nguyễn Đức Hùng</div>
                                    <div class="tbl-name-sub">Con trai</div>
                                </div>
                            </div>
                        </td>
                        <td><span class="badge b-blue">♂ Nam</span></td>
                        <td><span class="badge gen-4">Đời 4</span></td>
                        <td class="font-mono text-sm">1950</td>
                        <td class="text-secondary">Hà Nội</td>
                        <td class="text-secondary">Giáo sư</td>
                        <td><span class="badge b-green">● Sống</span></td>
                        <td>
                            <div class="flex gap-4"><button class="btn btn-ghost btn-xs"> ✏️ </button><button
                                    class="btn btn-ghost btn-xs"> 👁 </button><button class="btn btn-danger btn-xs"> 🗑
                                </button></div>
                        </td>
                    </tr>
                    <tr>
                        <td><input type="checkbox" value="11" style="cursor: pointer;"></td>
                        <td>
                            <div class="tbl-name">
                                <div class="tbl-ava b-purple" style="width: 28px; height: 28px;">H</div>
                                <div>
                                    <div class="tbl-name-val">Nguyễn Thị Hoa</div>
                                    <div class="tbl-name-sub">Con gái</div>
                                </div>
                            </div>
                        </td>
                        <td><span class="badge b-purple">♀ Nữ</span></td>
                        <td><span class="badge gen-4">Đời 4</span></td>
                        <td class="font-mono text-sm">1955</td>
                        <td class="text-secondary">TP.HCM</td>
                        <td class="text-secondary">Doanh nhân</td>
                        <td><span class="badge b-green">● Sống</span></td>
                        <td>
                            <div class="flex gap-4"><button class="btn btn-ghost btn-xs"> ✏️ </button><button
                                    class="btn btn-ghost btn-xs"> 👁 </button><button class="btn btn-danger btn-xs"> 🗑
                                </button></div>
                        </td>
                    </tr>
                    <tr>
                        <td><input type="checkbox" value="12" style="cursor: pointer;"></td>
                        <td>
                            <div class="tbl-name">
                                <div class="tbl-ava b-blue" style="width: 28px; height: 28px;">T</div>
                                <div>
                                    <div class="tbl-name-val">Nguyễn Minh Tuấn</div>
                                    <div class="tbl-name-sub">Chắt</div>
                                </div>
                            </div>
                        </td>
                        <td><span class="badge b-blue">♂ Nam</span></td>
                        <td><span class="badge gen-5">Đời 5</span></td>
                        <td class="font-mono text-sm">1980</td>
                        <td class="text-secondary">Hà Nội</td>
                        <td class="text-secondary">Lập trình viên</td>
                        <td><span class="badge b-green">● Sống</span></td>
                        <td>
                            <div class="flex gap-4"><button class="btn btn-ghost btn-xs"> ✏️ </button><button
                                    class="btn btn-ghost btn-xs"> 👁 </button><button class="btn btn-danger btn-xs"> 🗑
                                </button></div>
                        </td>
                    </tr>
                    <tr>
                        <td><input type="checkbox" value="13" style="cursor: pointer;"></td>
                        <td>
                            <div class="tbl-name">
                                <div class="tbl-ava b-purple" style="width: 28px; height: 28px;">C</div>
                                <div>
                                    <div class="tbl-name-val">Nguyễn Minh Châu</div>
                                    <div class="tbl-name-sub">Chắt gái</div>
                                </div>
                            </div>
                        </td>
                        <td><span class="badge b-purple">♀ Nữ</span></td>
                        <td><span class="badge gen-5">Đời 5</span></td>
                        <td class="font-mono text-sm">1985</td>
                        <td class="text-secondary">Hà Nội</td>
                        <td class="text-secondary">Bác sĩ</td>
                        <td><span class="badge b-green">● Sống</span></td>
                        <td>
                            <div class="flex gap-4"><button class="btn btn-ghost btn-xs"> ✏️ </button><button
                                    class="btn btn-ghost btn-xs"> 👁 </button><button class="btn btn-danger btn-xs"> 🗑
                                </button></div>
                        </td>
                    </tr>
                    <tr>
                        <td><input type="checkbox" value="14" style="cursor: pointer;"></td>
                        <td>
                            <div class="tbl-name">
                                <div class="tbl-ava b-blue" style="width: 28px; height: 28px;">A</div>
                                <div>
                                    <div class="tbl-name-val">Nguyễn Phúc An</div>
                                    <div class="tbl-name-sub">Chít trai</div>
                                </div>
                            </div>
                        </td>
                        <td><span class="badge b-blue">♂ Nam</span></td>
                        <td><span class="badge gen-5">Đời 5</span></td>
                        <td class="font-mono text-sm">1995</td>
                        <td class="text-secondary">TP.HCM</td>
                        <td class="text-secondary">Sinh viên</td>
                        <td><span class="badge b-green">● Sống</span></td>
                        <td>
                            <div class="flex gap-4"><button class="btn btn-ghost btn-xs"> ✏️ </button><button
                                    class="btn btn-ghost btn-xs"> 👁 </button><button class="btn btn-danger btn-xs"> 🗑
                                </button></div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="card-body" style="padding: 12px 20px; border-top: 1px solid var(--border)">
                <div class="flex-between">
                    <span class="text-sm text-secondary">Hiển thị 10 trong 14 thành viên</span>
                    <div class="flex gap-8">
                        <button class="btn btn-ghost btn-xs">← Trước</button>
                        <button class="btn btn-secondary btn-xs">1</button>
                        <button class="btn btn-ghost btn-xs">2</button>
                        <button class="btn btn-ghost btn-xs">Sau →</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
</script>