  
  const StableCoin = artifacts.require("./StableCoin");

module.exports = async (deployer, network, accounts) => {
  // Only Deploy StableCoin on local blockchain
  if (network !== 'development') return;

  // 1. StableCoinBank deploys StableCoin contract (accounts[0])
  await deployer.deploy(StableCoin, {from: accounts[0]})

  await StableCoin.deployed()
.then(instance => {
  //Transfer 1000 eEUR to Alice (account 2) and Bob (account 3)
  instance.transfer(accounts[2], "1000000000000000000000", {from: accounts[0]})
  instance.transfer(accounts[3], "1000000000000000000000", {from: accounts[0]})
})

};
