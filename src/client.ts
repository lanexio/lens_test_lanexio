import { GraphQLClient } from 'graphql-request';
import {
  LENS_API_URL,
  GET_ACCOUNT_QUERY,
  GET_ACCOUNTS_BULK_QUERY,
  SEARCH_ACCOUNTS_QUERY,
} from './config.js';
import type {
  Account,
  AccountRequest,
  AccountsRequest,
  AccountResponse,
  AccountsResponse,
} from './types.js';

/**
 * Lens Protocol ML Score 客户端
 * Lens Protocol ML Score Client
 */
export class LensMLScoreClient {
  private client: GraphQLClient;

  constructor(apiUrl: string = LENS_API_URL) {
    this.client = new GraphQLClient(apiUrl, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  /**
   * 获取单个账户的ML分数
   * Fetch ML score for a single account
   * 
   * @param address - 账户地址 (Account address)
   * @returns 账户信息及ML分数 (Account information with ML score)
   */
  async getAccountMLScore(address: string): Promise<Account | null> {
    try {
      const request: AccountRequest = { address };
      const response = await this.client.request<AccountResponse>(
        GET_ACCOUNT_QUERY,
        { request }
      );
      return response.account;
    } catch (error) {
      console.error(`获取账户 ${address} 的ML分数失败:`, error);
      throw error;
    }
  }

  /**
   * 批量获取多个账户的ML分数
   * Fetch ML scores for multiple accounts
   * 
   * @param addresses - 账户地址列表 (List of account addresses)
   * @returns 账户信息列表及ML分数 (List of accounts with ML scores)
   */
  async getAccountsMLScores(addresses: string[]): Promise<Account[]> {
    try {
      const request: AccountsRequest = { addresses };
      const response = await this.client.request<AccountsResponse>(
        GET_ACCOUNTS_BULK_QUERY,
        { request }
      );
      return response.accounts.items;
    } catch (error) {
      console.error('批量获取账户ML分数失败:', error);
      throw error;
    }
  }

  /**
   * 通过用户名搜索账户并获取ML分数
   * Search accounts by username and get ML scores
   * 
   * @param username - 用户名或用户名片段 (Username or username fragment)
   * @returns 匹配的账户列表及ML分数 (List of matching accounts with ML scores)
   */
  async searchAccountsByUsername(username: string): Promise<Account[]> {
    try {
      const request: AccountsRequest = {
        filter: {
          searchBy: {
            localNameQuery: username,
          },
        },
      };
      const response = await this.client.request<AccountsResponse>(
        SEARCH_ACCOUNTS_QUERY,
        { request }
      );
      return response.accounts.items;
    } catch (error) {
      console.error(`搜索用户名 ${username} 失败:`, error);
      throw error;
    }
  }

  /**
   * 格式化输出账户ML分数信息
   * Format and display account ML score information
   * 
   * @param account - 账户信息 (Account information)
   */
  static formatAccountInfo(account: Account): string {
    const username = account.username?.value || '未设置用户名';
    const name = account.metadata?.name || '未设置名称';
    const bio = account.metadata?.bio || '无简介';
    const score = account.score;

    return `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 账户信息 / Account Information
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔑 地址 / Address:    ${account.address}
👤 用户名 / Username:  ${username}
✏️  名称 / Name:       ${name}
📝 简介 / Bio:         ${bio.substring(0, 50)}${bio.length > 50 ? '...' : ''}
⭐ ML分数 / ML Score:  ${score}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    `.trim();
  }

  /**
   * 批量格式化输出账户ML分数信息
   * Format and display multiple accounts ML score information
   * 
   * @param accounts - 账户列表 (List of accounts)
   */
  static formatAccountsList(accounts: Account[]): string {
    if (accounts.length === 0) {
      return '未找到账户信息 / No accounts found';
    }

    let output = '\n╔═══════════════════════════════════════════════════════════════╗\n';
    output += '║          📊 账户ML分数列表 / Accounts ML Scores List          ║\n';
    output += '╚═══════════════════════════════════════════════════════════════╝\n\n';

    accounts.forEach((account, index) => {
      const username = account.username?.value || '未设置';
      const name = account.metadata?.name || '未设置';
      output += `${index + 1}. 地址/Address: ${account.address}\n`;
      output += `   用户名/Username: ${username}\n`;
      output += `   名称/Name: ${name}\n`;
      output += `   ⭐ ML分数/Score: ${account.score}\n`;
      output += '   ' + '─'.repeat(60) + '\n';
    });

    return output;
  }
}
