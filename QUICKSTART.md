# 🚀 快速开始指南 / Quick Start Guide

## 最简单的使用方法 / Simplest Usage (3 Steps)

### 步骤 1: 安装 / Step 1: Install

```bash
npm install
```

### 步骤 2: 构建 / Step 2: Build

```bash
npm run build
```

### 步骤 3: 运行示例 / Step 3: Run Example

```bash
npm run example
```

就这么简单！程序将自动展示如何获取 Lens Protocol 账户的 ML 评分。

That's it! The program will automatically demonstrate how to fetch ML scores from Lens Protocol accounts.

---

## 自定义查询 / Custom Query

想查询自己的账户列表？编辑 `src/example.ts` 文件中的 `customAddresses` 数组：

Want to query your own accounts? Edit the `customAddresses` array in `src/example.ts`:

```typescript
const customAddresses: string[] = [
  '0x你的地址1',  // Your address 1
  '0x你的地址2',  // Your address 2
  // ... 添加更多地址
];
```

然后重新运行 / Then run again:

```bash
npm run build
npm run example
```

---

## 在自己的代码中使用 / Use in Your Own Code

创建一个新文件 `my-query.ts`:

```typescript
import { LensMLScoreClient } from './src/client.js';

async function myQuery() {
  const client = new LensMLScoreClient();
  
  // 替换为你想查询的地址
  const addresses = ['0x03Ba3E3B95e3f6844446C400769e978F65A88F42'];
  
  const accounts = await client.getAccountsMLScores(addresses);
  accounts.forEach(acc => {
    console.log(`地址: ${acc.address}`);
    console.log(`用户名: ${acc.username?.value || '无'}`);
    console.log(`ML分数: ${acc.score}`);
    console.log('---');
  });
}

myQuery();
```

运行 / Run:

```bash
npx ts-node my-query.ts
```

---

## 需要帮助？ / Need Help?

查看完整教程 / See full tutorial: [TUTORIAL.md](./TUTORIAL.md)

---

**提示 / Tips:**

- ML Score 是一个 0-1 之间的数值，代表账户质量
- 分数越高，账户质量越好
- 可以一次查询多个账户以提高效率

- ML Score is a value between 0-1, representing account quality
- Higher score means better account quality
- You can query multiple accounts at once for efficiency
