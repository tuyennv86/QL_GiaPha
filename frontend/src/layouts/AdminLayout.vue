<template>
    <div id="app">

        <!-- ============ APP ============ -->
        <div class="app-shell">
            <!-- SIDEBAR -->
            <SilebarCompo></SilebarCompo>

            <!-- MAIN -->
            <div class="main">
                <!-- TOPBAR -->
                <TopBar></TopBar>
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
import TopBar from '@/components/TopBar.vue';
</script>