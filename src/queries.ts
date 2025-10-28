/**
 * Lens Protocol GraphQL 查询语句
 */

/**
 * 获取单个账户信息的 GraphQL 查询
 * 包含地址、用户名、元数据和 ML Score
 */
export const ACCOUNT_QUERY = `
  query Account($request: AccountRequest!) {
    account(request: $request) {
      address
      username {
        value
        namespace
      }
      metadata {
        name
        bio
        picture
      }
      mlScore
    }
  }
`;

/**
 * 批量获取多个账户信息的 GraphQL 查询
 * 支持一次性获取多个账户的详细信息
 */
export const ACCOUNTS_BULK_QUERY = `
  query AccountsBulk($request: AccountsBulkRequest!) {
    accountsBulk(request: $request) {
      items {
        address
        username {
          value
          namespace
        }
        metadata {
          name
          bio
          picture
        }
        mlScore
      }
    }
  }
`;

/**
 * 搜索账户的 GraphQL 查询
 * 可用于按用户名或其他条件搜索账户
 */
export const ACCOUNTS_SEARCH_QUERY = `
  query Accounts($request: AccountsRequest!) {
    accounts(request: $request) {
      items {
        address
        username {
          value
          namespace
        }
        metadata {
          name
          bio
          picture
        }
        mlScore
      }
      pageInfo {
        next
      }
    }
  }
`;
