const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("HoneyCombToken", function () {

  let honeycombtoken;
  let one, two, three;


  beforeEach(async function () {
    
    [one,two,three] = await ethers.getSigners();
    const HoneyCombToken = await ethers.getContractFactory("HoneyCombToken");
    honeycombtoken = await HoneyCombToken.deploy();
    await honeycombtoken.deployed();
  });
  

  it("Minter roles can mint and others get rejected", async function () {

    console.log(this.value);

    try {

  
      await honeycombtoken.addNewMinter(one.address);
      await honeycombtoken.addNewMinter(two.address);
  
      const oneConnect = await honeycombtoken.connect(one)
      expect(() => oneConnect["mint(address,uint256)"](one.address,1000))
      .to
      .changeTokenBalance(oneConnect,one,1000);
      const twoConnect = await honeycombtoken.connect(two);
      expect(() => twoConnect["mint(address,uint256)"](two.address,1000))
      .to
      .changeTokenBalance(twoConnect,two,1000);
      
      const threeConnect = await honeycombtoken.connect(three);
      expect(threeConnect["mint(address,uint256)"](three.address,1000))
      .to
      .be
      .revertedWith("You are not a minter.")

      //mint HivePoints, allow Swapper to mint Honeycomb, give allowance to swapper
      //to spend 

    } catch(error) {
      console.log(error)
    }
    
  });

  it("Swaps HNYC for HP succesfully", async function() {
    
    const HivePoints = await ethers.getContractFactory("MockBEP20");
    const hivepoints = await HivePoints.deploy("HivePoints","HP",2000);
    await hivepoints.deployed();

    const Swapper = await ethers.getContractFactory("Swapper");
    const swapper =  await Swapper.deploy(honeycombtoken.address,hivepoints.address);
    await swapper.deployed();

    //give hnyc minting capabilities to swapper
    await honeycombtoken.addNewMinter(swapper.address);
    await hivepoints.approve(swapper.address,await hivepoints.balanceOf(one.address));
    expect(() => swapper.swap()).to.changeTokenBalance(honeycombtoken,one,400);
    
    
  })
  it("Fails if current time exceeds swapping deadline", async function() {
    
    const HivePoints = await ethers.getContractFactory("MockBEP20");
    const hivepoints = await HivePoints.deploy("HivePoints","HP",2000);
    await hivepoints.deployed();

    const Swapper = await ethers.getContractFactory("Swapper");
    const swapper =  await Swapper.deploy(honeycombtoken.address,hivepoints.address);
    await swapper.deployed();

    //give hnyc minting capabilities to swapper
    await honeycombtoken.addNewMinter(swapper.address);
    await hivepoints.approve(swapper.address,await hivepoints.balanceOf(one.address));
    //advance block time
    await network.provider.send("evm_increaseTime", [15 * 24 * 60 * 60]);
    await network.provider.send("evm_mine");
    expect(swapper.swap()).to.be.revertedWith("Swap period is over.");
    
    
  })
  
});
