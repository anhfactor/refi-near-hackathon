import { Contract, Signer } from "ethers";
import { BigNumber } from "@ethersproject/bignumber";

/**
  Network Operator: Account 0 (admin for NFTminting)
  ReFi: Account 1 (admin for Fractionaliser, lending&Borrowing)
  Bank: Account 2 (admin for stablecoin, mint and distribute eEUR)
  Alice: Account 3 (borrower)
  Bob: Account 4 (lender) 
*/

export interface Addresses {
  dso?: Signer
  bank?: Signer
  refi?: Signer
  alice?: Signer
  bob?: Signer
}

export interface Contracts {

  OwnershipCreator?: Contract
  Fractionaliser?: Contract
  StableCoin?: Contract

  // lending
  ReFiReEURInterestRateModel?: Contract
  ReFiComptroller?: Contract
  ReFiReEURPriceOracle?: Contract
  ReEUR?: Contract
  
  // swap
  WETH?: Contract
  Token_A?: Contract
  Token_B?: Contract
  ReFiFactory?: Contract
  ReFiRouter02?: Contract

}

export interface ContractInfo {
  name: string
  address: string
  signer: string
  abiPath?:string
}

export interface ContractsAddresses {
  OwnershipCreator?: ContractInfo
  Fractionaliser?: ContractInfo
  StableCoin?: ContractInfo
  // lending
  ReFiReEURInterestRateModel?: ContractInfo
  ReFiComptroller?: ContractInfo
  ReFiReEURPriceOracle?: ContractInfo
  ReEUR?: ContractInfo
  // swap
  WETH?: ContractInfo
  Token_A?: ContractInfo
  Token_B?: ContractInfo
  ReFiFactory?: ContractInfo
  ReFiRouter02?: ContractInfo
}

export interface ConfigOptions {
  fractionalizationFee: number
  certificateId: string
  metadataUrl: string
  fractionsAmount: number
  liquidityTransferTokenAmout: number
  waitSeconds: number
  initialStableCoinFunds: BigNumber
  collateralFactor: BigNumber
  maxAssets: BigNumber
  swapInitialFunds: BigNumber
}