# 🚀 快速开始指南

## 欢迎！

这是一个**从零开始的傻瓜式教程**，教你如何使用本项目获取 Lens Protocol 用户的 ML Score（机器学习评分）。

> **什么是 ML Score？**  
> ML Score 是 Lens Protocol 用来评估账户质量的分数，范围是 0-100 分。分数越高，说明账户越活跃、越真实。

---

## 📋 前提条件

在开始之前，你需要：

1. ✅ 一台电脑（Windows、Mac 或 Linux 都可以）
2. ✅ 安装了 Node.js（[点击这里下载](https://nodejs.org/)）
3. ✅ 一个终端/命令行工具

---

## 🎯 三步走战略

### 步骤 1️⃣：获取代码

如果你还没有代码，可以通过以下方式获取：

```bash
# 克隆仓库（如果你有Git）
git clone https://github.com/lanexio/lens_test_lanexio.git
cd lens_test_lanexio

# 或者直接下载ZIP文件，然后解压
# 进入解压后的目录
```

### 步骤 2️⃣：安装依赖

打开终端，进入项目目录，运行：

```bash
npm install
```

**这一步会做什么？**
- 下载项目所需的所有库和工具
- 大约需要 1-2 分钟
- 看到 "added XX packages" 就说明成功了

### 步骤 3️⃣：运行演示

```bash
npm run demo
```

**你会看到：**
- ✅ 三个用户的 ML Score 查询结果
- ✅ 批量查询演示
- ✅ 数据分析示例（排名、平均分等）

**恭喜！** 🎉 你已经成功运行了第一个示例！

---

## 🎓 进阶学习

### 查询你想要的用户

创建一个新文件 `my-first-query.js`：

```javascript
import { fetchMLScores } from './src/index.js';

// 替换成你想查询的用户
const users = [
  'lens/stani',
  'lens/lensprotocol',
];

// 获取ML Scores
const results = await fetchMLScores(users);

// 打印结果
console.log('查询结果：');
results.forEach(user => {
  if (user.success) {
    console.log(`${user.username}: ${user.mlScore} 分`);
  }
});
```

运行它：

```bash
node my-first-query.js
```

---

## 📊 数据格式说明

每个用户的数据包含：

```javascript
{
  "success": true,           // 是否查询成功
  "address": "0x...",        // 以太坊地址
  "username": "stani",       // 用户名
  "name": "Stani Kulechov",  // 显示名称
  "bio": "...",              // 简介
  "mlScore": 99.2,           // ML评分 ⭐
  "accountData": {
    "createdAt": "...",      // 创建时间
    "operations": {...}      // 其他信息
  }
}
```

---

## 🔥 常用示例

### 示例 1：查询单个用户

```javascript
import { fetchMLScores } from './src/index.js';

const results = await fetchMLScores(['lens/stani']);
console.log(results[0].mlScore);
```

### 示例 2：批量查询（推荐）

```javascript
import { fetchMLScoresBulk } from './src/index.js';

const addresses = [
  '0x01d79BcEaEaaDfb8fD2F2f53005289CFcF483464',
  '0x7241DDDec3A6aF367882eAF9651b87E1C7549Dff',
];

const results = await fetchMLScoresBulk(addresses);
```

### 示例 3：搜索用户

```javascript
import { searchAccountsWithMLScore } from './src/index.js';

// 搜索关键词 "lens"，返回前10个结果
const results = await searchAccountsWithMLScore('lens', 10);
```

### 示例 4：数据分析

```javascript
import { fetchMLScores } from './src/index.js';

const users = ['lens/stani', 'lens/lensprotocol', 'lens/yoginth'];
const results = await fetchMLScores(users);

// 计算平均分
const scores = results
  .filter(r => r.success && r.mlScore)
  .map(r => r.mlScore);
  
const average = scores.reduce((a, b) => a + b, 0) / scores.length;
console.log(`平均 ML Score: ${average.toFixed(2)}`);

// 找出最高分
const maxScore = Math.max(...scores);
const topUser = results.find(r => r.mlScore === maxScore);
console.log(`最高分用户: ${topUser.username} (${topUser.mlScore})`);
```

---

## 💡 小贴士

### 关于用户名格式

Lens Protocol V3 的用户名格式是 `namespace/localname`，例如：
- ✅ `lens/stani` （正确）
- ❌ `stani` （错误，会查询失败）

### 关于地址

以太坊地址应该是完整的 42 字符（包括 0x 前缀），例如：
- ✅ `0x01d79BcEaEaaDfb8fD2F2f53005289CFcF483464`
- ❌ `0x01d79...3464`（不完整）

### 网络要求

- 运行 `npm run demo` **不需要**网络连接（使用模拟数据）
- 运行 `npm run example` **需要**访问 `https://api.lens.xyz`

---

## 🆘 遇到问题？

### 问题：npm install 失败

**解决方案：**
```bash
# 清除缓存重试
npm cache clean --force
npm install
```

### 问题：找不到模块

**解决方案：**
```bash
# 确保在正确的目录
pwd

# 重新安装依赖
rm -rf node_modules package-lock.json
npm install
```

### 问题：API 查询失败

**解决方案：**
1. 先运行 `npm run demo` 确认代码没问题
2. 检查网络连接
3. 确认能否访问 https://api.lens.xyz

---

## 📚 更多资源

- **完整教程：** 查看 [TUTORIAL.md](TUTORIAL.md)
- **详细文档：** 查看 [README.md](README.md)
- **Lens 官方文档：** https://lens.xyz/docs
- **问题反馈：** 在 GitHub 上提 Issue

---

## 🎉 成功案例

如果你成功运行了示例，你应该看到类似这样的输出：

```
✅ 成功获取用户信息
   地址: 0x7241DDDec3A6aF367882eAF9651b87E1C7549Dff
   用户名: stani
   名称: Stani Kulechov
   🎯 ML Score: 99.2
```

**太棒了！** 你已经掌握了 Lens Protocol ML Score 的获取方法！🎊

---

## 🚀 下一步

现在你可以：

1. 修改示例代码，查询你感兴趣的用户
2. 创建自己的数据分析脚本
3. 将这个功能集成到你的项目中
4. 探索更多 Lens Protocol 的功能

**祝你编码愉快！** 💻✨
