<template>
    <div id="app">
        <!-- ============ LOGIN ============ -->
        <div class="login-screen">
            <div class="login-left">
                <div class="login-ornament">🏛️</div>
                <div class="login-brand">Gia Phả<br />Số Hoá</div>
                <div class="login-tagline">Digital Genealogy System</div>
                <div class="login-divider"></div>
                <div class="login-quote">
                    "Uống nước nhớ nguồn — Dù nguồn xa đến đâu, dòng chảy vẫn mang hơi
                    ấm của tổ tiên."
                </div>
            </div>
            <div class="login-right">
                <router-view></router-view>
                <!-- <div class="login-hint">
                    Dùng <span>admin</span> / <span>admin123</span> để thử nghiệm
                </div> -->
            </div>
        </div>
    </div>
</template>