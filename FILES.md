# 项目文件说明 - Project Files Documentation

本文档详细说明了每个文件的作用和内容。

## 📁 文件结构

```
lens_test_lanexio/
├── 📄 配置文件
│   ├── package.json          - 项目依赖和脚本配置
│   ├── tsconfig.json         - TypeScript 编译配置
│   ├── .gitignore            - Git 忽略文件配置
│   └── .env.example          - 环境变量配置示例
│
├── 📚 文档文件
│   ├── README.md             - 项目主要说明文档
│   ├── README_TUTORIAL.md    - 详细教程文档（中文）
│   ├── QUICKSTART.md         - 5分钟快速入门指南
│   └── FILES.md              - 本文件，项目文件说明
│
└── 📂 src/ - 源代码目录
    ├── index.ts              - 主入口，导出所有公共 API
    ├── types.ts              - TypeScript 类型定义
    ├── config.ts             - 配置常量（API 端点等）
    ├── queries.ts            - GraphQL 查询语句
    ├── fetcher.ts            - 核心功能实现
    └── example.ts            - 使用示例代码
```

---

## 📄 详细文件说明

### 配置文件

#### `package.json`
**作用**: 定义项目依赖和 npm 脚本

**关键依赖**:
- `graphql`: GraphQL 核心库
- `graphql-request`: 轻量级 GraphQL 客户端
- `typescript`: TypeScript 编译器
- `ts-node`: TypeScript 运行时

**可用脚本**:
```bash
npm run build   # 编译 TypeScript 代码
npm start       # 运行编译后的示例
npm run dev     # 直接运行 TypeScript 示例
```

#### `tsconfig.json`
**作用**: TypeScript 编译器配置

**关键设置**:
- 输出目录: `dist/`
- 源代码目录: `src/`
- 编译目标: ES2020
- 启用严格模式和类型检查

#### `.gitignore`
**作用**: 指定 Git 不追踪的文件

**忽略内容**:
- `node_modules/` - 依赖包
- `dist/` - 编译输出
- `.env` - 环境变量
- 各种临时文件和 IDE 配置

#### `.env.example`
**作用**: 环境变量配置模板

**配置项**:
- `LENS_API_ENDPOINT` - Lens API 端点 URL

---

### 文档文件

#### `README.md`
**作用**: 项目主要说明文档

**内容**:
- 项目简介和特性
- 快速开始指南
- 基本使用示例
- 项目结构说明
- 相关链接

#### `README_TUTORIAL.md`
**作用**: 完整的中文教程文档

**内容**:
- ML Score 概念解释
- 详细的安装步骤
- 完整的 API 文档
- 多种使用场景示例
- 常见问题解答
- 故障排除指南

**适合**: 想要深入了解所有功能的用户

#### `QUICKSTART.md`
**作用**: 5分钟快速入门指南

**内容**:
- 最简单的入门步骤
- 快速运行示例
- 基本使用场景
- 简单故障排除

**适合**: 想要快速上手的新手用户

#### `FILES.md`
**作用**: 项目文件说明文档（本文件）

**内容**:
- 完整的文件结构
- 每个文件的详细说明
- 代码模块关系图

---

### 源代码文件

#### `src/index.ts`
**作用**: 主入口文件，导出所有公共 API

**导出内容**:
- `LensMLScoreFetcher` 类
- `createFetcher` 工厂函数
- 所有类型定义
- 配置常量
- GraphQL 查询语句

**使用示例**:
```typescript
import { createFetcher } from './src/index';
const fetcher = createFetcher();
```

#### `src/types.ts`
**作用**: TypeScript 类型定义

**定义的类型**:
- `Account` - 账户信息
- `Username` - 用户名
- `AccountMetadata` - 账户元数据
- `MLScoreResult` - ML Score 结果
- `MLScoresBatchResult` - 批量结果
- `AccountQueryResponse` - GraphQL 响应类型
- `AccountsBulkQueryResponse` - 批量查询响应类型

#### `src/config.ts`
**作用**: 配置常量定义

**常量**:
- `LENS_API_ENDPOINT` - 主网 API 端点
- `LENS_TESTNET_API_ENDPOINT` - 测试网 API 端点
- `DEFAULT_API_ENDPOINT` - 默认使用的端点
- `DEFAULT_TIMEOUT` - 请求超时时间
- `MAX_BATCH_SIZE` - 批量请求的最大数量 (50)

#### `src/queries.ts`
**作用**: GraphQL 查询语句定义

**查询语句**:
- `ACCOUNT_QUERY` - 获取单个账户信息
- `ACCOUNTS_BULK_QUERY` - 批量获取账户信息
- `ACCOUNTS_SEARCH_QUERY` - 搜索账户

#### `src/fetcher.ts`
**作用**: 核心功能实现

**主要类**: `LensMLScoreFetcher`

**主要方法**:
- `fetchMLScore(address)` - 获取单个 ML Score
- `fetchMLScoresBatch(addresses)` - 批量获取 ML Score
- `fetchAccountInfo(address)` - 获取账户完整信息
- `fetchAccountsInfo(addresses)` - 批量获取账户信息

**特点**:
- 完整的错误处理
- 地址格式验证
- 自动分批处理（超过50个地址）
- TypeScript 类型安全
- 无副作用的库代码（不使用 console.log）

#### `src/example.ts`
**作用**: 使用示例代码

**包含示例**:
1. 获取单个用户的 ML Score
2. 批量获取多个用户的 ML Score
3. 获取账户的完整信息
4. 处理无效地址
5. 使用自定义 API 端点

**运行方式**:
```bash
npm run dev    # 开发模式
npm start      # 生产模式（需要先 build）
```

---

## 🔗 代码模块关系

```
index.ts (入口)
    ↓ 导入
fetcher.ts (核心实现)
    ↓ 使用
    ├── types.ts (类型定义)
    ├── config.ts (配置常量)
    └── queries.ts (GraphQL 查询)
        
example.ts (使用示例)
    ↓ 导入
index.ts (使用公共 API)
```

---

## 🎯 开发流程

### 1. 修改代码
```bash
# 编辑 src/ 目录下的文件
```

### 2. 编译代码
```bash
npm run build
```

### 3. 测试代码
```bash
npm run dev    # 或 npm start
```

### 4. 使用 Git
```bash
git add .
git commit -m "描述你的修改"
git push
```

---

## 📦 构建输出

运行 `npm run build` 后，会在 `dist/` 目录生成：

```
dist/
├── index.js, index.d.ts         - 主入口
├── fetcher.js, fetcher.d.ts     - 核心实现
├── types.js, types.d.ts         - 类型定义
├── config.js, config.d.ts       - 配置常量
├── queries.js, queries.d.ts     - GraphQL 查询
├── example.js, example.d.ts     - 示例代码
└── *.js.map                     - Source map 文件
```

**注意**: `dist/` 目录在 `.gitignore` 中，不会提交到 Git。

---

## 🔧 自定义扩展

### 添加新的查询

1. 在 `src/queries.ts` 中添加新的 GraphQL 查询
2. 在 `src/types.ts` 中添加对应的响应类型
3. 在 `src/fetcher.ts` 中添加新的方法
4. 在 `src/index.ts` 中导出新的方法
5. 更新文档

### 添加新的配置

1. 在 `src/config.ts` 中添加新的常量
2. 在 `src/index.ts` 中导出新的常量
3. 更新文档

---

## 📚 相关文档

- **快速入门**: 查看 `QUICKSTART.md`
- **完整教程**: 查看 `README_TUTORIAL.md`
- **项目说明**: 查看 `README.md`
- **在线文档**: https://docs.lens.xyz/

---

**最后更新**: 2024年10月

如有问题，欢迎提出 issue 或 pull request！
