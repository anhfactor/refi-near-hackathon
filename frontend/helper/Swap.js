import {
    contractReFiRouter02, getAccount, contractFractionaliser
} from './contract'
import { ethers } from 'ethers'

// swapExactTokensForTokens
export const swapTokens = async (address1, address2, amountIn, amountOut) => {
    const account = await getAccount()
    if (!account) throw new Error('Not ready')
    const waitSeconds = 60

    const { signer } = account
    const refiRouter02 = await contractReFiRouter02(signer)
    const result = await refiRouter02.swapExactTokensForTokens(
        +amountIn,
        (+amountOut) - 10,
        [address1, address2],
        account["accounts"][0], // Alice address or owner swap
        Math.round(Date.now() / 1000 + waitSeconds)
    )
    console.log(result)
}

export const approveSwap = async (address, amountOut) => {
    const account = await getAccount()
    if (!account) throw new Error('Not ready')

    const { signer } = account
    const fraction = await contractFractionaliser(signer) // token A
    const result = await fraction.approve(process.env.NEXT_PUBLIC_REFIROUTER02, amountOut)

    console.log(result)
}

// getAmountOut
export const getAmountOut = async (address1, address2, amountIn) => {
    try {
        const account = await getAccount()
        if (!account) throw new Error('Not ready')

        const { signer } = account
        const refiRouter02 = await contractReFiRouter02(signer)

        const values_out = await refiRouter02.getAmountOut(
            10000 - amountIn,
            10000 - amountIn,
            10000 - amountIn
        );
        const amount_out = ethers.utils.formatEther(values_out);
        var hexString = amount_out.toString(16);
        var amount = hexString * 1E18 - 1
        return amount
    } catch (err) {
        console.log(err)
        return false;
    }
}