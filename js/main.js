/**
 * 华南森孚贸易 - 主 JavaScript 文件
 * 文件说明：处理全站交互逻辑，包括页脚年份更新、移动端菜单控制等
 * 加载策略：通过 defer 属性延迟执行，确保 DOM 加载完成后运行
 */

/**
 * 自动更新页脚年份
 * @description 获取当前年份并更新到页脚，确保版权信息始终显示最新年份
 * 实现原理：通过 Date 对象获取系统年份，动态替换 span 元素的文本内容
 */
function updateFooterYear() {
    const yearSpan = document.getElementById('current-year');
    // 获取页脚中的年份元素，用于显示当前年份
    
    if (yearSpan) {
        // 如果元素存在才执行，防止报错
        yearSpan.textContent = new Date().getFullYear();
        // 使用 getFullYear() 获取完整的 4 位数年份（如 2026）
        // 避免使用 getYear() 返回两位数的兼容性问题
    }
}

/**
 * 初始化移动端菜单
 * @description 控制汉堡菜单按钮的点击事件，实现下拉菜单的展开/收起
 * 交互逻辑：检测菜单当前状态，切换 active 类名，同步更新按钮图标
 * 调试支持：包含详细的 console.log 输出，便于排查移动端菜单问题
 */
function initMobileMenu() {
    const menuToggle = document.getElementById('mobile-menu');
    // 获取汉堡菜单按钮元素（☰/✕图标）
    
    const navLinks = document.getElementById('nav-links');
    // 获取导航链接列表容器（下拉菜单）
    
    // [调试日志] 初始状态检查
    console.log('Init mobile menu - menuToggle:', menuToggle);
    console.log('Init mobile menu - navLinks:', navLinks);
    
    if (menuToggle && navLinks) {
        // 确保两个关键元素都存在才继续，防止空指针错误
        
        // [调试日志] 记录初始类名状态
        console.log('Initial classList:', navLinks.classList);
        console.log('Initial has active?', navLinks.classList.contains('active'));
        
        menuToggle.addEventListener('click', function() {
            // 监听汉堡按钮的点击事件，触发菜单切换
            
            // [状态切换策略] 使用 add/remove 替代 toggle，确保行为明确可控
            if (navLinks.classList.contains('active')) {
                // 如果当前是展开状态（有 active 类）
                navLinks.classList.remove('active');
                // 移除 active 类，隐藏下拉菜单
                console.log('Removed active class - 菜单已收起');
            } else {
                // 如果当前是收起状态（无 active 类）
                navLinks.classList.add('active');
                // 添加 active 类，显示下拉菜单
                console.log('Added active class - 菜单已展开');
            }
            
            // [调试日志] 记录切换后的状态，便于排查问题
            console.log('Window width:', window.innerWidth);
            // 输出当前窗口宽度，确认是否处于移动端断点（≤768px）
            
            console.log('NavLinks computed display:', window.getComputedStyle(navLinks).display);
            // 输出计算后的 display 值，验证 CSS 是否正确应用
            
            console.log('Current classList:', navLinks.className);
            // 输出完整的类名字符串，确认 active 类是否存在
            
            // [图标切换] 根据菜单状态更新汉堡按钮图标
            this.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
            // 展开时显示 ✕（关闭符号），收起时显示 ☰（菜单符号）
        });
    } else {
        // [错误处理] 如果关键元素不存在，输出详细错误信息
        console.error('Mobile menu elements not found!');
        console.error('menuToggle:', menuToggle);
        console.error('navLinks:', navLinks);
        // 提示开发者检查 HTML 中是否正确设置了 id="mobile-menu" 和 id="nav-links"
    }
}

// [页面加载后执行] DOMContentLoaded 事件监听
document.addEventListener('DOMContentLoaded', () => {
    // 当 HTML 文档完全加载并解析完成后执行（不等待图片、样式表等资源）
    
    updateFooterYear();
    // 立即更新页脚年份，确保用户看到最新的版权信息
    
    initMobileMenu();
    // 初始化移动端菜单功能，绑定点击事件监听器
});
