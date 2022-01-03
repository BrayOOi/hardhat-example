// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "hardhat/console.sol";

contract NumberChanger {
  uint256 public number;

  constructor(uint256 _number) {
    console.log('initial number', _number);
    number = _number;
  }

  function setNumber(uint256 _number) public {
    console.log(_number);
    number = _number;
  }
}