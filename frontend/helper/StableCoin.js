import {
    contractStableCoin, getAccount
} from './contract'

// Approve Fund to contract Fractionaliser
export const approveFund = async (fundAmount) => {
    const account = await getAccount()
    if (!account) throw new Error('Not ready')

    const { signer } = account

    const stableCoin = await contractStableCoin(signer)
    const result = stableCoin.approve(process.env.NEXT_PUBLIC_FRACTIONALISER, fundAmount)

    return result
}

// Get balance Of StableCoinEUR.sol
export const getBalanceStableCoin = async (address) => {
    const account = await getAccount()
    if (!account) throw new Error('Not ready')

    const { signer } = account

    const stableCoin = await contractStableCoin(signer)
    const result = stableCoin.balanceOf(address)

    return result
}

// request eEUR token
export const requestTokens = async () => {
    const account = await getAccount()
    if (!account) throw new Error('Not ready')

    const { signer } = account

    const stableCoin = await contractStableCoin(signer)
    const result = stableCoin.requestTokens()

    return result
}
