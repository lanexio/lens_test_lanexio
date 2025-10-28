# Lens Protocol ML Score 获取工具

一个完整的 TypeScript 项目，用于获取 Lens Protocol 账户的 ML Score（机器学习评分）。

## 📋 目录

- [项目简介](#项目简介)
- [功能特性](#功能特性)
- [快速开始](#快速开始)
- [详细教程](#详细教程)
- [API 文档](#api-文档)
- [示例代码](#示例代码)
- [常见问题](#常见问题)

## 🎯 项目简介

本项目基于 [Lens Protocol 官方文档](https://lens.xyz/docs/protocol/accounts/fetch) 开发，提供了一套完整的解决方案来获取指定用户 ID 列表的 ML Score。

ML Score（机器学习评分）是 Lens Protocol 用于评估账户质量和活跃度的指标，可用于：
- 账户推荐系统
- 内容排序和筛选
- 反垃圾邮件检测
- 社交图谱分析

## ✨ 功能特性

- ✅ 获取单个账户的 ML Score
- ✅ 批量获取多个账户的 ML Score
- ✅ 通过用户名查询 ML Score
- ✅ 支持主网和测试网切换
- ✅ 完整的错误处理
- ✅ TypeScript 类型支持
- ✅ 详细的中文注释和文档

## 🚀 快速开始

### 前置要求

- Node.js 16.x 或更高版本
- npm 或 yarn 包管理器

### 步骤 1: 安装依赖

```bash
# 进入项目目录
cd lens_test_lanexio

# 安装依赖
npm install
```

### 步骤 2: 编译项目

```bash
npm run build
```

### 步骤 3: 运行示例

```bash
npm run example
```

## 📖 详细教程

### 从零开始的傻瓜式教学

#### 第一步：理解项目结构

```
lens_test_lanexio/
├── src/                    # 源代码目录
│   ├── types.ts           # 类型定义
│   ├── queries.ts         # GraphQL 查询语句
│   ├── fetcher.ts         # 核心功能实现
│   ├── index.ts           # 入口文件
│   └── example.ts         # 示例代码
├── dist/                   # 编译输出目录
├── package.json           # 项目配置
├── tsconfig.json          # TypeScript 配置
└── README.md              # 项目文档
```

#### 第二步：理解核心概念

1. **Lens Protocol**：一个去中心化的社交图谱协议
2. **ML Score**：机器学习评分，用于评估账户质量
3. **GraphQL**：用于查询 Lens API 的查询语言
4. **以太坊地址**：格式为 `0x` 开头的 42 个字符

#### 第三步：基础使用

**获取单个账户的 ML Score：**

```typescript
import { createMLScoreFetcher } from './src/index';

async function getMlScore() {
  // 1. 创建获取器实例
  const fetcher = createMLScoreFetcher();
  
  // 2. 准备以太坊地址
  const address = '0x03fEb724F1a471861b1e353BEd14aFE3992dFBfd';
  
  // 3. 获取 ML Score
  const result = await fetcher.getMLScore(address);
  
  // 4. 查看结果
  console.log('ML Score:', result.mlScore);
  console.log('用户名:', result.username);
  console.log('账户信息:', result.metadata);
}

getMlScore();
```

#### 第四步：批量查询

**一次获取多个账户的 ML Score：**

```typescript
import { createMLScoreFetcher } from './src/index';

async function getBulkMLScores() {
  const fetcher = createMLScoreFetcher();
  
  // 准备地址列表
  const addresses = [
    '0x03fEb724F1a471861b1e353BEd14aFE3992dFBfd',
    '0xD020E01C0c90Ab005A01482d34B808874345FD82',
    // ... 更多地址
  ];
  
  // 批量查询
  const result = await fetcher.getMLScoresBulk(addresses);
  
  // 查看结果
  console.log('成功:', result.successCount);
  console.log('失败:', result.failedCount);
  console.log('详细信息:', result.success);
}

getBulkMLScores();
```

#### 第五步：通过用户名查询

**使用 Lens 用户名查询：**

```typescript
import { createMLScoreFetcher } from './src/index';

async function getMLScoreByUsername() {
  const fetcher = createMLScoreFetcher();
  
  // 使用用户名查询（格式：username.lens）
  const result = await fetcher.getMLScoreByUsername('stani.lens');
  
  console.log('ML Score:', result.mlScore);
  console.log('地址:', result.address);
}

getMLScoreByUsername();
```

#### 第六步：错误处理

**正确处理可能的错误：**

```typescript
import { createMLScoreFetcher } from './src/index';

async function safeGetMLScore(address: string) {
  const fetcher = createMLScoreFetcher();
  const result = await fetcher.getMLScore(address);
  
  if (result.error) {
    console.error('查询失败:', result.error);
    // 处理错误...
    return null;
  }
  
  return result;
}
```

## 📚 API 文档

### LensMLScoreFetcher 类

主要的 ML Score 获取器类。

#### 构造函数

```typescript
constructor(endpoint?: string)
```

- `endpoint` (可选): 自定义 API 端点，默认使用主网

#### 方法

##### getMLScore(address: string)

获取单个账户的 ML Score。

**参数：**
- `address`: 以太坊地址（必须是有效的 0x 格式）

**返回：**
```typescript
Promise<MLScoreResult>
```

**示例：**
```typescript
const result = await fetcher.getMLScore('0x...');
```

##### getMLScoresBulk(addresses: string[])

批量获取多个账户的 ML Score。

**参数：**
- `addresses`: 以太坊地址数组

**返回：**
```typescript
Promise<BulkMLScoreResult>
```

**示例：**
```typescript
const result = await fetcher.getMLScoresBulk(['0x...', '0x...']);
```

##### getMLScoreByUsername(username: string)

通过用户名获取 ML Score。

**参数：**
- `username`: Lens 用户名（如 'user.lens'）

**返回：**
```typescript
Promise<MLScoreResult>
```

**示例：**
```typescript
const result = await fetcher.getMLScoreByUsername('stani.lens');
```

##### useTestnet()

切换到测试网。

**示例：**
```typescript
fetcher.useTestnet();
```

##### useMainnet()

切换到主网。

**示例：**
```typescript
fetcher.useMainnet();
```

##### getEndpoint()

获取当前使用的 API 端点。

**返回：**
```typescript
string
```

### 类型定义

#### MLScoreResult

```typescript
interface MLScoreResult {
  address: string;           // 以太坊地址
  username?: string;         // 用户名
  mlScore?: number;          // ML Score（如果可用）
  metadata?: AccountMetadata; // 账户元数据
  error?: string;            // 错误信息（如果有）
}
```

#### BulkMLScoreResult

```typescript
interface BulkMLScoreResult {
  success: MLScoreResult[];  // 成功查询的结果
  failed: Array<{            // 失败的查询
    address: string;
    error: string;
  }>;
  total: number;             // 总数
  successCount: number;      // 成功数
  failedCount: number;       // 失败数
}
```

## 💡 示例代码

### 示例 1：基础使用

```typescript
import { createMLScoreFetcher } from 'lens-ml-score-fetcher';

async function example() {
  const fetcher = createMLScoreFetcher();
  const result = await fetcher.getMLScore('0x03fEb724F1a471861b1e353BEd14aFE3992dFBfd');
  
  console.log(result);
}

example();
```

### 示例 2：批量处理大量地址

```typescript
import { createMLScoreFetcher } from 'lens-ml-score-fetcher';

async function processManyAddresses() {
  const fetcher = createMLScoreFetcher();
  
  // 假设你有一个很大的地址列表
  const addresses = [/* 大量地址 */];
  
  // 批量查询会自动分批处理
  const result = await fetcher.getMLScoresBulk(addresses);
  
  // 处理成功的结果
  result.success.forEach(account => {
    console.log(`${account.username}: ${account.mlScore}`);
  });
  
  // 处理失败的情况
  if (result.failedCount > 0) {
    console.log(`有 ${result.failedCount} 个地址查询失败`);
  }
}

processManyAddresses();
```

### 示例 3：集成到现有应用

```typescript
import { createMLScoreFetcher, MLScoreResult } from 'lens-ml-score-fetcher';

class UserService {
  private mlScoreFetcher = createMLScoreFetcher();
  
  async enrichUserWithMLScore(user: User): Promise<User & { mlScore?: number }> {
    const result = await this.mlScoreFetcher.getMLScore(user.address);
    
    return {
      ...user,
      mlScore: result.mlScore,
    };
  }
  
  async getUserRecommendations(addresses: string[]): Promise<MLScoreResult[]> {
    const result = await this.mlScoreFetcher.getMLScoresBulk(addresses);
    
    // 按 ML Score 排序
    return result.success.sort((a, b) => 
      (b.mlScore || 0) - (a.mlScore || 0)
    );
  }
}
```

### 示例 4：实用场景

查看 `src/practical-examples.ts` 了解更多实用场景：
- 用户推荐系统
- 批量账户质量分析
- 数据导出（CSV/JSON）
- 从文件读取地址列表
- 缓存机制实现
- 带进度显示的批量查询

运行实用示例：
```bash
npm run practical
```

## ❓ 常见问题

### Q1: 如何获取 Lens 账户地址？

A: Lens 账户地址就是以太坊地址。你可以通过以下方式获取：
- 直接使用钱包地址（如 MetaMask）
- 从 Lens Protocol 前端应用获取
- 通过 Lens API 搜索用户名获取

### Q2: ML Score 的范围是多少？

A: ML Score 是一个由 Lens Protocol 计算的数值，具体范围取决于 Lens Protocol 的实现。通常用于相对比较而非绝对值。

### Q3: 为什么有些账户没有 ML Score？

A: 可能的原因：
- 账户是新创建的，还没有足够的数据
- 账户不活跃
- Lens Protocol 正在计算中

### Q4: 批量查询有数量限制吗？

A: 本工具默认每批最多查询 50 个地址（可在配置中调整）。如果你的列表更长，工具会自动分批处理。

### Q5: 如何处理查询失败的情况？

A: 工具提供了完整的错误处理：
```typescript
const result = await fetcher.getMLScore(address);
if (result.error) {
  console.error('查询失败:', result.error);
  // 你的错误处理逻辑
}
```

### Q6: 可以在生产环境使用吗？

A: 可以，但建议：
- 添加适当的缓存机制
- 实现请求限流
- 处理网络错误和重试
- 监控 API 使用量

### Q7: 如何切换到测试网？

A: 使用 `useTestnet()` 方法：
```typescript
const fetcher = createMLScoreFetcher();
fetcher.useTestnet();
```

## 🔗 相关链接

- [Lens Protocol 官方文档](https://lens.xyz/docs/protocol/accounts/fetch)
- [Lens Protocol API 文档](https://docs.api.lens.org/)
- [GraphQL 文档](https://graphql.org/learn/)
- [Lens Protocol GitHub](https://github.com/lens-protocol)

## 📝 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

---

**注意事项：**
- 使用前请确保了解 Lens Protocol 的使用条款
- 请合理使用 API，避免过度请求
- 建议在生产环境中实现缓存机制