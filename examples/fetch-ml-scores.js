/**
 * 示例：获取指定用户列表的ML Score
 * Example: Fetch ML Scores for specified user list
 */

import { fetchMLScores, fetchMLScoresBulk, searchAccountsWithMLScore } from '../src/index.js';

// 示例1：使用用户名或地址逐个查询
async function example1() {
  console.log('\n========== 示例1：逐个查询用户 ==========\n');
  
  // 定义要查询的用户ID列表（可以是用户名或以太坊地址）
  const userIds = [
    'lens/lensprotocol',  // Lens官方账号用户名
    'lens/stani',         // Lens创始人用户名
    'lens/yoginth',       // 知名Lens用户
  ];

  const results = await fetchMLScores(userIds);
  
  // 输出JSON格式的完整结果
  console.log('\n完整结果（JSON格式）:');
  console.log(JSON.stringify(results, null, 2));
}

// 示例2：使用以太坊地址批量查询（更高效）
async function example2() {
  console.log('\n========== 示例2：批量查询（推荐） ==========\n');
  
  // 定义要查询的以太坊地址列表
  const addresses = [
    '0x01d79BcEaEaaDfb8fD2F2f53005289CFcF483464',  // Lens Protocol官方地址
    '0x7241DDDec3A6aF367882eAF9651b87E1C7549Dff',  // Stani.lens的地址
  ];

  const results = await fetchMLScoresBulk(addresses);
  
  // 输出JSON格式的完整结果
  console.log('\n完整结果（JSON格式）:');
  console.log(JSON.stringify(results, null, 2));
}

// 示例3：搜索账户并获取ML Score
async function example3() {
  console.log('\n========== 示例3：搜索账户 ==========\n');
  
  // 搜索关键词
  const searchQuery = 'lens';
  const limit = 5;  // 限制返回5个结果
  
  const results = await searchAccountsWithMLScore(searchQuery, limit);
  
  // 输出JSON格式的完整结果
  console.log('\n完整结果（JSON格式）:');
  console.log(JSON.stringify(results, null, 2));
}

// 运行示例
async function main() {
  try {
    // 运行示例1
    await example1();
    
    // 等待2秒
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // 运行示例2
    await example2();
    
    // 等待2秒
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // 运行示例3
    await example3();
    
  } catch (error) {
    console.error('❌ 运行出错:', error);
    console.error('错误详情:', error.stack);
  }
}

main();
