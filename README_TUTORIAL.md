# Lens Protocol ML Score 获取工具 - 完整教程

> 🎯 本教程将手把手教你从零开始，完整实现 Lens Protocol 用户 ML Score 的获取功能。

## 📋 目录

1. [什么是 ML Score？](#什么是-ml-score)
2. [前置准备](#前置准备)
3. [项目结构](#项目结构)
4. [安装步骤](#安装步骤)
5. [快速开始](#快速开始)
6. [详细使用说明](#详细使用说明)
7. [API 文档](#api-文档)
8. [常见问题](#常见问题)
9. [故障排除](#故障排除)

---

## 🤔 什么是 ML Score？

**ML Score** 是 Lens Protocol 通过机器学习算法为每个账户计算的信誉分数，范围在 **0 到 1** 之间：

- **高分数（接近 1）**: 表示账户质量高、活跃度好、可信度强
- **低分数（接近 0）**: 表示账户可能是新账户或活跃度较低
- **null 或未设置**: 表示该账户暂无 ML Score

ML Score 基于以下因素计算：
- 账户的社交图谱关系
- 内容发布和互动历史
- 社区参与度
- 账户年龄和活跃度

---

## 📦 前置准备

### 1. 安装 Node.js

确保你的电脑上已安装 Node.js（建议版本 >= 16.0.0）

**检查是否已安装：**
```bash
node --version
npm --version
```

**如果未安装，请访问：** https://nodejs.org/

### 2. 准备 Lens 账户地址

你需要准备一些 Lens Protocol 的账户地址（以太坊地址格式）。

**地址格式示例：**
```
0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045
```

---

## 📁 项目结构

```
lens_test_lanexio/
├── src/                      # 源代码目录
│   ├── index.ts             # 主入口文件
│   ├── fetcher.ts           # ML Score 获取器实现
│   ├── types.ts             # TypeScript 类型定义
│   ├── config.ts            # 配置常量
│   ├── queries.ts           # GraphQL 查询语句
│   └── example.ts           # 使用示例
├── dist/                     # 编译输出目录（自动生成）
├── package.json             # 项目依赖配置
├── tsconfig.json            # TypeScript 配置
├── .gitignore               # Git 忽略文件配置
└── README_TUTORIAL.md       # 本教程文档
```

---

## 🚀 安装步骤

### 步骤 1: 克隆或下载项目

```bash
# 如果是从 GitHub 克隆
git clone https://github.com/lanexio/lens_test_lanexio.git
cd lens_test_lanexio

# 如果已经有项目文件夹
cd lens_test_lanexio
```

### 步骤 2: 安装依赖

```bash
npm install
```

**依赖说明：**
- `graphql`: GraphQL 核心库
- `graphql-request`: 轻量级 GraphQL 客户端
- `typescript`: TypeScript 编译器
- `ts-node`: TypeScript 运行时

### 步骤 3: 编译 TypeScript 代码

```bash
npm run build
```

这会将 `src/` 目录下的 TypeScript 代码编译到 `dist/` 目录。

---

## ⚡ 快速开始

### 方式 1: 运行示例程序

最快的方式是运行我们提供的示例程序：

```bash
# 使用 ts-node 直接运行（开发模式）
npm run dev

# 或者先编译再运行（生产模式）
npm run build
npm start
```

示例程序会演示以下功能：
1. ✅ 获取单个用户的 ML Score
2. ✅ 批量获取多个用户的 ML Score
3. ✅ 获取账户的完整信息
4. ✅ 处理无效地址
5. ✅ 使用自定义 API 端点

### 方式 2: 在代码中使用

创建一个新文件 `my-script.ts`:

```typescript
import { createFetcher } from './src/index';

async function main() {
  // 创建 fetcher 实例
  const fetcher = createFetcher();

  // 获取单个用户的 ML Score
  const result = await fetcher.fetchMLScore('0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045');

  console.log('ML Score:', result.mlScore);
  console.log('用户名:', result.username);
}

main();
```

运行：
```bash
npx ts-node my-script.ts
```

---

## 📖 详细使用说明

### 1️⃣ 创建 Fetcher 实例

有两种方式创建 fetcher：

**方式 A: 使用工厂函数（推荐）**
```typescript
import { createFetcher } from './src/index';

const fetcher = createFetcher();  // 使用默认主网 API
```

**方式 B: 直接实例化**
```typescript
import { LensMLScoreFetcher } from './src/index';

const fetcher = new LensMLScoreFetcher();  // 使用默认主网 API
```

**使用测试网：**
```typescript
const fetcher = createFetcher('https://api-v2-amoy.lens.dev');
```

### 2️⃣ 获取单个用户的 ML Score

```typescript
const result = await fetcher.fetchMLScore('0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045');

if (result.error) {
  console.error('获取失败:', result.error);
} else {
  console.log('地址:', result.address);
  console.log('用户名:', result.username || '(无)');
  console.log('ML Score:', result.mlScore !== null ? result.mlScore : '(未设置)');
}
```

**返回结果类型：**
```typescript
{
  address: string;           // 账户地址
  mlScore: number | null;    // ML Score (0-1 之间)
  username?: string;         // 用户名（如果有）
  error?: string;            // 错误信息（如果失败）
}
```

### 3️⃣ 批量获取多个用户的 ML Score

```typescript
const addresses = [
  '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
  '0x03Ba34f6Ea1496fa316873CF8350A3f7eaD317EF',
  '0x01d79BcEaEaaDfb8fD2F2f53005289CFcF483464',
];

const batchResult = await fetcher.fetchMLScoresBatch(addresses);

console.log('成功:', batchResult.success);
console.log('错误数量:', batchResult.errors.length);

// 遍历所有结果
batchResult.results.forEach(result => {
  console.log(`${result.address}: ${result.mlScore}`);
});
```

**批量获取的优势：**
- 🚀 一次请求获取多个账户的 ML Score
- 🔄 自动处理超过最大批量大小的情况（自动分批）
- 🛡️ 自动过滤无效地址
- ✅ 即使部分失败也能返回成功的结果

### 4️⃣ 获取账户的完整信息

除了 ML Score，你还可以获取账户的其他详细信息：

```typescript
const account = await fetcher.fetchAccountInfo('0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045');

if (account) {
  console.log('地址:', account.address);
  console.log('用户名:', account.username?.value);
  console.log('命名空间:', account.username?.namespace);
  console.log('名称:', account.metadata?.name);
  console.log('简介:', account.metadata?.bio);
  console.log('头像:', account.metadata?.picture);
  console.log('ML Score:', account.mlScore);
}
```

### 5️⃣ 批量获取账户完整信息

```typescript
const accounts = await fetcher.fetchAccountsInfo([
  '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
  '0x03Ba34f6Ea1496fa316873CF8350A3f7eaD317EF',
]);

accounts.forEach(account => {
  console.log('账户:', account.address);
  console.log('ML Score:', account.mlScore);
  console.log('---');
});
```

---

## 📚 API 文档

### `LensMLScoreFetcher` 类

#### 构造函数

```typescript
constructor(apiEndpoint?: string)
```

**参数：**
- `apiEndpoint` (可选): Lens API 端点 URL
  - 默认: `https://api-v2.lens.dev` (主网)
  - 测试网: `https://api-v2-amoy.lens.dev`

#### 方法

##### `fetchMLScore(address: string)`

获取单个账户的 ML Score。

**参数：**
- `address`: 以太坊地址（必须是 0x 开头的 40 位十六进制字符串）

**返回：** `Promise<MLScoreResult>`

```typescript
{
  address: string;
  mlScore: number | null;
  username?: string;
  error?: string;
}
```

##### `fetchMLScoresBatch(addresses: string[])`

批量获取多个账户的 ML Score。

**参数：**
- `addresses`: 以太坊地址数组

**返回：** `Promise<MLScoresBatchResult>`

```typescript
{
  success: boolean;          // 是否全部成功
  results: MLScoreResult[];  // 结果数组
  errors: string[];          // 错误信息数组
}
```

**注意：**
- 自动处理超过 50 个地址的情况（自动分批）
- 自动过滤无效地址
- 即使部分失败也会返回成功的结果

##### `fetchAccountInfo(address: string)`

获取账户的完整信息。

**参数：**
- `address`: 以太坊地址

**返回：** `Promise<Account | null>`

##### `fetchAccountsInfo(addresses: string[])`

批量获取账户的完整信息。

**参数：**
- `addresses`: 以太坊地址数组

**返回：** `Promise<Account[]>`

---

## 🔧 配置常量

在 `src/config.ts` 中定义了以下常量：

```typescript
// API 端点
export const LENS_API_ENDPOINT = 'https://api-v2.lens.dev';
export const LENS_TESTNET_API_ENDPOINT = 'https://api-v2-amoy.lens.dev';

// 批量请求的最大账户数量
export const MAX_BATCH_SIZE = 50;

// 请求超时时间（毫秒）
export const DEFAULT_TIMEOUT = 30000;
```

---

## ❓ 常见问题

### Q1: 什么样的地址是有效的 Lens 账户地址？

A: Lens 使用以太坊地址，格式为：
- 以 `0x` 开头
- 后跟 40 位十六进制字符（0-9, a-f, A-F）
- 总长度 42 个字符

**示例：** `0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045`

### Q2: ML Score 为 null 是什么意思？

A: ML Score 为 null 可能有以下几种原因：
1. 账户是新创建的，还没有足够的数据来计算 ML Score
2. 账户没有在 Lens Protocol 上进行过活动
3. Lens Protocol 还未为该账户计算 ML Score

### Q3: 可以一次获取多少个账户的 ML Score？

A: 
- 单次请求最多 50 个地址（`MAX_BATCH_SIZE`）
- 如果提供超过 50 个地址，工具会自动分批处理
- 没有总数限制，但建议分批处理大量数据以提高效率

### Q4: 获取失败怎么办？

A: 检查以下几点：
1. ✅ 地址格式是否正确
2. ✅ 网络连接是否正常
3. ✅ API 端点是否可访问
4. ✅ 查看返回的错误信息

### Q5: 主网和测试网有什么区别？

A:
- **主网** (`https://api-v2.lens.dev`): 真实的生产环境数据
- **测试网** (`https://api-v2-amoy.lens.dev`): 测试环境数据

建议：
- 开发和测试时使用测试网
- 生产环境使用主网

### Q6: 如何找到 Lens 账户地址？

A: 有几种方式：
1. 在 Lens Protocol 官网上查找用户资料
2. 使用 Lens Protocol 的搜索 API
3. 从已知的 Lens 用户名查询对应的地址

---

## 🛠️ 故障排除

### 问题 1: `npm install` 失败

**解决方案：**
```bash
# 清除缓存
npm cache clean --force

# 删除 node_modules 和 lock 文件
rm -rf node_modules package-lock.json

# 重新安装
npm install
```

### 问题 2: TypeScript 编译错误

**解决方案：**
```bash
# 确保 TypeScript 已正确安装
npm install -D typescript

# 重新编译
npm run build
```

### 问题 3: 运行时找不到模块

**解决方案：**
```bash
# 确保已编译
npm run build

# 检查 dist 目录是否存在
ls dist/

# 如果使用 ts-node，确保已安装
npm install -D ts-node
```

### 问题 4: API 请求超时

**可能原因：**
- 网络连接问题
- API 服务暂时不可用
- 请求的地址数量过多

**解决方案：**
- 检查网络连接
- 稍后重试
- 减少单次请求的地址数量

### 问题 5: 获取的 ML Score 都是 null

**可能原因：**
- 使用了测试地址而不是真实的 Lens 账户地址
- 账户确实没有 ML Score

**解决方案：**
- 确认使用的是真实的 Lens Protocol 账户地址
- 尝试使用其他已知的活跃 Lens 账户地址

---

## 📝 完整示例代码

### 示例：创建一个简单的 ML Score 查询工具

创建文件 `check-score.ts`:

```typescript
import { createFetcher } from './src/index';

async function checkScores(addresses: string[]) {
  console.log('🔍 开始查询 ML Scores...\n');

  const fetcher = createFetcher();
  const result = await fetcher.fetchMLScoresBatch(addresses);

  console.log(`查询结果: ${result.success ? '✅ 成功' : '⚠️ 部分失败'}\n`);

  // 显示统计信息
  const validScores = result.results.filter(r => r.mlScore !== null);
  console.log(`📊 统计信息:`);
  console.log(`   总数: ${result.results.length}`);
  console.log(`   有 ML Score: ${validScores.length}`);
  console.log(`   无 ML Score: ${result.results.length - validScores.length}`);
  console.log(`   错误: ${result.errors.length}\n`);

  // 显示详细结果
  console.log('📋 详细结果:\n');
  result.results.forEach((r, i) => {
    const status = r.error ? '❌' : r.mlScore !== null ? '✅' : '⚪';
    console.log(`${i + 1}. ${status} ${r.address}`);
    if (r.username) console.log(`   👤 用户名: ${r.username}`);
    if (r.mlScore !== null) {
      console.log(`   📊 ML Score: ${r.mlScore.toFixed(4)}`);
    }
    if (r.error) console.log(`   ⚠️ 错误: ${r.error}`);
    console.log();
  });
}

// 使用示例
const testAddresses = [
  '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
  '0x03Ba34f6Ea1496fa316873CF8350A3f7eaD317EF',
  '0x01d79BcEaEaaDfb8fD2F2f53005289CFcF483464',
];

checkScores(testAddresses).catch(console.error);
```

运行：
```bash
npx ts-node check-score.ts
```

---

## 🎓 总结

恭喜！你现在已经掌握了：

✅ Lens Protocol ML Score 的概念和用途  
✅ 如何安装和配置项目  
✅ 如何获取单个用户的 ML Score  
✅ 如何批量获取多个用户的 ML Score  
✅ 如何获取账户的完整信息  
✅ 如何处理错误和无效地址  
✅ 如何自定义 API 端点  

### 下一步建议

1. 📖 阅读 [Lens Protocol 官方文档](https://docs.lens.xyz/)
2. 🔧 根据你的需求自定义和扩展代码
3. 🧪 在测试网上进行实验
4. 🚀 将功能集成到你的应用中

### 获取帮助

- 📚 查看 Lens Protocol 文档: https://docs.lens.xyz/
- 💬 加入 Lens Protocol 社区: https://discord.gg/lensprotocol
- 🐛 报告问题: 在 GitHub 仓库中创建 issue

---

**祝你使用愉快！** 🎉

如有任何问题，欢迎提出 issue 或 pull request。
