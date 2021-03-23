// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract FreshAFPunks is ERC721, Ownable {
    uint256 public hardLimit;
    address payable wallet;

    constructor(address payable _wallet) ERC721("FreshAFPunks", "FRESHAF") public {
        wallet = _wallet;
        hardLimit = 12500;
        _setBaseURI("https://freshafpunks-metadata-api.herokuapp.com/api/token/");
    }

    function contractURI() public view returns (string memory) {
        return "https://freshafpunks-metadata-api.herokuapp.com/api/store-metadata";
    }

    function setBaseURI(string memory baseURI) public onlyOwner {
        _setBaseURI(baseURI);
    }

    function changeWallet(address payable _newWallet) public onlyOwner {
        wallet = _newWallet;
    }

    function mint(uint tokenID) public payable {
        uint cost = getCurrentPrice();
        
        require(tokenID <= hardLimit, "TokenID is invalid");
        require(msg.value >=cost, "Cost of FreshAFPunk is not met");
        require(!_exists(tokenID), 'FreshAFPunk already sold');
                        
        _safeMint(msg.sender, tokenID);
        wallet.transfer(msg.value);
    }

    function getCurrentPrice() public view returns (uint256)  {
        uint256 totalSupply = totalSupply();
        uint price = 0;

        if(totalSupply <= 30) {
            price = 0.00 ether;
        } else if(totalSupply > 30 && totalSupply <= 299) {
            price = 0.01 ether;
        } else if(totalSupply > 299 && totalSupply <= 799) {
            price = 0.02 ether;
        } else if(totalSupply > 799 && totalSupply <= 1499) {
            price = 0.03 ether;
        } else if(totalSupply > 1499 && totalSupply <= 2299) {
            price = 0.04 ether;
        }  else if(totalSupply > 2299 && totalSupply <= 2999) {
            price = 0.05 ether;
        }  else if(totalSupply > 2999 && totalSupply <= 3699) {
            price = 0.10 ether;
        } else if(totalSupply > 3699 && totalSupply <= 4399) {
            price = 0.11 ether;
        } else if(totalSupply > 4399 && totalSupply <= 5099) {
            price = 0.12 ether;
        } else if(totalSupply > 5099 && totalSupply <= 5799) {
            price = 0.13 ether;
        } else if(totalSupply > 5799 && totalSupply <= 6499) {
            price = 0.14 ether;
        }  else if(totalSupply > 6499 && totalSupply <= 7199) {
            price = 0.28 ether;
        }  else if(totalSupply > 7199 && totalSupply <= 7899) {
            price = 0.29 ether;
        }  else if(totalSupply > 7899 && totalSupply <= 8599) {
            price = 0.30 ether;
        }  else if(totalSupply > 8599 && totalSupply <= 9299) {
            price = 0.31 ether;
        } else if(totalSupply > 9299 && totalSupply <= 9999) {
            price = 0.32 ether;
        } else if(totalSupply > 9999 && totalSupply <= 10699) {
            price = 0.64 ether;
        } else if(totalSupply > 10699 && totalSupply <= 11399) {
            price = 0.65 ether;
        } else if(totalSupply > 11399 && totalSupply <= 12099) {
            price = 0.66 ether;
        }  else if(totalSupply > 12099 && totalSupply <= 12500) {
            price = 0.83 ether;
        }

        return price;
    }


}