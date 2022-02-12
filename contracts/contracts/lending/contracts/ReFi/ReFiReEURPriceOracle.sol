pragma solidity ^0.5.8;

import "./src/PriceOracle.sol";
import "./src/Exponential.sol";

contract ReFiReEURPriceOracle is PriceOracle, Exponential {
    
    bool public constant isPriceOracle = true;
  
    function getUnderlyingPrice(CToken cToken) public view returns (uint) {
        address cTokenAddress = address(cToken);
            return 1e18;
        }
  
  }
