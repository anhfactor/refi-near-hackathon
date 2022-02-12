import { ethers } from "hardhat";
import { Contract, Signer } from "ethers";
import { Contracts, Addresses } from '../types'
import { createLogger } from '../logger'
import { deployContract } from '.'

export interface FractionalizerOptions {
    fractionalizationFee?: number
    minterAddress: string
    paymentAddress: string
}

export const deployFractionalizer = async(addresses: Addresses, options: FractionalizerOptions) : Promise<Partial<Contracts>> => {

    const logger = createLogger({ 'deployment': 'fractionalizer' })
    const contracts: Contracts = {}

    logger.info("ReFi deploys fractionaliser.sol")
    contracts.Fractionaliser = await deployContract("Fractionaliser", addresses.refi!, [
      // minter address
      options.minterAddress,
      options.fractionalizationFee || 10, // fee
      // payment address
      options.paymentAddress,
    ])

    return contracts
}