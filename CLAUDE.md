# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

Vue Vben Admin 是一个基于 Monorepo 架构的 Vue 3 中后台管理系统模板（v5.5.9），采用最新的 Vue 3、Vite、TypeScript 等主流技术开发。

## 开发环境要求

- Node.js >= 20.12.0
- pnpm >= 10.0.0
- 项目强制使用 pnpm 作为包管理器（通过 preinstall hook 检查）

## 常用命令

### 安装依赖

```bash
pnpm install
```

### 开发

```bash
# 启动所有开发服务器
pnpm dev

# 启动特定 UI 框架版本
pnpm dev:antd     # Ant Design Vue 版本
pnpm dev:ele      # Element Plus 版本
pnpm dev:naive    # Naive UI 版本
pnpm dev:tdesign  # TDesign 版本
pnpm dev:play     # 启动演练场
```

### 构建

```bash
# 构建所有应用
pnpm build

# 构建特定应用
pnpm build:antd
pnpm build:ele
pnpm build:naive
pnpm build:tdesign
pnpm build:play   # 构建演练场
pnpm build:analyze  # 构建并分析包大小
```

### 代码质量

```bash
# 代码检查（ESLint + Stylelint）
pnpm lint

# 代码格式化（Prettier）
pnpm format

# 全面检查（循环依赖、依赖、类型、拼写）
pnpm check

# 单独检查
pnpm check:circular   # 循环依赖检查
pnpm check:dep        # 依赖检查
pnpm check:type       # TypeScript 类型检查
pnpm check:cspell     # 拼写检查
```

### 测试

```bash
pnpm test:unit  # 单元测试
pnpm test:e2e   # 端到端测试
```

### 其他

```bash
pnpm clean      # 清理构建产物和临时文件
pnpm reinstall  # 清理并重新安装依赖
pnpm preview    # 预览构建产物
pnpm commit     # 使用 czg 交互式提交
pnmp update:deps # 更新依赖
```

## 项目架构

### Monorepo 结构

项目使用 pnpm workspace + Turbo 进行 Monorepo 管理：

```
vue-vben-admin/
├── apps/                    # 应用程序目录
│   ├── backend-mock/       # 模拟后端服务
│   ├── web-antd/           # Ant Design Vue 版本
│   ├── web-ele/            # Element Plus 版本
│   ├── web-naive/          # Naive UI 版本
│   └── web-tdesign/        # TDesign 版本
├── packages/               # 共享包目录
│   ├── @core/             # 核心包
│   │   ├── base/          # 基础包（设计系统、图标、共享）
│   │   ├── composables/   # 组合式函数
│   │   └── ui-kit/        # UI 组件套件
│   │       ├── form-ui/   # 表单组件
│   │       ├── layout-ui/ # 布局组件
│   │       ├── menu-ui/   # 菜单组件
│   │       ├── popup-ui/  # 弹出层组件
│   │       ├── shadcn-ui/ # shadcn 风格组件
│   │       └── tabs-ui/   # 标签页组件
│   ├── effects/           # 副作用包（功能模块）
│   │   ├── access/        # 权限控制
│   │   ├── common-ui/     # 通用 UI 组件
│   │   ├── hooks/         # 自定义 Hooks
│   │   ├── layouts/       # 布局组件
│   │   ├── plugins/       # 插件
│   │   └── request/       # 请求封装
│   ├── business/          # 业务相关包
│   ├── constants/         # 常量定义
│   ├── icons/             # 图标资源
│   ├── locales/           # 国际化资源
│   ├── preferences/       # 配置文件
│   ├── stores/            # Pinia 状态管理
│   ├── styles/            # 全局样式
│   ├── types/             # TypeScript 类型定义
│   └── utils/             # 工具函数
├── internal/              # 内部工具和配置
│   ├── lint-configs/      # 代码规范配置（ESLint、Prettier、Stylelint）
│   ├── node-utils/        # Node.js 工具
│   ├── tailwind-config/   # Tailwind 配置
│   ├── tsconfig/          # TypeScript 配置
│   └── vite-config/       # Vite 配置
├── docs/                  # 文档网站
├── playground/            # 演练场（用于开发和测试）
└── scripts/               # 构建和开发脚本
```

### 分层架构

1. **基础层（@core/base）**：设计系统、类型定义、共享工具
2. **组件层（@core/ui-kit）**：可复用的 UI 组件（表单、布局、菜单等）
3. **功能层（effects）**：权限、请求、布局等功能模块
4. **应用层（apps）**：具体业务应用，消费上述包

### 技术栈

- **前端框架**：Vue 3（Composition API）
- **构建工具**：Vite + Turbo
- **状态管理**：Pinia
- **路由**：Vue Router 4
- **UI 框架**：Ant Design Vue / Element Plus / Naive UI / TDesign
- **样式**：Tailwind CSS + Sass
- **类型检查**：TypeScript + Vue TSC
- **代码规范**：ESLint + Prettier + Stylelint
- **提交规范**：Commitlint（使用 czg 交互式提交）
- **Git Hooks**：Lefthook

## 包管理

项目使用 pnpm catalog 统一管理依赖版本，在 `package.json` 中使用 `catalog:` 引用共享依赖。

### 工作区过滤器

使用 `-F` 或 `--filter` 针对特定包运行命令：

```bash
pnpm -F @vben/web-antd run dev
pnpm run build --filter=@vben/web-antd
```

## 提交规范

遵循 Conventional Commits 规范（Angular 风格）：

- `feat`：增加新功能
- `fix`：修复问题/BUG
- `style`：代码风格相关（不影响运行结果）
- `perf`：优化/性能提升
- `refactor`：重构
- `revert`：撤销修改
- `test`：测试相关
- `docs`：文档/注释
- `chore`：依赖更新/脚手架配置修改等
- `ci`：持续集成
- `types`：类型定义文件更改

推荐使用 `pnpm commit` 启动交互式提交界面。

## Turbo 缓存

Turbo 会缓存任务输出以加速构建。如果需要强制重新构建，可以：

```bash
pnpm build --force
# 或删除 .turbo 缓存目录
```

## 相关链接

- 官方文档：https://doc.vben.pro/
- 在线预览：https://vben.pro/
- GitHub：https://github.com/vbenjs/vue-vben-admin
