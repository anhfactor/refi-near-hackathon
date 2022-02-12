
pragma solidity ^0.5.8;

import "./src/CErc20.sol";

contract ReEUR  is CErc20 {
    constructor(
      address _token,
      ComptrollerInterface _comptroller,
      InterestRateModel _interestRateModel
    )
    CErc20(
      _token,
      _comptroller,
      _interestRateModel,
      200000000 * (10 ** 18),
      "ReFi EUR",
      "reEUR",
      8
    )
    public
    {}
}




