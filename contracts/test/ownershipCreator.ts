import chai, { expect } from "chai";
import { solidity } from "ethereum-waffle";
import { beforeEach } from "mocha";
import { deployOwnershipCreator } from "../libs/deployment/ownershipCreator";
import { initAddresses } from "../libs/accounts";
import { Addresses, Contracts } from "../libs/types";

chai.use(solidity);

describe("OwnershipCreator", function () {
  
  let addresses: Addresses
  let contracts: Contracts

  let aliceAddress: string
  let ownerAddress: string

  beforeEach(async function () {
    addresses = await initAddresses()
    contracts = (await deployOwnershipCreator(addresses, {
      metadataUrl: "http://localhost:5000/api/"
    })) as Contracts
    aliceAddress = await addresses.alice!.getAddress()
    ownerAddress = await addresses.dso!.getAddress()
  });

  it("Admin should be owner", async () => {
    expect(await contracts.OwnershipCreator!.owner()).to.equal(ownerAddress);
  })

  it("Certificate ownership should be of Alice", async function () {
    const contractTransaction = await contracts.OwnershipCreator!.CreateCertificate(aliceAddress)
    expect(await contracts.OwnershipCreator!.ownerOf(contractTransaction.value)).to.be.equal(aliceAddress)
  });
  
  it("Certificate ownership should be transferred to Alice", async function () {
    
    await contracts.OwnershipCreator!.CreateCertificate(ownerAddress)
    expect(await contracts.OwnershipCreator!.owner()).to.be.equal(ownerAddress)

    await contracts.OwnershipCreator!.transferOwnership(aliceAddress)
    expect(await contracts.OwnershipCreator!.owner()).to.be.equal(aliceAddress)
  });

  it.only("Update metadata URL", async function () {
    const url = "http://foobar"
    await contracts.OwnershipCreator!.setUrl(url)
    expect(await contracts.OwnershipCreator!.getUrl()).to.be.equal(url)
  });

});