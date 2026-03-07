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

/* -----------------------------------------------------------------------------
 * 功能 2: 移动端汉堡菜单切换
 * 作用：在小屏幕设备上控制导航菜单的展开/收起
 * 触发条件：用户点击汉堡菜单按钮（☰）
 * 响应式断点：768px 及以下显示汉堡菜单
 * -------------------------------------------------------------------------- */

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

/* -----------------------------------------------------------------------------
 * 功能 3: 联系页面图片灯箱功能
 * 作用：点击门店图片或公司风采图片时弹出全屏模态框，显示高清大图
 * 触发条件：用户点击 .store-photo-img 或 .company-photo-img 元素
 * 关闭方式：点击右上角×按钮、点击背景区域或按 ESC 键
 * -------------------------------------------------------------------------- */

/**
 * [灯箱功能] 初始化图片灯箱
 * @description 为所有门店图片和公司风采图片添加点击事件，打开模态框显示放大图片
 * 交互流程：
 *   1. 获取点击图片的背景图 URL
 *   2. 将 URL 应用到模态框的 <img> 元素
 *   3. 获取图片说明文字并显示
 *   4. 显示模态框，设置 aria-hidden 为 false（无障碍访问）
 */
function initImageModal() {
    // 获取模态框相关元素
    const modal = document.getElementById('image-modal');
    // 模态框容器
    
    const modalImg = document.getElementById('modal-image');
    // 模态框中显示的图片元素
    
    const captionText = document.getElementById('modal-caption');
    // 模态框中的说明文字元素
    
    const closeBtn = document.getElementById('modal-close');
    // 关闭按钮元素
    
    // 确保所有关键元素都存在才继续执行
    if (!modal || !modalImg || !captionText || !closeBtn) {
        console.log('Modal elements not found, skipping initialization');
        return; // 如果元素不存在，直接返回（避免在非联系页面报错）
    }
    
    // 获取所有门店图片元素（通过 CSS 类名选择）
    const storeImages = document.querySelectorAll('.store-photo-img');
    // 选择所有带有 .store-photo-img 类的元素
    
    // 获取所有公司风采图片元素（通过 CSS 类名选择）
    const companyImages = document.querySelectorAll('.company-photo-img');
    // 选择所有带有 .company-photo-img 类的元素
    
    /**
     * [辅助函数] 为图片数组绑定点击事件
     * @param {NodeList} images - 图片元素列表
     * @param {string} defaultCaption - 默认说明文字
     */
    function bindImageEvents(images, defaultCaption) {
        images.forEach(img => {
            img.addEventListener('click', function() {
                // 当用户点击图片时触发
                
                // [获取图片源] 从 CSS 背景图中提取 URL
                const bgImage = window.getComputedStyle(this).backgroundImage;
                // 获取计算后的 background-image 属性值（格式：url("xxx")）
                
                // [清理 URL] 移除 url("") 包装，提取纯 URL 路径
                const imageSrc = bgImage.slice(5, -2);
                // slice(5, -2): 从第 6 个字符开始到倒数第 3 个字符结束
                // 例如：'url("path/to/image.jpg")' → 'path/to/image.jpg'
                
                // [获取说明文字] 从相邻的 caption 元素获取图片描述
                const caption = this.nextElementSibling?.textContent || defaultCaption;
                // nextElementSibling: 获取下一个兄弟元素（caption）
                // ?. 可选链操作符：如果不存在则返回 undefined，避免报错
                // || defaultCaption: 使用默认说明文字
                
                // [更新模态框内容] 设置图片和文字
                modalImg.src = imageSrc;
                // 设置模态框图片的 src 属性
                
                modalImg.alt = caption;
                // 设置替代文本（无障碍访问和 SEO）
                
                captionText.textContent = caption;
                // 设置说明文字
                
                // [显示模态框] 切换显示状态
                modal.style.display = 'flex';
                // 设置为 flex 显示（关键：使 Flexbox 居中布局生效）
                
                modal.setAttribute('aria-hidden', 'false');
                // 无障碍访问：告知屏幕阅读器模态框已显示
                
                // [阻止背景滚动] 禁止 body 滚动
                document.body.style.overflow = 'hidden';
                // overflow: hidden: 隐藏溢出内容，防止背景页面滚动
                
                // [调试日志] 输出加载信息
                console.log('Modal opened with image:', imageSrc);
                console.log('Image caption:', caption);
            });
        });
    }
    
    // 为门店图片绑定事件（默认说明文字：门店实景）
    bindImageEvents(storeImages, '门店实景');
    
    // 为公司风采图片绑定事件（默认说明文字：公司风采）
    bindImageEvents(companyImages, '公司风采');
    
    // [关闭功能] 点击关闭按钮时隐藏模态框
    closeBtn.addEventListener('click', function() {
        closeModal();
        // 调用关闭函数
    });
    
    // [关闭功能] 点击模态框背景区域时关闭（点击图片外部）
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            // e.target: 实际被点击的元素
            // 只有当点击的是背景遮罩层（而非图片或文字）时才关闭
            closeModal();
        }
    });
    
    // [关闭功能] 按下 ESC 键时关闭模态框
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            // e.key === 'Escape': 检测是否按下了 ESC 键
            // 只有在模态框显示时才响应
            closeModal();
        }
    });
    
    /**
     * [辅助函数] 关闭模态框
     * @description 恢复页面状态，隐藏模态框
     */
    function closeModal() {
        modal.style.display = 'none';
        // 隐藏模态框
        
        modal.setAttribute('aria-hidden', 'true');
        // 无障碍访问：告知屏幕阅读器模态框已隐藏
        
        document.body.style.overflow = '';
        // 恢复 body 滚动（清空内联样式，使用 CSS 默认值）
        
        // [可选] 清空图片源（防止下次打开时闪现旧图片）
        // modalImg.src = ''; 
        // 注：暂不清空，保持当前显示，提升用户体验
        
        console.log('Modal closed');
        // 调试日志
    }
}

// [页面加载后执行] DOMContentLoaded 事件监听
document.addEventListener('DOMContentLoaded', () => {
    // 当 HTML 文档完全加载并解析完成后执行（不等待图片、样式表等资源）
    
    updateFooterYear();
    // 立即更新页脚年份，确保用户看到最新的版权信息
    
    initMobileMenu();
    // 初始化移动端菜单功能，绑定点击事件监听器
    
    initImageModal();
    // 初始化图片灯箱功能（仅在联系页面生效）
});
