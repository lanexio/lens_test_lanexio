# Lens Protocol ML Score 获取功能 - 完整教程

## 📚 简介

本教程将**手把手**教你从零开始，实现获取 Lens Protocol 用户 ML Score（机器学习评分）的完整功能。ML Score 是 Lens 协议用来评估账户真实性和活跃度的指标。

## 🎯 功能说明

本项目提供以下功能：

1. **单个用户查询**：根据用户名或地址查询单个用户的 ML Score
2. **批量查询**：一次查询多个用户的 ML Score
3. **灵活输入**：支持用户名和以太坊地址两种查询方式

## 🚀 从零开始 - 傻瓜式操作步骤

### 第一步：准备环境

#### 1.1 安装 Node.js

**检查是否已安装 Node.js：**
```bash
node --version
```

如果显示版本号（如 v18.x.x），说明已安装，可跳到下一步。

**如果没有安装：**
- 访问 [Node.js 官网](https://nodejs.org/)
- 下载并安装 LTS 版本（推荐）
- 安装完成后，重新打开终端验证

#### 1.2 创建项目目录（如果是新项目）

```bash
# 创建项目文件夹
mkdir lens-ml-score-project

# 进入项目文件夹
cd lens-ml-score-project
```

### 第二步：安装依赖

在项目根目录执行以下命令：

```bash
# 安装项目依赖
npm install
```

**说明：** 
- 这会安装 `@lens-protocol/client` 和 `viem` 两个必要的包
- 安装过程可能需要几分钟，请耐心等待
- 看到 "added XX packages" 说明安装成功

### 第三步：了解项目结构

```
lens_test_lanexio/
├── package.json              # 项目配置文件
├── src/
│   └── index.js             # 核心功能代码
├── examples/
│   └── fetch-ml-scores.js   # 使用示例
└── TUTORIAL.md              # 本教程文件
```

### 第四步：运行示例代码

#### 方式一：运行完整示例

```bash
npm run example
```

这会执行 `examples/fetch-ml-scores.js` 文件，展示两种查询方式的效果。

#### 方式二：自定义查询

创建你自己的查询脚本：

```bash
# 创建新文件
touch my-query.js
```

编辑 `my-query.js`，添加以下内容：

```javascript
import { fetchMLScores } from './src/index.js';

// 定义你要查询的用户列表
const userIds = [
  'stani',           // 替换成你想查询的用户名
  'lensprotocol',    // 或者以太坊地址
];

// 执行查询
fetchMLScores(userIds).then(results => {
  console.log('查询完成！');
  console.log(JSON.stringify(results, null, 2));
});
```

运行你的脚本：

```bash
node my-query.js
```

### 第五步：理解代码

#### 5.1 核心函数说明

**fetchMLScores(userIds)**
- 功能：逐个查询多个用户的 ML Score
- 参数：`userIds` - 用户ID数组（可以是用户名或地址）
- 返回：Promise，包含所有用户信息的数组

**fetchMLScoresBulk(addresses)**
- 功能：批量查询多个用户的 ML Score（更高效）
- 参数：`addresses` - 以太坊地址数组
- 返回：Promise，包含所有用户信息的数组

**fetchSingleMLScore(client, accountId)**
- 功能：查询单个用户的 ML Score
- 参数：
  - `client` - Lens 客户端实例
  - `accountId` - 用户ID（用户名或地址）
- 返回：Promise，包含单个用户信息的对象

#### 5.2 返回数据结构

查询成功时返回的数据：

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

查询失败时返回的数据：

```javascript
{
  id: "unknown_user",
  success: false,
  error: "未找到用户",
  mlScore: null
}
```

### 第六步：在你的项目中使用

#### 6.1 导入功能

```javascript
import { fetchMLScores, fetchMLScoresBulk } from './src/index.js';
```

#### 6.2 查询单个或多个用户

```javascript
// 方式1：使用用户名查询
const results = await fetchMLScores(['stani', 'lensprotocol']);

// 方式2：使用地址查询
const results = await fetchMLScores([
  '0x01d79BcEaEaaDfb8fD2F2f53005289CFcF483464'
]);

// 方式3：批量查询（推荐用于大量地址）
const results = await fetchMLScoresBulk([
  '0x01d79BcEaEaaDfb8fD2F2f53005289CFcF483464',
  '0xEEA0C1f5ab0159dba749Dc0BAee462E5e293daaF'
]);
```

#### 6.3 处理返回结果

```javascript
const results = await fetchMLScores(['stani', 'lensprotocol']);

// 遍历结果
results.forEach(user => {
  if (user.success) {
    console.log(`用户 ${user.username} 的 ML Score 是: ${user.mlScore}`);
  } else {
    console.log(`查询失败: ${user.error}`);
  }
});

// 筛选成功的查询
const successfulQueries = results.filter(r => r.success);

// 获取所有ML Scores
const mlScores = successfulQueries.map(r => r.mlScore);

// 计算平均分
const averageScore = mlScores.reduce((a, b) => a + b, 0) / mlScores.length;
console.log(`平均 ML Score: ${averageScore}`);
```

## 🔍 常见问题解答

### Q1: 什么是 ML Score？

A: ML Score 是 Lens Protocol 使用机器学习算法计算的账户评分（0-100分），用于评估账户的真实性和活跃度。分数越高，说明账户质量越好。

### Q2: 为什么有些用户没有 ML Score？

A: 可能的原因：
- 账户是新创建的，还没有足够的数据
- 账户活跃度很低
- 数据还在计算中

### Q3: 如何获取用户的以太坊地址？

A: 
- 在 Lens 应用中查看用户资料
- 使用 Etherscan 等区块链浏览器
- 通过其他 Lens API 先获取用户信息

### Q4: 批量查询和逐个查询有什么区别？

A:
- **批量查询** (`fetchMLScoresBulk`)：一次 API 调用获取多个用户，速度快，但只支持地址查询
- **逐个查询** (`fetchMLScores`)：多次 API 调用，速度慢，但支持用户名和地址混合查询

### Q5: 遇到错误怎么办？

常见错误和解决方案：

**错误：Cannot find module '@lens-protocol/client'**
```bash
# 解决：重新安装依赖
npm install
```

**错误：Network error**
```bash
# 解决：检查网络连接，或使用代理
# 如果在国内，可能需要配置npm镜像
npm config set registry https://registry.npmmirror.com
npm install
```

**错误：User not found**
```bash
# 解决：确认用户名或地址是否正确
# Lens 用户名区分大小写
```

## 📝 完整示例代码

### 示例1：查询指定用户并分析

```javascript
import { fetchMLScores } from './src/index.js';

async function analyzeUsers() {
  // 要查询的用户列表
  const usernames = ['stani', 'lensprotocol', 'yoginth'];
  
  // 获取数据
  const results = await fetchMLScores(usernames);
  
  // 数据分析
  const successful = results.filter(r => r.success);
  
  console.log('\n=== 数据分析报告 ===');
  console.log(`查询总数: ${results.length}`);
  console.log(`成功数量: ${successful.length}`);
  
  // 按ML Score排序
  const sorted = successful.sort((a, b) => b.mlScore - a.mlScore);
  
  console.log('\n用户排名（按ML Score）:');
  sorted.forEach((user, index) => {
    console.log(`${index + 1}. ${user.username}: ${user.mlScore}`);
  });
  
  // 计算统计数据
  const scores = successful.map(u => u.mlScore).filter(s => s !== null);
  if (scores.length > 0) {
    const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
    const max = Math.max(...scores);
    const min = Math.min(...scores);
    
    console.log('\n统计数据:');
    console.log(`  平均分: ${avg.toFixed(2)}`);
    console.log(`  最高分: ${max}`);
    console.log(`  最低分: ${min}`);
  }
}

analyzeUsers();
```

### 示例2：将结果保存到文件

```javascript
import { fetchMLScores } from './src/index.js';
import fs from 'fs';

async function saveToFile() {
  const usernames = ['stani', 'lensprotocol'];
  const results = await fetchMLScores(usernames);
  
  // 保存为JSON文件
  fs.writeFileSync(
    'ml-scores.json',
    JSON.stringify(results, null, 2)
  );
  
  console.log('✅ 结果已保存到 ml-scores.json');
  
  // 保存为CSV文件
  const csv = [
    'Username,Address,ML Score,Name',
    ...results
      .filter(r => r.success)
      .map(r => `${r.username},${r.address},${r.mlScore},"${r.name}"`)
  ].join('\n');
  
  fs.writeFileSync('ml-scores.csv', csv);
  console.log('✅ 结果已保存到 ml-scores.csv');
}

saveToFile();
```

## 🔗 相关资源

- [Lens Protocol 官方文档](https://lens.xyz/docs)
- [Lens API 文档](https://docs.api.lens.org/)
- [账户获取文档](https://lens.xyz/docs/protocol/accounts/fetch)
- [Lens Protocol GitHub](https://github.com/lens-protocol)

## 💡 进阶使用

### 使用认证功能

如果需要访问受保护的数据，可以添加认证：

```javascript
import { LensClient, production } from '@lens-protocol/client';

const client = new LensClient({
  environment: production,
});

// 使用钱包认证
await client.login({
  accountOwner: {
    account: '0x...', // 你的账户地址
    app: '0x...',     // 你的应用地址
    owner: '0x...',   // 所有者地址
  },
});
```

### 搜索账户

```javascript
const results = await client.account.fetchAll({
  filter: {
    searchBy: {
      localNameQuery: 'lens'  // 搜索用户名包含 'lens' 的账户
    }
  }
});
```

### 获取推荐账户

```javascript
const recommendations = await client.account.recommendations();
```

## 📞 获取帮助

如果遇到问题：

1. 检查本教程的"常见问题解答"部分
2. 查看示例代码 `examples/fetch-ml-scores.js`
3. 访问 [Lens Protocol Discord](https://discord.gg/lensprotocol)
4. 查看 [Lens 开发者文档](https://lens.xyz/docs)

## 🎉 完成！

恭喜你！现在你已经掌握了如何获取 Lens Protocol 用户的 ML Score。可以开始在你的项目中使用这个功能了！

**下一步可以做什么？**
- 将这个功能集成到你的 Web 应用中
- 创建一个 ML Score 排行榜
- 分析用户数据，发现有趣的见解
- 基于 ML Score 做内容推荐

祝你开发愉快！🚀
