const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');
  
  //deploy masterchef
  const blockNumber = await hre.ethers.provider.getBlockNumber();
  console.log(blockNumber)
  const signers = await hre.ethers.getSigners();
  const masterchef = await hre.ethers.getContractFactory("MasterChef");
  const MasterChef = await masterchef.deploy(
      "0x173617a1776aCaBd51B99917C02B68373164c399", //cake
      "0xb44627698f6aB10C7FC9a11ABBf8a8d1A33d7739", //syrup (apiarydao shares)
      signers[0].address,
      1,
      blockNumber,
      "0xd971c4a496E03DCc7B4d842B377abDe26E3805aa" //daopool shares
  )
  await MasterChef.deployed()
  console.log("Masterchef:",MasterChef.address);
  //deploy souschef
  const sousChef = await hre.ethers.getContractFactory("SousChef");
  const SousChef = await sousChef.deploy(
    "0xb44627698f6aB10C7FC9a11ABBf8a8d1A33d7739",
    1,
    blockNumber,
    blockNumber + 100000
    );
    await SousChef.deployed();
    console.log("SousChef",SousChef.address);
    //verify masterchef
    await hre.run("verify:verify", {
      address: MasterChef.address,
      constructorArguments: [
        "0x173617a1776aCaBd51B99917C02B68373164c399", //cake
        "0xb44627698f6aB10C7FC9a11ABBf8a8d1A33d7739", //syrup (apiarydao shares)
        signers[0].address,
        1,
        blockNumber,
        "0xd971c4a496E03DCc7B4d842B377abDe26E3805aa" //daopool shares
      ],
    });
    //verify souschef
    await hre.run("verify:verify", {
      address: SousChef.address,
      constructorArguments: [
        "0xb44627698f6aB10C7FC9a11ABBf8a8d1A33d7739",
        1,
        blockNumber,
        blockNumber + 100000
      ],
    });
  
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
