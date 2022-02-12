pragma solidity ^0.5.8;

import "./src/WhitePaperInterestRateModel.sol";

contract ReFiReEURInterestRateModel is WhitePaperInterestRateModel {
    constructor()
    WhitePaperInterestRateModel(
      0.05 * (10 ** 18),
      0.12 * (10 ** 18)
    )
    public
    {}
}
