/**
 * Lens Protocol ML Score 获取器
 * 
 * 主要功能类，用于从 Lens Protocol 获取账户的 ML Score
 */

import { GraphQLClient } from 'graphql-request';
import {
  LENS_API_CONFIG,
  Account,
  MLScoreResult,
  BulkMLScoreResult,
} from './types';
import {
  GET_ACCOUNT_QUERY,
  GET_ACCOUNTS_BULK_QUERY,
  GET_ACCOUNT_BY_USERNAME_QUERY,
} from './queries';

/**
 * LensMLScoreFetcher 类
 * 用于获取 Lens Protocol 账户的 ML Score
 */
export class LensMLScoreFetcher {
  private client: GraphQLClient;
  private endpoint: string;

  /**
   * 构造函数
   * @param endpoint - API 端点（可选，默认使用主网）
   */
  constructor(endpoint?: string) {
    this.endpoint = endpoint || LENS_API_CONFIG.DEFAULT_ENDPOINT;
    this.client = new GraphQLClient(this.endpoint, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  /**
   * 获取单个账户的 ML Score
   * @param address - 以太坊地址
   * @returns ML Score 结果
   */
  async getMLScore(address: string): Promise<MLScoreResult> {
    try {
      // 验证地址格式
      if (!this.isValidAddress(address)) {
        return {
          address,
          error: '无效的以太坊地址格式',
        };
      }

      // 执行 GraphQL 查询
      const data: { account: Account | null } = await this.client.request(
        GET_ACCOUNT_QUERY,
        { address }
      );

      // 检查是否找到账户
      if (!data.account) {
        return {
          address,
          error: '未找到该地址的账户信息',
        };
      }

      // 提取 ML Score（注意：Lens Protocol 可能将 mlScore 作为 metadata 的一部分）
      // 实际的 mlScore 可能在不同的位置，需要根据实际 API 响应调整
      const mlScore = this.extractMLScore(data.account);

      return {
        address: data.account.address,
        username: data.account.username?.value,
        mlScore,
        metadata: data.account.metadata,
      };
    } catch (error) {
      return {
        address,
        error: `查询失败: ${error instanceof Error ? error.message : String(error)}`,
      };
    }
  }

  /**
   * 批量获取多个账户的 ML Score
   * @param addresses - 以太坊地址数组
   * @returns 批量查询结果
   */
  async getMLScoresBulk(addresses: string[]): Promise<BulkMLScoreResult> {
    const result: BulkMLScoreResult = {
      success: [],
      failed: [],
      total: addresses.length,
      successCount: 0,
      failedCount: 0,
    };

    // 如果地址列表为空
    if (addresses.length === 0) {
      return result;
    }

    // 分批处理（避免一次查询太多）
    const batches = this.createBatches(addresses, LENS_API_CONFIG.MAX_BATCH_SIZE);

    for (const batch of batches) {
      try {
        // 验证地址
        const validAddresses = batch.filter((addr) => this.isValidAddress(addr));
        const invalidAddresses = batch.filter((addr) => !this.isValidAddress(addr));

        // 记录无效地址
        invalidAddresses.forEach((addr) => {
          result.failed.push({
            address: addr,
            error: '无效的以太坊地址格式',
          });
          result.failedCount++;
        });

        if (validAddresses.length === 0) {
          continue;
        }

        // 执行批量查询
        const data: { accountsBulk: (Account | null)[] } = await this.client.request(
          GET_ACCOUNTS_BULK_QUERY,
          { addresses: validAddresses }
        );

        // 处理结果
        validAddresses.forEach((address, index) => {
          const account = data.accountsBulk[index];
          
          if (account) {
            const mlScore = this.extractMLScore(account);
            result.success.push({
              address: account.address,
              username: account.username?.value,
              mlScore,
              metadata: account.metadata,
            });
            result.successCount++;
          } else {
            result.failed.push({
              address,
              error: '未找到该地址的账户信息',
            });
            result.failedCount++;
          }
        });
      } catch (error) {
        // 批量查询失败，记录该批次的所有地址
        batch.forEach((address) => {
          result.failed.push({
            address,
            error: `批量查询失败: ${error instanceof Error ? error.message : String(error)}`,
          });
          result.failedCount++;
        });
      }
    }

    return result;
  }

  /**
   * 通过用户名获取 ML Score
   * @param username - Lens 用户名（例如：'user.lens'）
   * @returns ML Score 结果
   */
  async getMLScoreByUsername(username: string): Promise<MLScoreResult> {
    try {
      const data: { account: Account | null } = await this.client.request(
        GET_ACCOUNT_BY_USERNAME_QUERY,
        { username }
      );

      if (!data.account) {
        return {
          address: '',
          username,
          error: '未找到该用户名的账户信息',
        };
      }

      const mlScore = this.extractMLScore(data.account);

      return {
        address: data.account.address,
        username: data.account.username?.value,
        mlScore,
        metadata: data.account.metadata,
      };
    } catch (error) {
      return {
        address: '',
        username,
        error: `查询失败: ${error instanceof Error ? error.message : String(error)}`,
      };
    }
  }

  /**
   * 从账户数据中提取 ML Score
   * 注意：Lens Protocol 的 ML Score 可能位于不同的字段
   * 需要根据实际 API 响应调整
   * @param account - 账户数据
   * @returns ML Score 或 undefined
   */
  private extractMLScore(account: Account): number | undefined {
    // 尝试从 metadata 中提取 mlScore
    if (account.metadata && 'mlScore' in account.metadata) {
      return (account.metadata as any).mlScore;
    }

    // 尝试从 attributes 中查找
    if (account.metadata?.attributes) {
      const mlScoreAttr = account.metadata.attributes.find(
        (attr) => attr.key === 'mlScore' || attr.key === 'ml_score'
      );
      if (mlScoreAttr) {
        const score = parseFloat(mlScoreAttr.value);
        return isNaN(score) ? undefined : score;
      }
    }

    // 如果直接在 account 对象上
    if ('mlScore' in account) {
      return (account as any).mlScore;
    }

    return undefined;
  }

  /**
   * 验证以太坊地址格式
   * @param address - 地址字符串
   * @returns 是否有效
   */
  private isValidAddress(address: string): boolean {
    // 基本的以太坊地址验证（0x 开头，42 个字符）
    return /^0x[a-fA-F0-9]{40}$/.test(address);
  }

  /**
   * 将数组分批
   * @param array - 原始数组
   * @param batchSize - 批次大小
   * @returns 分批后的数组
   */
  private createBatches<T>(array: T[], batchSize: number): T[][] {
    const batches: T[][] = [];
    for (let i = 0; i < array.length; i += batchSize) {
      batches.push(array.slice(i, i + batchSize));
    }
    return batches;
  }

  /**
   * 切换到测试网
   */
  useTestnet(): void {
    this.endpoint = LENS_API_CONFIG.TESTNET_ENDPOINT;
    this.client = new GraphQLClient(this.endpoint, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  /**
   * 切换到主网
   */
  useMainnet(): void {
    this.endpoint = LENS_API_CONFIG.MAINNET_ENDPOINT;
    this.client = new GraphQLClient(this.endpoint, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  /**
   * 获取当前使用的端点
   */
  getEndpoint(): string {
    return this.endpoint;
  }
}

/**
 * 创建默认的 ML Score 获取器实例
 * @param endpoint - 可选的自定义端点
 * @returns LensMLScoreFetcher 实例
 */
export function createMLScoreFetcher(endpoint?: string): LensMLScoreFetcher {
  return new LensMLScoreFetcher(endpoint);
}
