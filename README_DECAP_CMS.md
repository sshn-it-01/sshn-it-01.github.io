# Decap CMS 部署指南

> **项目**: 华南森孚网站内容管理系统  
> **创建日期**: 2026-03-13  
> **CMS 版本**: Decap CMS 3.0+  
> **部署状态**: ✅ 配置完成

---

## 📁 文件结构

```
hnsf_html-css/
├── admin/
│   ├── index.html          # CMS 管理后台页面
│   └── config.yml          # CMS 配置文件
├── images/uploads/         # 上传的媒体文件（需创建）
├── _cases/                 # 项目案例数据（将自动生成）
├── _news/                  # 新闻动态数据（将自动生成）
└── ...其他项目文件
```

---

## 🚀 快速开始

### 方式一：使用 Netlify 部署（推荐）

#### 第 1 步：准备 GitHub 仓库
```bash
# 确保项目已推送到 GitHub
cd /home/vm-admin/hnsf_html-css
git add .
git commit -m "feat: 部署 Decap CMS"
git push origin main
```

#### 第 2 步：在 Netlify 创建站点
1. 访问 [netlify.com](https://netlify.com) 并登录
2. 点击 **"Add new site"** → **"Import an existing project"**
3. 选择 **GitHub** 并授权访问您的仓库
4. 选择 `hnsf_html-css` 仓库

#### 第 3 步：配置构建设置
- **Branch to deploy**: `main`
- **Build command**: （留空，静态网站无需构建）
- **Publish directory**: `/` （根目录）

#### 第 4 步：启用 Git Gateway
1. 在 Netlify 后台，进入 **"Site settings"** → **"Identity"**
2. 点击 **"Enable Identity service"**
3. 在 **"Registration preferences"** 中选择 **"Invite only"**（仅邀请）
4. 进入 **"Git Gateway"** 页面，点击 **"Enable Git Gateway"**
5. 按照提示完成 GitHub 授权

#### 第 5 步：访问 CMS 后台
- CMS 访问地址：`https://your-site.netlify.app/admin/`
- 首次访问需要登录 GitHub 账号

---

### 方式二：本地测试（无需部署）

#### 使用 npm 运行本地服务器
```bash
# 安装简单的 HTTP 服务器
npm install -g http-server

# 进入项目目录
cd /home/vm-admin/hnsf_html-css

# 启动本地服务器
http-server -p 8080

# 访问 CMS：http://localhost:8080/admin/
```

#### 使用 Python 快速测试
```bash
# Python 3
python -m http.server 8080

# 访问：http://localhost:8080/admin/
```

---

## 📝 CMS 功能说明

### 1. 产品管理
- **路径**: `product/category/`
- **功能**: 添加、编辑、删除产品信息
- **字段**:
  - 产品名称、描述、分类
  - 应用场景列表
  - 产品图片上传
  - 技术参数（粘度、闪点、倾点）

### 2. 项目案例管理
- **路径**: `_cases/`
- **功能**: 管理客户案例和解决方案
- **字段**:
  - 案例标题、客户名称、行业分类
  - 解决方案详情（Markdown 格式）
  - 使用效果反馈
  - 案例图片

### 3. 新闻动态管理
- **路径**: `_news/`
- **功能**: 发布公司新闻、行业动态、技术文章
- **字段**:
  - 新闻标题、摘要、正文
  - 封面图片
  - 发布时间、作者

### 4. 页面内容管理
- **管理页面**: 
  - 关于我们 (`about.html`)
  - 联系我们 (`contact.html`)
- **功能**: 更新公司介绍、联系方式等信息

---

## 🔧 配置说明

### 后端配置
```yaml
backend:
  name: git-gateway      # 使用 Git Gateway 进行版本控制
  branch: main           # 默认分支
```

### 媒体文件管理
```yaml
media_folder: "images/uploads"    # 上传文件存储位置
public_folder: "/images/uploads"  # 公开访问路径
```

### 内容集合
- **products**: 产品中心
- **cases**: 项目案例
- **news**: 新闻动态
- **pages**: 静态页面

---

## 🎨 品牌定制

CMS 界面已应用华南森孚品牌色：
- **主色调**: `#0056b3` (品牌蓝)
- **辅助色**: `#004494` (深蓝)
- **过渡动画**: `0.3s` (经 UX 测试的自然时长)

---

## ⚠️ 注意事项

### 1. 首次部署必须完成
- [ ] 创建 `images/uploads` 目录用于存储上传的文件
- [ ] 确保 GitHub 仓库已连接 Netlify
- [ ] 启用 Netlify Identity 服务
- [ ] 启用 Git Gateway

### 2. 用户管理
- 在 Netlify 后台的 **"Identity"** → **"Users"** 邀请团队成员
- 被邀请者会收到邮件，点击链接即可注册
- 注册用户后可登录 CMS 后台

### 3. 内容审核流程
- 所有编辑操作会创建 Git commit
- 可配置 Netlify 工作流进行审核
- 支持草稿、待审核、已发布状态

### 4. 图片上传规范
- 建议尺寸：宽度不超过 1920px
- 推荐格式：WebP（自动优化）
- 文件大小：单张不超过 5MB

---

## 🔍 故障排查

### 问题 1: CMS 后台无法加载
**解决方案**:
1. 检查浏览器控制台错误信息
2. 确认 `config.yml` 格式正确
3. 验证 Netlify Identity 已启用

### 问题 2: 无法登录 GitHub
**解决方案**:
1. 清除浏览器缓存
2. 检查 GitHub OAuth 授权
3. 在 Netlify 重新启用 Git Gateway

### 问题 3: 图片上传失败
**解决方案**:
1. 检查 `images/uploads` 目录是否存在
2. 确认 Git LFS 已启用（大文件存储）
3. 检查网络连接

---

## 📚 扩展资源

- **官方文档**: [https://decapcms.org/docs/](https://decapcms.org/docs/)
- **中文教程**: [https://www.decapcms.org/docs/zh-CN/intro/](https://www.decapcms.org/docs/zh-CN/intro/)
- **Netlify 文档**: [https://docs.netlify.com/](https://docs.netlify.com/)

---

## 🎯 下一步计划

1. **集成 AI 优化**: 结合已有的 AI 检索优化配置
2. **SEO 自动化**: 为新产品自动生成 SEO 元标签
3. **多语言支持**: 添加中英文双语内容管理
4. **工作流优化**: 配置内容审核流程

---

**最后更新**: 2026-03-13  
**维护人员**: 技术团队
