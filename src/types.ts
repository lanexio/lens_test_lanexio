/**
 * Lens Protocol 账户相关的类型定义
 */

/**
 * 账户地址类型
 */
export interface AccountAddress {
  address: string;
}

/**
 * 用户名信息
 */
export interface Username {
  value: string;
  namespace?: string;
}

/**
 * 账户元数据
 */
export interface AccountMetadata {
  name?: string;
  bio?: string;
  picture?: string;
  coverPicture?: string;
}

/**
 * 完整的账户信息
 */
export interface Account {
  address: string;
  username?: Username;
  metadata?: AccountMetadata;
  mlScore?: number;  // ML Score: 0-1之间的分数
}

/**
 * 批量获取账户的请求参数
 */
export interface FetchAccountsRequest {
  addresses: string[];
}

/**
 * 批量获取账户的响应
 */
export interface FetchAccountsResponse {
  accounts: Account[];
}

/**
 * ML Score 获取结果
 */
export interface MLScoreResult {
  address: string;
  mlScore: number | null;
  username?: string;
  error?: string;
}

/**
 * 批量 ML Score 获取结果
 */
export interface MLScoresBatchResult {
  success: boolean;
  results: MLScoreResult[];
  errors: string[];
}
