import {
    contractStableCoin, contractReEUR, getAccount
} from './contract'
import BigNumber from "bignumber.js";

export const getBalanceReEUR = async (address) => {
    const account = await getAccount()
    if (!account) throw new Error('Not ready')

    const { signer } = account

    const tokenReEUR = await contractReEUR(signer)
    const result = tokenReEUR.balanceOf(address)

    return result
}

export const approveLending = async (amountLending) => {
    const account = await getAccount()
    if (!account) throw new Error('Not ready')

    const { signer } = account
    const stableCoin = await contractStableCoin(signer)
    var amount = (new BigNumber(amountLending)).shiftedBy(17).toString()
    const result = await stableCoin.approve(process.env.NEXT_PUBLIC_REEUR, amount)
    return result;
}

export const supplyLending = async (amountLending) => {
    const account = await getAccount()
    if (!account) throw new Error('Not ready')

    const { signer } = account
    const tokenReEUR = await contractReEUR(signer)
    var amount = (new BigNumber(amountLending)).shiftedBy(17).toString()

    const result = await tokenReEUR.mint(amount)
    return result;

}


export const borrow = async (amountBorrow) => {
    const account = await getAccount()
    if (!account) throw new Error('Not ready')
    const { signer } = account
    const tokenReEUR = await contractReEUR(signer)
    var amount = (new BigNumber(amountBorrow)).shiftedBy(17).toString()
    const result = await tokenReEUR.borrow(amount)

    return result

}

export const redeem = async (amountRedeem) => {
    const account = await getAccount()
    if (!account) throw new Error('Not ready')

    const { signer } = account
    const tokenReEUR = await contractReEUR(signer)
    var amount = (new BigNumber(amountRedeem)).shiftedBy(7).toString()
    const result = await tokenReEUR.redeem(amount)

    return result

}