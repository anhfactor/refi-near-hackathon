import * as path from "path";
import * as fs from "fs/promises";
import { initAddresses } from "../libs/accounts";
import { loadContractAddresses, saveContractAddresses } from "../libs/deployment";
import { deployOwnershipCreator } from "../libs/deployment/ownershipCreator";
import { createLogger } from "../libs/logger";
import config from "../libs/deployment/config";

const buildPath = path.resolve(__dirname, '../build')

const logger = createLogger({ 'deployment': 'OwnershipCreator' })

async function main() {

  const savedContracts = await loadContractAddresses()
  if (savedContracts.OwnershipCreator) {
    logger.info(`OwnershipCreator contract already deployed (${savedContracts.OwnershipCreator.address})`)
    return
  }

  const addresses = await initAddresses()

  const dsoAddress = await addresses.dso!.getAddress()
  const bobAddress = await addresses.bob!.getAddress()

  logger.info(`DSO address ${dsoAddress}`)
  logger.info(`Bob address ${bobAddress}`)

  const isLocal = (process.env.DEPLOYMENT !== "testnet")
  const metadataUrl = isLocal ? "http://localhost:5000/api/" : config.metadataUrl
  const contracts = await deployOwnershipCreator(addresses, {
      metadataUrl
    })
  logger.info(`DSO deployed OwnershipCreator (address=${contracts.OwnershipCreator!.address})`)

  const contractTransaction = await contracts.OwnershipCreator!.CreateCertificate(bobAddress)
  const certificateId = contractTransaction.value
  // await contracts.OwnershipCreator!.transferOwnership(bobAddress)

  const contractMetadata = {
    "address": bobAddress,
    "number": config.certificateId,
    "image": `${metadataUrl}images/example.png`,
    "name": "Certificate of Ownership for PV",
    "description": `This is to certify that ${bobAddress}, \nis owner of the digital asset with the ID ${config.certificateId} that represents ownership of the PV-system on the musterstr. 99 with nominal capacity of 5kWp, on ${isLocal ? "local" : "testnet"}.\nContract address: \n${contracts.OwnershipCreator!.address}\n`
  }

  const metadataPath = path.join(buildPath, `${config.certificateId}.json`)
  await fs.writeFile(metadataPath, JSON.stringify(contractMetadata))
  logger.info(`Minted NFT ID=${certificateId} assigned to Bob (${bobAddress}). Metadata saved in ${metadataPath}`)

  await saveContractAddresses(contracts)

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
