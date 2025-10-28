# 🎯 Lens Protocol ML Score Fetcher / Lens协议ML评分获取工具

[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![License](https://img.shields.io/badge/License-ISC-yellow.svg)](LICENSE)

一个完整的 Lens Protocol ML Score（机器学习评分）获取工具，实现了基于 [Lens Protocol 官方文档](https://lens.xyz/docs/protocol/accounts/fetch) 的用户评分查询功能。

A complete solution to fetch ML Scores (Machine Learning Scores) from the Lens Protocol, based on the [official Lens Protocol documentation](https://lens.xyz/docs/protocol/accounts/fetch).

> 📖 **中文用户**: 完整中文教程请查看 [README_CN.md](./README_CN.md)  
> 📖 **Chinese Users**: For complete Chinese tutorial, see [README_CN.md](./README_CN.md)

## ✨ 特性 / Features

- ✅ **单账户查询** - 获取单个账户的 ML 分数 / Fetch ML score for a single account
- ✅ **批量查询** - 一次获取多个账户的 ML 分数 / Batch fetch ML scores for multiple accounts
- ✅ **用户名搜索** - 通过用户名搜索并获取评分 / Search accounts by username and get scores
- ✅ **TypeScript 支持** - 完整的类型定义 / Full TypeScript type support
- ✅ **友好输出** - 中英文双语格式化输出 / User-friendly bilingual output format
- ✅ **详细文档** - 包含完整的使用教程 / Comprehensive documentation and tutorials

## 🚀 快速开始 / Quick Start

### 安装依赖 / Install Dependencies

```bash
npm install
```

### 构建项目 / Build Project

```bash
npm run build
```

### 运行示例 / Run Examples

```bash
npm run example
```

## 📖 使用方法 / Usage

### 基本用法 / Basic Usage

```typescript
import { LensMLScoreClient } from './src/client.js';

// 创建客户端 / Create client
const client = new LensMLScoreClient();

// 获取单个账户 ML 分数 / Fetch single account ML score
const account = await client.getAccountMLScore('0x03Ba3E3B95e3f6844446C400769e978F65A88F42');
console.log('ML Score:', account?.score);

// 批量获取 ML 分数 / Batch fetch ML scores
const accounts = await client.getAccountsMLScores([
  '0x03Ba3E3B95e3f6844446C400769e978F65A88F42',
  '0xD020E01C0c90Ab005A01482975f7c496D1e894b6'
]);
console.log('Found', accounts.length, 'accounts');

// 搜索用户名 / Search by username
const results = await client.searchAccountsByUsername('lens');
console.log('Search results:', results.length);
```

## 📚 完整教程 / Full Tutorial

详细的傻瓜式教程请查看 [TUTORIAL.md](./TUTORIAL.md)，包含：

For detailed step-by-step tutorial, see [TUTORIAL.md](./TUTORIAL.md), including:

- 📦 从零开始的完整安装步骤 / Complete installation from scratch
- 💻 详细的代码示例 / Detailed code examples
- 📊 API 参考文档 / API reference documentation
- 💡 实际应用场景 / Real-world use cases
- ❓ 常见问题解答 / FAQ
- 🛠️ 故障排查指南 / Troubleshooting guide

## 📁 项目结构 / Project Structure

```
lens_test_lanexio/
├── src/
│   ├── client.ts      # 主客户端实现 / Main client implementation
│   ├── config.ts      # GraphQL 查询和配置 / GraphQL queries and config
│   ├── types.ts       # TypeScript 类型定义 / TypeScript type definitions
│   ├── index.ts       # 主入口 / Main entry point
│   └── example.ts     # 使用示例 / Usage examples
├── dist/              # 编译输出 / Compiled output
├── package.json       # 项目配置 / Project configuration
├── tsconfig.json      # TypeScript 配置 / TypeScript configuration
├── README.md          # 本文件 / This file
└── TUTORIAL.md        # 详细教程 / Detailed tutorial
```

## 🔧 可用脚本 / Available Scripts

- `npm run build` - 编译 TypeScript 代码 / Compile TypeScript code
- `npm run start` - 运行编译后的代码 / Run compiled code
- `npm run dev` - 开发模式运行 / Run in development mode
- `npm run example` - 运行示例程序 / Run example program

## 📊 关于 ML Score / About ML Score

ML Score（机器学习评分）是 Lens Protocol 使用机器学习算法计算的账户质量评分。它综合考虑了：

ML Score is a quality metric calculated by Lens Protocol's machine learning algorithms, taking into account:

- 关注者图谱 / Follower graph
- 内容质量 / Content quality
- 互动行为 / Interaction patterns
- 账户活跃度 / Account activity

评分范围通常在 0-1 之间，用于评估账户的信号强度和减少垃圾信息影响。

Scores typically range from 0 to 1, used to evaluate account signal strength and reduce spam impact.

## 🤝 贡献 / Contributing

欢迎提交 Issue 和 Pull Request！

Issues and Pull Requests are welcome!

## 📄 许可证 / License

ISC

## 🔗 相关链接 / Related Links

- [Lens Protocol 官方文档](https://lens.xyz/docs/protocol/accounts/fetch)
- [Lens Protocol API 文档](https://docs.api.lens.org/)
- [GraphQL 文档](https://graphql.org/)

---

**Made with ❤️ for the Lens Protocol Community**