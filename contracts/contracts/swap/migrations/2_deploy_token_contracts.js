//Deployment of testing Tokens and WETH
const WETH = artifacts.require('WETH.sol');
const TOKEN_A = artifacts.require('Token_A.sol');
const TOKEN_B = artifacts.require('Token_B.sol');

module.exports = async function(deployer, _network, accounts) {
  
  await deployer.deploy(WETH, {from: accounts[1]});
  const weth = await WETH.deployed();

  await deployer.deploy(TOKEN_A, 'Token A', 'TKA', web3.utils.toWei('100', 'ether'),{from: accounts[1]});
  await deployer.deploy(TOKEN_B, 'Token B', 'TKA', web3.utils.toWei('100', 'ether'),{from: accounts[1]});

};
