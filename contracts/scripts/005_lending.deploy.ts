import { BigNumber } from "@ethersproject/bignumber";
import path from "path";
import { initAddresses } from "../libs/accounts";
import { loadContracts, saveContractAddresses } from "../libs/deployment";
import config from "../libs/deployment/config";
import { deployLending } from "../libs/deployment/lending";
import { createLogger } from "../libs/logger";


const buildPath = path.resolve(__dirname, '../build')

const logger = createLogger({ 'deployment': 'Swap' })

async function main() {

  const addresses = await initAddresses()

  const contracts = await loadContracts(addresses)
  if (contracts.ReFiReEURInterestRateModel) {
    logger.info(`Lending contracts already deployed (${contracts.ReFiReEURInterestRateModel.address})`)
    return
  }

  if (!contracts.StableCoin || !contracts.StableCoin.address) {
    logger.warn(`StableCoin address not found, please deploy it first`)
    process.exit(1)
  }
  if (!contracts.Fractionaliser) {
    logger.warn(`Fractionaliser address not found, please deploy it first`)
    process.exit(1)
  }

  const {
    ReFiComptroller, 
    ReFiReEURInterestRateModel, 
    ReFiReEURPriceOracle,
    ReEUR,
  } = await deployLending(addresses, {
    collateralFactor: config.collateralFactor,
    maxAssets: config.maxAssets,
    stableCoinAddress: contracts.StableCoin!.address
  })

  contracts.ReFiComptroller = ReFiComptroller
  contracts.ReFiReEURInterestRateModel = ReFiReEURInterestRateModel
  contracts.ReFiReEURPriceOracle = ReFiReEURPriceOracle
  contracts.ReEUR = ReEUR

  logger.debug(`For lending Bob must approve ReEUR`)
  await contracts.StableCoin!
  .connect(addresses.bob!)
  .approve(contracts.ReEUR!.address, config.swapInitialFunds)
  
  logger.info(`Bob supplies 1000 eEUR (${config.swapInitialFunds}) to the protocol`)
  await contracts.ReEUR!
    .connect(addresses.bob!)
    .mint(config.swapInitialFunds)

  logger.info("For borrowing Alice enters the eEUR/ReFiEUR market")
  // For borrowing Alice needs to enter the eEUR/ReFiEUR market. On the ReFiComptroller contract Alice 
  // calls the enterMarkets function as follows
  await contracts.ReFiComptroller!
    .connect(addresses.alice!)
    .enterMarkets([contracts.ReEUR!.address])

  await saveContractAddresses(contracts)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
