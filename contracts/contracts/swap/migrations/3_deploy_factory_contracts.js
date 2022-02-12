//ReFi deploys Factory, set SetFee and Create Pair for TokenA and Token B
const Factory = artifacts.require('ReFiSwap/ReFiFactory.sol');
const TOKEN_A = artifacts.require('Token_A.sol');
const TOKEN_B = artifacts.require('Token_B.sol');

module.exports = async function(deployer, _network, accounts) {
  
  feeCollectingAddress = accounts[1];

  //Deploy Factory  
  await deployer.deploy(Factory, accounts[1], {from: accounts[1]});
  const factory = await Factory.deployed();

  //SetFeeTo
  await factory.setFeeTo(feeCollectingAddress, {from: accounts[1]});

  //Create Pair
  await factory.createPair(TOKEN_A.address, TOKEN_B.address, {from: accounts[1]});
 



};
