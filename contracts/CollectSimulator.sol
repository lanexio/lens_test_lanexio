// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./PostWithAction.sol";
import "./IPostAction.sol";

/**
 * @title CollectSimulator
 * @dev A simple contract to simulate a user collecting a post. It locates the post's action via PostWithAction
 * and calls the action's onCollect. In a real Lens environment, Lens's collect router would invoke actions.
 */
contract CollectSimulator {
    PostWithAction public poster;

    event SimulatedCollect(address indexed user, bytes indexed postId, address action);

    constructor(address posterAddr) {
        poster = PostWithAction(posterAddr);
    }

    function collect(bytes calldata postId) external {
        address action = poster.getActionForPost(postId);
        require(action != address(0), "CollectSimulator: no action for post");

        IPostAction(action).onCollect(msg.sender, postId);

        emit SimulatedCollect(msg.sender, postId, action);
    }
}
