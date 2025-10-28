/**
 * Lens Protocol ML Score 使用示例
 * Lens Protocol ML Score Usage Examples
 * 
 * 本文件展示如何使用 LensMLScoreClient 获取用户的ML评分
 * This file demonstrates how to use LensMLScoreClient to fetch user ML scores
 */

import { LensMLScoreClient } from './client.js';

/**
 * 示例1: 获取单个账户的ML分数
 * Example 1: Fetch ML score for a single account
 */
async function example1_getSingleAccount() {
  console.log('\n' + '='.repeat(70));
  console.log('示例 1: 获取单个账户的ML分数');
  console.log('Example 1: Fetch ML score for a single account');
  console.log('='.repeat(70) + '\n');

  const client = new LensMLScoreClient();
  
  // 示例地址（可以替换为实际的Lens账户地址）
  // Example address (replace with actual Lens account address)
  const address = '0x03Ba3E3B95e3f6844446C400769e978F65A88F42';
  
  try {
    console.log(`正在获取账户 ${address} 的信息...\n`);
    const account = await client.getAccountMLScore(address);
    
    if (account) {
      console.log(LensMLScoreClient.formatAccountInfo(account));
    } else {
      console.log('未找到该账户信息');
    }
  } catch (error) {
    console.error('获取失败:', error);
  }
}

/**
 * 示例2: 批量获取多个账户的ML分数
 * Example 2: Fetch ML scores for multiple accounts
 */
async function example2_getMultipleAccounts() {
  console.log('\n' + '='.repeat(70));
  console.log('示例 2: 批量获取多个账户的ML分数');
  console.log('Example 2: Fetch ML scores for multiple accounts');
  console.log('='.repeat(70) + '\n');

  const client = new LensMLScoreClient();
  
  // 示例地址列表（可以替换为实际的Lens账户地址列表）
  // List of example addresses (replace with actual Lens account addresses)
  const addresses = [
    '0x03Ba3E3B95e3f6844446C400769e978F65A88F42',
    '0xD020E01C0c90Ab005A01482975f7c496D1e894b6',
    '0x7241DDDec3A6aF367882eAF9651b87E1C7549Dff',
  ];
  
  try {
    console.log(`正在批量获取 ${addresses.length} 个账户的信息...\n`);
    const accounts = await client.getAccountsMLScores(addresses);
    
    console.log(LensMLScoreClient.formatAccountsList(accounts));
    
    // 额外统计信息
    // Additional statistics
    if (accounts.length > 0) {
      const scores = accounts.map(a => a.score);
      const avgScore = scores.reduce((a, b) => a + b, 0) / scores.length;
      const maxScore = Math.max(...scores);
      const minScore = Math.min(...scores);
      
      console.log('\n📈 统计信息 / Statistics:');
      console.log(`   平均ML分数 / Average Score: ${avgScore.toFixed(2)}`);
      console.log(`   最高ML分数 / Max Score: ${maxScore}`);
      console.log(`   最低ML分数 / Min Score: ${minScore}`);
      console.log('');
    }
  } catch (error) {
    console.error('批量获取失败:', error);
  }
}

/**
 * 示例3: 通过用户名搜索账户并获取ML分数
 * Example 3: Search accounts by username and get ML scores
 */
async function example3_searchByUsername() {
  console.log('\n' + '='.repeat(70));
  console.log('示例 3: 通过用户名搜索账户并获取ML分数');
  console.log('Example 3: Search accounts by username and get ML scores');
  console.log('='.repeat(70) + '\n');

  const client = new LensMLScoreClient();
  
  // 搜索用户名（可以是完整用户名或部分用户名）
  // Search username (can be full or partial username)
  const username = 'lens';
  
  try {
    console.log(`正在搜索用户名包含 "${username}" 的账户...\n`);
    const accounts = await client.searchAccountsByUsername(username);
    
    console.log(LensMLScoreClient.formatAccountsList(accounts));
    console.log(`\n找到 ${accounts.length} 个匹配的账户\n`);
  } catch (error) {
    console.error('搜索失败:', error);
  }
}

/**
 * 示例4: 自定义账户地址列表
 * Example 4: Custom account addresses list
 * 
 * 使用此函数测试您自己的账户地址列表
 * Use this function to test your own list of account addresses
 */
async function example4_customAddresses() {
  console.log('\n' + '='.repeat(70));
  console.log('示例 4: 自定义账户地址列表');
  console.log('Example 4: Custom account addresses list');
  console.log('='.repeat(70) + '\n');

  const client = new LensMLScoreClient();
  
  // 📝 在这里添加您想要查询的账户地址
  // 📝 Add your account addresses here
  const customAddresses: string[] = [
    // 添加您的地址 / Add your addresses here
    // 例如 / For example:
    // '0x1234567890abcdef1234567890abcdef12345678',
    // '0xabcdefabcdefabcdefabcdefabcdefabcdefabcd',
  ];
  
  if (customAddresses.length === 0) {
    console.log('⚠️  请在代码中添加您想要查询的账户地址');
    console.log('⚠️  Please add account addresses in the code');
    console.log('\n提示：编辑 src/example.ts 文件，在 customAddresses 数组中添加地址\n');
    return;
  }
  
  try {
    console.log(`正在获取 ${customAddresses.length} 个自定义账户的信息...\n`);
    const accounts = await client.getAccountsMLScores(customAddresses);
    console.log(LensMLScoreClient.formatAccountsList(accounts));
  } catch (error) {
    console.error('获取失败:', error);
  }
}

/**
 * 主函数：运行所有示例
 * Main function: Run all examples
 */
async function main() {
  console.log('\n');
  console.log('╔═══════════════════════════════════════════════════════════════════╗');
  console.log('║                                                                   ║');
  console.log('║       🎯 Lens Protocol ML Score Fetcher 使用示例                  ║');
  console.log('║          Lens协议ML评分获取工具示例程序                            ║');
  console.log('║                                                                   ║');
  console.log('╚═══════════════════════════════════════════════════════════════════╝');
  console.log('');

  try {
    // 运行示例1：获取单个账户
    // Run Example 1: Get single account
    await example1_getSingleAccount();
    
    // 等待一下避免请求过快
    // Wait a bit to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // 运行示例2：批量获取多个账户
    // Run Example 2: Get multiple accounts
    await example2_getMultipleAccounts();
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // 运行示例3：搜索用户名
    // Run Example 3: Search by username
    await example3_searchByUsername();
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // 运行示例4：自定义地址列表
    // Run Example 4: Custom addresses
    await example4_customAddresses();
    
    console.log('\n✅ 所有示例运行完成！/ All examples completed!\n');
  } catch (error) {
    console.error('\n❌ 运行示例时出错:', error);
    process.exit(1);
  }
}

// 运行主函数
// Run main function
main();
