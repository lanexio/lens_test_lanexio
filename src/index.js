/**
 * Lens Protocol ML Score Fetcher
 * 获取Lens协议用户的ML Score（机器学习评分）
 * 
 * 注意：本实现使用GraphQL直接查询Lens API，支持最新的ML Score功能
 */

import { GraphQLClient, gql } from 'graphql-request';

// Lens API GraphQL endpoint
const LENS_API_URL = 'https://api.lens.xyz/graphql';

/**
 * 初始化GraphQL客户端
 * @returns {GraphQLClient} GraphQL客户端实例
 */
function initGraphQLClient() {
  return new GraphQLClient(LENS_API_URL);
}

/**
 * 获取单个用户的ML Score（使用GraphQL）
 * @param {GraphQLClient} client - GraphQL客户端
 * @param {string} accountId - 用户ID（可以是地址或用户名）
 * @returns {Promise<Object>} 包含用户信息和ML Score的对象
 */
async function fetchSingleMLScore(client, accountId) {
  try {
    // 判断是否为以太坊地址
    const isAddress = accountId.startsWith('0x');
    
    let query;
    let variables;
    
    if (isAddress) {
      // 使用地址查询
      query = gql`
        query GetAccount($address: EvmAddress!) {
          account(request: { address: $address }) {
            address
            username {
              value
              localName
            }
            metadata {
              name
              bio
              picture
            }
            operations {
              id
              isFollowedByMe {
                value
              }
            }
            mlScore
            createdAt
          }
        }
      `;
      variables = { address: accountId };
    } else {
      // 使用用户名查询
      query = gql`
        query GetAccount($username: String!) {
          account(request: { username: { localName: $username } }) {
            address
            username {
              value
              localName
            }
            metadata {
              name
              bio
              picture
            }
            operations {
              id
              isFollowedByMe {
                value
              }
            }
            mlScore
            createdAt
          }
        }
      `;
      variables = { username: accountId };
    }

    const data = await client.request(query, variables);

    if (!data || !data.account) {
      return {
        id: accountId,
        success: false,
        error: '未找到用户',
        mlScore: null,
      };
    }

    const account = data.account;
    return {
      id: accountId,
      success: true,
      address: account.address,
      username: account.username?.localName || account.username?.value,
      name: account.metadata?.name,
      bio: account.metadata?.bio,
      mlScore: account.mlScore || null,
      accountData: {
        createdAt: account.createdAt,
        operations: account.operations,
      },
    };
  } catch (error) {
    return {
      id: accountId,
      success: false,
      error: error.message,
      mlScore: null,
    };
  }
}

/**
 * 批量获取多个用户的ML Score
 * @param {Array<string>} accountIds - 用户ID列表
 * @returns {Promise<Array<Object>>} 包含所有用户信息和ML Score的数组
 */
async function fetchMLScores(accountIds) {
  console.log('🚀 开始获取ML Scores...');
  console.log(`📋 用户列表: ${accountIds.join(', ')}`);
  console.log('-----------------------------------');

  const client = initGraphQLClient();
  const results = [];

  for (const accountId of accountIds) {
    console.log(`\n🔍 正在查询: ${accountId}`);
    const result = await fetchSingleMLScore(client, accountId);
    results.push(result);

    if (result.success) {
      console.log(`✅ 成功获取用户信息`);
      console.log(`   地址: ${result.address}`);
      console.log(`   用户名: ${result.username || '无'}`);
      console.log(`   名称: ${result.name || '无'}`);
      console.log(`   ML Score: ${result.mlScore !== null ? result.mlScore : '暂无评分'}`);
    } else {
      console.log(`❌ 获取失败: ${result.error}`);
    }
  }

  console.log('\n===================================');
  console.log('📊 汇总结果:');
  console.log(`   总计查询: ${accountIds.length} 个用户`);
  console.log(`   成功: ${results.filter(r => r.success).length} 个`);
  console.log(`   失败: ${results.filter(r => !r.success).length} 个`);
  console.log('===================================\n');

  return results;
}

/**
 * 批量获取ML Scores（使用Lens的批量查询API）
 * @param {Array<string>} addresses - 以太坊地址列表
 * @returns {Promise<Array<Object>>} 包含所有用户信息和ML Score的数组
 */
async function fetchMLScoresBulk(addresses) {
  console.log('🚀 开始批量获取ML Scores...');
  console.log(`📋 地址列表: ${addresses.join(', ')}`);
  console.log('-----------------------------------');

  const client = initGraphQLClient();

  try {
    const query = gql`
      query GetAccounts($addresses: [EvmAddress!]!) {
        accounts(request: { addresses: $addresses }) {
          items {
            address
            username {
              value
              localName
            }
            metadata {
              name
              bio
              picture
            }
            operations {
              id
              isFollowedByMe {
                value
              }
            }
            mlScore
            createdAt
          }
        }
      }
    `;

    const data = await client.request(query, { addresses });

    if (!data || !data.accounts || !data.accounts.items) {
      console.error('❌ 批量查询失败: 未返回数据');
      return [];
    }

    const processedResults = data.accounts.items.map(account => ({
      id: account.address,
      success: true,
      address: account.address,
      username: account.username?.localName || account.username?.value,
      name: account.metadata?.name,
      bio: account.metadata?.bio,
      mlScore: account.mlScore || null,
      accountData: {
        createdAt: account.createdAt,
        operations: account.operations,
      },
    }));

    console.log('\n===================================');
    console.log('📊 批量查询结果:');
    console.log(`   成功获取: ${processedResults.length} 个用户`);
    processedResults.forEach((result, index) => {
      console.log(`\n   [${index + 1}] ${result.address}`);
      console.log(`       用户名: ${result.username || '无'}`);
      console.log(`       名称: ${result.name || '无'}`);
      console.log(`       ML Score: ${result.mlScore !== null ? result.mlScore : '暂无评分'}`);
    });
    console.log('===================================\n');

    return processedResults;
  } catch (error) {
    console.error(`❌ 批量查询失败: ${error.message}`);
    return [];
  }
}

/**
 * 搜索账户并获取ML Scores
 * @param {string} searchQuery - 搜索关键词
 * @param {number} limit - 返回结果数量限制
 * @returns {Promise<Array<Object>>} 包含搜索结果和ML Score的数组
 */
async function searchAccountsWithMLScore(searchQuery, limit = 10) {
  console.log(`🔍 搜索账户: "${searchQuery}"`);
  console.log('-----------------------------------');

  const client = initGraphQLClient();

  try {
    const query = gql`
      query SearchAccounts($query: String!, $limit: Int!) {
        searchAccounts(request: { query: $query, limit: $limit }) {
          items {
            address
            username {
              value
              localName
            }
            metadata {
              name
              bio
              picture
            }
            mlScore
            createdAt
          }
        }
      }
    `;

    const data = await client.request(query, { 
      query: searchQuery,
      limit: limit 
    });

    if (!data || !data.searchAccounts || !data.searchAccounts.items) {
      console.log('未找到匹配的账户');
      return [];
    }

    const results = data.searchAccounts.items.map(account => ({
      address: account.address,
      username: account.username?.localName || account.username?.value,
      name: account.metadata?.name,
      bio: account.metadata?.bio,
      mlScore: account.mlScore || null,
      createdAt: account.createdAt,
    }));

    console.log(`\n✅ 找到 ${results.length} 个账户:`);
    results.forEach((result, index) => {
      console.log(`\n   [${index + 1}] ${result.username || result.address}`);
      console.log(`       名称: ${result.name || '无'}`);
      console.log(`       ML Score: ${result.mlScore !== null ? result.mlScore : '暂无评分'}`);
    });
    console.log('===================================\n');

    return results;
  } catch (error) {
    console.error(`❌ 搜索失败: ${error.message}`);
    return [];
  }
}

export { initGraphQLClient, fetchSingleMLScore, fetchMLScores, fetchMLScoresBulk, searchAccountsWithMLScore };
