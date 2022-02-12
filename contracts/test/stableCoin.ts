import chai, { expect } from "chai";
import { solidity } from "ethereum-waffle";
import { beforeEach } from "mocha";
import { deployStableCoin } from "../libs/deployment/stableCoin";
import { Addresses, Contracts } from "../libs/types";
import { initAddresses } from "../libs/accounts";
import { BigNumber } from "@ethersproject/bignumber";

chai.use(solidity);

const CONTRACT_NAME = "StableCoin"

describe(CONTRACT_NAME, function () {

  let addresses: Addresses
  let contracts: Contracts

  let ownerAddress: string

  beforeEach(async function () {
    addresses = await initAddresses()
    contracts = (await deployStableCoin(addresses)) as Contracts
    ownerAddress = await addresses.bank!.getAddress()
  });

  it("Check balance", async () => {
    const balanceTx = await contracts.StableCoin!.balanceOf(ownerAddress)
    expect(balanceTx.toString()).to.equal(BigNumber.from(10000000).mul(BigInt(1e18)));
  })

  it("Should assign the total supply of tokens to the owner", async function () {
    const ownerBalance = await contracts.StableCoin!.balanceOf(ownerAddress);
    expect(await contracts.StableCoin!.totalSupply()).to.equal(ownerBalance);
  });

});