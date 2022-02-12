import * as dotenv from "dotenv";
import { HardhatUserConfig, task } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";
import config from './hardhat.config'
import * as path from 'path'
import { addressNamesList } from "./libs/constants";

process.env.DEPLOYMENT="testnet"
process.env.DEPLOYMENT_ENV=".production.local"
// load from repository root, also used during build & deployment
dotenv.config({path: path.resolve(__dirname, '../.env')})

const accounts: string[] = []

accounts.push(...(addressNamesList.map((key: string): string => {
  const varName = `${key.toUpperCase()}_PRIVATE_KEY`
  if (!process.env[varName]) {
    console.error(`Please set ${varName} with a private key in your .env file`)
    process.exit(1)
  }
  return process.env[varName]!
})))

config.defaultNetwork = "aurora_testnet"
config.networks = {
    
    aurora_testnet: {
      url: "https://stardust.metis.io/?owner=588",
      accounts
    }
}

export default config;
