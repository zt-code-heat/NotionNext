window.addEventListener('load', function () {
    // ========== 自定义配置区 ==========
    const IDLE_WAIT = 30 * 1000;      // 闲置30秒触发全屏轮播
    const IMAGE_SWITCH_DELAY = 5000; // 每张图片停留5秒后切换
    const IMAGE_LIST = [
        "/bg_image.jpg",
        "/6318a3af42577c493c1c2c7b8f3b1549.jpg",
        "/17821855135900 (1).png"
    ];
    // =================================

    let idleTimer = null;
    let slideTimer = null;
    let fullscreenMask = null;
    let currentImgIndex = 0;

    // 关闭全屏轮播、重置计时器
    function closeFullScreenSlide() {
        clearTimeout(idleTimer);
        clearInterval(slideTimer);
        if (fullscreenMask) {
            fullscreenMask.remove();
            fullscreenMask = null;
        }
        if (document.exitFullscreen) document.exitFullscreen();
        idleTimer = setTimeout(openFullScreenSlide, IDLE_WAIT);
    }

    // 打开全屏轮播
    function openFullScreenSlide() {
        if (fullscreenMask) return;

        // 创建全屏遮罩
        fullscreenMask = document.createElement('div');
        fullscreenMask.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: #000;
            z-index: 999999;
            display: flex;
            align-items: center;
            justify-content: center;
        `;

        // 创建图片容器
        const imgBox = document.createElement('img');
        imgBox.style.cssText = `
            max-width: 95vw;
            max-height: 95vh;
            object-fit: contain;
            transition: opacity 0.8s ease;
        `;
        imgBox.src = IMAGE_LIST[currentImgIndex];
        fullscreenMask.appendChild(imgBox);
        document.body.appendChild(fullscreenMask);

        // 尝试进入全屏（浏览器需用户先点击一次页面）
        document.documentElement.requestFullscreen().catch(err => {});

        // 任意操作立即关闭
        ['click', 'mousemove', 'touchstart', 'wheel', 'keydown'].forEach(ev => {
            fullscreenMask.addEventListener(ev, closeFullScreenSlide);
            window.addEventListener(ev, closeFullScreenSlide);
        });

        // 循环切换图片
        slideTimer = setInterval(() => {
            currentImgIndex = (currentImgIndex + 1) % IMAGE_LIST.length;
            imgBox.style.opacity = 0;
            setTimeout(() => {
                imgBox.src = IMAGE_LIST[currentImgIndex];
                imgBox.style.opacity = 1;
            }, 800);
        }, IMAGE_SWITCH_DELAY);
    }

    // 监听用户操作，重置计时器
    ['mousemove', 'mousedown', 'keydown', 'touchstart', 'wheel'].forEach(event => {
        window.addEventListener(event, closeFullScreenSlide);
    });

    // 初始化倒计时
    idleTimer = setTimeout(openFullScreenSlide, IDLE_WAIT);
});
