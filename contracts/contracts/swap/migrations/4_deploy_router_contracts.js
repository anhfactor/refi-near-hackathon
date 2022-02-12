//Deploy Router Contract
const Factory = artifacts.require('ReFiSwap/ReFiFactory.sol');
const Router = artifacts.require('ReFiSwap/ReFiRouter02.sol');
const WETH = artifacts.require('WETH.sol');


module.exports = async function(deployer, _network, accounts) {

  const factory = await Factory.deployed();
  const weth = await WETH.deployed();
  
  //Deploy Router
  await deployer.deploy(Router, factory.address, weth.address, {from: accounts[1]});
  const router = await Router.deployed();

};
