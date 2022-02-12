import { deployContract } from '.';
import { createLogger } from '../logger';
import { Addresses, Contracts } from '../types';

export interface SwapOptions {
  addressPairA: string
  addressPairB: string
}

export const deploySwap = async(addresses: Addresses, options: SwapOptions) : Promise<Partial<Contracts>> => {

    const logger = createLogger({ 'deployment': 'swap' })
    const contracts: Contracts = {}

    logger.debug("Deploy WETH")
    contracts.WETH = await deployContract('WETH', addresses.refi!);
    
    const feeCollectingAddress = await addresses.refi!.getAddress();
    logger.debug(`Refi address is ${feeCollectingAddress}`)
    
    //Deploy Factory
    logger.debug("Deploy ReFiFactory")
    contracts.ReFiFactory = await deployContract('ReFiFactory', addresses.refi!, [
      feeCollectingAddress
    ]);
    
    //SetFeeTo
    logger.debug("ReFiFactory.setFeeTo")
    await contracts.ReFiFactory!
      .connect(addresses.refi!)
      .setFeeTo(feeCollectingAddress);
    
    //Create Pair
    logger.debug("ReFiFactory.createPair")
    await contracts.ReFiFactory!
    .connect(addresses.refi!)
    .createPair(
      options.addressPairA,
      options.addressPairB,
    );

    //Deploy Router
    logger.debug("Deploy Router")
    contracts.ReFiRouter02! = await deployContract('ReFiRouter02', addresses.refi!, [
      contracts.ReFiFactory!.address, 
      contracts.WETH.address
    ]);

    return contracts
}