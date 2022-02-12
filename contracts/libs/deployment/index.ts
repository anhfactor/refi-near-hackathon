import { ethers } from "hardhat";
import * as path from "path";
import * as fs from "fs/promises";
import { Contract, Signer } from "ethers";
import { Addresses, ContractInfo, Contracts, ContractsAddresses } from "../types";
import { logger } from "../logger";

export const contractsAddressesPath = path.resolve(__dirname, '../../build', 'contracts.json')    

export const deployContract = async (contractName: string, account: Signer, args: any[] = []): Promise<Contract> => {
    const ContractFactory = await ethers.getContractFactory(contractName, account);
    const contract = await ContractFactory.deploy(...args);
    await contract.deployed();
    return contract
}

export const loadContract = async (contractName: string, contractAddress: string, signer?: Signer|null): Promise<Contract> => {
    const ContractFactory = await ethers.getContractFactory(contractName, signer||undefined);
    const contract = await ContractFactory.attach(contractAddress)
    return contract
}

interface _ContractInfo { name:string, contract: Contract }

export const getSigner = async (addresses: Addresses, key: string): Promise<Signer|null> => {
    for (const name in addresses) {
        const signer = (addresses as any)[name] as Signer
        const addr1 = await signer.getAddress()
        if (addr1 === key) return signer
    }
    return null
}

export const loadContracts = async (addresses: Addresses): Promise<Contracts> => {

  const contractAddresses = await loadContractAddresses()
  const contractsList = await Promise.all(Object.keys(contractAddresses).map(async (contractName): Promise< _ContractInfo | null> => {
    const contractInfo = (contractAddresses as any)[contractName] as ContractInfo
    if (!contractInfo) return null
    
    const signer = await getSigner(addresses, contractInfo.signer)
    if (!signer) {
        logger.warn(`Signer not found for key ${contractInfo.signer}`)
    }

    return {
        name: contractName,
        contract: await loadContract(contractInfo.name, contractInfo.address, signer)
    }
  }))

  return contractsList.reduce((o: Contracts, c: _ContractInfo|null) => {
      if (c === null) return o
      const o1 = {[c.name]: c.contract}
      return {...o, ...o1}
  }, {}) as Contracts
}

export const loadContractAddresses = async () : Promise<ContractsAddresses> => {
    try {
        const savedAddresses = JSON.parse((await fs.readFile(contractsAddressesPath)).toString()) as ContractsAddresses 
        return savedAddresses
    } catch(e) {
        logger.warn(`Failed to read ${contractsAddressesPath}, creating new file`)
    }
    return {}
}

export const saveContractAddresses = async (contracts: Contracts) => {

    const newAddresses = (await Promise.all(Object.keys(contracts).map(async (contractName) => {
        const contract = (contracts as any)[contractName] as Contract
        if (!contract) return null
        return {
            name: contractName,
            signer: await contract.signer.getAddress(),
            address: contract.address,
        } as ContractInfo

    }))).reduce((o: ContractsAddresses, c: ContractInfo|null) => {
        if (c === null) return o
        const o1 = { [c.name]: c }
        return {...o, ...o1}
    }, {}) as ContractsAddresses

    await fs.writeFile(contractsAddressesPath, JSON.stringify({
        ...(await loadContractAddresses()),
        ...newAddresses
    }))
}