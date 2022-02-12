import { BigNumber } from '@ethersproject/bignumber';
import chai, { expect } from "chai";
import { solidity } from "ethereum-waffle";
import { beforeEach } from "mocha";
import { deployLending } from "../libs/deployment/lending";
import { deployStableCoin } from "../libs/deployment/stableCoin";
import { logger } from "../libs/logger";
import { initAddresses } from "../libs/accounts";
import { Addresses, Contracts } from "../libs/types";

chai.use(solidity);

const toBigNumber = (value: number, base: number=1e18): BigNumber => BigNumber.from(BigInt(value*base))

describe("lending protocol", function () {

  // 1000 eEUR
  const initialStableCoinFunds = toBigNumber(1000)
  // 500 eEUR
  const eEURBorrowAmount = toBigNumber(500, 1e18)

  // 50000 ReEUR
  const expectedReEURBalance = toBigNumber(50000, 1e8)
  // 500 ReEU
  const borrowAmount = toBigNumber(500, 1e8)
  // 25000 eEUR
  const reedemAmount = toBigNumber(25000, 1e8)

  let addresses: Addresses
  let contracts: Contracts
  
  beforeEach(async function () {
    addresses = await initAddresses()

    const stableCoinDeployment = await deployStableCoin(addresses)
    const lendingDeployment = await deployLending(addresses, {
      // "900000000000000000"
      collateralFactor: toBigNumber(0.9),
      // "5000000000000000000000"
      maxAssets: toBigNumber(5000),
      stableCoinAddress: stableCoinDeployment.StableCoin!.address
    })

    contracts = {
      ...stableCoinDeployment, 
      ...lendingDeployment
    } as Contracts

  });

  it("Should lend tokens", async () => {

    logger.info("Check Balances for StableCoin (eEUR)")
    // Based on the deployment script Alice address [2] should have received 1000 eEUR 
    // and Bob address [3] 1000 eEUR (18 decimal). On the StableCoin contract call the balance function for address [2] and address [3]. You should get the following result:

    const aliceAddress = await addresses.alice!.getAddress()
    const bobAddress = await addresses.bob!.getAddress()

    const markets = await contracts.ReFiComptroller!.markets(contracts.ReEUR!.address)
    logger.debug(`ReEUR markets for ReEUR: ${markets}`)

    await contracts.StableCoin!.transfer(aliceAddress, initialStableCoinFunds)
    expect(await contracts.StableCoin!.balanceOf(aliceAddress)).to.be.equal(initialStableCoinFunds)

    await contracts.StableCoin!.transfer(bobAddress, initialStableCoinFunds)
    expect(await contracts.StableCoin!.balanceOf(bobAddress)).to.be.equal(initialStableCoinFunds)
    
    logger.debug(`For lending Bob must approve ReEUR`)
    await contracts.StableCoin!
    .connect(addresses.bob!)
    .approve(contracts.ReEUR!.address, initialStableCoinFunds)
    
    logger.info(`Bob supplies 1000 eEUR (${initialStableCoinFunds}) to the protocol`)
    await contracts.ReEUR!
      .connect(addresses.bob!)
      .mint(initialStableCoinFunds)

    const bobReEURbalance = await contracts.ReEUR!.balanceOf(bobAddress)
    logger.debug(`Based on the interest rate model Bob received 50000 ReFiEUR (balance=${bobReEURbalance})`)
    expect(bobReEURbalance).to.be.equal(expectedReEURBalance)

    logger.debug("The lending market eEUR/ReFiEUR has received 1000 eEUR")
    expect(await contracts.ReEUR!.getCash()).to.be.equal(initialStableCoinFunds)

    logger.debug("The balance of Bod for StableCoins should be now 0")
    expect(await contracts.StableCoin!.balanceOf(bobAddress)).to.be.equal(0)

    logger.info("For lending Alice must approve ReEUR")
    await contracts.StableCoin!
      .connect(addresses.alice!)
      .approve(contracts.ReEUR!.address, initialStableCoinFunds)

    logger.info("Alice supplies 1000 eEUR to the protocol")
    await contracts.ReEUR!
      .connect(addresses.alice!)
      .mint(initialStableCoinFunds)

    logger.debug("Based on the interest rate model Alice received 50000 ReFiEUR")
    expect(await contracts.ReEUR!.balanceOf(aliceAddress)).to.be.equal(expectedReEURBalance)

    logger.debug("The lending market eEUR/ReFiEUR has received 2000 eEUR")
    expect(await contracts.ReEUR!.getCash()).to.be.equal(initialStableCoinFunds.mul(2))

    logger.debug("The balance of Alice for StableCoins should be now 0")
    expect(await contracts.StableCoin!.balanceOf(aliceAddress)).to.be.equal('0')

    logger.info("For borrowing Alice enters the eEUR/ReFiEUR market")
    // For borrowing Alice needs to enter the eEUR/ReFiEUR market. On the ReFiComptroller contract Alice 
    // calls the enterMarkets function as follows
    await contracts.ReFiComptroller!
      .connect(addresses.alice!)
      .enterMarkets([
        contracts.ReEUR!.address
      ])
    const aliceMarkets = await contracts.ReFiComptroller!
      .connect(addresses.alice!)
      .markets(contracts.ReEUR!.address)
    logger.debug(`Alice markets for ReEUR: ${aliceMarkets}`)
    expect(aliceMarkets.toString()).to.contain("true,")

    logger.info(`Alice borrows 500 eEUR (${borrowAmount}) from the protocol`)
    // On the ReEUR contract Alice must call the borrow function and 
    // define the amount of the underlying 500 eEUR
    // Note: Alice supplied already 1000 eEUR. The collateral factor has been set to 0.9. 
    // This means that Alice can borrow up to 900 eEUR.
    await contracts.ReEUR!
      .connect(addresses.alice!)
      .borrow(borrowAmount)
    expect(await contracts.StableCoin!.balanceOf(aliceAddress)).to.be.equal(borrowAmount)
    
    logger.info("Bob redeems 25000 ReEUR from the protocol")
    // Bob can redeem a portion or all ReEUR tokens. On the ReEUR contract Bod calls the redeem
    //  function and redeems 25000 ReEUR
    await contracts.ReEUR!
      .connect(addresses.bob!)
      .redeem(reedemAmount)

    const bobReEURBalance = await contracts.ReEUR!.balanceOf(bobAddress)
    const bobStableCoinBalance = await contracts.StableCoin!.balanceOf(bobAddress)
    expect(bobReEURBalance).to.be.equal(reedemAmount)
    expect(BigNumber.from(bobStableCoinBalance).sub(eEURBorrowAmount).toNumber()).to.be.greaterThan(0)

  })

});