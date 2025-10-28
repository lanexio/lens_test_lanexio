# 🎯 Lens Protocol ML Score 获取工具

## 📖 项目简介 / Project Introduction

本项目实现了一个完整的 Lens Protocol ML Score（机器学习评分）获取功能。基于 [Lens Protocol 官方文档](https://lens.xyz/docs/protocol/accounts/fetch)，提供了简单易用的 API 来获取指定用户 ID 列表的 ML 评分。

This project implements a complete solution to fetch ML Scores (Machine Learning Scores) from the Lens Protocol. Based on the [official Lens Protocol documentation](https://lens.xyz/docs/protocol/accounts/fetch), it provides an easy-to-use API to fetch ML scores for specified user IDs.

### ✨ 主要功能 / Key Features

- ✅ 获取单个账户的 ML 分数 / Fetch ML score for a single account
- ✅ 批量获取多个账户的 ML 分数 / Batch fetch ML scores for multiple accounts
- ✅ 通过用户名搜索账户 / Search accounts by username
- ✅ 完整的 TypeScript 类型支持 / Full TypeScript type support
- ✅ 友好的中英文输出格式 / User-friendly bilingual output format
- ✅ 详细的使用示例 / Comprehensive usage examples

---

## 🚀 从零开始：完整安装教程 / Complete Installation Tutorial from Scratch

### 步骤 1: 环境准备 / Step 1: Environment Setup

#### 1.1 安装 Node.js

**Windows 用户:**
1. 访问 [Node.js 官网](https://nodejs.org/)
2. 下载 LTS（长期支持）版本
3. 运行安装程序，按默认选项安装

**Mac 用户:**
```bash
# 使用 Homebrew 安装
brew install node
```

**Linux 用户:**
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install nodejs npm

# CentOS/RHEL
sudo yum install nodejs npm
```

#### 1.2 验证安装

```bash
node --version  # 应显示 v18.0.0 或更高版本
npm --version   # 应显示 9.0.0 或更高版本
```

### 步骤 2: 克隆或下载项目 / Step 2: Clone or Download Project

```bash
# 使用 Git 克隆
git clone https://github.com/lanexio/lens_test_lanexio.git
cd lens_test_lanexio

# 或者下载 ZIP 文件后解压
```

### 步骤 3: 安装依赖 / Step 3: Install Dependencies

```bash
# 在项目根目录运行
npm install
```

这将安装以下依赖：
- `graphql` - GraphQL 核心库
- `graphql-request` - 轻量级 GraphQL 客户端
- `typescript` - TypeScript 编译器
- `ts-node` - TypeScript 运行器

### 步骤 4: 构建项目 / Step 4: Build Project

```bash
npm run build
```

构建完成后，会在 `dist/` 目录生成编译后的 JavaScript 文件。

---

## 📚 使用教程 / Usage Tutorial

### 方式 1: 运行示例程序 / Method 1: Run Example Program

最简单的方式是运行预制的示例程序：

```bash
npm run example
```

这将运行所有示例，展示：
1. 获取单个账户的 ML 分数
2. 批量获取多个账户的 ML 分数
3. 通过用户名搜索账户
4. 自定义账户地址列表查询

### 方式 2: 在代码中使用 / Method 2: Use in Your Code

#### 2.1 创建一个新的 TypeScript 文件

创建文件 `my-script.ts`:

```typescript
import { LensMLScoreClient } from './src/client.js';

async function main() {
  // 创建客户端实例
  const client = new LensMLScoreClient();
  
  // 获取单个账户的 ML 分数
  const account = await client.getAccountMLScore('0x03Ba3E3B95e3f6844446C400769e978F65A88F42');
  
  if (account) {
    console.log('账户地址:', account.address);
    console.log('用户名:', account.username?.value);
    console.log('ML 分数:', account.score);
  }
}

main();
```

#### 2.2 运行你的脚本

```bash
npx ts-node my-script.ts
```

#### 2.3 批量获取示例

```typescript
import { LensMLScoreClient } from './src/client.js';

async function batchFetch() {
  const client = new LensMLScoreClient();
  
  // 你的账户地址列表
  const addresses = [
    '0x03Ba3E3B95e3f6844446C400769e978F65A88F42',
    '0xD020E01C0c90Ab005A01482975f7c496D1e894b6',
    '0x7241DDDec3A6aF367882eAF9651b87E1C7549Dff',
  ];
  
  // 批量获取
  const accounts = await client.getAccountsMLScores(addresses);
  
  // 显示结果
  console.log(LensMLScoreClient.formatAccountsList(accounts));
  
  // 计算统计信息
  const scores = accounts.map(a => a.score);
  const avgScore = scores.reduce((a, b) => a + b, 0) / scores.length;
  console.log('平均 ML 分数:', avgScore);
}

batchFetch();
```

---

## 🎓 API 参考 / API Reference

### LensMLScoreClient 类

#### 构造函数 / Constructor

```typescript
const client = new LensMLScoreClient(apiUrl?: string);
```

**参数:**
- `apiUrl` (可选): Lens API 的 URL，默认为 `https://api-v2.lens.dev`

#### 方法 / Methods

##### 1. getAccountMLScore()

获取单个账户的 ML 分数。

```typescript
async getAccountMLScore(address: string): Promise<Account | null>
```

**参数:**
- `address`: 账户地址（以太坊地址格式）

**返回值:**
- `Account` 对象或 `null`（如果未找到）

**示例:**
```typescript
const account = await client.getAccountMLScore('0x1234...');
console.log(account?.score); // 输出 ML 分数
```

##### 2. getAccountsMLScores()

批量获取多个账户的 ML 分数。

```typescript
async getAccountsMLScores(addresses: string[]): Promise<Account[]>
```

**参数:**
- `addresses`: 账户地址数组

**返回值:**
- `Account` 对象数组

**示例:**
```typescript
const accounts = await client.getAccountsMLScores([
  '0x1234...',
  '0x5678...'
]);
accounts.forEach(acc => {
  console.log(`${acc.address}: ${acc.score}`);
});
```

##### 3. searchAccountsByUsername()

通过用户名搜索账户。

```typescript
async searchAccountsByUsername(username: string): Promise<Account[]>
```

**参数:**
- `username`: 用户名或用户名片段

**返回值:**
- 匹配的 `Account` 对象数组

**示例:**
```typescript
const accounts = await client.searchAccountsByUsername('lens');
console.log(`找到 ${accounts.length} 个账户`);
```

##### 4. formatAccountInfo() (静态方法)

格式化单个账户信息以便显示。

```typescript
static formatAccountInfo(account: Account): string
```

**示例:**
```typescript
const formatted = LensMLScoreClient.formatAccountInfo(account);
console.log(formatted);
```

##### 5. formatAccountsList() (静态方法)

格式化账户列表以便显示。

```typescript
static formatAccountsList(accounts: Account[]): string
```

---

## 📊 数据类型说明 / Data Types

### Account 接口

```typescript
interface Account {
  address: string;              // 账户地址
  username?: Username;          // 用户名信息
  metadata?: AccountMetadata;   // 元数据
  operations?: AccountOperations; // 操作信息
  score: number;                // ML 分数（重要！）
}
```

### Username 接口

```typescript
interface Username {
  value: string;       // 完整用户名，如 "lens/username"
  namespace: string;   // 命名空间，如 "lens"
  localName: string;   // 本地名称，如 "username"
}
```

### AccountMetadata 接口

```typescript
interface AccountMetadata {
  name?: string;       // 显示名称
  bio?: string;        // 个人简介
  picture?: string;    // 头像 URL
}
```

---

## 🔧 自定义配置 / Custom Configuration

### 修改 API 端点

如果需要使用不同的 Lens API 端点：

```typescript
const client = new LensMLScoreClient('https://your-custom-api-url.com');
```

### 修改查询参数

你可以在 `src/config.ts` 中修改 GraphQL 查询来获取额外的字段。

---

## 💡 实际应用场景 / Use Cases

### 场景 1: 用户质量评估

```typescript
// 评估一组用户的平均质量
const users = await client.getAccountsMLScores(addressList);
const avgScore = users.reduce((sum, u) => sum + u.score, 0) / users.length;

if (avgScore > 0.7) {
  console.log('这是一个高质量用户群体');
} else {
  console.log('用户质量有待提升');
}
```

### 场景 2: 过滤垃圾账户

```typescript
// 只保留 ML 分数高于阈值的账户
const accounts = await client.getAccountsMLScores(addressList);
const highQualityAccounts = accounts.filter(acc => acc.score > 0.5);
console.log(`筛选出 ${highQualityAccounts.length} 个高质量账户`);
```

### 场景 3: 用户推荐排序

```typescript
// 按 ML 分数排序用户列表
const accounts = await client.getAccountsMLScores(addressList);
accounts.sort((a, b) => b.score - a.score);
console.log('Top 10 用户:', accounts.slice(0, 10));
```

---

## 📝 常见问题 / FAQ

### Q1: 什么是 ML Score？

**A:** ML Score（机器学习评分）是 Lens Protocol 使用机器学习算法计算的账户质量评分，范围通常在 0-1 之间。它考虑了关注者图谱、内容质量、互动等多个因素，用于评估账户的信号强度和减少垃圾信息影响。

### Q2: 如何获取 Lens 账户地址？

**A:** Lens 账户地址就是以太坊钱包地址。你可以：
1. 从 Lens Protocol 应用中复制
2. 通过用户名搜索获取
3. 使用 Lens Protocol 的其他 API 端点

### Q3: 查询速度慢怎么办？

**A:** 
1. 使用批量查询 API（`getAccountsMLScores`）而不是循环调用单个查询
2. 在查询之间添加适当的延迟避免限流
3. 考虑实现缓存机制

### Q4: 遇到 "Account not found" 错误

**A:** 可能的原因：
1. 地址格式不正确（应为以太坊地址格式）
2. 该地址没有 Lens Protocol 账户
3. API 服务暂时不可用

### Q5: 如何处理大量地址？

**A:** 建议分批处理：

```typescript
async function batchProcess(addresses: string[], batchSize = 10) {
  const results = [];
  for (let i = 0; i < addresses.length; i += batchSize) {
    const batch = addresses.slice(i, i + batchSize);
    const accounts = await client.getAccountsMLScores(batch);
    results.push(...accounts);
    // 延迟避免限流
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  return results;
}
```

---

## 🛠️ 故障排查 / Troubleshooting

### 问题: npm install 失败

**解决方案:**
```bash
# 清除缓存
npm cache clean --force

# 删除 node_modules 和 package-lock.json
rm -rf node_modules package-lock.json

# 重新安装
npm install
```

### 问题: TypeScript 编译错误

**解决方案:**
```bash
# 确保 TypeScript 版本正确
npm install -D typescript@latest

# 重新构建
npm run build
```

### 问题: GraphQL 查询失败

**解决方案:**
1. 检查网络连接
2. 确认 API 端点 URL 正确
3. 检查地址格式是否正确（应为以太坊地址）
4. 查看详细错误信息进行调试

---

## 🤝 贡献 / Contributing

欢迎提交 Issue 和 Pull Request！

---

## 📄 许可证 / License

ISC License

---

## 📞 支持 / Support

如有问题，请：
1. 查看本文档的常见问题部分
2. 访问 [Lens Protocol 官方文档](https://lens.xyz/docs)
3. 在 GitHub 仓库提交 Issue

---

## 🎉 开始使用 / Get Started

现在你已经了解了所有基础知识，可以开始使用了！

```bash
# 快速开始
npm install
npm run build
npm run example
```

祝你使用愉快！ Enjoy! 🚀
