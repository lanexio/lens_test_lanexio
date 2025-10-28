/**
 * Lens Protocol API 配置
 * Configuration for Lens Protocol API
 */
export const LENS_API_URL = 'https://api-v2.lens.dev';

/**
 * Lens Protocol GraphQL 查询
 * GraphQL Queries for Lens Protocol
 */

/**
 * 获取单个账户信息及ML分数的查询
 * Query to fetch a single account with ML score
 */
export const GET_ACCOUNT_QUERY = `
  query GetAccount($request: AccountRequest!) {
    account(request: $request) {
      address
      username {
        value
        namespace
        localName
      }
      metadata {
        name
        bio
        picture
      }
      operations {
        id
        isFollowedByMe
        isFollowingMe
      }
      score
    }
  }
`;

/**
 * 批量获取账户信息及ML分数的查询
 * Query to fetch multiple accounts with ML scores
 */
export const GET_ACCOUNTS_BULK_QUERY = `
  query GetAccountsBulk($request: AccountsRequest!) {
    accounts(request: $request) {
      items {
        address
        username {
          value
          namespace
          localName
        }
        metadata {
          name
          bio
          picture
        }
        operations {
          id
          isFollowedByMe
          isFollowingMe
        }
        score
      }
      pageInfo {
        next
        prev
      }
    }
  }
`;

/**
 * 搜索账户的查询（支持用户名搜索）
 * Query to search accounts by username
 */
export const SEARCH_ACCOUNTS_QUERY = `
  query SearchAccounts($request: AccountsRequest!) {
    accounts(request: $request) {
      items {
        address
        username {
          value
          namespace
          localName
        }
        metadata {
          name
          bio
          picture
        }
        score
      }
      pageInfo {
        next
        prev
      }
    }
  }
`;
