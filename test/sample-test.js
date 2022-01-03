const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Greeter", function () {
  it("Should return the new greeting once it's changed", async function () {
    const Greeter = await ethers.getContractFactory("Greeter");
    const greeter = await Greeter.deploy("Hello, world!");
    await greeter.deployed();

    expect(await greeter.greet()).to.equal("Hello, world!");

    const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

    // wait until the transaction is mined
    await setGreetingTx.wait();

    expect(await greeter.greet()).to.equal("Hola, mundo!");
  });
});

describe('Number', function () {
  it("Should return the number", async () => {
    const NumberChanger = await ethers.getContractFactory("NumberChanger");
    const numberChanger = await NumberChanger.deploy(10);
    await numberChanger.deployed();

    expect(await numberChanger.number()).to.equal(10);
  });

  it("Should return the new number once it's changed", async () => {
    const NumberChanger = await ethers.getContractFactory("NumberChanger");
    const numberChanger = await NumberChanger.deploy(10);
    await numberChanger.deployed();

    const setNumberTx = await numberChanger.setNumber(200);

    await setNumberTx.wait();

    expect(await numberChanger.number()).to.equal(200);
  });
});