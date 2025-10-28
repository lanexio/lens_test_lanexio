// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title PalsToken
 * @dev ERC20 token named GRASSPALSTEST (PALSTEST). Total supply = 1000亿 (100,000,000,000) tokens.
 * The entire supply is minted to the token contract itself on deployment and no further minting
 * is allowed. The contract exposes an `airdrop` method which transfers tokens from the token
 * contract balance to recipients, but only callable by authorized addresses set by the owner.
 */
contract PalsToken is ERC20, Ownable {
    mapping(address => bool) public authorized;

    constructor() ERC20("GRASSPALSTEST", "PALSTEST") {
        // 1000 亿 = 100,000,000,000
        uint256 total = 100_000_000_000 * (10 ** decimals());
        _mint(address(this), total);
    }

    /**
     * @dev Owner can grant/revoke authorization for addresses allowed to trigger airdrops
     */
    function setAuthorized(address who, bool ok) external onlyOwner {
        authorized[who] = ok;
    }

    /**
     * @dev Airdrop tokens from the token contract balance to `to`.
     * Only callable by addresses marked authorized.
     */
    function airdrop(address to, uint256 amount) external {
        require(authorized[msg.sender], "PalsToken: caller not authorized");
        _transfer(address(this), to, amount);
    }
}
