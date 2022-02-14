import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import * as dotenv from "dotenv";
import "hardhat-gas-reporter";
import { HardhatUserConfig, task } from "hardhat/config";
import "solidity-coverage";
import { logger } from "./libs/logger";
import { exportContracts, getRefiAccounts, readLocalPrivateKeys } from "./libs/tasks";

process.env.DEPLOYMENT_ENV = ".test.local"
dotenv.config();

const enableGasReport = !!process.env.ENABLE_GAS_REPORT


task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await getRefiAccounts(hre)
  for (const name in accounts) {
    console.info(`${name.toUpperCase()}\t${accounts[name].address}`);
    if (process.env.DEPLOYMENT === "testnet") {
      console.info(`https://explorer.testnet.aurora.dev/address/${accounts[name].address}/transactions`);
    }
  }
});

task("export-contracts", "Prints the list of accounts", async (taskArgs, hre) => {
  await exportContracts()
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

// metis network config https://docs.metis.io/building-on-metis/connection-details#testnet-rinkeby
// ethereum hardhat config https://github.com/paulrberg/solidity-template/blob/main/hardhat.config.ts

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  solidity: {
    compilers: [
      {
        version: "0.8.0",
        settings: {
          optimizer: {
            enabled: true,
            runs: 1000,
          },
        }
      },
      {
        version: "0.8.1",
        settings: {
          optimizer: {
            enabled: true,
            runs: 1000,
          },
        }
      },
      {
        version: "0.5.8",
        settings: {
          optimizer: {
            enabled: true,
            runs: 1000,
          },
        }
      },
      {
        version: "0.6.12",
        settings: {
          optimizer: {
            enabled: true,
            runs: 1000,
          },
        }
      },
    ],
  },
  paths: {
    artifacts: "./build/artifacts",
    cache: "./build/cache",
    sources: "./contracts",
    tests: "./test",
  },
  networks: {
    hardhat: {
      allowUnlimitedContractSize: true,
      accounts: {
        mnemonic: 'test test test test test test test test test test test junk',
      },
      chainId: 1313161555,
    }
  },
  gasReporter: {
    enabled: enableGasReport,
    currency: 'USD',
    gasPrice: 100,
    outputFile: 'build/gas-report.txt',
  },
  typechain: {
    outDir: './build/types',
    target: 'ethers-v5',
    // alwaysGenerateOverloads: false, // should overloads with full signatures like deposit(uint256) be generated always, even if there are no overloads?
    // externalArtifacts: ['externalArtifacts/*.json'], // optional array of glob patterns with external artifacts to process (for example external libs from node_modules)
  },
};

export default config;
