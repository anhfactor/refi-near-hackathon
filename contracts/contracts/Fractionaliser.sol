//pav 05.12.2021
// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Fractionaliser is ERC20 {
    //DSO initialize state variables
    address admin;
    address paymentAddress;
    address nftMinterAddress;
    uint256 public fractionsAmount;
    uint256 public fractionalisationFee;
    uint256 public nftId;
    uint256 public EURAmount;

    IERC721 public nftMinter;
    IERC20 public eEUR;

    //DSO initialises the Ownership-NFT to the fractionaliser contract
    constructor(
        address _nftMinterAddress,
        uint256 _fractionalisationFee,
        address _paymentAddress
    ) ERC20("PV-Ownership Fractions", "PVF") {
        fractionalisationFee = _fractionalisationFee;
        admin = msg.sender;
        paymentAddress = _paymentAddress;
        nftMinterAddress = _nftMinterAddress;
    }

    //Alice (PV-System Owner) stakes PV-Ownership's certificate (NFT)
    //Fraction are minted and transfered to Alices's adderess
    function fractionalise(uint256 _nftId, uint256 _fractionsAmount) external {
        nftId = _nftId;
        nftMinter = IERC721(nftMinterAddress);
        fractionsAmount = _fractionsAmount;
        eEUR = IERC20(paymentAddress);
        nftMinter.transferFrom(msg.sender, address(this), nftId);
        EURAmount = fractionsAmount * fractionalisationFee;
        eEUR.transferFrom(msg.sender, address(this), EURAmount);
        _mint(msg.sender, fractionsAmount);
    }
}
