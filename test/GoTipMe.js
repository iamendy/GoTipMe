const { ethers } = require("ethers");
const { expect } = require("chai");

// Import the compiled contract artifacts
const GoTipMe = artifacts.require("GoTipMe");

contract("GoTipMe", (accounts) => {
  let goTipMe;
  let owner;
  let giver;

  before(async () => {
    // Deploy the contract
    goTipMe = await GoTipMe.new();
    // Get accounts from ethers provider
    owner = accounts[0];
    giver = accounts[1];
    provider = new ethers.providers.JsonRpcProvider();
  });

  describe("createNewTip", () => {
    it("should create a new tip", async () => {
      const title = "My First Tip";
      const description = "This is a test tip";
      const maxAmount = ethers.utils.parseEther("1");

      // Create a new tip
      await goTipMe.createNewTip(title, description, maxAmount, {
        from: owner,
      });

      // Get the user's tips
      const userTips = await goTipMe.getUserTips(owner, {
        from: owner,
      });

      // Check if the tip was created successfully
      expect(userTips.length).to.equal(1);
      expect(userTips[0].title).to.equal(title);
      expect(userTips[0].description).to.equal(description);
      expect(ethers.utils.formatEther(userTips[0].maxAmount)).to.equal(
        ethers.utils.formatEther(maxAmount)
      );
      expect(userTips[0].isActive).to.be.true;
    });
  });

  describe("giveTip", () => {
    it("should give a tip to a tip owner", async () => {
      const title = "My First Tip";
      const description = "This is a test tip";
      const maxAmount = ethers.utils.parseEther("1");

      // Create a new tip
      await goTipMe.createNewTip(title, description, maxAmount, {
        from: owner,
      });

      // Get the user's tips
      const userTips = await goTipMe.getUserTips(owner, {
        from: owner,
      });

      // Get the tip ID of the newly created tip
      const tipId = userTips[0].id;

      // Give a tip to the owner
      const tipAmount = ethers.utils.parseEther("0.5");
      await goTipMe.giveTip(owner, tipId, {
        value: tipAmount,
        from: giver,
      });

      // Get the tip payments for the tip owner
      const tipPayments = await goTipMe.getTipPayments(owner, tipId, {
        from: owner,
      });

      // Check if the payment was received successfully
      expect(tipPayments.length).to.equal(1);
      expect(tipPayments[0].owner).to.equal(owner);
      expect(tipPayments[0].giver).to.equal(giver);
      expect(ethers.utils.formatEther(tipPayments[0].amount)).to.equal(
        ethers.utils.formatEther(tipAmount)
      );
    });
  });

  describe("withdrawMoney", () => {
    it("should withdraw the total amount raised and deactivate the tip", async () => {
      const title = "My First Tip";
      const description = "This is a test tip";
      const maxAmount = ethers.utils.parseEther("1");

      // Create a new tip
      await goTipMe.createNewTip(title, description, maxAmount, {
        from: owner,
      });

      // Get the user's tips
      const userTips = await goTipMe.getUserTips(owner);

      // Get the tip ID of the newly created tip
      const tipId = userTips[0].id;

      // Give a tip to the owner
      const tipAmount = ethers.utils.parseEther("0.5");
      await goTipMe.giveTip(owner, tipId, { value: tipAmount, from: giver });

      // Withdraw the money from the tip
      await goTipMe.withdrawMoney(owner, tipId, { from: owner });

      // Check if the tip is deactivated
      const updatedUserTips = await goTipMe.getUserTips(owner, { from: owner });
      expect(updatedUserTips[0].isActive).to.be.false;
    });
  });
});
