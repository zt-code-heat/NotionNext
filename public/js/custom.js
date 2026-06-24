// 这里编写自定义js脚本；将被静态引入到页面中
// Heo主题专用 无人操作自动PPT循环播放脚本
window.addEventListener('load', function () {
    // ========== 可自定义配置 ==========
    const IDLE_SECONDS = 30;    // 闲置30秒无操作开始自动播放
    const PLAY_SECONDS = 6;      // 每个页面区块停留6秒切换
    const AUTO_FULLSCREEN = true;// 是否开启自动全屏PPT模式
    // ==================================

    let idleTimer = null;
    let loopTimer = null;
    let isPlaying = false;

    // Heo主题稳定DOM选择器（首页必存在，不会匹配失败）
    const slideAreas = [
        document.querySelector('.banner'),       // 顶部横幅区域
        document.querySelector('.post-list'),    // 文章列表区域
        document.querySelector('.aside'),        // 侧边栏
        document.querySelector('footer')         // 页脚
    ].filter(el => el !== null);

    // 重置计时器、停止自动播放
    function resetTimer() {
        clearTimeout(idleTimer);
        clearInterval(loopTimer);
        isPlaying = false;
        // 退出全屏
        if (document.exitFullscreen) document.exitFullscreen();
        // 重新开始闲置倒计时
        idleTimer = setTimeout(startPlay, IDLE_SECONDS * 1000);
    }

    // 开启循环幻灯片自动滚动
    function startPlay() {
        if (slideAreas.length === 0) return;
        isPlaying = true;
        let currentIndex = 0;

        // 自动全屏
        if (AUTO_FULLSCREEN && !document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                console.log('浏览器需要点击页面一次后才能全屏');
            })
        }

        // 循环平滑滚动
        loopTimer = setInterval(() => {
            slideAreas[currentIndex].scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            currentIndex = (currentIndex + 1) % slideAreas.length;
        }, PLAY_SECONDS * 1000);
    }

    // 监听所有用户操作：鼠标、键盘、滚轮、触屏
    ['mousemove', 'mousedown', 'keydown', 'wheel', 'touchstart'].forEach(event => {
        window.addEventListener(event, resetTimer);
    })

    // 初始化计时
    resetTimer();

    // 右下角悬浮提示样式
    const tip = document.createElement('div');
    tip.style.cssText = `
        position:fixed;right:24px;bottom:24px;
        background:rgba(0,0,0,0.7);color:#fff;
        padding:10px 16px;border-radius:8px;font-size:14px;
        z-index:99999;pointer-events:none;display:none;
    `;
    tip.innerText = '🎬 幻灯片自动播放中，移动鼠标即可退出';
    document.body.appendChild(tip);

    // 播放时显示提示
    setInterval(() => {
        tip.style.display = isPlaying ? 'block' : 'none';
    }, 100)
})
