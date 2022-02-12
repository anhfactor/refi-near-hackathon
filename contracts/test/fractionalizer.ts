import chai, { expect } from "chai";
import { solidity } from "ethereum-waffle";
import { beforeEach } from "mocha";
import { deployFractionalizer } from "../libs/deployment/fractionalizer";
import { deployOwnershipCreator } from "../libs/deployment/ownershipCreator";
import { deployStableCoin } from "../libs/deployment/stableCoin";
import { logger } from "../libs/logger";
import { initAddresses } from "../libs/accounts";
import { Addresses, Contracts } from "../libs/types";

chai.use(solidity);

describe("Fractionalizer", function () {

  let addresses: Addresses
  let contracts: Contracts
  
  const transferAmount = 12000
  const fractionalizationFee = 10
  const fractionsAmount = 1000

  const deployContracts = async():Promise<void> => {

    const ownershipCreatorDeployment = await deployOwnershipCreator(addresses, { metadataUrl: "http://localhost:5000" })
    const stableCoinDeployment = await deployStableCoin(addresses)
    const fractionalizer = await deployFractionalizer(addresses, { 
      fractionalizationFee,
      minterAddress: ownershipCreatorDeployment.OwnershipCreator!.address,
      paymentAddress: stableCoinDeployment.StableCoin!.address,
     })

    contracts = {
      ...ownershipCreatorDeployment,
      ...stableCoinDeployment,
      ...fractionalizer,
    }

  }

  beforeEach(async function () {
    addresses = await initAddresses()
    await deployContracts()
  });

  it("Should fractionalize", async () => {

    logger.info(`Bank transfers ${transferAmount} to Alice (address 3)`)
    await contracts.StableCoin!
      .connect(addresses.bank!)
      .transfer(await addresses.alice!.getAddress(), transferAmount);
    expect(await contracts.StableCoin!.balanceOf(await addresses.alice!.getAddress())).to.equal(transferAmount);

    // Note: The NFT has got the ID “0”
    logger.info("DSO (address 1) mint NFT and transfer it to Alice (address 3)")
    const certificate = await contracts.OwnershipCreator!.CreateCertificate(await addresses.dso!.getAddress())
    const certificateId = certificate.value.toString()

    await contracts.OwnershipCreator!.transferFrom(
      await addresses.dso!.getAddress(),
      await addresses.alice!.getAddress(),
      certificateId
    )
 
    logger.info(`In the OwnershipsCreator.sol Alice (address 3) approves the fractionaliser.sol address to transfer NFT with the ID of "${certificateId}" to the fractionaliser`)
    await contracts.OwnershipCreator!
      .connect(addresses.alice!)
      .approve(contracts.Fractionaliser!.address, certificateId)
    
    // Note:  Make sure Alice should approve enough funds
    logger.info("In the StableCoin.sol Alice (address 3) approves the fractionaliser.sol address funds (AmountFractions x FractionalisationFee) to the fractionaliser.sol")
    await contracts.StableCoin!
    .connect(addresses.alice!)
    .approve(contracts.Fractionaliser!.address, fractionsAmount * fractionalizationFee);

    expect(await contracts.StableCoin!.balanceOf(contracts.Fractionaliser!.address)).to.equal(0);
    expect(await contracts.StableCoin!.balanceOf(await addresses.alice!.getAddress())).to.equal(transferAmount);
    
    logger.info(`Alice (address 3) fractionalises her NFT in ${fractionsAmount} Fractions`)
    await contracts.Fractionaliser!
      .connect(addresses.alice!)
      .fractionalise(certificateId, fractionsAmount)
    
    logger.info("Check Balances of Alice (address 3) On the fractionalise check the balance of Alice")

    const fractionalizerBalance = fractionsAmount * fractionalizationFee
    const aliceBalance = transferAmount - fractionalizerBalance

    logger.debug(`Alice should own ${fractionsAmount} fractions`)
    expect(await contracts.Fractionaliser!.balanceOf(await addresses.alice!.getAddress())).to.equal(fractionsAmount);

    // On the OwnershipCreator check the balance of Alice
    logger.debug(`Alice should not own any NFT`)
    expect(await contracts.OwnershipCreator!.balanceOf(await addresses.alice!.getAddress())).to.equal(0);
    
    // On the StableCoin check the balance of Alice
    logger.debug(`Alice should own ${aliceBalance} stable coins`)
    const val = await contracts.StableCoin!.balanceOf(await addresses.alice!.getAddress())
    expect(+val.toString()).to.equal(aliceBalance);

  })

});