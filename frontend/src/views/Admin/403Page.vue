<template>
    <div class="page">
        <!-- ── MAIN CARD ── -->
        <div class="card">

            <!-- Lock icon -->
            <div class="lock-wrap">
                <div class="lock-ring"></div>
                <div class="lock-ring"></div>
                <div class="lock-icon"><i class="fa-solid fa-lock"></i></div>
            </div>

            <!-- BIG 403 -->
            <div class="error-num-wrap">
                <div class="error-num">403</div>
            </div>

            <!-- Divider -->
            <div class="divider">
                <div class="divider-line"></div>
                <div class="divider-icon">
                    <i class="fa-solid fa-shield-halved"></i>
                </div>
                <div class="divider-line"></div>
            </div>

            <!-- Headline -->
            <h1 class="headline"><em>Cấm Truy Cập</em> – Không Đủ Quyền Hạn</h1>

            <!-- Body -->
            <p class="body-text">
                Bạn <strong>không có quyền</strong> truy cập vào trang hoặc tài nguyên
                này. Khu vực này yêu cầu vai trò cao hơn trong hệ thống quản lý gia phả.
            </p>

        </div>
    </div>
</template>
<style scoped>
/* ── BACKGROUND LAYERS ── */
.bg-layer {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 0;
}

/* Radial glow */
.bg-layer::before {
    content: "";
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse 60% 50% at 50% 50%,
            rgba(166, 60, 46, 0.12) 0%,
            transparent 65%),
        radial-gradient(ellipse 100% 80% at 10% 90%,
            rgba(201, 168, 76, 0.05) 0%,
            transparent 50%),
        radial-gradient(ellipse 80% 60% at 90% 10%,
            rgba(61, 122, 90, 0.04) 0%,
            transparent 50%);
}

/* Grid texture */
.bg-layer::after {
    content: "";
    position: absolute;
    inset: 0;
    background-image: linear-gradient(rgba(58, 46, 30, 0.25) 1px,
            transparent 1px),
        linear-gradient(90deg, rgba(58, 46, 30, 0.25) 1px, transparent 1px);
    background-size: 40px 40px;
    mask-image: radial-gradient(ellipse 70% 70% at 50% 50%,
            black 0%,
            transparent 80%);
}

/* Floating particles */
.particles {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 1;
    overflow: hidden;
}

.particle {
    position: absolute;
    border-radius: 50%;
    opacity: 0;
    animation: float-particle linear infinite;
}

@keyframes float-particle {
    0% {
        transform: translateY(110vh) rotate(0deg);
        opacity: 0;
    }

    5% {
        opacity: 0.6;
    }

    95% {
        opacity: 0.3;
    }

    100% {
        transform: translateY(-10vh) rotate(720deg);
        opacity: 0;
    }
}

/* Diagonal slash */
.slash-deco {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 1;
    overflow: hidden;
}

.slash-deco::before,
.slash-deco::after {
    content: "";
    position: absolute;
    width: 1px;
    height: 200%;
    background: linear-gradient(to bottom,
            transparent,
            rgba(166, 60, 46, 0.18),
            transparent);
    transform-origin: center;
}

.slash-deco::before {
    left: 30%;
    top: -50%;
    transform: rotate(20deg);
    animation: slash-flicker 4s ease-in-out infinite;
}

.slash-deco::after {
    left: 68%;
    top: -50%;
    transform: rotate(-15deg);
    animation: slash-flicker 5s ease-in-out infinite 0.8s;
}

@keyframes slash-flicker {

    0%,
    100% {
        opacity: 0.4;
    }

    50% {
        opacity: 0.9;
    }
}

/* ── MAIN CARD ── */
.card {
    position: relative;
    z-index: 10;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 0 40px 40px;
    width: 100%;
    animation: card-reveal 0.8s cubic-bezier(0.22, 1, 0.36, 1) both;
}

@keyframes card-reveal {
    from {
        opacity: 0;
        transform: translateY(32px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Top brand */
.brand {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 42px;
    opacity: 0;
    animation: fade-in 0.5s ease 0.2s forwards;
}

.brand-emblem {
    width: 38px;
    height: 38px;
    border-radius: 50%;
    border: 1px solid var(--gold-d);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    color: var(--gold);
    background: radial-gradient(circle,
            rgba(201, 168, 76, 0.1),
            transparent);
}

.brand-name {
    font-family: "Playfair Display", serif;
    font-size: 15px;
    font-weight: 700;
    color: var(--gold-l);
    letter-spacing: 1px;
}

.brand-sep {
    width: 1px;
    height: 20px;
    background: var(--border);
}

.brand-sub {
    font-size: 11px;
    color: var(--text-m);
    letter-spacing: 2px;
    text-transform: uppercase;
}

/* ── BIG 403 ── */
.error-num-wrap {
    position: relative;
    margin-bottom: 4px;
    opacity: 0;
    animation: fade-in 0.6s ease 0.35s forwards;
}

.error-num {
    font-family: "Playfair Display", serif;
    font-size: clamp(100px, 18vw, 170px);
    font-weight: 900;
    font-style: italic;
    line-height: 1;
    color: transparent;
    -webkit-text-stroke: 2px var(--red);
    text-stroke: 2px var(--red);
    position: relative;
    letter-spacing: -8px;
    user-select: none;
    text-shadow: 0 0 60px rgba(166, 60, 46, 0.25),
        0 0 120px rgba(166, 60, 46, 0.1);
}

/* Glitch layers */
.error-num::before,
.error-num::after {
    content: "403";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    letter-spacing: -8px;
    -webkit-text-stroke: 2px;
}

.error-num::before {
    color: transparent;
    -webkit-text-stroke-color: var(--gold-d);
    animation: glitch-a 3.5s infinite;
    clip-path: polygon(0 0, 100% 0, 100% 40%, 0 40%);
}

.error-num::after {
    color: transparent;
    -webkit-text-stroke-color: var(--jade);
    animation: glitch-b 4s infinite 0.5s;
    clip-path: polygon(0 60%, 100% 60%, 100% 100%, 0 100%);
}

@keyframes glitch-a {

    0%,
    90%,
    100% {
        transform: translate(0);
        opacity: 0;
    }

    91% {
        transform: translate(-4px, 2px);
        opacity: 0.7;
    }

    93% {
        transform: translate(4px, -2px);
        opacity: 0.5;
    }

    95% {
        transform: translate(-2px, 0);
        opacity: 0.8;
    }

    97% {
        transform: translate(0);
        opacity: 0;
    }
}

@keyframes glitch-b {

    0%,
    85%,
    100% {
        transform: translate(0);
        opacity: 0;
    }

    86% {
        transform: translate(5px, -3px);
        opacity: 0.6;
    }

    88% {
        transform: translate(-3px, 2px);
        opacity: 0.5;
    }

    90% {
        transform: translate(2px, 0);
        opacity: 0.7;
    }

    92% {
        transform: translate(0);
        opacity: 0;
    }
}

/* Seal overlay on 403 */
.forbidden-seal {
    position: absolute;
    right: -20px;
    top: 50%;
    transform: translateY(-50%) rotate(12deg);
    width: 88px;
    height: 88px;
    border: 3px solid var(--red);
    border-radius: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: rgba(166, 60, 46, 0.07);
    animation: seal-appear 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.7s both,
        seal-rotate 12s linear infinite;
    z-index: 2;
}

@keyframes seal-appear {
    from {
        transform: translateY(-50%) rotate(12deg) scale(0);
        opacity: 0;
    }

    to {
        transform: translateY(-50%) rotate(12deg) scale(1);
        opacity: 1;
    }
}

@keyframes seal-rotate {
    to {
        transform: translateY(-50%) rotate(372deg);
    }
}

.seal-inner {
    font-size: 9px;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--red-l);
    font-family: sans-serif;
    font-weight: 700;
    line-height: 1.3;
    text-align: center;
}

.seal-icon {
    font-size: 18px;
    color: var(--red-l);
    margin-bottom: 3px;
}

/* Dashed ring on seal */
.forbidden-seal::before {
    content: "";
    position: absolute;
    inset: 5px;
    border: 1px dashed rgba(166, 60, 46, 0.5);
    border-radius: 50%;
}

/* ── DIVIDER ── */
.divider {
    display: flex;
    align-items: center;
    gap: 14px;
    width: 100%;
    max-width: 380px;
    margin: 10px 0 22px;
    opacity: 0;
    animation: fade-in 0.5s ease 0.5s forwards;
}

.divider-line {
    flex: 1;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--border));
}

.divider-line:last-child {
    background: linear-gradient(90deg, var(--border), transparent);
}

.divider-icon {
    font-size: 14px;
    color: var(--red);
}

/* ── HEADLINE ── */
.headline {
    font-family: "Playfair Display", serif;
    font-size: clamp(20px, 3vw, 28px);
    font-weight: 700;
    color: var(--white);
    line-height: 1.25;
    margin-bottom: 10px;
    opacity: 0;
    animation: fade-in 0.5s ease 0.55s forwards;
}

.headline em {
    font-style: italic;
    color: var(--gold-l);
}

/* ── BODY TEXT ── */
.body-text {
    font-size: 15.5px;
    color: var(--text-d);
    line-height: 1.7;
    max-width: 460px;
    margin-bottom: 28px;
    opacity: 0;
    animation: fade-in 0.5s ease 0.65s forwards;
}

.body-text strong {
    color: var(--text);
}

/* ── INFO PILLS ── */
.info-row {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 32px;
    opacity: 0;
    animation: fade-in 0.5s ease 0.75s forwards;
}

.info-pill {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    padding: 7px 14px;
    border-radius: 6px;
    font-size: 12.5px;
    border: 1px solid var(--border);
    background: rgba(255, 255, 255, 0.03);
    color: var(--text-d);
}

.info-pill i {
    font-size: 11px;
}

.info-pill .pi-red {
    color: var(--red-l);
}

.info-pill .pi-gold {
    color: var(--gold);
}

.info-pill .pi-jade {
    color: var(--jade-l);
}

/* ── ACTION BUTTONS ── */
.actions {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 36px;
    opacity: 0;
    animation: fade-in 0.5s ease 0.85s forwards;
}

.btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 11px 22px;
    border-radius: 7px;
    font-family: "Crimson Pro", serif;
    font-size: 14.5px;
    font-weight: 600;
    cursor: pointer;
    border: none;
    text-decoration: none;
    transition: all 0.25s;
    position: relative;
    overflow: hidden;
}

.btn::before {
    content: "";
    position: absolute;
    inset: 0;
    background: rgba(255, 255, 255, 0.07);
    opacity: 0;
    transition: opacity 0.2s;
}

.btn:hover::before {
    opacity: 1;
}

.btn-primary {
    background: var(--gold);
    color: var(--bg);
}

.btn-primary:hover {
    background: var(--gold-l);
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(201, 168, 76, 0.25);
}

.btn-secondary {
    background: transparent;
    border: 1px solid var(--border);
    color: var(--text-d);
}

.btn-secondary:hover {
    border-color: var(--gold-d);
    color: var(--gold-l);
    transform: translateY(-2px);
}

.btn-danger {
    background: rgba(166, 60, 46, 0.15);
    border: 1px solid rgba(166, 60, 46, 0.35);
    color: var(--red-l);
}

.btn-danger:hover {
    background: rgba(166, 60, 46, 0.25);
    transform: translateY(-2px);
}

/* ── ACCESS REQUEST BOX ── */
.request-box {
    width: 100%;
    max-width: 480px;
    background: var(--panel);
    border: 1px solid var(--border);
    border-radius: 10px;
    overflow: hidden;
    margin-bottom: 28px;
    opacity: 0;
    animation: fade-in 0.5s ease 0.95s forwards;
}

.request-box-head {
    padding: 12px 18px;
    border-bottom: 1px solid var(--border);
    display: flex;
    align-items: center;
    gap: 8px;
    background: rgba(255, 255, 255, 0.02);
}

.request-box-head i {
    color: var(--gold);
    font-size: 13px;
}

.request-box-title {
    font-size: 13px;
    font-weight: 600;
    color: var(--text);
    flex: 1;
}

.rq-status {
    font-size: 10px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: var(--text-m);
    font-family: sans-serif;
}

.request-box-body {
    padding: 16px 18px;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.rq-row {
    display: flex;
    align-items: flex-start;
    gap: 10px;
}

.rq-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    margin-top: 7px;
    flex-shrink: 0;
}

.rq-dot.red {
    background: var(--red-l);
}

.rq-dot.gold {
    background: var(--gold);
}

.rq-dot.jade {
    background: var(--jade-l);
}

.rq-text {
    font-size: 12.5px;
    color: var(--text-d);
    line-height: 1.5;
}

.rq-text strong {
    color: var(--text);
}

/* ── FOOTER ── */
.footer-note {
    font-size: 11px;
    color: var(--text-m);
    letter-spacing: 0.5px;
    opacity: 0;
    animation: fade-in 0.5s ease 1.1s forwards;
}

.footer-note a {
    color: var(--gold-d);
    text-decoration: none;
    transition: color 0.2s;
}

.footer-note a:hover {
    color: var(--gold);
}

/* ── SIDE DECORATIONS ── */
.side-deco {
    position: fixed;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    opacity: 0;
    animation: fade-in 0.6s ease 1s forwards;
    pointer-events: none;
}

.side-deco.left {
    left: 32px;
}

.side-deco.right {
    right: 32px;
}

.side-line {
    width: 1px;
    height: 80px;
    background: linear-gradient(to bottom,
            transparent,
            var(--border),
            transparent);
}

.side-dot {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: var(--gold-d);
}

.side-label {
    font-size: 9px;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: var(--text-m);
    writing-mode: vertical-rl;
    text-orientation: mixed;
    font-family: sans-serif;
}

/* ── CORNER ORNAMENTS ── */
.corner {
    position: fixed;
    width: 48px;
    height: 48px;
    pointer-events: none;
    opacity: 0.4;
}

.corner::before,
.corner::after {
    content: "";
    position: absolute;
    background: var(--gold-d);
}

.corner::before {
    width: 100%;
    height: 1px;
    top: 0;
    left: 0;
}

.corner::after {
    width: 1px;
    height: 100%;
    top: 0;
    left: 0;
}

.corner.tl {
    top: 20px;
    left: 20px;
}

.corner.tr {
    top: 20px;
    right: 20px;
    transform: scaleX(-1);
}

.corner.bl {
    bottom: 20px;
    left: 20px;
    transform: scaleY(-1);
}

.corner.br {
    bottom: 20px;
    right: 20px;
    transform: scale(-1);
}

/* ── SCAN LINE ANIMATION ── */
.scan-line {
    position: fixed;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg,
            transparent,
            rgba(166, 60, 46, 0.05),
            rgba(166, 60, 46, 0.15),
            rgba(166, 60, 46, 0.05),
            transparent);
    pointer-events: none;
    z-index: 5;
    animation: scan 6s linear infinite;
}

@keyframes scan {
    from {
        top: -2px;
    }

    to {
        top: 100vh;
    }
}

/* ── UTILITIES ── */
@keyframes fade-in {
    from {
        opacity: 0;
        transform: translateY(8px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Lock icon pulsing ring */
.lock-wrap {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 8px;
    opacity: 0;
    animation: fade-in 0.5s ease 0.42s forwards;
}

.lock-ring {
    position: absolute;
    width: 72px;
    height: 72px;
    border-radius: 50%;
    border: 1px solid rgba(166, 60, 46, 0.4);
    animation: ring-pulse 2.4s ease-in-out infinite;
}

.lock-ring:nth-child(2) {
    width: 56px;
    height: 56px;
    border-color: rgba(166, 60, 46, 0.6);
    animation-delay: 0.4s;
}

@keyframes ring-pulse {

    0%,
    100% {
        transform: scale(1);
        opacity: 0.8;
    }

    50% {
        transform: scale(1.15);
        opacity: 0.3;
    }
}

.lock-icon {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: rgba(166, 60, 46, 0.15);
    border: 1px solid var(--red);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    color: var(--red-l);
    position: relative;
    z-index: 2;
}
</style>