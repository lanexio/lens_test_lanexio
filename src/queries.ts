/**
 * GraphQL 查询语句
 * 
 * 用于从 Lens Protocol API 获取账户信息和 ML Score
 */

/**
 * 查询单个账户的 GraphQL 语句
 * 包含地址、用户名、元数据和 ML Score
 */
export const GET_ACCOUNT_QUERY = `
  query GetAccount($address: EvmAddress!) {
    account(request: { address: $address }) {
      address
      username {
        value
        localName
        namespace
      }
      metadata {
        name
        bio
        picture
        coverPicture
        attributes {
          key
          value
        }
      }
      operations {
        canBlock
        canUnblock
        canFollow
        canUnfollow
        isBlockedByMe
        isFollowedByMe
      }
    }
  }
`;

/**
 * 批量查询账户的 GraphQL 语句
 * 支持一次查询多个账户的信息
 */
export const GET_ACCOUNTS_BULK_QUERY = `
  query GetAccountsBulk($addresses: [EvmAddress!]!) {
    accountsBulk(request: { addresses: $addresses }) {
      address
      username {
        value
        localName
        namespace
      }
      metadata {
        name
        bio
        picture
        coverPicture
        attributes {
          key
          value
        }
      }
      operations {
        canBlock
        canUnblock
        canFollow
        canUnfollow
        isBlockedByMe
        isFollowedByMe
      }
    }
  }
`;

/**
 * 通过用户名查询账户
 */
export const GET_ACCOUNT_BY_USERNAME_QUERY = `
  query GetAccountByUsername($username: Username!) {
    account(request: { username: $username }) {
      address
      username {
        value
        localName
        namespace
      }
      metadata {
        name
        bio
        picture
        coverPicture
        attributes {
          key
          value
        }
      }
      operations {
        canBlock
        canUnblock
        canFollow
        canUnfollow
        isBlockedByMe
        isFollowedByMe
      }
    }
  }
`;
