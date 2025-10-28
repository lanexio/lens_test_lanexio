# 从零开始：获取 Lens Protocol ML Score 完整教程

## 🎓 教程目标

本教程将手把手教你从零开始，完成 Lens Protocol 账户 ML Score 的获取功能。

## 📚 前置知识

在开始之前，你需要了解：
1. 基本的命令行操作
2. JavaScript/TypeScript 基础（如果不懂也没关系，我们会逐步解释）
3. Node.js 是什么（一个 JavaScript 运行环境）

## 🛠️ 准备工作

### 步骤 0：安装必要软件

#### 0.1 安装 Node.js

**Windows 用户：**
1. 访问 https://nodejs.org/
2. 下载 LTS 版本（长期支持版）
3. 双击安装包，一路点击"下一步"
4. 安装完成后，打开命令提示符（CMD）
5. 输入 `node --version` 检查是否安装成功

**Mac 用户：**
1. 打开终端（Terminal）
2. 使用 Homebrew 安装：`brew install node`
3. 或者访问 https://nodejs.org/ 下载安装包
4. 输入 `node --version` 检查是否安装成功

**Linux 用户：**
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install nodejs npm

# 检查安装
node --version
npm --version
```

#### 0.2 安装代码编辑器（可选但推荐）

推荐使用 Visual Studio Code：
1. 访问 https://code.visualstudio.com/
2. 下载并安装
3. 打开 VS Code

## 📦 第一部分：获取项目代码

### 步骤 1：克隆或下载项目

**方法 1：使用 Git（如果已安装）**
```bash
git clone https://github.com/lanexio/lens_test_lanexio.git
cd lens_test_lanexio
```

**方法 2：直接下载**
1. 访问项目地址
2. 点击绿色的 "Code" 按钮
3. 选择 "Download ZIP"
4. 解压到你想要的目录
5. 打开命令行，进入该目录

### 步骤 2：安装项目依赖

打开命令行（终端），确保你在项目目录中，然后运行：

```bash
npm install
```

这个命令会：
- 读取 `package.json` 文件
- 下载所有需要的库和工具
- 可能需要几分钟时间，请耐心等待

看到类似这样的输出就表示成功了：
```
added 150 packages, and audited 151 packages in 30s
```

### 步骤 3：编译项目

运行以下命令：

```bash
npm run build
```

这会将 TypeScript 代码编译成 JavaScript，你会看到：
```
> lens-ml-score-fetcher@1.0.0 build
> tsc
```

编译成功后，会生成一个 `dist` 目录，里面是编译后的代码。

## 🎯 第二部分：理解代码结构

### 文件说明

```
项目目录/
├── src/                      ← 源代码（你要看的主要文件）
│   ├── types.ts             ← 定义数据类型
│   ├── queries.ts           ← GraphQL 查询语句
│   ├── fetcher.ts           ← 核心功能（重点）
│   ├── index.ts             ← 入口文件
│   └── example.ts           ← 示例代码（最重要）
├── dist/                     ← 编译后的代码
├── package.json             ← 项目配置
├── tsconfig.json            ← TypeScript 配置
└── README.md                ← 使用说明
```

### 核心文件解读

#### 1. `types.ts` - 类型定义

这个文件定义了数据的结构，就像是数据的"模板"：

```typescript
// 账户信息的结构
interface Account {
  address: string;        // 地址（必须有）
  username?: string;      // 用户名（可选，? 表示可能没有）
  metadata?: {            // 元数据（可选）
    name?: string;        // 名称
    bio?: string;         // 简介
    mlScore?: number;     // ML Score（重点！）
  };
}
```

#### 2. `queries.ts` - 查询语句

包含向 Lens API 发送的查询：

```typescript
// 获取单个账户信息的查询
const GET_ACCOUNT_QUERY = `
  query GetAccount($address: EvmAddress!) {
    account(request: { address: $address }) {
      address
      username { value }
      metadata { mlScore }
    }
  }
`;
```

#### 3. `fetcher.ts` - 核心功能

这是最重要的文件，包含了获取 ML Score 的所有逻辑：

```typescript
class LensMLScoreFetcher {
  // 获取单个账户的 ML Score
  async getMLScore(address: string) {
    // 1. 验证地址格式
    // 2. 发送查询到 Lens API
    // 3. 提取 ML Score
    // 4. 返回结果
  }
  
  // 批量获取多个账户的 ML Score
  async getMLScoresBulk(addresses: string[]) {
    // 1. 分批处理地址
    // 2. 对每批发送查询
    // 3. 汇总结果
    // 4. 返回完整结果
  }
}
```

## 🚀 第三部分：运行示例

### 步骤 4：运行完整示例

最简单的方式，运行我们准备好的示例：

```bash
npm run example
```

你会看到类似这样的输出：

```
╔════════════════════════════════════════════════════════════╗
║   Lens Protocol ML Score Fetcher - 使用示例               ║
╚════════════════════════════════════════════════════════════╝

=== 示例 1: 获取单个账户的 ML Score ===

正在查询地址: 0x03fEb724F1a471861b1e353BEd14aFE3992dFBfd
✅ 查询成功!
地址: 0x03fEb724F1a471861b1e353BEd14aFE3992dFBfd
用户名: stani.lens
ML Score: 0.85

账户元数据:
  名称: Stani Kulechov
  简介: Founder of Aave and Lens Protocol
  ...
```

### 步骤 5：修改示例代码

打开 `src/example.ts` 文件，找到这一部分：

```typescript
// 步骤 2: 准备要查询的以太坊地址
const address = '0x03fEb724F1a471861b1e353BEd14aFE3992dFBfd';
```

把地址改成你想查询的地址：

```typescript
const address = '0x你的地址或想查询的地址';
```

保存文件，然后重新编译并运行：

```bash
npm run build
npm run example
```

## 💻 第四部分：编写自己的代码

### 步骤 6：创建你的第一个查询脚本

在项目目录中创建一个新文件 `my-query.ts`：

```typescript
// 导入功能
import { createMLScoreFetcher } from './src/index';

// 创建一个异步函数（因为需要等待网络请求）
async function myFirstQuery() {
  console.log('开始查询...');
  
  // 1. 创建获取器
  const fetcher = createMLScoreFetcher();
  
  // 2. 准备地址
  const myAddress = '0x03fEb724F1a471861b1e353BEd14aFE3992dFBfd';
  
  // 3. 获取 ML Score
  const result = await fetcher.getMLScore(myAddress);
  
  // 4. 显示结果
  if (result.error) {
    console.log('出错了:', result.error);
  } else {
    console.log('成功!');
    console.log('ML Score:', result.mlScore);
  }
}

// 运行函数
myFirstQuery();
```

编译并运行：

```bash
# 编译
npx tsc my-query.ts

# 运行
node my-query.js
```

### 步骤 7：批量查询多个地址

创建 `my-bulk-query.ts`：

```typescript
import { createMLScoreFetcher } from './src/index';

async function myBulkQuery() {
  const fetcher = createMLScoreFetcher();
  
  // 准备一个地址列表
  const addresses = [
    '0x03fEb724F1a471861b1e353BEd14aFE3992dFBfd',
    '0xD020E01C0c90Ab005A01482d34B808874345FD82',
    // 在这里添加更多地址...
  ];
  
  console.log(`正在查询 ${addresses.length} 个地址...`);
  
  // 批量查询
  const result = await fetcher.getMLScoresBulk(addresses);
  
  // 显示结果
  console.log(`\n查询完成!`);
  console.log(`成功: ${result.successCount} 个`);
  console.log(`失败: ${result.failedCount} 个`);
  
  // 显示每个成功的结果
  result.success.forEach((account, index) => {
    console.log(`\n${index + 1}. ${account.username || account.address}`);
    console.log(`   ML Score: ${account.mlScore || '暂无'}`);
  });
}

myBulkQuery();
```

### 步骤 8：保存结果到文件

创建 `save-results.ts`：

```typescript
import { createMLScoreFetcher } from './src/index';
import * as fs from 'fs';

async function saveResults() {
  const fetcher = createMLScoreFetcher();
  
  const addresses = [
    '0x03fEb724F1a471861b1e353BEd14aFE3992dFBfd',
    '0xD020E01C0c90Ab005A01482d34B808874345FD82',
  ];
  
  // 查询
  const result = await fetcher.getMLScoresBulk(addresses);
  
  // 准备要保存的数据
  const dataToSave = {
    查询时间: new Date().toISOString(),
    总数: result.total,
    成功数: result.successCount,
    失败数: result.failedCount,
    结果: result.success.map(account => ({
      地址: account.address,
      用户名: account.username,
      ML评分: account.mlScore,
      名称: account.metadata?.name,
    })),
  };
  
  // 保存为 JSON 文件
  fs.writeFileSync(
    'ml-scores-result.json',
    JSON.stringify(dataToSave, null, 2),
    'utf-8'
  );
  
  console.log('结果已保存到 ml-scores-result.json');
}

saveResults();
```

运行：

```bash
npx ts-node save-results.ts
```

你会得到一个 `ml-scores-result.json` 文件，里面包含所有查询结果。

## 🎨 第五部分：高级用法

### 步骤 9：创建一个简单的 Web 服务

创建 `web-server.ts`：

```typescript
import { createMLScoreFetcher } from './src/index';
import * as http from 'http';
import * as url from 'url';

const fetcher = createMLScoreFetcher();

// 创建 HTTP 服务器
const server = http.createServer(async (req, res) => {
  // 解析 URL
  const parsedUrl = url.parse(req.url || '', true);
  
  // 设置响应头
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  
  // 处理 /ml-score 路径
  if (parsedUrl.pathname === '/ml-score') {
    const address = parsedUrl.query.address as string;
    
    if (!address) {
      res.writeHead(400);
      res.end(JSON.stringify({ error: '请提供 address 参数' }));
      return;
    }
    
    // 查询 ML Score
    const result = await fetcher.getMLScore(address);
    
    res.writeHead(200);
    res.end(JSON.stringify(result, null, 2));
  } else {
    res.writeHead(404);
    res.end(JSON.stringify({ error: '路径不存在' }));
  }
});

// 启动服务器
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`服务器运行在 http://localhost:${PORT}`);
  console.log(`访问示例: http://localhost:${PORT}/ml-score?address=0x03fEb724F1a471861b1e353BEd14aFE3992dFBfd`);
});
```

运行服务器：

```bash
npx ts-node web-server.ts
```

然后在浏览器中访问：
```
http://localhost:3000/ml-score?address=0x03fEb724F1a471861b1e353BEd14aFE3992dFBfd
```

## 🐛 第六部分：常见问题解决

### 问题 1：npm install 失败

**解决方案：**
```bash
# 清除缓存
npm cache clean --force

# 删除 node_modules 文件夹
rm -rf node_modules

# 重新安装
npm install
```

### 问题 2：编译失败

**解决方案：**
```bash
# 检查 TypeScript 版本
npx tsc --version

# 重新安装 TypeScript
npm install typescript --save-dev

# 重新编译
npm run build
```

### 问题 3：查询返回错误

**可能的原因：**
1. 地址格式不正确（必须是 0x 开头的 42 个字符）
2. 网络连接问题
3. API 暂时不可用

**调试方法：**
```typescript
const result = await fetcher.getMLScore(address);
if (result.error) {
  console.log('错误详情:', result.error);
  // 检查地址格式
  console.log('地址格式正确吗？', /^0x[a-fA-F0-9]{40}$/.test(address));
}
```

### 问题 4：找不到 ML Score

某些账户可能没有 ML Score，这是正常的。可以这样处理：

```typescript
const result = await fetcher.getMLScore(address);
if (result.mlScore === undefined) {
  console.log('该账户暂时没有 ML Score');
} else {
  console.log('ML Score:', result.mlScore);
}
```

## 📝 第七部分：实战练习

### 练习 1：查询你自己的地址

1. 获取你的以太坊钱包地址（MetaMask 等）
2. 修改示例代码中的地址
3. 运行查询

### 练习 2：批量查询并排序

编写代码，查询多个地址并按 ML Score 从高到低排序：

```typescript
async function sortByMLScore() {
  const fetcher = createMLScoreFetcher();
  const addresses = [/* 你的地址列表 */];
  
  const result = await fetcher.getMLScoresBulk(addresses);
  
  // 按 ML Score 排序
  const sorted = result.success.sort((a, b) => 
    (b.mlScore || 0) - (a.mlScore || 0)
  );
  
  console.log('排序结果:');
  sorted.forEach((account, index) => {
    console.log(`${index + 1}. ${account.username}: ${account.mlScore}`);
  });
}
```

### 练习 3：导出为 CSV

编写代码，将结果导出为 CSV 格式：

```typescript
import * as fs from 'fs';

async function exportToCSV() {
  const fetcher = createMLScoreFetcher();
  const addresses = [/* 地址列表 */];
  
  const result = await fetcher.getMLScoresBulk(addresses);
  
  // 创建 CSV 内容
  let csv = '地址,用户名,ML评分,名称\n';
  result.success.forEach(account => {
    csv += `${account.address},${account.username || ''},${account.mlScore || ''},${account.metadata?.name || ''}\n`;
  });
  
  // 保存文件
  fs.writeFileSync('ml-scores.csv', csv, 'utf-8');
  console.log('已导出到 ml-scores.csv');
}
```

## 🎓 总结

恭喜！你已经学会了：

1. ✅ 设置和配置项目
2. ✅ 理解代码结构
3. ✅ 运行示例代码
4. ✅ 编写自己的查询代码
5. ✅ 批量处理数据
6. ✅ 保存和导出结果
7. ✅ 创建简单的 Web 服务
8. ✅ 调试和解决问题

## 📚 下一步学习

- 深入学习 TypeScript
- 了解 GraphQL
- 学习 Lens Protocol 的其他 API
- 探索区块链和 Web3 开发

## 🆘 获取帮助

如果遇到问题：
1. 查看完整的 README.md
2. 检查示例代码 src/example.ts
3. 访问 Lens Protocol 官方文档
4. 提交 Issue 到项目仓库

祝你学习愉快！🎉
