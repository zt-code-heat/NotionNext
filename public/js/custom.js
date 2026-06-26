window.addEventListener('load', function () {
    // 闲置等待30秒触发全屏轮播，单张图片停留5秒
    const IDLE_WAIT = 30 * 1000;
    const IMAGE_SWITCH_DELAY = 5000;
    // 完整图片列表：bg_image、随机图、picture1~picture4
    const IMAGE_LIST = [
        "/6318a3af42577c493c1c2c7b8f3b1549.jpg",
        "/picture1.png",
        "/picture2.png",
        "/picture3.png",
        "/picture4.png"
    ];

    let idleTimer = null;
    let slideTimer = null;
    let maskDom = null;
    let currentIndex = 0;

    // 关闭全屏遮罩，重置倒计时
    function closeSlideMask() {
        clearTimeout(idleTimer);
        clearInterval(slideTimer);
        if (maskDom) {
            maskDom.remove();
            maskDom = null;
        }
        if (document.exitFullscreen) document.exitFullscreen();
        idleTimer = setTimeout(openSlideMask, IDLE_WAIT);
    }

    // 创建全屏图片轮播遮罩
    function openSlideMask() {
        if (maskDom) return;
        // 黑色全屏底层
        maskDom = document.createElement('div');
        maskDom.style.cssText = `
            position: fixed;top:0;left:0;width:100vw;height:100vh;background:#000;
            z-index:999999;display:flex;align-items:center;justify-content:center;
        `;
        // 图片容器（关键修改：object-fit: cover 铺满全屏）
        const img = document.createElement('img');
        img.style.cssText = `
            width:100vw;
            height:100vh;
            object-fit:cover; /* 铺满屏幕，会裁剪边缘保持比例 */
            transition:opacity 0.7s ease;opacity:1;
        `;
        img.src = IMAGE_LIST[currentIndex];
        maskDom.appendChild(img);
        document.body.appendChild(maskDom);
        // 尝试浏览器全屏
        document.documentElement.requestFullscreen().catch(()=>{});
        // 任意操作关闭轮播
        ['mousemove','click','touchstart','wheel','keydown'].forEach(ev=>{
            maskDom.addEventListener(ev, closeSlideMask);
            window.addEventListener(ev, closeSlideMask);
        });
        // 自动切换图片
        slideTimer = setInterval(()=>{
            img.style.opacity = 0;
            setTimeout(()=>{
                currentIndex = (currentIndex + 1) % IMAGE_LIST.length;
                img.src = IMAGE_LIST[currentIndex];
                img.style.opacity = 1;
            },700);
        }, IMAGE_SWITCH_DELAY);
    }

    // 监听所有用户交互，重置等待计时
    ['mousemove','mousedown','touchstart','wheel','keydown'].forEach(event=>{
        window.addEventListener(event, closeSlideMask);
    });
    idleTimer = setTimeout(openSlideMask, IDLE_WAIT);
})
