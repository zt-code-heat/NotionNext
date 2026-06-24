// Simple主题专用 无人闲置自动PPT循环播放脚本
window.addEventListener('load', function () {
    // ========== 可自定义配置项（单位：毫秒） ==========
    const IDLE_WAIT_TIME = 30 * 1000;    // 闲置30秒无操作开始自动播放
    const PAGE_STAY_TIME = 6 * 1000;     // 每个页面区块停留6秒后切换
    const AUTO_FULLSCREEN = false;       // 关闭自动全屏（如需开启改为true）
    // ==============================================

    let idleTimer = null;
    let loopTimer = null;
    let isAutoPlaying = false;

    // Simple主题精准DOM选择器（首页固定存在，兼容性拉满）
    const slideAreas = [
        document.querySelector('.hero'),                // 顶部首页横幅推荐区
        document.querySelector('.flex.flex-wrap.gap-4'), // 必看精选/热门文章标签区
        document.querySelector('.grid.grid-cols-1.lg\\:grid-cols-3.gap-6'), // 文章卡片列表
        document.querySelector('footer')                 // 页脚区域
    ].filter(el => el !== null);

    // 重置计时器、停止自动播放
    function resetIdleTimer() {
        clearTimeout(idleTimer);
        clearInterval(loopTimer);
        isAutoPlaying = false;
        // 退出全屏
        if (document.exitFullscreen) document.exitFullscreen();
        idleTimer = setTimeout(startSlidePlay, IDLE_WAIT_TIME);
    }

    // 开启自动循环滚动播放
    function startSlidePlay() {
        if (slideAreas.length === 0) return;
        isAutoPlaying = true;
        let currentIndex = 0;

        // 自动全屏逻辑
        if (AUTO_FULLSCREEN && !document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                console.log('浏览器需点击页面一次才可触发全屏');
            })
        }

        loopTimer = setInterval(() => {
            slideAreas[currentIndex].scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            currentIndex = (currentIndex + 1) % slideAreas.length;
        }, PAGE_STAY_TIME);
    }

    // 监听所有用户交互行为，任意操作立即停止播放
    ['mousemove', 'mousedown', 'keydown', 'wheel', 'touchstart'].forEach(event => {
        window.addEventListener(event, resetIdleTimer);
    })

    // 初始化闲置计时
    resetIdleTimer();

    // 右下角悬浮播放状态提示
    const tipDom = document.createElement('div');
    tipDom.style.cssText = `
        position: fixed;
        right: 24px;
        bottom: 24px;
        background: rgba(0, 0, 0, 0.7);
        color: #ffffff;
        padding: 10px 16px;
        border-radius: 8px;
        font-size: 14px;
        z-index: 99999;
        pointer-events: none;
        display: none;
    `;
    tipDom.innerText = '🎬 幻灯片自动播放中，移动鼠标即可退出';
    document.body.appendChild(tipDom);

    // 控制提示框显示隐藏
    setInterval(() => {
        tipDom.style.display = isAutoPlaying ? 'block' : 'none';
    }, 100);
})
