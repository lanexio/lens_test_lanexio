/**
 * Lens Protocol API Configuration
 * 
 * 配置文件：Lens Protocol API 的端点和设置
 */

export const LENS_API_CONFIG = {
  // Lens Protocol API 主网端点
  MAINNET_ENDPOINT: 'https://api.lens.xyz/graphql',
  
  // Lens Protocol API 测试网端点
  TESTNET_ENDPOINT: 'https://api.testnet.lens.xyz/graphql',
  
  // 默认使用主网
  DEFAULT_ENDPOINT: 'https://api.lens.xyz/graphql',
  
  // 最大批量查询数量
  MAX_BATCH_SIZE: 50,
};

/**
 * Account 类型定义
 * 账户数据结构
 */
export interface Account {
  address: string;
  username?: {
    value: string;
    localName: string;
    namespace: string;
  };
  metadata?: AccountMetadata;
  operations?: {
    canBlock: boolean;
    canUnblock: boolean;
    canFollow: boolean;
    canUnfollow: boolean;
    isBlockedByMe: boolean;
    isFollowedByMe: boolean;
  };
}

/**
 * AccountMetadata 类型定义
 * 账户元数据结构，包含 ML Score
 */
export interface AccountMetadata {
  name?: string;
  bio?: string;
  picture?: string;
  coverPicture?: string;
  attributes?: Array<{
    key: string;
    value: string;
  }>;
  // ML Score - 机器学习评分（用于推荐和排序）
  mlScore?: number;
}

/**
 * ML Score 结果类型
 */
export interface MLScoreResult {
  address: string;
  username?: string;
  mlScore?: number;
  metadata?: AccountMetadata;
  error?: string;
}

/**
 * 批量查询结果类型
 */
export interface BulkMLScoreResult {
  success: MLScoreResult[];
  failed: Array<{
    address: string;
    error: string;
  }>;
  total: number;
  successCount: number;
  failedCount: number;
}
