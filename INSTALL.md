# 📋 完整安装和使用指南 / Complete Installation and Usage Guide

## 目录 / Table of Contents

1. [环境要求](#环境要求--environment-requirements)
2. [安装步骤](#安装步骤--installation-steps)
3. [快速开始](#快速开始--quick-start)
4. [使用方法](#使用方法--usage-methods)
5. [验证安装](#验证安装--verify-installation)

---

## 环境要求 / Environment Requirements

在开始之前，请确保你的系统已安装：

Before starting, make sure your system has:

- **Node.js** 版本 18.0.0 或更高 / version 18.0.0 or higher
- **npm** 版本 9.0.0 或更高 / version 9.0.0 or higher

### 检查环境 / Check Environment

打开终端/命令行，运行以下命令：

Open terminal/command prompt and run:

```bash
node --version
npm --version
```

如果显示版本号，说明已安装成功。如果未安装，请参考下面的安装说明。

If version numbers are displayed, installation is successful. If not, see installation instructions below.

### 安装 Node.js（如需要）/ Install Node.js (if needed)

#### Windows:
1. 访问 https://nodejs.org/
2. 下载 LTS（长期支持）版本
3. 运行安装程序
4. 重启终端

#### macOS:
```bash
# 使用 Homebrew
brew install node

# 或者从官网下载安装包
# Or download installer from nodejs.org
```

#### Linux:
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install nodejs npm

# CentOS/RHEL
sudo yum install nodejs npm
```

---

## 安装步骤 / Installation Steps

### 步骤 1: 获取项目 / Step 1: Get the Project

有两种方式：

Two options:

**选项 A: 使用 Git 克隆 / Option A: Clone with Git**

```bash
git clone https://github.com/lanexio/lens_test_lanexio.git
cd lens_test_lanexio
```

**选项 B: 下载 ZIP / Option B: Download ZIP**

1. 访问 https://github.com/lanexio/lens_test_lanexio
2. 点击绿色 "Code" 按钮
3. 选择 "Download ZIP"
4. 解压文件
5. 在终端中进入解压后的目录

### 步骤 2: 安装依赖 / Step 2: Install Dependencies

在项目目录中运行：

In the project directory, run:

```bash
npm install
```

这将安装所有必需的包：
- graphql
- graphql-request
- typescript
- 以及其他开发依赖

This will install all required packages:
- graphql
- graphql-request
- typescript
- and other dev dependencies

### 步骤 3: 编译项目 / Step 3: Build Project

```bash
npm run build
```

编译成功后，会在 `dist/` 目录生成编译后的 JavaScript 文件。

After successful compilation, compiled JavaScript files will be generated in the `dist/` directory.

---

## 快速开始 / Quick Start

### 第一次运行 / First Run

#### 运行演示程序（推荐）/ Run Demo (Recommended)

```bash
npm run demo
```

这会运行使用模拟数据的演示，展示所有功能和输出格式。

This runs a demo with mock data, showcasing all features and output formats.

#### 运行真实示例 / Run Real Examples

```bash
npm run example
```

这会尝试调用真实的 Lens Protocol API。

This attempts to call the real Lens Protocol API.

---

## 使用方法 / Usage Methods

### 方法 1: 修改现有示例 / Method 1: Modify Existing Examples

#### 1.1 编辑示例文件

用你喜欢的编辑器打开 `src/example.ts`：

Open `src/example.ts` with your preferred editor:

```bash
# 使用 VS Code
code src/example.ts

# 或者使用 vim
vim src/example.ts

# 或者使用记事本（Windows）
notepad src/example.ts
```

#### 1.2 找到自定义地址部分

在文件中找到 `example4_customAddresses` 函数，修改这部分：

Find the `example4_customAddresses` function and modify:

```typescript
const customAddresses: string[] = [
  '0x你的第一个地址',
  '0x你的第二个地址',
  // 添加更多地址...
];
```

#### 1.3 重新构建并运行

```bash
npm run build
npm run example
```

### 方法 2: 创建新脚本 / Method 2: Create New Script

#### 2.1 创建新文件

在项目根目录创建 `my-script.ts`：

Create `my-script.ts` in project root:

```typescript
import { LensMLScoreClient } from './src/client.js';

async function main() {
  const client = new LensMLScoreClient();
  
  // 替换为你的地址 / Replace with your addresses
  const addresses = [
    '0x03Ba3E3B95e3f6844446C400769e978F65A88F42',
  ];
  
  try {
    const accounts = await client.getAccountsMLScores(addresses);
    console.log(LensMLScoreClient.formatAccountsList(accounts));
  } catch (error) {
    console.error('Error:', error);
  }
}

main();
```

#### 2.2 运行你的脚本

```bash
npx ts-node my-script.ts
```

### 方法 3: 集成到你的项目 / Method 3: Integrate into Your Project

如果你想在自己的项目中使用：

If you want to use in your own project:

```bash
# 在你的项目中安装依赖
npm install graphql graphql-request

# 复制源文件到你的项目
cp -r src/* your-project/src/lens/

# 然后在代码中导入使用
```

---

## 验证安装 / Verify Installation

### 检查清单 / Checklist

运行以下命令验证安装：

Run these commands to verify installation:

```bash
# 1. 检查 Node.js 版本
node --version
# 应该显示 v18.0.0 或更高 / Should show v18.0.0 or higher

# 2. 检查项目依赖
npm list --depth=0
# 应该看到 graphql, graphql-request, typescript 等

# 3. 检查编译
npm run build
# 应该成功完成，无错误 / Should complete successfully with no errors

# 4. 检查 dist 目录
ls -la dist/
# 应该看到编译后的 .js 文件 / Should see compiled .js files

# 5. 运行演示
npm run demo
# 应该看到完整的输出 / Should see complete output
```

### 预期输出 / Expected Output

运行 `npm run demo` 后，你应该看到：

After running `npm run demo`, you should see:

```
╔═══════════════════════════════════════════════════════════════════╗
║       🎬 Lens Protocol ML Score 演示模式                          ║
║          Demo Mode with Mock Data                                 ║
╚═══════════════════════════════════════════════════════════════════╝

[... 更多输出 ...]

✅ 演示完成！
✅ Demo completed!
```

---

## 常见安装问题 / Common Installation Issues

### 问题 1: "npm install" 失败

**症状:** npm install 报错

**解决方案:**

```bash
# 清除 npm 缓存
npm cache clean --force

# 删除旧的安装
rm -rf node_modules package-lock.json

# 重新安装
npm install
```

### 问题 2: "npm run build" 失败

**症状:** TypeScript 编译错误

**解决方案:**

```bash
# 确保 TypeScript 版本正确
npm install -D typescript@latest

# 重新编译
npm run build
```

### 问题 3: "找不到模块" 错误

**症状:** 运行时提示找不到某个模块

**解决方案:**

```bash
# 确保所有依赖都已安装
npm install

# 确保已经编译
npm run build

# 检查 dist 目录是否存在
ls -la dist/
```

### 问题 4: 权限错误（Linux/Mac）

**症状:** 权限被拒绝

**解决方案:**

```bash
# 不要使用 sudo npm install
# 而是修复 npm 权限
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
export PATH=~/.npm-global/bin:$PATH

# 然后重新安装
npm install
```

---

## 下一步 / Next Steps

安装完成后，你可以：

After installation, you can:

1. **查看完整教程** / **See full tutorial**
   - [TUTORIAL.md](./TUTORIAL.md) - 详细的英文教程
   - [README_CN.md](./README_CN.md) - 完整的中文教程

2. **快速开始** / **Quick start**
   - [QUICKSTART.md](./QUICKSTART.md) - 3步快速开始

3. **探索示例代码** / **Explore examples**
   - `src/example.ts` - 真实API调用示例
   - `src/demo.ts` - 演示模式示例

4. **开始编码** / **Start coding**
   - 修改 `src/example.ts` 添加你的地址
   - 或创建自己的脚本

---

## 获取帮助 / Get Help

如果遇到问题：

If you encounter issues:

1. 查看文档 / Check documentation:
   - README.md
   - README_CN.md
   - TUTORIAL.md
   - QUICKSTART.md

2. 检查常见问题 / Check FAQ:
   - TUTORIAL.md 中的 FAQ 部分
   - README_CN.md 中的常见问题

3. 提交问题 / Submit issue:
   - GitHub Issues: https://github.com/lanexio/lens_test_lanexio/issues

4. 查看官方文档 / Check official docs:
   - Lens Protocol: https://lens.xyz/docs

---

**祝你使用愉快！** 🎉  
**Happy coding!** 🚀
