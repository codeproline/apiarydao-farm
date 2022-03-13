require("solidity-coverage");
require("@nomiclabs/hardhat-truffle5");
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-waffle");

const mnemonic =
  "juice oyster rapid else bag youth aspect round path cruel peanut trash";
// This is a sample Buidler task. To learn how to create your own go to
// https://buidler.dev/guides/create-task.html
task("accounts", "Prints the list of accounts", async () => {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log(await account.getAddress());
  }
});

// You have to export an object to set up your config
// This object can have the following optional entries:
// defaultNetwork, networks, solc, and paths.
// Go to https://buidler.dev/config/ to learn more
module.exports = {
  etherscan: {
    apiKey: "Z43NBG8TQ489YT97EJY748V26EJ2V5CBXC",
  },

  solidity: {
    compilers: [
      {
        version: "0.6.12",
        settings: {
          optimizer: true,
        },
      },
      {
        version: "0.5.16",
        settings: {
          optimizer: true,
        },
      }
    ],
  },

  networks: {
    hardhat: {
      blockGasLimit: 12000000,
      accounts: {
        mnemonic,
      },
    },
    development: {
      url: "http://127.0.0.1:7545",
      port: 7545,
      network_id: "101",
    },
    test: {
      url: "http://127.0.0.1:7545",
      port: 7545,
      network_id: "*",
    },
    bscTestnet: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545",
      chainId: 97,
      gasPrice: 20000000000,
      accounts: { mnemonic: mnemonic },
    },
    mainnet: {
      url: "https://bsc-dataseed.binance.org/",
      chainId: 56,
      gasPrice: 20000000000,
      accounts: { mnemonic: mnemonic },
    },
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
};
