// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import path from "path";
import { initAddresses } from "../libs/accounts";
import { loadContracts, saveContractAddresses } from "../libs/deployment";
import config from "../libs/deployment/config";
import { deployFractionalizer } from "../libs/deployment/fractionalizer";
import { createLogger } from "../libs/logger";


const buildPath = path.resolve(__dirname, '../build')

const logger = createLogger({ 'deployment': 'Fractionaliser' })

async function main() {

  const addresses = await initAddresses()

  const contracts = await loadContracts(addresses)
  if (contracts.Fractionaliser) {
    logger.info(`Fractionalizer contract already deployed (${contracts.Fractionaliser.address})`)
    return
  }

  if (!contracts.StableCoin || !contracts.StableCoin.address) {
    logger.warn(`StableCoin address not found, please deploy it first`)
    process.exit(1)
  }
  if (!contracts.OwnershipCreator) {
    logger.warn(`OwnershipCreator address not found, please deploy it first`)
    process.exit(1)
  }

  const refiAddress = await addresses.refi!.getAddress()
  const bobAddress = await addresses.bob!.getAddress()

  logger.info(`Refi address ${refiAddress}`)
  logger.info(`Bob address ${bobAddress}`)

  const {Fractionaliser: Fractionalizer} = await deployFractionalizer(addresses, { 
    fractionalizationFee: config.fractionalizationFee,
    minterAddress: contracts.OwnershipCreator!.address,
    paymentAddress: contracts.StableCoin!.address,
  })
  contracts.Fractionaliser = Fractionalizer

  logger.info(`Bob approves the fractionaliser  to transfer NFT with the ID of "${config.certificateId}" to the fractionaliser`)
  await contracts.OwnershipCreator!
    .connect(addresses.bob!)
    .approve(contracts.Fractionaliser!.address, config.certificateId)
  
  logger.info("In StableCoin Bob approves the fractionaliser address funds (AmountFractions x FractionalisationFee) to the fractionaliser")
  await contracts.StableCoin!
    .connect(addresses.bob!)
    .approve(contracts.Fractionaliser!.address, config.fractionsAmount * config.fractionalizationFee);

  logger.info(`Bob fractionalises his NFT in ${config.fractionsAmount} Fractions`)
  await contracts.Fractionaliser!
    .connect(addresses.bob!)
    .fractionalise(config.certificateId, config.fractionsAmount)
  
  logger.info(`Bob own ${await contracts.Fractionaliser!.balanceOf(await addresses.bob!.getAddress())} fractions`)
  logger.info(`Bob own ${await contracts.StableCoin!.balanceOf(await addresses.bob!.getAddress())} stable coins`)

  await saveContractAddresses(contracts)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
