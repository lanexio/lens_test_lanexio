# 快速开始指南 - 5分钟上手

> 🚀 这是一个超级简单的入门指南，让你在5分钟内学会获取 Lens Protocol 用户的 ML Score！

## 第一步：准备环境 ⚙️

### 1.1 检查 Node.js

打开命令行（终端），输入：

```bash
node --version
```

如果看到类似 `v16.0.0` 或更高的版本号，说明已安装 ✅

如果没有安装，请访问 https://nodejs.org/ 下载并安装。

---

## 第二步：获取代码 📥

### 2.1 下载项目

```bash
# 克隆项目（如果你有 git）
git clone https://github.com/lanexio/lens_test_lanexio.git

# 进入项目目录
cd lens_test_lanexio
```

或者直接从 GitHub 下载 ZIP 文件并解压。

---

## 第三步：安装依赖 📦

在项目目录中运行：

```bash
npm install
```

等待安装完成（可能需要1-2分钟）。

---

## 第四步：运行示例 🎯

### 4.1 快速运行

```bash
npm run dev
```

这将运行所有示例，展示如何：
- 获取单个用户的 ML Score
- 批量获取多个用户的 ML Score
- 获取账户完整信息
- 处理无效地址
- 使用测试网 API

### 4.2 编译后运行

```bash
# 先编译
npm run build

# 再运行
npm start
```

---

## 第五步：编写你自己的代码 💻

### 5.1 创建一个新文件

在项目根目录创建 `my-test.ts` 文件：

```typescript
import { createFetcher } from './src/index';

async function main() {
  // 创建 fetcher
  const fetcher = createFetcher();

  // 替换成你想查询的地址
  const myAddress = '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045';

  // 获取 ML Score
  const result = await fetcher.fetchMLScore(myAddress);

  // 显示结果
  console.log('地址:', result.address);
  console.log('用户名:', result.username || '(无)');
  console.log('ML Score:', result.mlScore);

  if (result.error) {
    console.log('错误:', result.error);
  }
}

main();
```

### 5.2 运行你的代码

```bash
npx ts-node my-test.ts
```

---

## 常见使用场景 🎨

### 场景1：查询单个用户

```typescript
import { createFetcher } from './src/index';

const fetcher = createFetcher();
const result = await fetcher.fetchMLScore('0x你的地址');
console.log('ML Score:', result.mlScore);
```

### 场景2：批量查询

```typescript
import { createFetcher } from './src/index';

const fetcher = createFetcher();
const addresses = [
  '0x地址1',
  '0x地址2',
  '0x地址3',
];

const result = await fetcher.fetchMLScoresBatch(addresses);
result.results.forEach(r => {
  console.log(`${r.address}: ${r.mlScore}`);
});
```

### 场景3：获取完整账户信息

```typescript
import { createFetcher } from './src/index';

const fetcher = createFetcher();
const account = await fetcher.fetchAccountInfo('0x你的地址');

if (account) {
  console.log('用户名:', account.username?.value);
  console.log('名称:', account.metadata?.name);
  console.log('简介:', account.metadata?.bio);
  console.log('ML Score:', account.mlScore);
}
```

---

## 理解 ML Score 📊

**ML Score 是什么？**
- 一个 0 到 1 之间的数字
- 表示账户的质量和可信度
- 由 Lens Protocol 的机器学习算法计算

**分数含义：**
- 0.8 - 1.0: 高质量账户 🌟
- 0.5 - 0.8: 中等质量账户 ⭐
- 0.0 - 0.5: 新账户或低活跃度 ⚡
- null: 未设置或暂无数据 ❓

---

## 获取帮助 💡

### 查看详细文档

```bash
# 查看完整教程（中文）
cat README_TUTORIAL.md

# 查看项目说明
cat README.md
```

### 在线资源

- Lens Protocol 文档: https://docs.lens.xyz/
- Lens API 文档: https://docs.api.lens.org/
- 项目仓库: https://github.com/lanexio/lens_test_lanexio

---

## 故障排除 🔧

### 问题：npm install 失败

**解决：**
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### 问题：运行时报错找不到模块

**解决：**
```bash
npm run build
```

### 问题：API 请求失败

**可能原因：**
- 网络问题
- 地址格式不正确
- API 服务暂时不可用

**检查：**
1. 确认地址格式正确（0x开头，42个字符）
2. 检查网络连接
3. 稍后重试

---

## 下一步 🎓

1. ✅ 阅读完整教程：`README_TUTORIAL.md`
2. ✅ 查看示例代码：`src/example.ts`
3. ✅ 探索 API 文档：了解更多功能
4. ✅ 将功能集成到你的项目中

---

**恭喜！你已经学会了如何获取 Lens Protocol 用户的 ML Score！** 🎉

有问题？欢迎在 GitHub 上提出 issue！
