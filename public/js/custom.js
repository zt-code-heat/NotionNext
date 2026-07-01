window.addEventListener('load', function () {
    // 闲置等待30秒触发全屏轮播，单张图片停留5秒
    const IDLE_WAIT = 30 * 1000;
    const IMAGE_SWITCH_DELAY = 5000;
    // 完整图片列表
    const IMAGE_LIST = [
        "/picture1.1.1.png",
        "/picture1.1.png",
        "/picture1.2.png"
    ];

    let idleTimer = null;
    let slideTimer = null;
    let maskDom = null;
    let currentIndex = 0;

    // 1. 优化：轻量级的倒计时重置函数，高频触发时性能极好
    function resetIdleTimer() {
        clearTimeout(idleTimer);
        
        // 如果全屏遮罩存在，说明当前处于闲置状态，用户一旦操作则关闭遮罩
        if (maskDom) {
            closeSlideMask();
        }
        
        // 重新开始30秒倒计时
        idleTimer = setTimeout(openSlideMask, IDLE_WAIT);
    }

    // 2. 优化：仅在需要销毁遮罩时调用一次
    function closeSlideMask() {
        clearInterval(slideTimer);
        if (maskDom) {
            maskDom.remove();
            maskDom = null;
        }
        // 优化：只有当处于全屏状态时才尝试退出，并捕获可能存在的异常
        if (document.fullscreenElement && document.exitFullscreen) {
            document.exitFullscreen().catch(() => {});
        }
    }

    // 创建全屏图片轮播遮罩
    function openSlideMask() {
        if (maskDom) return;
        
        // 黑色全屏底层
        maskDom = document.createElement('div');
        maskDom.style.cssText = `
            position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: #000;
            z-index: 999999; display: flex; align-items: center; justify-content: center;
            cursor: none; /* 体验优化：全屏展示时隐藏鼠标指针 */
        `;

        // 图片容器
        const img = document.createElement('img');
        img.style.cssText = `
            width: 100vw; height: 100vh; object-fit: cover;
            transition: opacity 0.7s ease; opacity: 1;
        `;
        img.src = IMAGE_LIST[currentIndex];
        maskDom.appendChild(img);
        document.body.appendChild(maskDom);

        // 尝试浏览器全屏
        document.documentElement.requestFullscreen().catch(() => {});

        // 自动切换图片
        slideTimer = setInterval(() => {
            img.style.opacity = 0;
            setTimeout(() => {
                currentIndex = (currentIndex + 1) % IMAGE_LIST.length;
                img.src = IMAGE_LIST[currentIndex];
                img.style.opacity = 1;
            }, 700); // 动效契合：等待 0.7 秒淡出完成后再无缝切图
        }, IMAGE_SWITCH_DELAY);
    }

    // 3. 优化：监听全局用户交互，仅用于重置计时
    // 加入 { passive: true } 优化滚动监听性能
    ['mousemove', 'mousedown', 'touchstart', 'wheel', 'keydown'].forEach(event => {
        window.addEventListener(event, resetIdleTimer, { passive: true });
    });

    // 初始化第一次倒计时
    idleTimer = setTimeout(openSlideMask, IDLE_WAIT);
});
