// 前端页面专用脚本
// 初始化AOS动画
AOS.init({
    duration: 1000,
    once: true
});

// 页面加载完成后执行
window.addEventListener('DOMContentLoaded', function() {
    console.log('前端页面加载完成');
    // 可以在这里添加前端页面特有的交互逻辑
});