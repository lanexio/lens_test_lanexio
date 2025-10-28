// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./IPostAction.sol";
import "./ActionHub.sol";

/**
 * @title PostWithAction
 * @dev Simulated poster contract that would be used to create a post on Lens that includes
 * a reference to a post action (IPostAction) implemented by another contract.
 *
 * This contract only simulates constructing post metadata and storing the action reference.
 */
contract PostWithAction {
    struct Post {
        address author;
        bytes postId;
        bytes metadata; // arbitrary
        bytes32 actionKey; // key in ActionHub
    }

    ActionHub public hub;
    mapping(bytes => Post) public posts; // key by postId

    event PostCreated(address indexed author, bytes indexed postId, bytes32 actionKey);

    constructor(address actionHub) {
        hub = ActionHub(actionHub);
    }

    function createPost(bytes calldata postId, bytes calldata metadata, bytes32 actionKey) external {
        posts[postId] = Post({author: msg.sender, postId: postId, metadata: metadata, actionKey: actionKey});
        emit PostCreated(msg.sender, postId, actionKey);
    }

    function getActionForPost(bytes calldata postId) public view returns (address) {
        Post storage p = posts[postId];
        return hub.getAction(p.actionKey);
    }
}
