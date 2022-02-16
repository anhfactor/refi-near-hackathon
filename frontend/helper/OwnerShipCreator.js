import {
    contractOwnerShipCreator, getAccount
} from './contract'

// Mint NFT
export const mint = async (address, nextId) => {

    const account = await getAccount()
    if (!account) throw new Error('Not ready')

    const { signer } = account

    const ownerShipCreator = await contractOwnerShipCreator(signer)
    console.log(`ownerShipCreator ${ownerShipCreator}`)
    const tokenURI = await ownerShipCreator.nextTokenId()
    console.log(`Address: ${address} Token URI ${tokenURI}`)
    await ownerShipCreator.CreateCertificate(address)

    return tokenURI
}

// Transfer NFT
export const transferContract = async (tokenId, from, to) => {
    const account = await getAccount()
    if (!account) throw new Error('Not ready')

    const { signer } = account

    const contract = await contractOwnerShipCreator(signer)
    await contract.transferFrom(from, to, tokenId)
}

// Approve NFT to contract Fractionaliser
export const approveNFT = async (tokenId) => {
    const account = await getAccount()
    if (!account) throw new Error('Not ready')

    const { signer } = account

    const ownerShipCreator = await contractOwnerShipCreator(signer)
    const result = ownerShipCreator.approve(process.env.NEXT_PUBLIC_FRACTIONALISER, tokenId)

    return result
}

// transfer ownership contract contractOwnerShipCreator
export const transferOwnershipCreator = async (newOwnerAddress) => {
    const account = await getAccount()
    if (!account) throw new Error('Not ready')

    const { signer } = account

    const ownerShipCreator = await contractOwnerShipCreator(signer)
    const result = ownerShipCreator.transferOwnership(newOwnerAddress)

    return result
}

// Get balance of OwnershipCreator.sol
export const getBalanceOwnerNFT = async (address) => {
    const account = await getAccount()
    if (!account) throw new Error('Not ready')

    const { signer } = account

    const stableCoin = await contractOwnerShipCreator(signer)
    const result = stableCoin.balanceOf(address)

    return result
}

export const getNextId = async () => {
    const account = await getAccount()
    if (!account) throw new Error('Not ready')

    const { signer } = account

    const ownerShipCreator = await contractOwnerShipCreator(signer)
    const result = ownerShipCreator.nextTokenId()
    return result
}

