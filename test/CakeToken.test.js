const { assertion } = require("@openzeppelin/test-helpers/src/expectRevert");

const CakeToken = artifacts.require("CakeToken");

// Traditional Truffle test
// contract("CakeToken", accounts => {
//   it("Should return the new greeting once it's changed", async function() {
//     const greeter = await Greeter.new("Hello, world!");
//     assert.equal(await greeter.greet(), "Hello, world!");

//     await greeter.setGreeting("Hola, mundo!");

//     assert.equal(await greeter.greet(), "Hola, mundo!");
//   });
// });

// Vanilla Mocha test. Increased compatibility with tools that integrate Mocha.
describe("CakeToken contract", function() {
  let accounts;
  let cakeToken;

  before(async function() {
    accounts = await web3.eth.getAccounts();
    cakeToken = await CakeToken.new()

  });

  describe("Deployment", function() {
    it("Should deploy with the right greeting", async function() {
      assert.equal(await cakeToken.balanceOf(accounts[0]),20000)
    });
  });
});