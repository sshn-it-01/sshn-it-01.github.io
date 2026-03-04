// 自动更新页脚年份
function updateFooterYear() {
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
}

// 移动端菜单切换
function initMobileMenu() {
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.getElementById('nav-links');
    
    console.log('Init mobile menu - menuToggle:', menuToggle);
    console.log('Init mobile menu - navLinks:', navLinks);
    
    if (menuToggle && navLinks) {
        // 初始状态检查
        console.log('Initial classList:', navLinks.classList);
        console.log('Initial has active?', navLinks.classList.contains('active'));
        
        menuToggle.addEventListener('click', function() {
            // 使用 add/remove 替代 toggle，确保行为明确
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                console.log('Removed active class');
            } else {
                navLinks.classList.add('active');
                console.log('Added active class');
            }
            
            console.log('Window width:', window.innerWidth);
            console.log('NavLinks computed display:', window.getComputedStyle(navLinks).display);
            console.log('Current classList:', navLinks.className);
            
            // 更新汉堡按钮图标
            this.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
        });
    } else {
        console.error('Mobile menu elements not found!');
        console.error('menuToggle:', menuToggle);
        console.error('navLinks:', navLinks);
    }
}

// 页面加载后执行
document.addEventListener('DOMContentLoaded', () => {
    updateFooterYear();
    initMobileMenu();
});