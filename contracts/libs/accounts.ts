import { ethers } from "hardhat";
import { Addresses } from "./types";

export const initAddresses = async (): Promise<Addresses> => {

    const addresses: Addresses = {}
    const [dso, bank, refi, alice, bob] = await ethers.getSigners();
    
    addresses.dso = dso
    addresses.bank = bank
    addresses.refi = refi
    addresses.alice = alice
    addresses.bob = bob

    return addresses
}