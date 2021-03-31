// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract FreshAFPunks is ERC721Enumerable {
    uint256 public hardLimit;
    address payable wallet;

    constructor(address payable _wallet) ERC721("FreshAFPunks", "FRESHAF") {
        wallet = _wallet;
        hardLimit = 12500;
    }

    function contractURI() public pure returns (string memory) {
        return "https://freshafpunks-metadata-api.herokuapp.com/api/store-metadata";
    }

    function _baseURI() internal pure override returns (string memory){
        return "https://freshafpunks-metadata-api.herokuapp.com/api/token/";
    }

    function mint(uint[] memory tokenIDs) public payable {           
        require(totalSupply() + tokenIDs.length <= hardLimit, "TokenID is invalid");
        if(msg.sender != wallet) {
            uint cost = getCurrentPrice() * tokenIDs.length;
            require(msg.value >=cost, "Cost of FreshAFPunk is not met");
        }

        for(uint256 i = 0; i < tokenIDs.length; i++) {
            require(!_exists(tokenIDs[i]), 'FreshAFPunk already sold');
        }

        for(uint256 i = 0; i < tokenIDs.length; i++) {
            _safeMint(msg.sender, tokenIDs[i]);
        }

        wallet.transfer(msg.value);
    }

    function getCurrentPrice() public view returns (uint256)  {
        uint256 totalSupply = totalSupply();

        if(totalSupply <= 299) {
            return 0.01 ether;
        } else if(totalSupply > 299 && totalSupply <= 799) {
            return 0.02 ether;
        } else if(totalSupply > 799 && totalSupply <= 1499) {
            return 0.03 ether;
        } else if(totalSupply > 1499 && totalSupply <= 2299) {
            return 0.04 ether;
        }  else if(totalSupply > 2299 && totalSupply <= 2999) {
            return 0.05 ether;
        }  else if(totalSupply > 2999 && totalSupply <= 3699) {
            return 0.10 ether;
        } else if(totalSupply > 3699 && totalSupply <= 4399) {
            return 0.11 ether;
        } else if(totalSupply > 4399 && totalSupply <= 5099) {
            return 0.12 ether;
        } else if(totalSupply > 5099 && totalSupply <= 5799) {
            return 0.13 ether;
        } else if(totalSupply > 5799 && totalSupply <= 6499) {
            return 0.14 ether;
        }  else if(totalSupply > 6499 && totalSupply <= 7199) {
            return 0.28 ether;
        }  else if(totalSupply > 7199 && totalSupply <= 7899) {
            return 0.29 ether;
        }  else if(totalSupply > 7899 && totalSupply <= 8599) {
            return 0.30 ether;
        }  else if(totalSupply > 8599 && totalSupply <= 9299) {
            return 0.31 ether;
        } else if(totalSupply > 9299 && totalSupply <= 9999) {
            return 0.32 ether;
        } else if(totalSupply > 9999 && totalSupply <= 10699) {
            return 0.64 ether;
        } else if(totalSupply > 10699 && totalSupply <= 11399) {
            return 0.65 ether;
        } else if(totalSupply > 11399 && totalSupply <= 12099) {
            return 0.66 ether;
        }  else if(totalSupply > 12099 && totalSupply <= 12500) {
            return 0.83 ether;
        }

        return 0.01 ether;
    }
}