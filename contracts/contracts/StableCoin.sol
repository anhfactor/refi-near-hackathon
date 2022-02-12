// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract StableCoin is ERC20 {
    constructor() ERC20("StableCoin EUR", "eEUR") {
        _mint(msg.sender, 10000000 * (10**18));
    }
}
