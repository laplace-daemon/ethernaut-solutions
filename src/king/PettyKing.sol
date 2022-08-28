// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

interface King {}

contract PettyKing {
    function claimThrone(address payable throne) external payable {
        (bool sent, ) = throne.call{value: msg.value}('');
        require(sent, 'failed to send ETH');
    }
}
