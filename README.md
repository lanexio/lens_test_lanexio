# Lens Protocol ML Score Fetcher

🎯 **完整的 Lens Protocol ML Score 获取工具**

这个项目提供了一个完整的、易于使用的工具来获取 Lens Protocol 用户的 ML Score（机器学习信誉分数）。

## ✨ 特性

- ✅ 获取单个用户的 ML Score
- ✅ 批量获取多个用户的 ML Score
- ✅ 获取账户的完整信息（包括用户名、元数据等）
- ✅ 自动处理大批量请求（自动分批）
- ✅ 完整的错误处理和验证
- ✅ TypeScript 类型支持
- ✅ 支持主网和测试网
- ✅ 详细的中文文档和注释

## 📚 文档导航

- **🚀 [5分钟快速入门](./QUICKSTART.md)** - 最快上手的方式
- **📖 [完整教程文档](./README_TUTORIAL.md)** - 详细的使用教程和API文档
- **📁 [项目文件说明](./FILES.md)** - 了解每个文件的作用

## 🚀 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 编译代码

```bash
npm run build
```

### 3. 运行示例

```bash
# 使用 ts-node 直接运行（开发模式）
npm run dev

# 或者先编译再运行（生产模式）
npm start
```

## 💻 基本使用

```typescript
import { createFetcher } from './src/index';

// 创建 fetcher 实例
const fetcher = createFetcher();

// 获取单个用户的 ML Score
const result = await fetcher.fetchMLScore('0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045');
console.log('ML Score:', result.mlScore);

// 批量获取多个用户的 ML Score
const addresses = [
  '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
  '0x03Ba34f6Ea1496fa316873CF8350A3f7eaD317EF',
];
const batchResult = await fetcher.fetchMLScoresBatch(addresses);
console.log('Results:', batchResult.results);
```

## 📁 项目结构

```
├── src/
│   ├── index.ts      # 主入口文件
│   ├── fetcher.ts    # ML Score 获取器实现
│   ├── types.ts      # TypeScript 类型定义
│   ├── config.ts     # 配置常量
│   ├── queries.ts    # GraphQL 查询语句
│   └── example.ts    # 使用示例
├── dist/             # 编译输出目录
├── QUICKSTART.md     # 快速入门指南
├── README_TUTORIAL.md # 详细教程文档
└── FILES.md          # 项目文件说明
```

## 🎯 主要功能

### 获取单个 ML Score

```typescript
const result = await fetcher.fetchMLScore('0x...');
```

### 批量获取 ML Score

```typescript
const result = await fetcher.fetchMLScoresBatch(['0x...', '0x...']);
```

### 获取完整账户信息

```typescript
const account = await fetcher.fetchAccountInfo('0x...');
```

## 🔗 相关链接

- [Lens Protocol 官方文档](https://docs.lens.xyz/)
- [Lens Protocol API 文档](https://docs.api.lens.org/)
- [Lens 账户获取文档](https://lens.xyz/docs/protocol/accounts/fetch)

## 📄 License

MIT