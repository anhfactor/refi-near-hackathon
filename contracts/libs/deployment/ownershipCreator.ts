import { createLogger } from '../logger';
import { Addresses, Contracts } from '../types';
import { deployContract } from './';

export interface OwnershipCreatorOptions {
  metadataUrl: string
}

export const deployOwnershipCreator = async(addresses: Addresses, options: OwnershipCreatorOptions) : Promise<Partial<Contracts>> => {

    const logger = createLogger({ 'deployment': 'ownershipCreator' })
    const contracts: Contracts = {}

    logger.info(`Deploy OwnershipCreator with metadata URL ${options.metadataUrl}`)
    contracts.OwnershipCreator = await deployContract("OwnershipCreator", addresses.dso!, [options.metadataUrl])

    return contracts
  }