// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract StableCoin is ERC20 {
    //mapping to keep track of requested rokens
    mapping(address => uint) public lockTime;

    constructor() ERC20("StableCoin EUR", "eEUR") {
        _mint(msg.sender, 10000000 * (10**18));
    }

    function requestTokens() external {
        require(block.timestamp > lockTime[msg.sender], "lock time has not expired. Please try again later");

        uint256 amount = 10000 * (10**18); // Fixed eEUR faucet 10000 eEUR
        _mint(msg.sender, amount);

        //updates locktime 10 secondsfrom now
        lockTime[msg.sender] = block.timestamp + 10;
    }
}
