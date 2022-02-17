// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

// handle ownership
// https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol
import "@openzeppelin/contracts/access/Ownable.sol";

contract OwnershipCreator is ERC721, Ownable {
    uint256 public nextTokenId;
    string public _url;

    constructor(string memory url) ERC721("Ownership PV-System", "OPV") {
        _url = url;
    }

    function CreateCertificate(address to) external {
        _safeMint(to, nextTokenId);
        nextTokenId++;
    }

    function setUrl(string memory url) external onlyOwner {
        _url = url;
    }

    function getUrl() external view onlyOwner returns (string memory) {
        return _url;
    }

    function _baseURI() internal view override returns (string memory) {
        return _url;
    }
}
