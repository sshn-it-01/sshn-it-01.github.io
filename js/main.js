/**
 * =============================================================================
 * 华南森孚贸易有限公司 - 全局 JavaScript 文件
 * =============================================================================
 * 文件说明：处理页面的交互逻辑，包括移动端菜单、动态内容更新等功能
 * 加载方式：通过 HTML 的 defer 属性延迟加载，确保 DOM 加载完成后再执行
 * 编码规范：遵循项目 JavaScript 代码组织规范，所有逻辑集中在此文件
 * =============================================================================
 */

/* -----------------------------------------------------------------------------
 * 功能 1: 自动更新页脚版权年份
 * 作用：每年自动更新，无需手动修改 HTML
 * 调用时机：页面加载完成后立即执行
 * -------------------------------------------------------------------------- */

/**
 * 更新页脚年份函数
 * 查找 id 为 'current-year' 的 span 元素，并设置为当前年份
 */
function updateFooterYear() {
    // 获取页脚中的年份元素
    const yearSpan = document.getElementById('current-year');
    
    // 检查元素是否存在（防止在不含该元素的页面上报错）
    if (yearSpan) {
        // 创建 Date 对象并获取当前年份（例如：2026）
        yearSpan.textContent = new Date().getFullYear();
    }
}

/* -----------------------------------------------------------------------------
 * 功能 2: 移动端汉堡菜单切换
 * 作用：在小屏幕设备上控制导航菜单的展开/收起
 * 触发条件：用户点击汉堡菜单按钮（☰）
 * 响应式断点：768px 及以下显示汉堡菜单
 * -------------------------------------------------------------------------- */

/**
 * 初始化移动端菜单函数
 * 为汉堡菜单按钮绑定点击事件监听器
 */
function initMobileMenu() {
    // 获取汉堡菜单按钮元素
    const menuToggle = document.getElementById('mobile-menu');
    // 获取导航链接列表元素
    const navLinks = document.getElementById('nav-links');
    
    // 调试日志：输出获取到的元素（开发时使用，便于排查问题）
    console.log('Init mobile menu - menuToggle:', menuToggle);
    console.log('Init mobile menu - navLinks:', navLinks);
    
    // 确保两个元素都存在才继续执行（防止报错）
    if (menuToggle && navLinks) {
        // 初始状态检查（调试用）
        console.log('Initial classList:', navLinks.classList);
        console.log('Initial has active?', navLinks.classList.contains('active'));
        
        // 为汉堡按钮添加点击事件监听器
        menuToggle.addEventListener('click', function() {
            // 使用 add/remove 替代 toggle，确保行为明确可控
            if (navLinks.classList.contains('active')) {
                // 如果菜单已经是展开状态，则关闭菜单
                navLinks.classList.remove('active');
                console.log('Removed active class - 菜单已关闭');
            } else {
                // 如果菜单是收起状态，则展开菜单
                navLinks.classList.add('active');
                console.log('Added active class - 菜单已展开');
            }
            
            // 调试信息输出
            console.log('Window width:', window.innerWidth);
            console.log('NavLinks computed display:', window.getComputedStyle(navLinks).display);
            console.log('Current classList:', navLinks.className);
            
            // 更新汉堡按钮图标
            // 菜单展开时显示 '✕'（关闭符号），收起时显示 '☰'（菜单符号）
            this.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
        });
    } else {
        // 如果找不到菜单元素，输出错误日志（便于排查 HTML 结构问题）
        console.error('Mobile menu elements not found!');
        console.error('menuToggle:', menuToggle);
        console.error('navLinks:', navLinks);
    }
}

/* -----------------------------------------------------------------------------
 * 页面加载完成后的初始化
 * 作用：当 DOM 树完全构建后，执行初始化函数
 * 触发时机：HTML 文档完全加载和解析完成后
 * -------------------------------------------------------------------------- */

// 监听 DOMContentLoaded 事件（DOM 加载完成）
document.addEventListener('DOMContentLoaded', () => {
    // 调用页脚年份更新函数
    updateFooterYear();
    // 调用移动端菜单初始化函数
    initMobileMenu();
});
