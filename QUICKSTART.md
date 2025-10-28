# 快速开始指南 (Quick Start Guide)

## 5分钟快速上手

### 第一步：安装依赖

```bash
npm install
```

### 第二步：编译项目

```bash
npm run build
```

### 第三步：验证安装

```bash
npm run verify
```

你应该看到所有测试通过的消息 ✅

### 第四步：查看示例

```bash
npm run example
```

这会运行完整的示例程序，展示所有功能。

## 最简单的使用示例

创建一个新文件 `my-first-query.js`：

```javascript
const { createMLScoreFetcher } = require('./dist/index');

async function main() {
  // 创建获取器
  const fetcher = createMLScoreFetcher();
  
  // 查询单个地址
  const result = await fetcher.getMLScore('0x03fEb724F1a471861b1e353BEd14aFE3992dFBfd');
  
  // 显示结果
  console.log('ML Score:', result.mlScore);
  console.log('用户名:', result.username);
}

main();
```

运行：

```bash
node my-first-query.js
```

## TypeScript 使用示例

创建 `my-first-query.ts`：

```typescript
import { createMLScoreFetcher } from './src/index';

async function main() {
  const fetcher = createMLScoreFetcher();
  
  const result = await fetcher.getMLScore('0x03fEb724F1a471861b1e353BEd14aFE3992dFBfd');
  
  console.log('ML Score:', result.mlScore);
  console.log('用户名:', result.username);
}

main();
```

运行：

```bash
npx ts-node my-first-query.ts
```

## 批量查询示例

```typescript
import { createMLScoreFetcher } from './src/index';

async function batchQuery() {
  const fetcher = createMLScoreFetcher();
  
  const addresses = [
    '0x03fEb724F1a471861b1e353BEd14aFE3992dFBfd',
    '0xD020E01C0c90Ab005A01482d34B808874345FD82',
  ];
  
  const result = await fetcher.getMLScoresBulk(addresses);
  
  console.log(`成功: ${result.successCount} 个`);
  console.log(`失败: ${result.failedCount} 个`);
  
  result.success.forEach(account => {
    console.log(`${account.username}: ${account.mlScore}`);
  });
}

batchQuery();
```

## 通过用户名查询

```typescript
import { createMLScoreFetcher } from './src/index';

async function queryByUsername() {
  const fetcher = createMLScoreFetcher();
  
  const result = await fetcher.getMLScoreByUsername('stani.lens');
  
  console.log('地址:', result.address);
  console.log('ML Score:', result.mlScore);
}

queryByUsername();
```

## 错误处理

```typescript
import { createMLScoreFetcher } from './src/index';

async function safeQuery(address: string) {
  const fetcher = createMLScoreFetcher();
  const result = await fetcher.getMLScore(address);
  
  if (result.error) {
    console.error('查询失败:', result.error);
    return null;
  }
  
  return result;
}

// 使用
safeQuery('0x03fEb724F1a471861b1e353BEd14aFE3992dFBfd')
  .then(result => {
    if (result) {
      console.log('成功:', result.mlScore);
    }
  });
```

## 切换网络

```typescript
import { createMLScoreFetcher } from './src/index';

const fetcher = createMLScoreFetcher();

// 切换到测试网
fetcher.useTestnet();
console.log('当前端点:', fetcher.getEndpoint());

// 切换回主网
fetcher.useMainnet();
console.log('当前端点:', fetcher.getEndpoint());
```

## 主要 API

### createMLScoreFetcher(endpoint?: string)

创建 ML Score 获取器实例。

```typescript
const fetcher = createMLScoreFetcher();
// 或指定自定义端点
const fetcher = createMLScoreFetcher('https://api.lens.xyz/graphql');
```

### getMLScore(address: string)

获取单个账户的 ML Score。

```typescript
const result = await fetcher.getMLScore('0x...');
```

返回：
```typescript
{
  address: string;
  username?: string;
  mlScore?: number;
  metadata?: AccountMetadata;
  error?: string;
}
```

### getMLScoresBulk(addresses: string[])

批量获取多个账户的 ML Score。

```typescript
const result = await fetcher.getMLScoresBulk(['0x...', '0x...']);
```

返回：
```typescript
{
  success: MLScoreResult[];
  failed: Array<{ address: string; error: string }>;
  total: number;
  successCount: number;
  failedCount: number;
}
```

### getMLScoreByUsername(username: string)

通过用户名获取 ML Score。

```typescript
const result = await fetcher.getMLScoreByUsername('user.lens');
```

## 完整文档

- **README.md** - 完整的项目文档和 API 参考
- **TUTORIAL.md** - 从零开始的详细教程
- **src/example.ts** - 完整的使用示例代码

## 需要帮助？

1. 查看 [README.md](README.md) 获取完整文档
2. 阅读 [TUTORIAL.md](TUTORIAL.md) 获取详细教程
3. 查看 [src/example.ts](src/example.ts) 获取代码示例
4. 访问 [Lens Protocol 文档](https://lens.xyz/docs/protocol/accounts/fetch)

## 常见命令

```bash
# 安装依赖
npm install

# 编译项目
npm run build

# 运行验证
npm run verify

# 运行示例
npm run example

# 开发模式（使用 ts-node）
npm run dev
```

## 项目结构

```
lens_test_lanexio/
├── src/                    # 源代码
│   ├── types.ts           # 类型定义
│   ├── queries.ts         # GraphQL 查询
│   ├── fetcher.ts         # 核心功能
│   ├── index.ts           # 入口文件
│   ├── example.ts         # 示例代码
│   └── verify.ts          # 验证脚本
├── dist/                   # 编译输出
├── README.md              # 完整文档
├── TUTORIAL.md            # 详细教程
├── QUICKSTART.md          # 本文件
├── package.json           # 项目配置
└── tsconfig.json          # TypeScript 配置
```

祝你使用愉快！🎉
