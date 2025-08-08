# 手机号商城小程序

基于 uni-app + uniCloud 开发的手机号商城小程序，支持流量卡购买、文章发布、审核管理等功能。

## 功能特性

- 🏠 **首页**：轮播图展示、分类入口、推荐商品
- 📱 **流量卡**：厂商切换、文章列表、详情展示
- 📋 **订单管理**：订单列表、状态跟踪
- 👤 **用户中心**：登录注册、个人设置
- ✍️ **内容管理**：文章发布、审核流程
- 🔧 **管理后台**：文章审核、用户管理

## 技术栈

- **前端框架**：uni-app (Vue 3)
- **状态管理**：Pinia
- **后端服务**：uniCloud (阿里云)
- **数据库**：云数据库
- **云函数**：Node.js

## 项目结构

```
text-Cloud/
├── pages/                 # 页面文件
│   ├── index/            # 首页
│   ├── flowcard/         # 流量卡相关
│   ├── order/            # 订单管理
│   ├── mine/             # 用户中心
│   └── auth/             # 登录注册
├── stores/               # Pinia 状态管理
├── uniCloud-aliyun/      # 云开发配置
│   ├── cloudfunctions/   # 云函数
│   └── database/         # 数据库配置
├── static/               # 静态资源
└── components/           # 公共组件
```

## 开发环境

- HBuilderX 或 VS Code
- Node.js 16+
- 微信开发者工具

## 安装运行

1. 克隆项目
```bash
git clone https://github.com/copy123com/life-helper.git
cd life-helper
```

2. 安装依赖
```bash
npm install
```

3. 配置云开发
- 在 HBuilderX 中关联云服务空间
- 初始化云数据库
- 部署云函数

4. 运行项目
- HBuilderX：运行到小程序模拟器
- 或使用微信开发者工具打开

## 部署说明

1. 云函数部署
```bash
# 在 HBuilderX 中右键云函数目录，选择"上传并运行"
```

2. 数据库初始化
```bash
# 在云开发控制台导入数据库 schema
```

3. 小程序发布
```bash
# 在 HBuilderX 中构建并上传代码
```

## 主要功能

### 用户端
- 浏览流量卡商品
- 提交订单申请
- 查看订单状态
- 联系客服咨询

### 管理端
- 文章发布管理
- 订单审核处理
- 用户权限管理
- 数据统计分析

## 贡献指南

1. Fork 项目
2. 创建功能分支
3. 提交代码
4. 发起 Pull Request

## 许可证

MIT License

## 联系方式

- 项目地址：[https://github.com/copy123com/life-helper](https://github.com/copy123com/life-helper)
- 问题反馈：请提交 Issue 
