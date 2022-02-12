import { ethers } from "hardhat";
import { Contract, Signer } from "ethers";
import { Contracts, Addresses } from '../types'
import { createLogger } from '../logger'
import { deployContract } from '.'

export interface StableCoinOptions {
}

export const deployStableCoin = async(addresses: Addresses, options: StableCoinOptions = {}) : Promise<Partial<Contracts>> => {

    const logger = createLogger({ 'deployment': 'stableCoin' })
    const contracts: Contracts = {}

    logger.info("DaiBank deploys DAI token contract")
    contracts.StableCoin = await deployContract("StableCoin", addresses.bank!)

    return contracts
}