// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./IPostAction.sol";
import "./PalsToken.sol";

/**
 * @title SimpleCollectAction
 * @dev When a user collects a post that references this action, the action will
 * 1) perform any base collect behavior (simulated here), and 2) airdrop 100 PALSTEST tokens to the collector.
 *
 * The action expects the PalsToken to have been deployed and this contract authorized as an airdropper.
 */
contract SimpleCollectAction is IPostAction {
    PalsToken public token;
    uint256 public constant AIRDROP_AMOUNT = 100 * (10 ** 18);

    event Collected(address indexed collector, bytes postId, uint256 airdropped);

    constructor(address palsToken) {
        token = PalsToken(palsToken);
    }

    function onCollect(address collector, bytes calldata postId) external override {
        // In a real Lens integration, we would validate the caller is the Lens collect router.
        // Here we trust the caller; in production add ACL checks.

        // Perform the airdrop from token contract balance to collector
        token.airdrop(collector, AIRDROP_AMOUNT);

        emit Collected(collector, postId, AIRDROP_AMOUNT);
    }
}
