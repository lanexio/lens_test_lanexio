# Lens Protocol ML Score Fetcher

<div align="center">

**🎯 获取 Lens Protocol 用户 ML Score 的完整解决方案**

[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![Lens Protocol](https://img.shields.io/badge/Lens-Protocol-brightgreen.svg)](https://lens.xyz)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

[English](#english) | [中文](#chinese)

</div>

---

<a name="chinese"></a>

## 🇨🇳 中文说明

### 📖 项目介绍

这是一个完整的 Lens Protocol ML Score 获取工具，支持：

- ✅ 单个用户查询
- ✅ 批量用户查询  
- ✅ 支持用户名和以太坊地址
- ✅ 详细的中文教程
- ✅ 开箱即用的示例代码

### 🚀 快速开始（三步搞定）

#### 第一步：安装依赖

```bash
npm install
```

#### 第二步：运行示例

```bash
npm run example
```

#### 第三步：查看结果

程序会自动查询示例用户的 ML Score 并在终端显示结果。

### 📚 详细教程

**完整的从零开始教程请查看：[TUTORIAL.md](TUTORIAL.md)**

教程包含：
- ✅ 环境准备（Node.js 安装）
- ✅ 项目结构说明
- ✅ 代码详解
- ✅ 使用示例
- ✅ 常见问题解答
- ✅ 进阶功能

### 💻 使用方法

#### 方法一：使用现成的函数

```javascript
import { fetchMLScores } from './src/index.js';

// 查询用户列表
const userIds = ['stani', 'lensprotocol', 'yoginth'];
const results = await fetchMLScores(userIds);

// 打印结果
console.log(results);
```

#### 方法二：批量查询（推荐）

```javascript
import { fetchMLScoresBulk } from './src/index.js';

// 使用地址批量查询（更高效）
const addresses = [
  '0x01d79BcEaEaaDfb8fD2F2f53005289CFcF483464',
  '0xEEA0C1f5ab0159dba749Dc0BAee462E5e293daaF',
];

const results = await fetchMLScoresBulk(addresses);
console.log(results);
```

### 📦 项目结构

```
lens_test_lanexio/
├── package.json              # 项目配置
├── README.md                 # 本文件
├── TUTORIAL.md               # 详细教程（中文）
├── src/
│   └── index.js             # 核心功能代码
└── examples/
    └── fetch-ml-scores.js   # 使用示例
```

### 🔧 API 文档

#### fetchMLScores(userIds)

逐个查询多个用户的 ML Score。

**参数：**
- `userIds`: Array<string> - 用户ID数组（用户名或地址）

**返回：**
- Promise<Array<Object>> - 包含所有用户信息的数组

**示例：**
```javascript
const results = await fetchMLScores(['stani', 'lensprotocol']);
```

#### fetchMLScoresBulk(addresses)

批量查询多个用户的 ML Score（更高效）。

**参数：**
- `addresses`: Array<string> - 以太坊地址数组

**返回：**
- Promise<Array<Object>> - 包含所有用户信息的数组

**示例：**
```javascript
const results = await fetchMLScoresBulk([
  '0x01d79BcEaEaaDfb8fD2F2f53005289CFcF483464'
]);
```

#### fetchSingleMLScore(client, accountId)

查询单个用户的 ML Score。

**参数：**
- `client`: LensClient - Lens客户端实例
- `accountId`: string - 用户ID（用户名或地址）

**返回：**
- Promise<Object> - 包含单个用户信息的对象

### 📊 返回数据格式

```javascript
{
  id: "stani",                    // 查询的ID
  success: true,                  // 是否成功
  address: "0x...",               // 以太坊地址
  username: "stani",              // 用户名
  name: "Stani Kulechov",         // 显示名称
  mlScore: 95.5,                  // ML评分（0-100）
  accountData: {
    createdAt: "2024-01-01",      // 账户创建时间
    operations: { ... }           // 操作权限
  }
}
```

### ❓ 常见问题

**Q: 什么是 ML Score？**

A: ML Score 是 Lens Protocol 使用机器学习算法计算的账户评分（0-100分），用于评估账户的真实性和活跃度。

**Q: 为什么有些用户没有 ML Score？**

A: 可能是新账户、活跃度低或数据还在计算中。

**更多问题请查看：[TUTORIAL.md](TUTORIAL.md#常见问题解答)**

### 🔗 相关链接

- [Lens Protocol 官方文档](https://lens.xyz/docs)
- [Lens API 文档](https://docs.api.lens.org/)
- [账户获取文档](https://lens.xyz/docs/protocol/accounts/fetch)

### 📄 许可证

MIT License

---

<a name="english"></a>

## 🇬🇧 English

### 📖 Project Description

A complete Lens Protocol ML Score fetching tool with features:

- ✅ Single user query
- ✅ Bulk user query
- ✅ Support for usernames and Ethereum addresses
- ✅ Detailed Chinese tutorial
- ✅ Ready-to-use example code

### 🚀 Quick Start (3 Steps)

#### Step 1: Install Dependencies

```bash
npm install
```

#### Step 2: Run Example

```bash
npm run example
```

#### Step 3: View Results

The program will automatically query example users' ML Scores and display results in the terminal.

### 💻 Usage

#### Method 1: Use Built-in Functions

```javascript
import { fetchMLScores } from './src/index.js';

// Query user list
const userIds = ['stani', 'lensprotocol', 'yoginth'];
const results = await fetchMLScores(userIds);

// Print results
console.log(results);
```

#### Method 2: Bulk Query (Recommended)

```javascript
import { fetchMLScoresBulk } from './src/index.js';

// Bulk query with addresses (more efficient)
const addresses = [
  '0x01d79BcEaEaaDfb8fD2F2f53005289CFcF483464',
  '0xEEA0C1f5ab0159dba749Dc0BAee462E5e293daaF',
];

const results = await fetchMLScoresBulk(addresses);
console.log(results);
```

### 📦 Project Structure

```
lens_test_lanexio/
├── package.json              # Project configuration
├── README.md                 # This file
├── TUTORIAL.md               # Detailed tutorial (Chinese)
├── src/
│   └── index.js             # Core functionality
└── examples/
    └── fetch-ml-scores.js   # Usage examples
```

### 🔧 API Documentation

#### fetchMLScores(userIds)

Query ML Scores for multiple users sequentially.

**Parameters:**
- `userIds`: Array<string> - Array of user IDs (usernames or addresses)

**Returns:**
- Promise<Array<Object>> - Array containing all user information

**Example:**
```javascript
const results = await fetchMLScores(['stani', 'lensprotocol']);
```

#### fetchMLScoresBulk(addresses)

Query ML Scores for multiple users in bulk (more efficient).

**Parameters:**
- `addresses`: Array<string> - Array of Ethereum addresses

**Returns:**
- Promise<Array<Object>> - Array containing all user information

**Example:**
```javascript
const results = await fetchMLScoresBulk([
  '0x01d79BcEaEaaDfb8fD2F2f53005289CFcF483464'
]);
```

### 📊 Return Data Format

```javascript
{
  id: "stani",                    // Queried ID
  success: true,                  // Success status
  address: "0x...",               // Ethereum address
  username: "stani",              // Username
  name: "Stani Kulechov",         // Display name
  mlScore: 95.5,                  // ML Score (0-100)
  accountData: {
    createdAt: "2024-01-01",      // Account creation time
    operations: { ... }           // Operation permissions
  }
}
```

### 🔗 Related Links

- [Lens Protocol Official Docs](https://lens.xyz/docs)
- [Lens API Documentation](https://docs.api.lens.org/)
- [Fetch Accounts Documentation](https://lens.xyz/docs/protocol/accounts/fetch)

### 📄 License

MIT License