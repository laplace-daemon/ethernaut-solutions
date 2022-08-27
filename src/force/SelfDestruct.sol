// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

contract SelfDestruct {
    constructor(address payable target) public payable {
        selfdestruct(target);
    }
}
