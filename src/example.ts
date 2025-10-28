/**
 * 示例文件：如何使用 Lens ML Score Fetcher
 * 
 * 这个文件演示了如何使用本项目获取 Lens Protocol 账户的 ML Score
 */

import { createMLScoreFetcher } from './index';

/**
 * 示例 1：获取单个账户的 ML Score
 */
async function example1_GetSingleMLScore() {
  console.log('\n=== 示例 1: 获取单个账户的 ML Score ===\n');

  // 步骤 1: 创建 ML Score 获取器实例
  const fetcher = createMLScoreFetcher();

  // 步骤 2: 准备要查询的以太坊地址
  // 这里使用示例地址，你需要替换成实际的 Lens 账户地址
  const address = '0x03fEb724F1a471861b1e353BEd14aFE3992dFBfd';

  console.log(`正在查询地址: ${address}`);

  // 步骤 3: 调用 getMLScore 方法
  const result = await fetcher.getMLScore(address);

  // 步骤 4: 处理结果
  if (result.error) {
    console.error(`❌ 查询失败: ${result.error}`);
  } else {
    console.log('✅ 查询成功!');
    console.log(`地址: ${result.address}`);
    console.log(`用户名: ${result.username || '未设置'}`);
    console.log(`ML Score: ${result.mlScore !== undefined ? result.mlScore : '暂无评分'}`);
    
    if (result.metadata) {
      console.log('\n账户元数据:');
      console.log(`  名称: ${result.metadata.name || '未设置'}`);
      console.log(`  简介: ${result.metadata.bio || '未设置'}`);
      console.log(`  头像: ${result.metadata.picture || '未设置'}`);
    }
  }
}

/**
 * 示例 2：批量获取多个账户的 ML Score
 */
async function example2_GetBulkMLScores() {
  console.log('\n=== 示例 2: 批量获取多个账户的 ML Score ===\n');

  // 步骤 1: 创建获取器实例
  const fetcher = createMLScoreFetcher();

  // 步骤 2: 准备要查询的地址列表
  const addresses = [
    '0x03fEb724F1a471861b1e353BEd14aFE3992dFBfd',
    '0xD020E01C0c90Ab005A01482d34B808874345FD82',
    '0x1234567890123456789012345678901234567890', // 无效地址示例
  ];

  console.log(`正在批量查询 ${addresses.length} 个地址...`);

  // 步骤 3: 调用批量查询方法
  const result = await fetcher.getMLScoresBulk(addresses);

  // 步骤 4: 处理批量结果
  console.log(`\n查询完成！`);
  console.log(`总计: ${result.total} 个地址`);
  console.log(`成功: ${result.successCount} 个`);
  console.log(`失败: ${result.failedCount} 个`);

  // 显示成功的结果
  if (result.success.length > 0) {
    console.log('\n✅ 成功查询的账户:');
    result.success.forEach((account, index) => {
      console.log(`\n${index + 1}. ${account.address}`);
      console.log(`   用户名: ${account.username || '未设置'}`);
      console.log(`   ML Score: ${account.mlScore !== undefined ? account.mlScore : '暂无评分'}`);
      if (account.metadata?.name) {
        console.log(`   名称: ${account.metadata.name}`);
      }
    });
  }

  // 显示失败的结果
  if (result.failed.length > 0) {
    console.log('\n❌ 查询失败的地址:');
    result.failed.forEach((failure, index) => {
      console.log(`\n${index + 1}. ${failure.address}`);
      console.log(`   错误: ${failure.error}`);
    });
  }
}

/**
 * 示例 3：通过用户名获取 ML Score
 */
async function example3_GetMLScoreByUsername() {
  console.log('\n=== 示例 3: 通过用户名获取 ML Score ===\n');

  // 步骤 1: 创建获取器实例
  const fetcher = createMLScoreFetcher();

  // 步骤 2: 准备 Lens 用户名
  // 格式通常是 'username.lens' 或 'username'
  const username = 'stani.lens';

  console.log(`正在查询用户名: ${username}`);

  // 步骤 3: 调用通过用户名查询的方法
  const result = await fetcher.getMLScoreByUsername(username);

  // 步骤 4: 处理结果
  if (result.error) {
    console.error(`❌ 查询失败: ${result.error}`);
  } else {
    console.log('✅ 查询成功!');
    console.log(`地址: ${result.address}`);
    console.log(`用户名: ${result.username}`);
    console.log(`ML Score: ${result.mlScore !== undefined ? result.mlScore : '暂无评分'}`);
  }
}

/**
 * 示例 4：使用测试网
 */
async function example4_UseTestnet() {
  console.log('\n=== 示例 4: 使用测试网 ===\n');

  // 步骤 1: 创建获取器实例
  const fetcher = createMLScoreFetcher();

  // 步骤 2: 切换到测试网
  fetcher.useTestnet();
  console.log(`当前端点: ${fetcher.getEndpoint()}`);

  // 步骤 3: 使用测试网地址进行查询
  const testAddress = '0x03fEb724F1a471861b1e353BEd14aFE3992dFBfd';
  const result = await fetcher.getMLScore(testAddress);

  if (result.error) {
    console.error(`❌ 查询失败: ${result.error}`);
  } else {
    console.log('✅ 测试网查询成功!');
    console.log(`ML Score: ${result.mlScore !== undefined ? result.mlScore : '暂无评分'}`);
  }

  // 步骤 4: 切换回主网
  fetcher.useMainnet();
  console.log(`切换回主网: ${fetcher.getEndpoint()}`);
}

/**
 * 示例 5：错误处理示范
 */
async function example5_ErrorHandling() {
  console.log('\n=== 示例 5: 错误处理示范 ===\n');

  const fetcher = createMLScoreFetcher();

  // 测试无效地址
  console.log('1. 测试无效地址格式:');
  const invalidAddress = 'invalid-address';
  const result1 = await fetcher.getMLScore(invalidAddress);
  console.log(`结果: ${result1.error}\n`);

  // 测试不存在的地址
  console.log('2. 测试可能不存在的地址:');
  const nonExistentAddress = '0x0000000000000000000000000000000000000000';
  const result2 = await fetcher.getMLScore(nonExistentAddress);
  if (result2.error) {
    console.log(`结果: ${result2.error}`);
  } else {
    console.log('地址存在但可能没有 Lens 账户');
  }
}

/**
 * 主函数：运行所有示例
 */
async function main() {
  console.log('╔════════════════════════════════════════════════════════════╗');
  console.log('║   Lens Protocol ML Score Fetcher - 使用示例               ║');
  console.log('╚════════════════════════════════════════════════════════════╝');

  try {
    // 运行示例 1
    await example1_GetSingleMLScore();

    // 运行示例 2
    await example2_GetBulkMLScores();

    // 运行示例 3
    await example3_GetMLScoreByUsername();

    // 运行示例 4
    await example4_UseTestnet();

    // 运行示例 5
    await example5_ErrorHandling();

    console.log('\n✅ 所有示例运行完成！');
  } catch (error) {
    console.error('\n❌ 运行示例时出错:', error);
  }
}

// 如果直接运行此文件，执行示例
if (require.main === module) {
  main().catch(console.error);
}

// 导出示例函数供其他地方使用
export {
  example1_GetSingleMLScore,
  example2_GetBulkMLScores,
  example3_GetMLScoreByUsername,
  example4_UseTestnet,
  example5_ErrorHandling,
};
