import { Contract, ethers } from 'ethers'
import OwnershipCreator from '../contracts/OwnershipCreator.json'
import StableCoin from '../contracts/StableCoin.json'
import Fractionaliser from '../contracts/Fractionaliser.json'
import ReFiFactory from '../contracts/ReFiFactory.json'
import ReFiRouter02 from '../contracts/ReFiRouter02.json'
import WETH from '../contracts/WETH.json'
import ReFiComptroller from '../contracts/ReFiComptroller.json'
import ReFiReEURInterestRateModel from '../contracts/ReFiReEURInterestRateModel.json'
import ReFiReEURPriceOracle from '../contracts/ReFiReEURPriceOracle.json'
import ReEUR from '../contracts/ReEUR.json'

export const getAccount = async () => {
    if (!window.ethereum) {
        return {
            ready: false
        }
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()

    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })

    return { ready: true, provider, signer, accounts }
}

/*
 Contract OwnershipCreator.sol
 Mint NFT and transfer, approve
*/
export const contractOwnerShipCreator = (signer) => {
    return new Contract(
        process.env.NEXT_PUBLIC_OWNERSHIPCREATOR,
        OwnershipCreator.abi,
        signer
    )
}

/*
 Contract StableCoin.sol
*/
export const contractStableCoin = (signer) => {
    console.log(signer)
    console.log(process.env.NEXT_PUBLIC_STABLECOIN)
    console.log(StableCoin.abi)
    return new Contract(
        process.env.NEXT_PUBLIC_STABLECOIN,
        StableCoin.abi,
        signer
    )
}

/*
 Contract Fractionaliser.sol
*/
export const contractFractionaliser = (signer) => {
    return new Contract(
        process.env.NEXT_PUBLIC_FRACTIONALISER,
        Fractionaliser.abi,
        signer
    )
}

/*
  Contract ReFiFactory.sol
*/
export const contractReFiFactory = (signer) => {
    return new Contract(
        process.env.NEXT_PUBLIC_REFIFACTORY,
        ReFiFactory.abi,
        signer
    )
}

/*
  Contract ReFiRouter02.sol
*/
export const contractReFiRouter02 = (signer) => {
    return new Contract(
        process.env.NEXT_PUBLIC_REFIROUTER02,
        ReFiRouter02.abi,
        signer
    )
}

/*
  Contract WETH.sol
*/
export const contractWETH = (signer) => {
    return new Contract(
        process.env.NEXT_PUBLIC_WETH,
        WETH.abi,
        signer
    )
}

/*
  Contract ReFiComptroller.sol
*/
export const contractReFiComptroller = (signer) => {
    return new Contract(
        process.env.NEXT_PUBLIC_REFICOMPTROLLER,
        ReFiComptroller.abi,
        signer
    )
}

/*
  Contract ReFiReEURInterestRateModel.sol
*/
export const contractReFiReEURInterestRateModel = (signer) => {
    return new Contract(
        process.env.NEXT_PUBLIC_REFIREEURINTERESTRATEMODEL,
        ReFiReEURInterestRateModel.abi,
        signer
    )
}

/*
  Contract ReFiReEURPriceOracle.sol
*/
export const contractReFiReEURPriceOracle = (signer) => {
    return new Contract(
        process.env.NEXT_PUBLIC_REFIREEURPRICEORACLE,
        ReFiReEURPriceOracle.abi,
        signer
    )
}

/*
  Contract ReEUR.sol
*/
export const contractReEUR = (signer) => {
    return new Contract(
        process.env.NEXT_PUBLIC_REEUR,
        ReEUR.abi,
        signer
    )
}