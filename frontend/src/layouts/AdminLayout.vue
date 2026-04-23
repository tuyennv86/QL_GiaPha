<template>
    <div id="app">

        <!-- ============ APP ============ -->
        <div class="app-shell">
            <!-- SIDEBAR -->
            <SilebarCompo></SilebarCompo>

            <!-- MAIN -->
            <div class="main">
                <!-- TOPBAR -->
                <div class="topbar">
                    <div class="topbar-path">Admin <span>/ Dashboard</span></div>
                    <div class="topbar-spacer"></div>
                    <div class="topbar-actions">
                        <button class="tb-btn" title="Tìm kiếm">🔍</button>
                        <button class="tb-btn" title="Thông báo">
                            🔔
                            <span class="tb-notif-dot"></span>
                        </button>
                        <button class="tb-btn" title="Xem trang chính">
                            🌐
                        </button>
                        <div class="tb-user">
                            <div class="tb-user-ava">AD</div>
                            <div class="tb-user-name">Super Admin</div>
                        </div>
                    </div>
                </div>

                <!-- Conten -->
                <router-view></router-view>


            </div>
            <!-- /main -->
        </div>
        <!-- /app-shell -->
    </div>
    <!-- /app -->
</template>
<script setup>
import SilebarCompo from '@/components/Silebar/SilebarCompo.vue';

</script>