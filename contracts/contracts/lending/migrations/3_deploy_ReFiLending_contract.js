
  const StableCoin = artifacts.require("./StableCoin");
  const ReEUR = artifacts.require("./ReEUR");
  const ReFiComptroller = artifacts.require("./ReFiComptroller");
  const ReFiReEURInterestRateModel = artifacts.require("./ReFiReEURInterestRateModel.sol");
  const ReFiReEURPriceOracle = artifacts.require("./ReFiReEURPriceOracle");
  
module.exports = async (deployer, network, accounts) => {
  // Only setup ReFi on local blockchain
  if (network !== 'development') return;

    // 2. Deploy Interest Model Contract for ReEUR
    await deployer.deploy(ReFiReEURInterestRateModel, {from: accounts[1]})
   
    // 3. Deploy ReFI-Comptroller Contract
    await deployer.deploy(ReFiComptroller, {from: accounts[1]})

    //4. Deploy Price Oracle Contract
    await deployer.deploy(ReFiReEURPriceOracle, {from: accounts[1]})

    // 5. Owner/Admin deploys ReEUR Contract
    await deployer.deploy(
      ReEUR,
      StableCoin.address,
      ReFiComptroller.address,
      ReFiReEURInterestRateModel.address
    , {from: accounts[1]})

    // 6. Activate ReEUR Market
    await ReFiComptroller.deployed()
    .then(instance => {

      instance._supportMarket(ReEUR.address, {from: accounts[1]})

      // 7. Set Price Oracle
      instance._setPriceOracle(ReFiReEURPriceOracle.address, {from: accounts[1]})

      // 8. Set Collateral Factor FOR ReEUR market to 0.9 
      instance._setCollateralFactor(ReEUR.address, "900000000000000000", {from: accounts[1]} )

      // 9. Set Max. Assets of 5000 ReEUR
      instance._setMaxAssets("5000000000000000000000",{from: accounts[1]})

    })

};
