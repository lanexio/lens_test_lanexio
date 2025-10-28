# 🎯 Lens Protocol ML评分获取工具 完整中文教程

## 📖 项目介绍

这是一个完整的 Lens Protocol ML Score（机器学习评分）获取工具，根据 [Lens Protocol 官方文档](https://lens.xyz/docs/protocol/accounts/fetch) 实现，可以轻松获取指定用户ID列表的ML评分。

**ML Score 是什么？**
ML Score 是 Lens Protocol 使用机器学习算法计算的账户质量评分，范围在 0-1 之间。它综合考虑了关注者图谱、内容质量、互动行为等多个因素，用于评估账户的信号强度和减少垃圾信息影响。

## ✨ 主要功能

- ✅ **单账户查询** - 查询单个账户的ML评分
- ✅ **批量查询** - 一次性查询多个账户的ML评分
- ✅ **用户名搜索** - 通过用户名搜索账户并获取评分
- ✅ **完整类型支持** - 使用 TypeScript 提供完整的类型定义
- ✅ **友好输出** - 精美的中英文双语格式化输出
- ✅ **详细文档** - 提供完整的使用教程和示例

## 🚀 三步快速开始

### 步骤 1: 安装依赖

在项目目录打开终端，运行：

```bash
npm install
```

这会自动安装所有必需的依赖包。

### 步骤 2: 构建项目

```bash
npm run build
```

这会将 TypeScript 代码编译成 JavaScript。

### 步骤 3: 运行演示

```bash
npm run demo
```

这会运行演示程序，展示如何使用工具获取ML评分。

**就这么简单！** 🎉

## 📚 详细使用教程

### 方法1: 运行预制示例

项目提供了两个预制的示例程序：

#### 演示模式（使用模拟数据）

```bash
npm run demo
```

这个命令会运行演示程序，使用模拟数据展示：
- 单个账户信息展示
- 多个账户列表展示
- ML分数分析和排名
- 实际应用场景示例

#### 真实API调用示例

```bash
npm run example
```

这个命令会尝试调用真实的 Lens Protocol API，展示：
1. 获取单个账户的ML分数
2. 批量获取多个账户的ML分数
3. 通过用户名搜索账户
4. 自定义账户地址列表查询

### 方法2: 自定义查询

#### 2.1 修改示例代码查询自己的账户

编辑文件 `src/example.ts`，找到 `example4_customAddresses` 函数中的 `customAddresses` 数组，添加你想查询的账户地址：

```typescript
const customAddresses: string[] = [
  '0x你的账户地址1',
  '0x你的账户地址2',
  '0x你的账户地址3',
  // ... 可以添加更多
];
```

然后运行：

```bash
npm run build
npm run example
```

#### 2.2 编写自己的查询脚本

创建一个新文件 `my-query.ts`:

```typescript
import { LensMLScoreClient } from './src/client.js';

async function queryMyAccounts() {
  // 创建客户端
  const client = new LensMLScoreClient();
  
  // 你想查询的账户地址列表
  const myAddresses = [
    '0x03Ba3E3B95e3f6844446C400769e978F65A88F42',
    '0xD020E01C0c90Ab005A01482975f7c496D1e894b6',
  ];
  
  try {
    // 批量获取ML分数
    console.log('正在查询账户信息...');
    const accounts = await client.getAccountsMLScores(myAddresses);
    
    // 显示结果
    console.log(LensMLScoreClient.formatAccountsList(accounts));
    
    // 计算平均分数
    const avgScore = accounts.reduce((sum, acc) => sum + acc.score, 0) / accounts.length;
    console.log(`平均ML分数: ${avgScore.toFixed(2)}`);
    
  } catch (error) {
    console.error('查询失败:', error);
  }
}

// 运行查询
queryMyAccounts();
```

运行你的脚本：

```bash
npx ts-node my-query.ts
```

## 💻 API 使用说明

### 创建客户端

```typescript
import { LensMLScoreClient } from './src/client.js';

const client = new LensMLScoreClient();
```

### 获取单个账户的ML分数

```typescript
const account = await client.getAccountMLScore('0x账户地址');

if (account) {
  console.log('账户地址:', account.address);
  console.log('用户名:', account.username?.value);
  console.log('ML分数:', account.score);
}
```

### 批量获取多个账户的ML分数

```typescript
const addresses = [
  '0x账户地址1',
  '0x账户地址2',
  '0x账户地址3',
];

const accounts = await client.getAccountsMLScores(addresses);

// 遍历显示每个账户
accounts.forEach(account => {
  console.log(`${account.username?.value}: ${account.score}`);
});
```

### 通过用户名搜索账户

```typescript
// 搜索用户名包含 "lens" 的账户
const results = await client.searchAccountsByUsername('lens');

console.log(`找到 ${results.length} 个账户`);
results.forEach(account => {
  console.log(`${account.username?.value}: ${account.score}`);
});
```

### 格式化输出

```typescript
// 格式化单个账户信息
const formatted = LensMLScoreClient.formatAccountInfo(account);
console.log(formatted);

// 格式化账户列表
const listFormatted = LensMLScoreClient.formatAccountsList(accounts);
console.log(listFormatted);
```

## 📊 实际应用场景

### 场景1: 用户质量评估

```typescript
async function evaluateUserQuality(addresses: string[]) {
  const client = new LensMLScoreClient();
  const accounts = await client.getAccountsMLScores(addresses);
  
  const avgScore = accounts.reduce((sum, a) => sum + a.score, 0) / accounts.length;
  
  if (avgScore > 0.8) {
    console.log('这是一个非常高质量的用户群体！');
  } else if (avgScore > 0.6) {
    console.log('这是一个中等质量的用户群体');
  } else {
    console.log('用户质量有待提升');
  }
}
```

### 场景2: 过滤低质量账户

```typescript
async function filterLowQualityAccounts(addresses: string[]) {
  const client = new LensMLScoreClient();
  const accounts = await client.getAccountsMLScores(addresses);
  
  // 只保留ML分数 > 0.6 的账户
  const highQuality = accounts.filter(acc => acc.score > 0.6);
  
  console.log(`原始账户: ${accounts.length} 个`);
  console.log(`高质量账户: ${highQuality.length} 个`);
  console.log(`过滤掉: ${accounts.length - highQuality.length} 个`);
  
  return highQuality;
}
```

### 场景3: 账户排名

```typescript
async function rankAccounts(addresses: string[]) {
  const client = new LensMLScoreClient();
  const accounts = await client.getAccountsMLScores(addresses);
  
  // 按ML分数降序排序
  accounts.sort((a, b) => b.score - a.score);
  
  console.log('账户排名:');
  accounts.forEach((account, index) => {
    const medal = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '';
    console.log(`${medal} 第${index + 1}名: ${account.username?.value} (${account.score})`);
  });
}
```

## 📁 项目文件结构

```
lens_test_lanexio/
├── src/                      # 源代码目录
│   ├── client.ts            # 主客户端类实现
│   ├── config.ts            # GraphQL查询和配置
│   ├── types.ts             # TypeScript类型定义
│   ├── index.ts             # 主入口文件
│   ├── example.ts           # 真实API示例
│   └── demo.ts              # 演示模式（模拟数据）
├── dist/                     # 编译输出目录
├── README.md                 # 项目说明（英文为主）
├── README_CN.md              # 本文件（中文详细教程）
├── TUTORIAL.md               # 详细教程（中英双语）
├── QUICKSTART.md             # 快速开始指南
├── package.json              # 项目配置和依赖
├── tsconfig.json             # TypeScript配置
└── .gitignore                # Git忽略文件配置
```

## 🎓 账户数据说明

查询返回的账户对象包含以下信息：

```typescript
{
  address: '0x...',              // 账户地址（以太坊地址）
  username: {
    value: 'lens/username',      // 完整用户名
    namespace: 'lens',           // 命名空间
    localName: 'username'        // 本地名称
  },
  metadata: {
    name: '显示名称',            // 账户显示名称
    bio: '个人简介',             // 个人简介
    picture: 'https://...'       // 头像URL
  },
  score: 0.85                    // ML分数（0-1之间）
}
```

**重要字段说明：**
- `address`: 账户的以太坊地址，这是唯一标识符
- `username.value`: 完整的用户名，格式为 "namespace/localName"
- `metadata`: 包含账户的元数据信息
- **`score`**: **ML分数，这是最重要的字段！** 反映账户质量

## ❓ 常见问题

### Q1: 如何获取Lens账户地址？

**答：** Lens账户地址就是以太坊钱包地址。你可以：
1. 从 Lens Protocol 应用中复制
2. 通过用户名搜索获取
3. 从区块链浏览器（如 Etherscan）获取

### Q2: ML分数的范围是多少？

**答：** ML分数通常在 0 到 1 之间，其中：
- 0.8 - 1.0：优秀账户
- 0.7 - 0.8：良好账户
- 0.6 - 0.7：中等账户
- 0.5 - 0.6：较差账户
- 0 - 0.5：低质量账户

### Q3: 一次可以查询多少个账户？

**答：** 建议每次查询不超过 10-20 个账户。如果需要查询大量账户，建议分批处理：

```typescript
async function batchQuery(addresses: string[]) {
  const batchSize = 10;
  const results = [];
  
  for (let i = 0; i < addresses.length; i += batchSize) {
    const batch = addresses.slice(i, i + batchSize);
    const accounts = await client.getAccountsMLScores(batch);
    results.push(...accounts);
    
    // 延迟1秒避免请求过快
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  return results;
}
```

### Q4: 查询速度慢怎么办？

**答：**
1. 使用批量查询API而不是循环调用单个查询
2. 在查询之间添加适当的延迟
3. 考虑实现缓存机制存储已查询的结果

### Q5: 遇到"Account not found"错误怎么办？

**答：** 可能的原因：
1. 地址格式不正确（必须是以太坊地址格式，以"0x"开头）
2. 该地址没有Lens Protocol账户
3. API服务暂时不可用，稍后重试

### Q6: 可以修改API端点吗？

**答：** 可以！创建客户端时传入自定义URL：

```typescript
const client = new LensMLScoreClient('https://your-custom-api-url.com');
```

## 🛠️ 故障排查

### 问题: npm install 失败

```bash
# 解决方法：清除缓存后重新安装
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### 问题: 编译错误

```bash
# 解决方法：确保TypeScript版本正确
npm install -D typescript@latest
npm run build
```

### 问题: 网络连接错误

1. 检查你的网络连接是否正常
2. 确认API端点URL是否正确
3. 检查防火墙设置是否阻止了连接

## 📝 可用命令总结

```bash
npm install          # 安装所有依赖
npm run build        # 编译TypeScript代码
npm run demo         # 运行演示程序（使用模拟数据）
npm run example      # 运行示例程序（调用真实API）
```

## 🎯 开始使用

现在你已经掌握了所有必要的知识，可以开始使用了！

```bash
# 1. 安装依赖
npm install

# 2. 构建项目
npm run build

# 3. 运行演示
npm run demo

# 4. 修改示例代码添加自己的账户地址
# 编辑 src/example.ts

# 5. 运行你的查询
npm run example
```

## 💡 提示和技巧

1. **先运行演示**: 使用 `npm run demo` 了解输出格式
2. **从小批量开始**: 先测试少量账户，确认无误后再扩大规模
3. **保存结果**: 可以将查询结果保存到文件，避免重复查询
4. **错误处理**: 始终使用 try-catch 处理可能的错误
5. **查看完整文档**: 详细的英文文档请参考 TUTORIAL.md

## 🤝 需要帮助？

如果遇到问题：
1. 查看本文档的常见问题部分
2. 查看项目的其他文档文件（README.md、TUTORIAL.md）
3. 访问 [Lens Protocol 官方文档](https://lens.xyz/docs)
4. 在 GitHub 仓库提交 Issue

## 📄 许可证

ISC License

---

**祝你使用愉快！如有问题随时查阅文档或寻求帮助。** 🚀
