import * as dotenv from "dotenv";
import * as fs from "fs";
import { HardhatUserConfig, task } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";
import config from './hardhat.config'
import { logger } from "./libs/logger";
import { getRefiPrivateKeys, readLocalPrivateKeys } from "./libs/tasks";

dotenv.config();

task("show-keys", "Prints the local accounts private keys", async (taskArgs, hre) => {
  const keys = await getRefiPrivateKeys()
  for (const name in keys) {
    console.log(`${name.toUpperCase()}\t${keys[name]}`);
  }
});

const accounts: string[] = []

try {
  accounts.push(...readLocalPrivateKeys())
} catch(e) {
  logger.error(e)
  logger.info(`\n\n\tFailed to load local private keys. \n\tPlease run 'make mvm/extract-keys' to export private keys!\n`)
  process.exit(1)
}


process.env.DEPLOYMENT_ENV=".development.local"

config.defaultNetwork = "aurora_local"
config.networks = {
    aurora_local: {
        url: 'http://localhost:8545',
        accounts,
        timeout: 150000,
    },
}


export default config;
