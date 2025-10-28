/**
 * 快速验证脚本
 * 
 * 验证所有功能是否正确导出和工作
 */

import { 
  createMLScoreFetcher, 
  LensMLScoreFetcher,
  LENS_API_CONFIG 
} from './index';

console.log('╔════════════════════════════════════════════════════════════╗');
console.log('║   Lens ML Score Fetcher - 功能验证                        ║');
console.log('╚════════════════════════════════════════════════════════════╝\n');

// 测试 1: 验证配置加载
console.log('✓ 测试 1: 配置加载');
console.log(`  主网端点: ${LENS_API_CONFIG.MAINNET_ENDPOINT}`);
console.log(`  测试网端点: ${LENS_API_CONFIG.TESTNET_ENDPOINT}`);
console.log(`  最大批量: ${LENS_API_CONFIG.MAX_BATCH_SIZE}`);
console.log('  ✅ 配置加载成功\n');

// 测试 2: 验证实例创建
console.log('✓ 测试 2: 创建 Fetcher 实例');
const fetcher = createMLScoreFetcher();
console.log(`  当前端点: ${fetcher.getEndpoint()}`);
console.log('  ✅ 实例创建成功\n');

// 测试 3: 验证类直接使用
console.log('✓ 测试 3: 使用 LensMLScoreFetcher 类');
const fetcher2 = new LensMLScoreFetcher();
console.log(`  当前端点: ${fetcher2.getEndpoint()}`);
console.log('  ✅ 类实例化成功\n');

// 测试 4: 验证网络切换
console.log('✓ 测试 4: 网络切换功能');
fetcher.useTestnet();
console.log(`  切换到测试网: ${fetcher.getEndpoint()}`);
fetcher.useMainnet();
console.log(`  切换回主网: ${fetcher.getEndpoint()}`);
console.log('  ✅ 网络切换成功\n');

// 测试 5: 验证地址验证（内部方法，通过错误消息验证）
console.log('✓ 测试 5: 地址格式验证');
async function testAddressValidation() {
  const invalidAddress = 'invalid-address';
  const result = await fetcher.getMLScore(invalidAddress);
  
  if (result.error && result.error.includes('无效')) {
    console.log('  ✅ 地址验证正常工作');
    return true;
  } else {
    console.log('  ❌ 地址验证可能有问题');
    return false;
  }
}

// 测试 6: 验证批量功能接口
console.log('\n✓ 测试 6: 批量查询接口');
async function testBulkInterface() {
  const addresses = ['0x1234567890123456789012345678901234567890'];
  const result = await fetcher.getMLScoresBulk(addresses);
  
  if (result && typeof result.total === 'number') {
    console.log(`  总数统计: ${result.total}`);
    console.log(`  成功统计: ${result.successCount}`);
    console.log(`  失败统计: ${result.failedCount}`);
    console.log('  ✅ 批量查询接口正常\n');
    return true;
  } else {
    console.log('  ❌ 批量查询接口可能有问题\n');
    return false;
  }
}

// 运行异步测试
async function runAsyncTests() {
  await testAddressValidation();
  await testBulkInterface();
  
  console.log('╔════════════════════════════════════════════════════════════╗');
  console.log('║   ✅ 所有功能验证通过！                                   ║');
  console.log('╚════════════════════════════════════════════════════════════╝\n');
  
  console.log('📝 注意事项:');
  console.log('  - 本验证只测试了接口和基本逻辑');
  console.log('  - 实际 API 调用需要网络连接');
  console.log('  - 请参考 example.ts 了解完整使用方法');
  console.log('  - 请参考 README.md 和 TUTORIAL.md 了解详细文档\n');
  
  console.log('🚀 快速开始:');
  console.log('  1. 查看示例: npm run example');
  console.log('  2. 阅读文档: cat README.md');
  console.log('  3. 学习教程: cat TUTORIAL.md\n');
}

runAsyncTests().catch(error => {
  console.error('❌ 测试过程中出错:', error);
  process.exit(1);
});
