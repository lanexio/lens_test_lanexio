/**
 * Lens Protocol ML Score 获取器
 * 
 * 这个模块提供了完整的功能来获取 Lens Protocol 用户的 ML Score
 * ML Score 是一个 0-1 之间的分数，表示账户的质量和可信度
 */

import { GraphQLClient } from 'graphql-request';
import { 
  Account, 
  MLScoreResult, 
  MLScoresBatchResult,
  AccountQueryResponse,
  AccountsBulkQueryResponse
} from './types';
import { 
  DEFAULT_API_ENDPOINT, 
  MAX_BATCH_SIZE 
} from './config';
import { 
  ACCOUNT_QUERY, 
  ACCOUNTS_BULK_QUERY 
} from './queries';

/**
 * LensMLScoreFetcher 类
 * 
 * 用于获取 Lens Protocol 账户的 ML Score
 */
export class LensMLScoreFetcher {
  private client: GraphQLClient;

  /**
   * 构造函数
   * @param apiEndpoint - Lens API 端点 URL（可选，默认使用主网）
   */
  constructor(apiEndpoint: string = DEFAULT_API_ENDPOINT) {
    this.client = new GraphQLClient(apiEndpoint, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  /**
   * 验证以太坊地址格式
   * @param address - 要验证的地址
   * @returns 是否为有效的以太坊地址
   */
  private isValidAddress(address: string): boolean {
    return /^0x[a-fA-F0-9]{40}$/.test(address);
  }

  /**
   * 获取单个账户的 ML Score
   * 
   * @param address - 账户的以太坊地址
   * @returns Promise<MLScoreResult> - 包含 ML Score 的结果
   * 
   * @example
   * ```typescript
   * const fetcher = new LensMLScoreFetcher();
   * const result = await fetcher.fetchMLScore('0x1234...');
   * console.log(`ML Score: ${result.mlScore}`);
   * ```
   */
  async fetchMLScore(address: string): Promise<MLScoreResult> {
    try {
      // 验证地址格式
      if (!this.isValidAddress(address)) {
        return {
          address,
          mlScore: null,
          error: `无效的以太坊地址格式: ${address}`,
        };
      }

      // 构造 GraphQL 请求参数
      const variables = {
        request: {
          address,
        },
      };

      // 发送 GraphQL 请求
      const response = await this.client.request<AccountQueryResponse>(ACCOUNT_QUERY, variables);

      // 解析响应
      const account: Account | null = response.account;

      if (!account) {
        return {
          address,
          mlScore: null,
          error: '未找到该账户',
        };
      }

      return {
        address: account.address,
        mlScore: account.mlScore ?? null,
        username: account.username?.value,
      };
    } catch (error) {
      return {
        address,
        mlScore: null,
        error: `请求失败: ${error instanceof Error ? error.message : String(error)}`,
      };
    }
  }

  /**
   * 批量获取多个账户的 ML Score
   * 
   * @param addresses - 账户地址数组
   * @returns Promise<MLScoresBatchResult> - 批量获取结果
   * 
   * @example
   * ```typescript
   * const fetcher = new LensMLScoreFetcher();
   * const result = await fetcher.fetchMLScoresBatch([
   *   '0x1234...',
   *   '0x5678...',
   * ]);
   * result.results.forEach(r => {
   *   console.log(`${r.address}: ${r.mlScore}`);
   * });
   * ```
   */
  async fetchMLScoresBatch(addresses: string[]): Promise<MLScoresBatchResult> {
    const results: MLScoreResult[] = [];
    const errors: string[] = [];

    // 验证输入
    if (!addresses || addresses.length === 0) {
      return {
        success: false,
        results: [],
        errors: ['地址列表为空'],
      };
    }

    // 如果地址数量超过最大批量大小，分批处理
    if (addresses.length > MAX_BATCH_SIZE) {
      // 添加警告信息到 errors 数组而不是使用 console.warn
      errors.push(`地址数量 (${addresses.length}) 超过最大批量大小 (${MAX_BATCH_SIZE})，将分批处理`);
      
      for (let i = 0; i < addresses.length; i += MAX_BATCH_SIZE) {
        const batch = addresses.slice(i, i + MAX_BATCH_SIZE);
        const batchResult = await this._fetchBatch(batch);
        results.push(...batchResult.results);
        errors.push(...batchResult.errors);
      }

      return {
        success: errors.length === 1, // 只有分批警告信息时认为成功
        results,
        errors,
      };
    }

    // 单批处理
    return this._fetchBatch(addresses);
  }

  /**
   * 内部方法：处理单个批次的请求
   * @param addresses - 地址数组（不超过 MAX_BATCH_SIZE）
   * @returns Promise<MLScoresBatchResult>
   */
  private async _fetchBatch(addresses: string[]): Promise<MLScoresBatchResult> {
    const results: MLScoreResult[] = [];
    const errors: string[] = [];

    // 过滤无效地址
    const validAddresses = addresses.filter(addr => {
      const isValid = this.isValidAddress(addr);
      if (!isValid) {
        errors.push(`无效的地址格式: ${addr}`);
        results.push({
          address: addr,
          mlScore: null,
          error: '无效的地址格式',
        });
      }
      return isValid;
    });

    if (validAddresses.length === 0) {
      return {
        success: false,
        results,
        errors,
      };
    }

    try {
      // 构造 GraphQL 请求参数
      const variables = {
        request: {
          addresses: validAddresses,
        },
      };

      // 发送 GraphQL 请求
      const response = await this.client.request<AccountsBulkQueryResponse>(ACCOUNTS_BULK_QUERY, variables);

      // 解析响应
      const accounts: Account[] = response.accountsBulk?.items || [];

      // 创建地址到账户的映射
      const accountMap = new Map<string, Account>();
      accounts.forEach(account => {
        accountMap.set(account.address.toLowerCase(), account);
      });

      // 为每个地址生成结果
      validAddresses.forEach(address => {
        const account = accountMap.get(address.toLowerCase());
        if (account) {
          results.push({
            address: account.address,
            mlScore: account.mlScore ?? null,
            username: account.username?.value,
          });
        } else {
          results.push({
            address,
            mlScore: null,
            error: '未找到该账户',
          });
        }
      });

      return {
        success: true,
        results,
        errors,
      };
    } catch (error) {
      const errorMessage = `批量请求失败: ${error instanceof Error ? error.message : String(error)}`;
      errors.push(errorMessage);

      // 为所有有效地址添加错误结果
      validAddresses.forEach(address => {
        if (!results.find(r => r.address === address)) {
          results.push({
            address,
            mlScore: null,
            error: errorMessage,
          });
        }
      });

      return {
        success: false,
        results,
        errors,
      };
    }
  }

  /**
   * 获取账户的完整信息（包括 ML Score）
   * 
   * @param address - 账户地址
   * @returns Promise<Account | null> - 账户完整信息，如果失败返回 null
   */
  async fetchAccountInfo(address: string): Promise<Account | null> {
    try {
      if (!this.isValidAddress(address)) {
        return null;
      }

      const variables = {
        request: {
          address,
        },
      };

      const response = await this.client.request<AccountQueryResponse>(ACCOUNT_QUERY, variables);
      return response.account || null;
    } catch (error) {
      return null;
    }
  }

  /**
   * 批量获取账户的完整信息（包括 ML Score）
   * 
   * @param addresses - 账户地址数组
   * @returns Promise<Account[]> - 账户信息数组，过滤掉无效地址和获取失败的账户
   */
  async fetchAccountsInfo(addresses: string[]): Promise<Account[]> {
    try {
      const validAddresses = addresses.filter(addr => this.isValidAddress(addr));

      if (validAddresses.length === 0) {
        return [];
      }

      const variables = {
        request: {
          addresses: validAddresses,
        },
      };

      const response = await this.client.request<AccountsBulkQueryResponse>(ACCOUNTS_BULK_QUERY, variables);
      return response.accountsBulk?.items || [];
    } catch (error) {
      return [];
    }
  }
}

/**
 * 创建一个新的 LensMLScoreFetcher 实例
 * 
 * @param apiEndpoint - Lens API 端点 URL（可选）
 * @returns LensMLScoreFetcher 实例
 * 
 * @example
 * ```typescript
 * const fetcher = createFetcher();
 * const result = await fetcher.fetchMLScore('0x1234...');
 * ```
 */
export function createFetcher(apiEndpoint?: string): LensMLScoreFetcher {
  return new LensMLScoreFetcher(apiEndpoint);
}
