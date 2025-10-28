/**
 * TypeScript 类型定义
 * TypeScript Type Definitions
 */

/**
 * 账户用户名信息
 * Account Username Information
 */
export interface Username {
  value: string;
  namespace: string;
  localName: string;
}

/**
 * 账户元数据
 * Account Metadata
 */
export interface AccountMetadata {
  name?: string;
  bio?: string;
  picture?: string;
}

/**
 * 账户操作信息
 * Account Operations Information
 */
export interface AccountOperations {
  id: string;
  isFollowedByMe: boolean;
  isFollowingMe: boolean;
}

/**
 * 账户信息（包含ML分数）
 * Account Information (including ML Score)
 */
export interface Account {
  address: string;
  username?: Username;
  metadata?: AccountMetadata;
  operations?: AccountOperations;
  score: number;  // ML Score 机器学习评分
}

/**
 * 分页信息
 * Pagination Information
 */
export interface PageInfo {
  next?: string;
  prev?: string;
}

/**
 * 账户查询结果
 * Accounts Query Result
 */
export interface AccountsResult {
  items: Account[];
  pageInfo: PageInfo;
}

/**
 * GraphQL 响应类型
 * GraphQL Response Types
 */
export interface AccountResponse {
  account: Account;
}

export interface AccountsResponse {
  accounts: AccountsResult;
}

/**
 * 查询请求参数
 * Query Request Parameters
 */
export interface AccountRequest {
  address?: string;
  username?: string;
  txHash?: string;
}

export interface AccountsRequest {
  addresses?: string[];
  managedBy?: {
    address: string;
  };
  filter?: {
    searchBy?: {
      localNameQuery?: string;
      usernameQuery?: string;
    };
  };
}
