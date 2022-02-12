import path from "path";
import { initAddresses } from "../libs/accounts";
import { loadContracts, saveContractAddresses } from "../libs/deployment";
import config from "../libs/deployment/config";
import { deploySwap } from "../libs/deployment/swap";
import { createLogger } from "../libs/logger";


const buildPath = path.resolve(__dirname, '../build')

const logger = createLogger({ 'deployment': 'Swap' })

async function main() {

  const addresses = await initAddresses()
  const bobAddress = await addresses.bob!.getAddress()

  const contracts = await loadContracts(addresses)
  if (contracts.WETH) {
    logger.info(`Swap contracts already deployed (${contracts.WETH.address})`)
    return
  }

  if (!contracts.StableCoin || !contracts.StableCoin.address) {
    logger.warn(`StableCoin address not found, please deploy it first`)
    process.exit(1)
  }
  if (!contracts.Fractionaliser) {
    logger.warn(`Fractionaliser address not found, please deploy it first`)
    process.exit(1)
  }

  const refiAddress = await addresses.refi!.getAddress()
  logger.info(`Refi address ${refiAddress}`)

  const pairA = contracts.Fractionaliser!
  const pairB = contracts.StableCoin!

  const {WETH, ReFiFactory, ReFiRouter02} = await deploySwap(addresses, {
    addressPairB: pairA.address,
    addressPairA: pairB.address,
  })

  contracts.ReFiFactory = ReFiFactory
  contracts.ReFiRouter02 = ReFiRouter02
  contracts.WETH = WETH

  logger.debug("Bob approve fractionaliser transfer to ReFiRouter02")
  await pairA!
    .connect(addresses.bob!)
    .approve(contracts.ReFiRouter02!.address, config.liquidityTransferTokenAmout)

  logger.debug("Bob approve stable coin transfer to ReFiRouter02")
  await pairB!
    .connect(addresses.bob!)
    .approve(contracts.ReFiRouter02!.address, config.liquidityTransferTokenAmout)

  logger.debug(`Bob initial balance fractionaliser=${await pairA.balanceOf(bobAddress)} stable coin=${await pairB!.balanceOf(bobAddress)}`)

  logger.info("Bob (address 3) will add liquidity into the pool")
  await contracts.ReFiRouter02!
    .connect(addresses.bob!)
    .addLiquidity(
        pairA.address, // address tokenA,
        pairB!.address, // address tokenB,
        config.liquidityTransferTokenAmout, // uint amountADesired,
        config.liquidityTransferTokenAmout, // uint amountBDesired,
        config.liquidityTransferTokenAmout, // uint amountAMin,
        config.liquidityTransferTokenAmout, // uint amountBMin,
        bobAddress, //  address to,
        Math.round((Date.now() / 1000) + config.waitSeconds) // uint deadline
    )

  await saveContractAddresses(contracts)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
