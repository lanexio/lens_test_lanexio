/**
 * Lens Protocol ML Score Fetcher
 * 获取Lens协议用户的ML Score（机器学习评分）
 */

import { LensClient, production } from '@lens-protocol/client';

/**
 * 初始化Lens客户端
 * @returns {LensClient} Lens客户端实例
 */
function initLensClient() {
  const client = new LensClient({
    environment: production,
  });
  return client;
}

/**
 * 获取单个用户的ML Score
 * @param {LensClient} client - Lens客户端
 * @param {string} accountId - 用户ID（可以是地址、用户名等）
 * @returns {Promise<Object>} 包含用户信息和ML Score的对象
 */
async function fetchSingleMLScore(client, accountId) {
  try {
    // 判断是否为以太坊地址
    const isAddress = accountId.startsWith('0x');
    
    let result;
    if (isAddress) {
      // 使用地址查询
      result = await client.account.fetch({
        address: accountId,
      });
    } else {
      // 使用用户名查询
      result = await client.account.fetch({
        username: {
          localName: accountId,
        },
      });
    }

    if (!result) {
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
      address: result.address,
      username: result.username?.localName || result.username?.value,
      name: result.metadata?.name,
      mlScore: result.mlScore || null,
      accountData: {
        createdAt: result.createdAt,
        operations: result.operations,
      },
    };
  } catch (error) {
    return {
      id: accountId,
      success: false,
      error: error.message,
      mlScore: null,
    };
  }
}

/**
 * 批量获取多个用户的ML Score
 * @param {Array<string>} accountIds - 用户ID列表
 * @returns {Promise<Array<Object>>} 包含所有用户信息和ML Score的数组
 */
async function fetchMLScores(accountIds) {
  console.log('🚀 开始获取ML Scores...');
  console.log(`📋 用户列表: ${accountIds.join(', ')}`);
  console.log('-----------------------------------');

  const client = initLensClient();
  const results = [];

  for (const accountId of accountIds) {
    console.log(`\n🔍 正在查询: ${accountId}`);
    const result = await fetchSingleMLScore(client, accountId);
    results.push(result);

    if (result.success) {
      console.log(`✅ 成功获取用户信息`);
      console.log(`   地址: ${result.address}`);
      console.log(`   用户名: ${result.username || '无'}`);
      console.log(`   名称: ${result.name || '无'}`);
      console.log(`   ML Score: ${result.mlScore !== null ? result.mlScore : '暂无评分'}`);
    } else {
      console.log(`❌ 获取失败: ${result.error}`);
    }
  }

  console.log('\n===================================');
  console.log('📊 汇总结果:');
  console.log(`   总计查询: ${accountIds.length} 个用户`);
  console.log(`   成功: ${results.filter(r => r.success).length} 个`);
  console.log(`   失败: ${results.filter(r => !r.success).length} 个`);
  console.log('===================================\n');

  return results;
}

/**
 * 批量获取ML Scores（使用Lens的批量查询API）
 * @param {Array<string>} addresses - 以太坊地址列表
 * @returns {Promise<Array<Object>>} 包含所有用户信息和ML Score的数组
 */
async function fetchMLScoresBulk(addresses) {
  console.log('🚀 开始批量获取ML Scores...');
  console.log(`📋 地址列表: ${addresses.join(', ')}`);
  console.log('-----------------------------------');

  const client = initLensClient();

  try {
    const results = await client.account.fetchAll({
      addresses: addresses,
    });

    const processedResults = results.items.map(account => ({
      id: account.address,
      success: true,
      address: account.address,
      username: account.username?.localName || account.username?.value,
      name: account.metadata?.name,
      mlScore: account.mlScore || null,
      accountData: {
        createdAt: account.createdAt,
        operations: account.operations,
      },
    }));

    console.log('\n===================================');
    console.log('📊 批量查询结果:');
    console.log(`   成功获取: ${processedResults.length} 个用户`);
    processedResults.forEach((result, index) => {
      console.log(`\n   [${index + 1}] ${result.address}`);
      console.log(`       用户名: ${result.username || '无'}`);
      console.log(`       ML Score: ${result.mlScore !== null ? result.mlScore : '暂无评分'}`);
    });
    console.log('===================================\n');

    return processedResults;
  } catch (error) {
    console.error(`❌ 批量查询失败: ${error.message}`);
    return [];
  }
}

export { initLensClient, fetchSingleMLScore, fetchMLScores, fetchMLScoresBulk };
