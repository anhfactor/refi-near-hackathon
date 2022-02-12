import path from "path";
import { initAddresses } from "../libs/accounts";
import { loadContractAddresses, saveContractAddresses } from "../libs/deployment";
import config from "../libs/deployment/config";
import { deployStableCoin } from "../libs/deployment/stableCoin";
import { createLogger } from "../libs/logger";


const buildPath = path.resolve(__dirname, '../build')

const logger = createLogger({ 'deployment': 'stableCoin' })

async function main() {

  const savedContracts = await loadContractAddresses()
  if (savedContracts.StableCoin) {
    logger.info(`StableCoin contract already deployed (${savedContracts.StableCoin.address})`)
    return
  }

  const addresses = await initAddresses()

  const bankAddress = await addresses.bank!.getAddress()
  const aliceAddress = await addresses.alice!.getAddress()
  const bobAddress = await addresses.bob!.getAddress()

  logger.info(`Bank address ${bankAddress}`)
  logger.info(`Alice address ${aliceAddress}`)
  logger.info(`Bob address ${bobAddress}`)

  const contracts = await deployStableCoin(addresses)
  logger.info(`Bank deployed StableCoin (address=${contracts.StableCoin!.address})`)


  logger.info(`StableCoin.totalSupply() is ${await contracts.StableCoin!.connect(addresses.bank!).totalSupply()}`)

  await contracts.StableCoin!.transfer(aliceAddress, config.initialStableCoinFunds)
  logger.info(`Bank transferred ${await contracts.StableCoin!.balanceOf(aliceAddress)} to Alice`)
  
  await contracts.StableCoin!.transfer(bobAddress, config.initialStableCoinFunds)
  logger.info(`Bank transferred ${await contracts.StableCoin!.balanceOf(bobAddress)} to Bob`)

  await saveContractAddresses(contracts)

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
