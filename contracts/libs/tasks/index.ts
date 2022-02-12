import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import * as fs from "fs/promises";
import globby from 'globby';
import { HardhatRuntimeEnvironment } from "hardhat/types";
import * as path from "path";
import {readFileSync} from "fs";
import { addressNamesList } from "../constants";
import { logger } from "../logger";
import { ContractInfo, ContractsAddresses } from "../types";

const contractsBaseDir = path.resolve(__dirname, `../../`)

const frontendPath = path.resolve(contractsBaseDir, `../frontend`)
const contractABIPath = path.resolve(contractsBaseDir, `./build/artifacts/contracts`)
const contractsAddressesPath = path.resolve(contractsBaseDir, './build/contracts.json')
const keysFile = path.resolve(contractsBaseDir, './build/local.keys')


export const readContractsAddressesFile = async () : Promise<ContractsAddresses> => {
  return JSON.parse((await fs.readFile(contractsAddressesPath)).toString()) as ContractsAddresses
}

export const getRefiAccounts = async (hre: HardhatRuntimeEnvironment): Promise<{[key:string]: SignerWithAddress}> => {
  const accounts = await hre.ethers.getSigners()
  const names = [...addressNamesList]
  return names.reduce((o: any, name, i) => {
    return {
      [name]: accounts[i],
      ...o
    }
  }, {})

}

export const getRefiPrivateKeys = async (): Promise<{[key:string]: string}> => {
  const keys = readLocalPrivateKeys()
  const names = [...addressNamesList]
  return names.reduce((o: any, name, i) => {
    return {
      [name]: keys[i],
      ...o
    }
  }, {})
}

export const readLocalPrivateKeys = (): string[] => {
  const keys = readFileSync(keysFile).toString().split("\n").filter(k => k.length > 20)
  if (keys.length === 0) throw new Error(`No valid keys found in ${keysFile} file`)
  logger.info(`Loaded ${keys.length} private keys from ${keysFile}`)
  return keys
}

export const updateEnvFile = async (contracts: ContractsAddresses) : Promise<void> => {

  const envKeys = Object.keys(contracts).map((key) => {
    const val = (contracts as any)[key].address
    return [`NEXT_PUBLIC_${key.toUpperCase()}`, `NEXT_PUBLIC_${key.toUpperCase()}=${val}`]
  }, {})
  
  let outfile = path.resolve(frontendPath, `.env${process.env.DEPLOYMENT_ENV}`)
  let raw: string = ""
  try {
    raw = (await fs.readFile(outfile)).toString()
    logger.info(`Using env ${path.basename(outfile)}`)
  } catch(e) {
    logger.info(`Cannot read env ${outfile}`)
  }

  const newEnv = raw.split("\n")
    .map(line => {
      for (const [key] of envKeys) {
        if (line.indexOf(key) === -1) continue
        return ""
      }
      return line
    })
    .filter(line => line.length)
    .concat(...envKeys.map(([key, line]) => line))
    .join("\n")

  await fs.writeFile(outfile, newEnv)
}

export const copyAbiFiles = async (contracts: ContractsAddresses) : Promise<void> => {
  
  let frontendABIDir = path.resolve(frontendPath, 'contracts')

  const abis = await globby(`${contractABIPath}/**`, {
		expandDirectories: {
			files: ['*.json', '!*.dbg.json'],
			extensions: ['json']
		}
	})

  const matches = (await Promise.all(Object.keys(contracts).map(async (contractName) => {
    const founds = abis.filter(abiFile => path.basename(abiFile) === `${contractName}.json`)
    if (founds.length !== 1) {
      logger.info(`Contract ${contractName} ABI not found`)
      return null
    }
    const abiPath = founds[0]
    const contractInfo = (contracts as any)[contractName] as ContractInfo
    contractInfo.abiPath = abiPath
    return contractInfo
  }))).filter(f => f !== null)

  // await fs.rmdir(frontendABIDir, { recursive: true })
  await fs.mkdir(frontendABIDir, { recursive: true  })

  await Promise.all(matches.map(async (contractInfo) => {
    if (!contractInfo?.abiPath) return false
    await fs.copyFile(contractInfo?.abiPath, path.resolve(frontendABIDir, path.basename(contractInfo?.abiPath)))
    logger.info(`Copied ${contractInfo.name} contract ABI`)
    return true
  }))

}

export const exportContracts = async () : Promise<void> => {
  
    const contracts = await readContractsAddressesFile()
  
  logger.info("Updating env file contracts references")
  await updateEnvFile(contracts)

  logger.info("Updating contracts ABIs")
  await copyAbiFiles(contracts)
}