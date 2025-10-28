Contracts overview and deployment notes

1) PalsToken.sol
   - ERC20 token named GRASSPALSTEST (PALSTEST)
   - Total supply: 100_000_000_000 tokens (minted to token contract address)
   - Owner can authorize addresses allowed to call `airdrop` which transfers from contract balance

2) ActionHub.sol
   - Simple registry mapping a key -> action contract address. Owner-managed.

3) PostWithAction.sol
   - Simulates creating a post with metadata and an actionKey referencing ActionHub.

4) SimpleCollectAction.sol
   - Implements IPostAction; when `onCollect` is invoked, calls token.airdrop(collector, 100e18)

5) CollectSimulator.sol
   - Simulates a collector calling `collect(postId)` which resolves the action and invokes it.

Deployment steps (recommended order):
 - Deploy PalsToken
 - Deploy ActionHub
 - Deploy PostWithAction with actionHub address
 - Deploy SimpleCollectAction with palsToken address
 - From ActionHub.registerAction register a key (e.g. keccak256("simple-collect")) -> SimpleCollectAction address
 - From PalsToken.owner call setAuthorized(SimpleCollectAction.address, true)
 - Use PostWithAction.createPost(postId, metadata, actionKey) to create a post that references the action
 - Use CollectSimulator.collect(postId) to simulate a user collecting and receiving the airdrop

Notes:
 - This is a simulation of Lens integration. In production, Lens's off-chain metadata + on-chain collect router
   would need to reference the action contract. Ensure appropriate ACLs if exposing on mainnet.
