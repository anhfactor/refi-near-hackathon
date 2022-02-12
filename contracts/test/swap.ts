import chai, { expect } from "chai";
import { solidity } from "ethereum-waffle";
import { beforeEach } from "mocha";
import { initAddresses } from "../libs/accounts";
import { deploySwap } from "../libs/deployment/swap";
import { Addresses, Contracts, ContractsAddresses } from "../libs/types";
import { logger } from "../libs/logger";
import { deployContract } from "../libs/deployment";

chai.use(solidity);

describe("swap protocol", function () {

  let addresses: Addresses
  let contracts: Contracts

  // ether -> wei conversion 
  // https://github.com/ethereumjs/ethereumjs-units/blob/master/units.json#L23
  // 100000 eth
  const initialTokenAmout = "100000000000000000000000"
  const aliceTokenAmout = "10000"
  const aliceTransferTokenAmout = "5000"
  
  const waitSeconds = 60
  const aliceTokenAmountOut = "2496"
  
  const aliceTokenBTransferredAmount = "7496"

  const deployContracts = async (): Promise<Contracts> => {

    const contracts: Contracts = {}

    logger.debug("Deploy Token_A")
    contracts.Token_A = await deployContract('Token_A', addresses.refi!, ['Token_A', 'TKA', initialTokenAmout]);

    logger.debug("Deploy Token_B")
    contracts.Token_B = await deployContract('Token_B', addresses.refi!, ['Token_B', 'TKB', initialTokenAmout]);

    const {WETH, ReFiFactory, ReFiRouter02} = (await deploySwap(addresses, {
      addressPairA: contracts.Token_A!.address,
      addressPairB: contracts.Token_B!.address,
    })) as Contracts

    contracts.WETH = WETH
    contracts.ReFiFactory = ReFiFactory
    contracts.ReFiRouter02 = ReFiRouter02

    return contracts
  }

  beforeEach(async function () {
    addresses = await initAddresses()
    contracts = await deployContracts()
  });

  it("Should swap token", async () => {
    
    const refiAddress = await addresses.refi!.getAddress()
    const aliceAddress = await addresses.alice!.getAddress()

    logger.info("Check Balances for Token A and Token B")
    // Based on deployment script address [1] should receive 100 Token A and 100 Token B,
    // (18 decimal). These tokens are only for testing. In our case we are going to use NFT-fractions and
    //  the stableCoin. Both are ERC20 tokens.

    let balanceA = await contracts.Token_A!.balanceOf(refiAddress)
    expect(balanceA).to.be.equal(initialTokenAmout)

    let balanceB = await contracts.Token_B!.balanceOf(refiAddress)
    expect(balanceB).to.be.equal(initialTokenAmout)

    logger.info("Alice (address 3) receive funds and must approve the RefiRouter02.sol")
    // On the Token A and Token B contract Alice must approve the RefiRouter02 address to
    //  transfer the amount of 5000 Wei of Token A and Token B on her behalf

    logger.debug("Transfer tokens to Alice")
    await contracts.Token_A!
      .connect(addresses.refi!)
      .transfer(aliceAddress, aliceTokenAmout)
    await contracts.Token_B!
      .connect(addresses.refi!)
      .transfer(aliceAddress, aliceTokenAmout)

    logger.debug("Alice approve Token_A transfer to ReFiRouter02")
    await contracts.Token_A!
      .connect(addresses.alice!)
      .approve(contracts.ReFiRouter02!.address, aliceTransferTokenAmout)

    logger.debug("Alice approve Token_B transfer to ReFiRouter02")
    await contracts.Token_B!
      .connect(addresses.alice!)
      .approve(contracts.ReFiRouter02!.address, aliceTransferTokenAmout)

    balanceA = await contracts.Token_A!.balanceOf(aliceAddress)
    expect(balanceA.toString()).to.be.equal(aliceTokenAmout)

    balanceB = await contracts.Token_B!.balanceOf(aliceAddress)
    expect(balanceB.toString()).to.be.equal(aliceTokenAmout)
    logger.debug(`Alice initial balance balanceA=${balanceA} balanceB=${balanceB}`)

    logger.info("Alice (address 3) will add liquidity into the pool")
    // Alice will provide 5000 Wei of Token A and 5000 Wei of Token B. On the ReFiRouter02 contract. 
    // Note: “to” is the address of the caller in our case Alice. For timestamp provide the
    // “Current Epoch Unix Timestamp” + enough seconds for making the transaction going through. 
    // Otherwise, you will get the ERROR: EXPIRED
    await contracts.ReFiRouter02!
      .connect(addresses.alice!)
      .addLiquidity(
          contracts.Token_A!.address, // address tokenA,
          contracts.Token_B!.address, // address tokenB,
          aliceTransferTokenAmout, // uint amountADesired,
          aliceTransferTokenAmout, // uint amountBDesired,
          aliceTransferTokenAmout, // uint amountAMin,
          aliceTransferTokenAmout, // uint amountBMin,
          aliceAddress, //  address to,
          Math.round((Date.now() / 1000) + waitSeconds) // uint deadline
      )
      
      balanceA = await contracts.Token_A!.balanceOf(aliceAddress)
      expect(+balanceA).to.be.equal(+aliceTokenAmout - +aliceTransferTokenAmout)
      balanceB = await contracts.Token_B!.balanceOf(aliceAddress)
      expect(+balanceB).to.be.equal(+aliceTokenAmout - +aliceTransferTokenAmout)
      logger.debug(`Alice balance after addLiquidity balanceA=${balanceA} balanceB=${balanceB}`)
      
      logger.info("Alice (address 3) must approve RefiRouter02.sol")
      // On the Token A contract Alice must approve the RefiRouter02 address to transfer the amount 
      // of 5000 Wei of Token A for swapping Token B on her behalf. 

      const amountOut = await contracts.ReFiRouter02!
        .connect(addresses.alice!)
        .getAmountOut(aliceTransferTokenAmout, aliceTransferTokenAmout, aliceTransferTokenAmout)
      logger.debug(`alice amountOut ${amountOut}`)
      expect(amountOut).to.be.equal(aliceTokenAmountOut)

      logger.info("Alice (address 3) swaps Token A for Token B")
      // Alice swaps 5000 Token A for Token B. 
      // amountOutMin: Alices tolerance regarding the amount of Token B taken out after the swap.
      
      logger.debug("Alice approves ReFiRouter02 transaction")
      await contracts.Token_A!
        .connect(addresses.alice!)
        .approve(contracts.ReFiRouter02!.address, aliceTransferTokenAmout)

      await contracts.ReFiRouter02!
        .connect(addresses.alice!)
        .swapExactTokensForTokens(
          +aliceTransferTokenAmout,
          (+amountOut)-10,
          [
            contracts.Token_A!.address,
            contracts.Token_B!.address
          ],
          aliceAddress,
          Math.round(Date.now()/ 1000 + waitSeconds)
        )

      logger.info("Check balances of Alice for Token A and Token B")
      balanceA = await contracts.Token_A!.balanceOf(aliceAddress)
      expect(+balanceA).to.be.equal(0)
      balanceB = await contracts.Token_B!.balanceOf(aliceAddress)
      expect(balanceB).to.be.equal(aliceTokenBTransferredAmount)
      logger.debug(`Alice balance after addLiquidity balanceA=${balanceA} balanceB=${balanceB}`)

  })

});