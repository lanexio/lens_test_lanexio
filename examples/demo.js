/**
 * 演示脚本：使用模拟数据展示ML Score获取功能
 * Demo script: Show ML Score fetching with mock data
 * 
 * 注意：由于网络限制，此脚本使用模拟数据进行演示
 * Note: This script uses mock data due to network restrictions
 */

// 模拟的ML Score数据
const mockMLScoreData = {
  'lens/lensprotocol': {
    address: '0x01d79BcEaEaaDfb8fD2F2f53005289CFcF483464',
    username: 'lensprotocol',
    name: 'Lens Protocol',
    bio: 'The social network built on blockchain.',
    mlScore: 98.5,
    createdAt: '2022-05-18T00:00:00.000Z',
  },
  'lens/stani': {
    address: '0x7241DDDec3A6aF367882eAF9651b87E1C7549Dff',
    username: 'stani',
    name: 'Stani Kulechov',
    bio: 'Founder of Aave and Lens Protocol',
    mlScore: 99.2,
    createdAt: '2022-05-18T00:00:00.000Z',
  },
  'lens/yoginth': {
    address: '0x03Ba35129AB798D7a90088BC6716bAe0A5b618c4',
    username: 'yoginth',
    name: 'Yoginth',
    bio: 'Building cool stuff on Lens',
    mlScore: 95.8,
    createdAt: '2022-06-01T00:00:00.000Z',
  },
  '0x01d79BcEaEaaDfb8fD2F2f53005289CFcF483464': {
    address: '0x01d79BcEaEaaDfb8fD2F2f53005289CFcF483464',
    username: 'lensprotocol',
    name: 'Lens Protocol',
    bio: 'The social network built on blockchain.',
    mlScore: 98.5,
    createdAt: '2022-05-18T00:00:00.000Z',
  },
  '0x7241DDDec3A6aF367882eAF9651b87E1C7549Dff': {
    address: '0x7241DDDec3A6aF367882eAF9651b87E1C7549Dff',
    username: 'stani',
    name: 'Stani Kulechov',
    bio: 'Founder of Aave and Lens Protocol',
    mlScore: 99.2,
    createdAt: '2022-05-18T00:00:00.000Z',
  },
};

/**
 * 模拟获取单个用户的ML Score
 */
async function mockFetchSingleMLScore(accountId) {
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const mockData = mockMLScoreData[accountId];
  
  if (!mockData) {
    return {
      id: accountId,
      success: false,
      error: '未找到用户',
      mlScore: null,
    };
  }
  
  return {
    id: accountId,
    success: true,
    address: mockData.address,
    username: mockData.username,
    name: mockData.name,
    bio: mockData.bio,
    mlScore: mockData.mlScore,
    accountData: {
      createdAt: mockData.createdAt,
      operations: { id: 'mock-operation' },
    },
  };
}

/**
 * 模拟批量获取ML Scores
 */
async function mockFetchMLScores(accountIds) {
  console.log('🚀 开始获取ML Scores... (演示模式)');
  console.log(`📋 用户列表: ${accountIds.join(', ')}`);
  console.log('-----------------------------------');

  const results = [];

  for (const accountId of accountIds) {
    console.log(`\n🔍 正在查询: ${accountId}`);
    const result = await mockFetchSingleMLScore(accountId);
    results.push(result);

    if (result.success) {
      console.log(`✅ 成功获取用户信息`);
      console.log(`   地址: ${result.address}`);
      console.log(`   用户名: ${result.username || '无'}`);
      console.log(`   名称: ${result.name || '无'}`);
      console.log(`   简介: ${result.bio || '无'}`);
      console.log(`   🎯 ML Score: ${result.mlScore !== null ? result.mlScore : '暂无评分'}`);
    } else {
      console.log(`❌ 获取失败: ${result.error}`);
    }
  }

  console.log('\n===================================');
  console.log('📊 汇总结果:');
  console.log(`   总计查询: ${accountIds.length} 个用户`);
  console.log(`   成功: ${results.filter(r => r.success).length} 个`);
  console.log(`   失败: ${results.filter(r => !r.success).length} 个`);
  
  // 计算平均ML Score
  const successfulResults = results.filter(r => r.success && r.mlScore !== null);
  if (successfulResults.length > 0) {
    const avgScore = successfulResults.reduce((sum, r) => sum + r.mlScore, 0) / successfulResults.length;
    console.log(`   平均 ML Score: ${avgScore.toFixed(2)}`);
  }
  console.log('===================================\n');

  return results;
}

/**
 * 模拟批量查询
 */
async function mockFetchMLScoresBulk(addresses) {
  console.log('🚀 开始批量获取ML Scores... (演示模式)');
  console.log(`📋 地址列表: ${addresses.join(', ')}`);
  console.log('-----------------------------------');

  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 500));

  const processedResults = addresses
    .map(address => mockMLScoreData[address])
    .filter(Boolean)
    .map(account => ({
      id: account.address,
      success: true,
      address: account.address,
      username: account.username,
      name: account.name,
      bio: account.bio,
      mlScore: account.mlScore,
      accountData: {
        createdAt: account.createdAt,
        operations: { id: 'mock-operation' },
      },
    }));

  console.log('\n===================================');
  console.log('📊 批量查询结果:');
  console.log(`   成功获取: ${processedResults.length} 个用户`);
  processedResults.forEach((result, index) => {
    console.log(`\n   [${index + 1}] ${result.address}`);
    console.log(`       用户名: ${result.username || '无'}`);
    console.log(`       名称: ${result.name || '无'}`);
    console.log(`       🎯 ML Score: ${result.mlScore !== null ? result.mlScore : '暂无评分'}`);
  });
  console.log('===================================\n');

  return processedResults;
}

// 演示示例
async function demo() {
  console.log('\n╔═══════════════════════════════════════════════════════╗');
  console.log('║  Lens Protocol ML Score 获取功能 - 演示版本          ║');
  console.log('║  使用模拟数据展示功能，实际使用时将连接真实API       ║');
  console.log('╚═══════════════════════════════════════════════════════╝\n');

  // 示例1：逐个查询
  console.log('【示例 1】逐个查询用户\n');
  const userIds = ['lens/lensprotocol', 'lens/stani', 'lens/yoginth'];
  const results1 = await mockFetchMLScores(userIds);
  
  console.log('完整结果 (JSON):');
  console.log(JSON.stringify(results1, null, 2));
  console.log('\n' + '='.repeat(60) + '\n');

  // 等待1秒
  await new Promise(resolve => setTimeout(resolve, 1000));

  // 示例2：批量查询
  console.log('【示例 2】批量查询（更高效）\n');
  const addresses = [
    '0x01d79BcEaEaaDfb8fD2F2f53005289CFcF483464',
    '0x7241DDDec3A6aF367882eAF9651b87E1C7549Dff',
  ];
  const results2 = await mockFetchMLScoresBulk(addresses);
  
  console.log('完整结果 (JSON):');
  console.log(JSON.stringify(results2, null, 2));
  console.log('\n' + '='.repeat(60) + '\n');

  // 数据分析示例
  console.log('【示例 3】数据分析\n');
  const allResults = [...results1, ...results2.map(r => ({ ...r, id: r.address }))];
  const successful = allResults.filter(r => r.success);
  
  // 去重
  const uniqueResults = Array.from(
    new Map(successful.map(r => [r.address, r])).values()
  );
  
  // 按ML Score排序
  const sorted = uniqueResults.sort((a, b) => b.mlScore - a.mlScore);
  
  console.log('📊 用户排名（按ML Score）:');
  sorted.forEach((user, index) => {
    console.log(`   ${index + 1}. ${user.username} - ${user.mlScore} 分`);
  });
  
  // 统计数据
  const scores = uniqueResults.map(u => u.mlScore).filter(s => s !== null);
  const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
  const max = Math.max(...scores);
  const min = Math.min(...scores);
  
  console.log('\n📈 统计数据:');
  console.log(`   平均分: ${avg.toFixed(2)}`);
  console.log(`   最高分: ${max}`);
  console.log(`   最低分: ${min}`);
  console.log(`   总用户数: ${uniqueResults.length}`);
  
  console.log('\n' + '='.repeat(60));
  console.log('\n✅ 演示完成！');
  console.log('\n💡 提示：');
  console.log('   - 在真实环境中运行时，代码将连接Lens Protocol API');
  console.log('   - 请确保网络连接正常且可以访问 https://api.lens.xyz');
  console.log('   - 查看 TUTORIAL.md 了解详细使用方法');
  console.log('   - 查看 README.md 了解更多信息\n');
}

// 运行演示
demo().catch(error => {
  console.error('❌ 演示运行出错:', error);
});
