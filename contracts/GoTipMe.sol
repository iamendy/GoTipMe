// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract GoTipMe is ReentrancyGuard {
  using Counters for Counters.Counter;
  Counters.Counter counter;

  struct Tip {
    uint id;
    address owner;
    string title;
    string description;
    uint maxAmount;
    bool isActive;
    uint createdAt;
  }

  struct Payment {
    uint tipId;
    address owner;
    address giver;
    uint amount;
  }

  //for storing all tips created by a user
  mapping(address => Tip[]) allUserTips;

  //to get a single tip
  mapping(address => mapping(uint => Tip)) tips;

  //for storing all payments received from a Tip
  mapping(uint => Payment[]) tipPayments;

  event NewTipCreated(
    uint id,
    address indexed owner,
    string title,
    string description,
    uint maxAmount,
    bool isActive,
    uint createdAt
  );
  event NewPaymentReceived(
    uint tipId,
    address indexed owner,
    address indexed giver,
    uint amount
  );

  //create a new tip
  function createNewTip(
    string memory _title,
    string memory _description,
    uint _maxAmount
  ) external {
    counter.increment();

    Tip memory tip = Tip({
      id: counter.current(),
      owner: msg.sender,
      title: _title,
      description: _description,
      maxAmount: _maxAmount,
      isActive: true,
      createdAt: block.timestamp
    });

    //save new tip template to caller
    allUserTips[msg.sender].push(tip);
    tips[msg.sender][counter.current()] = tip;

    //broadcast event
    emit NewTipCreated(
      counter.current(),
      msg.sender,
      _title,
      _description,
      _maxAmount,
      true,
      tip.createdAt
    );
  }

  //get all tips created by a user
  function getUserTips(address user) external view returns (Tip[] memory) {
    Tip[] memory userTips = new Tip[](allUserTips[user].length);
    for (uint i = 0; i < allUserTips[user].length; i++) {
      userTips[i] = allUserTips[user][i];
    }

    return userTips;
  }

  //get a single tip for making payments
  function getTip(
    address _user,
    uint _tipId
  ) external view returns (Tip memory) {
    //check if Tip exists
    Tip memory tip = tips[_user][_tipId];
    require(tip.id > 0, "404. Not found");
    return tip;
  }

  //to get all payments for an owner's Tip
  function getTipPayments(
    address _user,
    uint _tipId
  ) external view returns (Payment[] memory) {
    Tip memory tip = tips[_user][_tipId];

    //checks if owner is caller
    require(tip.owner == msg.sender, "Not Owner");

    Payment[] memory payments = new Payment[](tipPayments[_tipId].length);
    for (uint i = 0; i < tipPayments[_tipId].length; i++) {
      payments[i] = tipPayments[_tipId][i];
    }

    return payments;
  }

  //for giving tips
  function giveTip(address _owner, uint _tipId) external payable {
    Tip memory tip = tips[_owner][_tipId];
    require(msg.value > 0, "Invalid amount");
    require(
      msg.value <= tip.maxAmount,
      "Too Kind! Please send a lower amount."
    );

    tipPayments[_tipId].push(Payment(_tipId, tip.owner, msg.sender, msg.value));

    emit NewPaymentReceived(_tipId, tip.owner, msg.sender, msg.value);
  }

  //get total amount raised on a Tip
  function getTipTotalAmount(
    address _user,
    uint _tipId
  ) public view returns (uint) {
    Tip memory tip = tips[_user][_tipId];

    //checks if owner is caller
    require(tip.owner == msg.sender, "Not Owner");

    uint total = 0;
    for (uint i = 0; i < tipPayments[_tipId].length; i++) {
      total += tipPayments[_tipId][i].amount;
    }
    return total;
  }

  //withdraw funds and deactivate Tip
  function withdrawMoney(address _owner, uint _tipId) external {
    Tip memory tip = tips[_owner][_tipId];

    //checks if tip is active
    require(tip.isActive == true, "Tips is already withdrawn");
    //checks if caller is owner
    require(tip.owner == msg.sender, "404. Not Authorized");

    (bool success, ) = payable(msg.sender).call{
      value: getTipTotalAmount(msg.sender, _tipId)
    }("");
    require(success, "Transfer failed.");

    //deactivate Tip
    allUserTips[tip.owner][_tipId - 1].isActive = false;
    tips[_owner][_tipId].isActive = false;
  }
}

//const x = await GoTipMe.deployed()
//await x.createNewTip("title","description","3000000000000000000")
//await x.giveTip(1, {from: '0x9081e967D39587aaE9F218a8ea6E8671555d4161', value: '1000000000000000000'})
//await x.giveTip(1, {from: '0x9081e967D39587aaE9F218a8ea6E8671555d4161', value: '2000000000000000000'})
//await x.withdrawMoney(1)
//await x.allUserTips('0xD7451cCE6e241a38eA38079Ab1Ae3A3EBB6B366a',0)
//0x1e354cbFb451A6dD73902B504f05c5C66b43A3Eb
