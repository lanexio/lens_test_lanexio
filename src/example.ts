/**
 * Lens Protocol ML Score 获取示例
 * 
 * 这个文件演示了如何使用 LensMLScoreFetcher 获取用户的 ML Score
 */

import { LensMLScoreFetcher, createFetcher } from './index';

/**
 * 示例 1: 获取单个用户的 ML Score
 */
async function example1_fetchSingleMLScore() {
  console.log('\n=== 示例 1: 获取单个用户的 ML Score ===\n');

  // 创建 fetcher 实例
  const fetcher = createFetcher();

  // 示例地址（这是一个示例地址，实际使用时需要替换为真实的 Lens 账户地址）
  const address = '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045';

  console.log(`正在获取地址 ${address} 的 ML Score...`);

  // 获取 ML Score
  const result = await fetcher.fetchMLScore(address);

  // 显示结果
  if (result.error) {
    console.error(`❌ 获取失败: ${result.error}`);
  } else {
    console.log(`✅ 获取成功!`);
    console.log(`   地址: ${result.address}`);
    console.log(`   用户名: ${result.username || '(无)'}`);
    console.log(`   ML Score: ${result.mlScore !== null ? result.mlScore : '(未设置)'}`);
  }
}

/**
 * 示例 2: 批量获取多个用户的 ML Score
 */
async function example2_fetchBatchMLScores() {
  console.log('\n=== 示例 2: 批量获取多个用户的 ML Score ===\n');

  // 创建 fetcher 实例
  const fetcher = new LensMLScoreFetcher();

  // 示例地址列表（实际使用时需要替换为真实的 Lens 账户地址）
  const addresses = [
    '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
    '0x03Ba34f6Ea1496fa316873CF8350A3f7eaD317EF',
    '0x01d79BcEaEaaDfb8fD2F2f53005289CFcF483464',
  ];

  console.log(`正在批量获取 ${addresses.length} 个地址的 ML Score...`);

  // 批量获取 ML Score
  const batchResult = await fetcher.fetchMLScoresBatch(addresses);

  // 显示结果
  console.log(`\n批量获取${batchResult.success ? '成功' : '部分失败'}\n`);

  if (batchResult.errors.length > 0) {
    console.log('⚠️  错误列表:');
    batchResult.errors.forEach(error => {
      console.log(`   - ${error}`);
    });
    console.log();
  }

  console.log('📊 结果列表:');
  batchResult.results.forEach((result, index) => {
    console.log(`\n   ${index + 1}. 地址: ${result.address}`);
    console.log(`      用户名: ${result.username || '(无)'}`);
    console.log(`      ML Score: ${result.mlScore !== null ? result.mlScore : '(未设置)'}`);
    if (result.error) {
      console.log(`      错误: ${result.error}`);
    }
  });
}

/**
 * 示例 3: 获取账户的完整信息
 */
async function example3_fetchFullAccountInfo() {
  console.log('\n=== 示例 3: 获取账户的完整信息 ===\n');

  const fetcher = createFetcher();

  // 示例地址
  const address = '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045';

  console.log(`正在获取地址 ${address} 的完整信息...`);

  // 获取完整账户信息
  const account = await fetcher.fetchAccountInfo(address);

  // 显示结果
  if (!account) {
    console.error('❌ 获取失败或账户不存在');
  } else {
    console.log(`✅ 获取成功!\n`);
    console.log(`   地址: ${account.address}`);
    console.log(`   用户名: ${account.username?.value || '(无)'}`);
    console.log(`   命名空间: ${account.username?.namespace || '(无)'}`);
    console.log(`   名称: ${account.metadata?.name || '(无)'}`);
    console.log(`   简介: ${account.metadata?.bio || '(无)'}`);
    console.log(`   头像: ${account.metadata?.picture || '(无)'}`);
    console.log(`   ML Score: ${account.mlScore !== null ? account.mlScore : '(未设置)'}`);
  }
}

/**
 * 示例 4: 处理无效地址
 */
async function example4_handleInvalidAddresses() {
  console.log('\n=== 示例 4: 处理无效地址 ===\n');

  const fetcher = createFetcher();

  // 包含有效和无效地址的混合列表
  const addresses = [
    '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045', // 有效
    'invalid-address',                              // 无效
    '0x123',                                         // 无效（太短）
    '0x03Ba34f6Ea1496fa316873CF8350A3f7eaD317EF', // 有效
  ];

  console.log('正在处理包含无效地址的列表...');

  const batchResult = await fetcher.fetchMLScoresBatch(addresses);

  console.log(`\n处理结果: ${batchResult.success ? '全部成功' : '存在错误'}\n`);

  batchResult.results.forEach((result, index) => {
    console.log(`${index + 1}. ${result.address}`);
    if (result.error) {
      console.log(`   ❌ 错误: ${result.error}`);
    } else {
      console.log(`   ✅ ML Score: ${result.mlScore !== null ? result.mlScore : '(未设置)'}`);
    }
  });
}

/**
 * 示例 5: 自定义 API 端点（使用测试网）
 */
async function example5_customEndpoint() {
  console.log('\n=== 示例 5: 使用测试网 API ===\n');

  // 使用测试网 API 端点创建 fetcher
  const fetcher = new LensMLScoreFetcher('https://api-v2-amoy.lens.dev');

  const address = '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045';

  console.log(`使用测试网 API 获取地址 ${address} 的 ML Score...`);

  const result = await fetcher.fetchMLScore(address);

  if (result.error) {
    console.error(`❌ 获取失败: ${result.error}`);
  } else {
    console.log(`✅ 获取成功!`);
    console.log(`   ML Score: ${result.mlScore !== null ? result.mlScore : '(未设置)'}`);
  }
}

/**
 * 主函数 - 运行所有示例
 */
async function main() {
  console.log('╔════════════════════════════════════════════════════════╗');
  console.log('║     Lens Protocol ML Score 获取工具 - 使用示例       ║');
  console.log('╚════════════════════════════════════════════════════════╝');

  try {
    // 运行所有示例
    await example1_fetchSingleMLScore();
    await example2_fetchBatchMLScores();
    await example3_fetchFullAccountInfo();
    await example4_handleInvalidAddresses();
    await example5_customEndpoint();

    console.log('\n' + '='.repeat(60));
    console.log('✅ 所有示例运行完成!');
    console.log('='.repeat(60) + '\n');
  } catch (error) {
    console.error('\n❌ 运行示例时出错:', error);
    process.exit(1);
  }
}

// 运行主函数
if (require.main === module) {
  main().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}

export {
  example1_fetchSingleMLScore,
  example2_fetchBatchMLScores,
  example3_fetchFullAccountInfo,
  example4_handleInvalidAddresses,
  example5_customEndpoint,
};
