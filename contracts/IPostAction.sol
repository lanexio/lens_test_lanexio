// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title IPostAction
 * @dev Interface for a post action that can be attached to a Lens post metadata.
 * The action defines a `onCollect` hook which will be invoked when a user collects the post.
 */
interface IPostAction {
    /**
     * Called when a user collects the post.
     * @param collector The address performing the collect action
     * @param postId The post identifier (opaque)
     */
    function onCollect(address collector, bytes calldata postId) external;
}
