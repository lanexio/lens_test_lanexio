// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./IPostAction.sol";

/**
 * @title ActionHub
 * @dev Registry for post actions. Contracts can be registered and then referenced from post metadata.
 */
contract ActionHub {
    mapping(bytes32 => address) public actions;
    address public owner;

    event ActionRegistered(bytes32 indexed key, address indexed impl);
    event ActionUnregistered(bytes32 indexed key);

    modifier onlyOwner() {
        require(msg.sender == owner, "ActionHub: only owner");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function registerAction(bytes32 key, address impl) external onlyOwner {
        actions[key] = impl;
        emit ActionRegistered(key, impl);
    }

    function unregisterAction(bytes32 key) external onlyOwner {
        delete actions[key];
        emit ActionUnregistered(key);
    }

    function getAction(bytes32 key) external view returns (address) {
        return actions[key];
    }
}
