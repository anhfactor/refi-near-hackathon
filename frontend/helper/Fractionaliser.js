import {
    contractFractionaliser, getAccount
} from './contract'

// Fraction
export const fractionalise = async (tokenId, fractionAmount) => {
    const account = await getAccount()
    if (!account) throw new Error('Not ready')

    const { signer } = account

    const fractionaliser = await contractFractionaliser(signer)
    const result = fractionaliser.fractionalise(tokenId, fractionAmount)

    return result
}

// Get balance of Fractionaliser.sol
export const getBalanceFraction = async (address) => {
    const account = await getAccount()
    if (!account) throw new Error('Not ready')

    const { signer } = account

    const stableCoin = await contractFractionaliser(signer)
    const result = stableCoin.balanceOf(address)

    return result
}