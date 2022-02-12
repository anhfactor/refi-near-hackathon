import { BigNumber } from "@ethersproject/bignumber"
import { ConfigOptions } from "../types"

// default config options
const config: ConfigOptions = {
    initialStableCoinFunds: BigNumber.from(BigInt(1000000*1e18)),
    certificateId: '0',
    fractionalizationFee: 100,
    fractionsAmount: 10000,
    liquidityTransferTokenAmout: 10000,
    //30 sec
    waitSeconds: 30, 
    // 0.9
    collateralFactor: BigNumber.from(BigInt(0.9*1e18)),
    // 5000
    maxAssets: BigNumber.from(BigInt(5000*1e18)),
    swapInitialFunds: BigNumber.from(BigInt(10000*1e18)),
    metadataUrl: "https://refi.hopto.org/api/"
}

export default config