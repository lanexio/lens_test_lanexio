/**
 * Lens Protocol ML Score 演示模式（使用模拟数据）
 * Demo Mode with Mock Data
 * 
 * 如果无法连接到 Lens API，此文件展示了预期的输出格式
 * This file demonstrates the expected output format if unable to connect to Lens API
 */

import { LensMLScoreClient } from './client.js';
import type { Account } from './types.js';

/**
 * 模拟数据 / Mock Data
 */
const mockAccounts: Account[] = [
  {
    address: '0x03Ba3E3B95e3f6844446C400769e978F65A88F42',
    username: {
      value: 'lens/developer',
      namespace: 'lens',
      localName: 'developer'
    },
    metadata: {
      name: 'Lens Developer',
      bio: 'Building the future of decentralized social media on Lens Protocol',
      picture: 'https://example.com/avatar1.jpg'
    },
    operations: {
      id: '1',
      isFollowedByMe: false,
      isFollowingMe: false
    },
    score: 0.85
  },
  {
    address: '0xD020E01C0c90Ab005A01482975f7c496D1e894b6',
    username: {
      value: 'lens/creator',
      namespace: 'lens',
      localName: 'creator'
    },
    metadata: {
      name: 'Content Creator',
      bio: 'Creating amazing content for the Lens community',
      picture: 'https://example.com/avatar2.jpg'
    },
    operations: {
      id: '2',
      isFollowedByMe: true,
      isFollowingMe: false
    },
    score: 0.72
  },
  {
    address: '0x7241DDDec3A6aF367882eAF9651b87E1C7549Dff',
    username: {
      value: 'lens/enthusiast',
      namespace: 'lens',
      localName: 'enthusiast'
    },
    metadata: {
      name: 'Lens Enthusiast',
      bio: 'Passionate about Web3 social networking and decentralization',
      picture: 'https://example.com/avatar3.jpg'
    },
    operations: {
      id: '3',
      isFollowedByMe: false,
      isFollowingMe: true
    },
    score: 0.68
  }
];

/**
 * 演示：显示单个账户信息
 */
function demo1_showSingleAccount() {
  console.log('\n' + '='.repeat(70));
  console.log('🎬 演示 1: 单个账户的ML分数展示');
  console.log('🎬 Demo 1: Single Account ML Score Display');
  console.log('='.repeat(70) + '\n');

  const account = mockAccounts[0];
  console.log(LensMLScoreClient.formatAccountInfo(account));
}

/**
 * 演示：显示多个账户列表
 */
function demo2_showMultipleAccounts() {
  console.log('\n' + '='.repeat(70));
  console.log('🎬 演示 2: 多个账户的ML分数列表');
  console.log('🎬 Demo 2: Multiple Accounts ML Score List');
  console.log('='.repeat(70) + '\n');

  console.log(LensMLScoreClient.formatAccountsList(mockAccounts));

  // 统计信息
  const scores = mockAccounts.map(a => a.score);
  const avgScore = scores.reduce((a, b) => a + b, 0) / scores.length;
  const maxScore = Math.max(...scores);
  const minScore = Math.min(...scores);

  console.log('📈 统计信息 / Statistics:');
  console.log(`   平均ML分数 / Average Score: ${avgScore.toFixed(2)}`);
  console.log(`   最高ML分数 / Max Score: ${maxScore}`);
  console.log(`   最低ML分数 / Min Score: ${minScore}`);
  console.log('');
}

/**
 * 演示：分析ML分数分布
 */
function demo3_analyzeScores() {
  console.log('\n' + '='.repeat(70));
  console.log('🎬 演示 3: ML分数分析和应用场景');
  console.log('🎬 Demo 3: ML Score Analysis and Use Cases');
  console.log('='.repeat(70) + '\n');

  // 按分数排序
  const sortedAccounts = [...mockAccounts].sort((a, b) => b.score - a.score);

  console.log('🏆 账户质量排名 / Account Quality Ranking:\n');
  sortedAccounts.forEach((account, index) => {
    const medal = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '  ';
    console.log(`${medal} 第 ${index + 1} 名: ${account.username?.value}`);
    console.log(`   ML分数: ${account.score} | 地址: ${account.address}`);
    console.log('');
  });

  // 分类
  console.log('📊 质量分类 / Quality Classification:\n');
  const highQuality = mockAccounts.filter(a => a.score >= 0.7);
  const mediumQuality = mockAccounts.filter(a => a.score >= 0.5 && a.score < 0.7);
  const lowQuality = mockAccounts.filter(a => a.score < 0.5);

  console.log(`✅ 高质量账户 (≥0.7): ${highQuality.length} 个`);
  highQuality.forEach(a => console.log(`   - ${a.username?.value} (${a.score})`));
  
  console.log(`\n⚠️  中等质量账户 (0.5-0.7): ${mediumQuality.length} 个`);
  mediumQuality.forEach(a => console.log(`   - ${a.username?.value} (${a.score})`));
  
  console.log(`\n❌ 低质量账户 (<0.5): ${lowQuality.length} 个`);
  lowQuality.forEach(a => console.log(`   - ${a.username?.value} (${a.score})`));
  console.log('');
}

/**
 * 演示：实际应用场景
 */
function demo4_useCases() {
  console.log('\n' + '='.repeat(70));
  console.log('🎬 演示 4: 实际应用场景示例');
  console.log('🎬 Demo 4: Real-world Use Case Examples');
  console.log('='.repeat(70) + '\n');

  console.log('💼 应用场景 1: 内容推荐系统');
  console.log('Use Case 1: Content Recommendation System\n');
  const recommendedUsers = mockAccounts
    .filter(a => a.score >= 0.7)
    .sort((a, b) => b.score - a.score);
  console.log(`推荐给用户关注的高质量账户: ${recommendedUsers.length} 个`);
  recommendedUsers.forEach(u => {
    console.log(`  • ${u.username?.value} (分数: ${u.score})`);
  });

  console.log('\n💼 应用场景 2: 垃圾账户过滤');
  console.log('Use Case 2: Spam Account Filtering\n');
  const threshold = 0.6;
  const filteredAccounts = mockAccounts.filter(a => a.score >= threshold);
  console.log(`过滤阈值: ${threshold}`);
  console.log(`过滤前: ${mockAccounts.length} 个账户`);
  console.log(`过滤后: ${filteredAccounts.length} 个账户`);
  console.log(`过滤掉: ${mockAccounts.length - filteredAccounts.length} 个低质量账户`);

  console.log('\n💼 应用场景 3: 用户信誉评分');
  console.log('Use Case 3: User Reputation Scoring\n');
  mockAccounts.forEach(account => {
    let reputation = '';
    if (account.score >= 0.8) reputation = '⭐⭐⭐⭐⭐ 优秀 (Excellent)';
    else if (account.score >= 0.7) reputation = '⭐⭐⭐⭐ 良好 (Good)';
    else if (account.score >= 0.6) reputation = '⭐⭐⭐ 中等 (Average)';
    else if (account.score >= 0.5) reputation = '⭐⭐ 较差 (Below Average)';
    else reputation = '⭐ 差 (Poor)';
    
    console.log(`${account.username?.value}: ${reputation}`);
  });
  console.log('');
}

/**
 * 主演示程序
 */
function main() {
  console.log('\n');
  console.log('╔═══════════════════════════════════════════════════════════════════╗');
  console.log('║                                                                   ║');
  console.log('║       🎬 Lens Protocol ML Score 演示模式                          ║');
  console.log('║          Demo Mode with Mock Data                                 ║');
  console.log('║                                                                   ║');
  console.log('║       注意：这是使用模拟数据的演示                                  ║');
  console.log('║       Note: This is a demo using mock data                        ║');
  console.log('║                                                                   ║');
  console.log('╚═══════════════════════════════════════════════════════════════════╝');

  demo1_showSingleAccount();
  demo2_showMultipleAccounts();
  demo3_analyzeScores();
  demo4_useCases();

  console.log('\n' + '='.repeat(70));
  console.log('✅ 演示完成！');
  console.log('✅ Demo completed!');
  console.log('\n💡 提示 / Tips:');
  console.log('   - 这些是模拟数据，展示了输出格式');
  console.log('   - 实际使用时，数据将从 Lens Protocol API 获取');
  console.log('   - 运行 "npm run example" 查看实际 API 调用');
  console.log('\n   - These are mock data showing the output format');
  console.log('   - In real usage, data will be fetched from Lens Protocol API');
  console.log('   - Run "npm run example" to see actual API calls');
  console.log('='.repeat(70) + '\n');
}

main();
