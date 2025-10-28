/**
 * 实用示例：实际应用场景
 * 
 * 这个文件展示了在实际项目中如何使用 ML Score Fetcher
 */

import { createMLScoreFetcher, MLScoreResult, BulkMLScoreResult } from './index';
import * as fs from 'fs';

/**
 * 场景 1: 用户推荐系统
 * 根据 ML Score 推荐高质量账户
 */
export async function getUserRecommendations(addresses: string[], minScore: number = 0.5): Promise<MLScoreResult[]> {
  const fetcher = createMLScoreFetcher();
  const result = await fetcher.getMLScoresBulk(addresses);
  
  // 筛选出 ML Score 高于阈值的账户
  const recommendations = result.success
    .filter(account => account.mlScore !== undefined && account.mlScore >= minScore)
    .sort((a, b) => (b.mlScore || 0) - (a.mlScore || 0));
  
  console.log(`找到 ${recommendations.length} 个推荐账户（ML Score >= ${minScore}）`);
  
  return recommendations;
}

/**
 * 场景 2: 批量账户质量分析
 * 分析一组账户的质量分布
 */
export async function analyzeAccountQuality(addresses: string[]): Promise<{
  total: number;
  withScore: number;
  withoutScore: number;
  averageScore: number;
  highQuality: number;  // ML Score >= 0.7
  mediumQuality: number; // ML Score 0.4-0.7
  lowQuality: number;   // ML Score < 0.4
  distribution: { range: string; count: number }[];
}> {
  const fetcher = createMLScoreFetcher();
  const result = await fetcher.getMLScoresBulk(addresses);
  
  const withScore = result.success.filter(a => a.mlScore !== undefined);
  const scores = withScore.map(a => a.mlScore!);
  
  const analysis = {
    total: result.total,
    withScore: withScore.length,
    withoutScore: result.success.length - withScore.length,
    averageScore: scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 0,
    highQuality: scores.filter(s => s >= 0.7).length,
    mediumQuality: scores.filter(s => s >= 0.4 && s < 0.7).length,
    lowQuality: scores.filter(s => s < 0.4).length,
    distribution: [
      { range: '0.0-0.2', count: scores.filter(s => s >= 0 && s < 0.2).length },
      { range: '0.2-0.4', count: scores.filter(s => s >= 0.2 && s < 0.4).length },
      { range: '0.4-0.6', count: scores.filter(s => s >= 0.4 && s < 0.6).length },
      { range: '0.6-0.8', count: scores.filter(s => s >= 0.6 && s < 0.8).length },
      { range: '0.8-1.0', count: scores.filter(s => s >= 0.8 && s <= 1.0).length },
    ],
  };
  
  console.log('账户质量分析:');
  console.log(`总计: ${analysis.total}`);
  console.log(`有评分: ${analysis.withScore} (${(analysis.withScore / analysis.total * 100).toFixed(1)}%)`);
  console.log(`平均分: ${analysis.averageScore.toFixed(3)}`);
  console.log(`高质量: ${analysis.highQuality}`);
  console.log(`中质量: ${analysis.mediumQuality}`);
  console.log(`低质量: ${analysis.lowQuality}`);
  
  return analysis;
}

/**
 * 场景 3: 导出数据到 CSV
 * 将查询结果导出为 CSV 格式，便于在 Excel 中分析
 */
export async function exportToCSV(addresses: string[], filename: string = 'ml-scores-export.csv'): Promise<void> {
  const fetcher = createMLScoreFetcher();
  const result = await fetcher.getMLScoresBulk(addresses);
  
  // 创建 CSV 表头
  let csv = '地址,用户名,ML评分,名称,简介,状态\n';
  
  // 添加成功的结果
  result.success.forEach(account => {
    const address = account.address;
    const username = account.username || '';
    const mlScore = account.mlScore !== undefined ? account.mlScore.toFixed(4) : '';
    const name = account.metadata?.name?.replace(/,/g, ';') || ''; // 替换逗号避免 CSV 格式问题
    const bio = account.metadata?.bio?.replace(/,/g, ';').substring(0, 100) || ''; // 限制长度
    const status = '成功';
    
    csv += `${address},${username},${mlScore},${name},${bio},${status}\n`;
  });
  
  // 添加失败的结果
  result.failed.forEach(failure => {
    csv += `${failure.address},,,,,失败: ${failure.error}\n`;
  });
  
  // 保存文件
  fs.writeFileSync(filename, csv, 'utf-8');
  console.log(`✅ 数据已导出到 ${filename}`);
  console.log(`   总计: ${result.total} 行`);
  console.log(`   成功: ${result.successCount} 行`);
  console.log(`   失败: ${result.failedCount} 行`);
}

/**
 * 场景 4: 导出数据到 JSON
 * 将查询结果导出为 JSON 格式，便于程序处理
 */
export async function exportToJSON(addresses: string[], filename: string = 'ml-scores-export.json'): Promise<void> {
  const fetcher = createMLScoreFetcher();
  const result = await fetcher.getMLScoresBulk(addresses);
  
  const exportData = {
    metadata: {
      exportTime: new Date().toISOString(),
      totalAddresses: result.total,
      successCount: result.successCount,
      failedCount: result.failedCount,
    },
    accounts: result.success.map(account => ({
      address: account.address,
      username: account.username,
      mlScore: account.mlScore,
      name: account.metadata?.name,
      bio: account.metadata?.bio,
      picture: account.metadata?.picture,
    })),
    errors: result.failed,
  };
  
  fs.writeFileSync(filename, JSON.stringify(exportData, null, 2), 'utf-8');
  console.log(`✅ 数据已导出到 ${filename}`);
}

/**
 * 场景 5: 从文件读取地址列表并查询
 * 读取包含地址的文本文件，每行一个地址
 */
export async function processAddressesFromFile(inputFile: string, outputFile?: string): Promise<BulkMLScoreResult> {
  // 读取地址文件
  const content = fs.readFileSync(inputFile, 'utf-8');
  const addresses = content
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0 && line.startsWith('0x'));
  
  console.log(`从 ${inputFile} 读取到 ${addresses.length} 个地址`);
  
  // 批量查询
  const fetcher = createMLScoreFetcher();
  const result = await fetcher.getMLScoresBulk(addresses);
  
  // 如果指定了输出文件，保存结果
  if (outputFile) {
    await exportToJSON(addresses, outputFile);
  }
  
  return result;
}

/**
 * 场景 6: 实时监控和缓存
 * 实现一个简单的缓存机制，避免重复查询
 */
export class CachedMLScoreFetcher {
  private fetcher = createMLScoreFetcher();
  private cache = new Map<string, { data: MLScoreResult; timestamp: number }>();
  private cacheTTL: number; // 缓存时间（毫秒）
  
  constructor(cacheTTLMinutes: number = 60) {
    this.cacheTTL = cacheTTLMinutes * 60 * 1000;
  }
  
  async getMLScore(address: string, useCache: boolean = true): Promise<MLScoreResult> {
    const now = Date.now();
    
    // 检查缓存
    if (useCache && this.cache.has(address)) {
      const cached = this.cache.get(address)!;
      if (now - cached.timestamp < this.cacheTTL) {
        console.log(`✓ 从缓存获取: ${address}`);
        return cached.data;
      }
    }
    
    // 查询 API
    console.log(`→ 查询 API: ${address}`);
    const result = await this.fetcher.getMLScore(address);
    
    // 保存到缓存
    if (!result.error) {
      this.cache.set(address, { data: result, timestamp: now });
    }
    
    return result;
  }
  
  clearCache(): void {
    this.cache.clear();
    console.log('缓存已清空');
  }
  
  getCacheSize(): number {
    return this.cache.size;
  }
}

/**
 * 场景 7: 进度显示的批量查询
 * 在处理大量地址时显示进度
 */
export async function batchQueryWithProgress(addresses: string[], batchSize: number = 10): Promise<BulkMLScoreResult> {
  const fetcher = createMLScoreFetcher();
  const totalBatches = Math.ceil(addresses.length / batchSize);
  
  const allResults: BulkMLScoreResult = {
    success: [],
    failed: [],
    total: addresses.length,
    successCount: 0,
    failedCount: 0,
  };
  
  for (let i = 0; i < addresses.length; i += batchSize) {
    const batch = addresses.slice(i, i + batchSize);
    const batchNumber = Math.floor(i / batchSize) + 1;
    
    console.log(`\n处理批次 ${batchNumber}/${totalBatches} (${batch.length} 个地址)...`);
    
    const result = await fetcher.getMLScoresBulk(batch);
    
    // 合并结果
    allResults.success.push(...result.success);
    allResults.failed.push(...result.failed);
    allResults.successCount += result.successCount;
    allResults.failedCount += result.failedCount;
    
    console.log(`  成功: ${result.successCount}, 失败: ${result.failedCount}`);
    
    // 进度条
    const progress = (i + batch.length) / addresses.length * 100;
    const progressBar = '█'.repeat(Math.floor(progress / 2)) + '░'.repeat(50 - Math.floor(progress / 2));
    console.log(`  [${progressBar}] ${progress.toFixed(1)}%`);
  }
  
  console.log('\n✅ 所有批次处理完成！');
  
  return allResults;
}

/**
 * 示例：运行所有实用场景
 */
async function runPracticalExamples() {
  console.log('╔════════════════════════════════════════════════════════════╗');
  console.log('║   实用场景示例                                             ║');
  console.log('╚════════════════════════════════════════════════════════════╝\n');
  
  // 示例地址列表
  const sampleAddresses = [
    '0x03fEb724F1a471861b1e353BEd14aFE3992dFBfd',
    '0xD020E01C0c90Ab005A01482d34B808874345FD82',
  ];
  
  try {
    // 场景 1: 获取推荐
    console.log('\n【场景 1: 用户推荐】');
    const recommendations = await getUserRecommendations(sampleAddresses, 0.5);
    console.log(`推荐了 ${recommendations.length} 个高质量账户`);
    
    // 场景 2: 质量分析
    console.log('\n【场景 2: 账户质量分析】');
    await analyzeAccountQuality(sampleAddresses);
    
    // 场景 6: 使用缓存
    console.log('\n【场景 6: 使用缓存】');
    const cachedFetcher = new CachedMLScoreFetcher(60);
    await cachedFetcher.getMLScore(sampleAddresses[0]);
    await cachedFetcher.getMLScore(sampleAddresses[0]); // 这次会从缓存获取
    console.log(`缓存大小: ${cachedFetcher.getCacheSize()}`);
    
    console.log('\n✅ 所有实用场景演示完成！');
  } catch (error) {
    console.error('❌ 运行示例时出错:', error);
  }
}

// 如果直接运行此文件
if (require.main === module) {
  runPracticalExamples().catch(console.error);
}
