import { BigNumber } from '@ethersproject/bignumber';
import { createLogger } from '../logger';
import { Addresses, Contracts } from '../types';
import { deployContract } from './';

export interface LendingOptions {
  collateralFactor: string|BigInt|BigNumber,
  maxAssets: string|BigInt|BigNumber
  stableCoinAddress: string
}

export const deployLending = async(addresses: Addresses, options: LendingOptions) : Promise<Partial<Contracts>> => {

    const logger = createLogger({ 'deployment': 'lending' })
    const contracts: Contracts = {}

    logger.info("Deploy Interest Model Contract for ReEUR")
    contracts.ReFiReEURInterestRateModel = await deployContract("ReFiReEURInterestRateModel", addresses.refi!)
   
    logger.info("Deploy ReFiComptroller Contract")
    contracts.ReFiComptroller = await deployContract("ReFiComptroller", addresses.refi!)

    logger.info("Deploy reEUR Price Oracle Contract")
    contracts.ReFiReEURPriceOracle = await deployContract("ReFiReEURPriceOracle", addresses.refi!)

    logger.info("Refi deploys reEUR Contract")
    contracts.ReEUR = await deployContract("ReEUR", addresses.refi!, [
      options.stableCoinAddress,
      contracts.ReFiComptroller!.address,
      contracts.ReFiReEURInterestRateModel!.address
    ])
    
    logger.info("Activate ReEUR Market")
    await contracts.ReFiComptroller!
      .connect(addresses.refi!)
      ._supportMarket(contracts.ReEUR!.address)

    logger.info("Set Price Oracle")
    await contracts.ReFiComptroller!
      .connect(addresses.refi!)
      ._setPriceOracle(contracts.ReFiReEURPriceOracle!.address)
    
    logger.info(`Set Collateral Factor of ${options.collateralFactor}`)
    await contracts.ReFiComptroller!
      .connect(addresses.refi!)
      ._setCollateralFactor(contracts.ReEUR!.address, options.collateralFactor)
      
    logger.info(`Set Max. Assets of ${options.maxAssets} ReEUR`)
    await contracts.ReFiComptroller!
      .connect(addresses.refi!)
      ._setMaxAssets(options.maxAssets)

    return contracts
  }