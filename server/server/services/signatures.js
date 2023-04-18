import { ethers } from "ethers";
import config from '../config/index.js';

export default class SignatureManager {
  constructor() {
    const url = `https://${config.contractNetwork}.infura.io/v3/${config.infuraId}`;
    const provider = new ethers.providers.JsonRpcProvider(url);
    this.signerKey = new ethers.Wallet(config.pkSigner, provider);
    this.contractAddress = config.contractAddress;
    this.contractAddressEDOToken = config.contractAddressEDOToken;
    this.contractAddressBreedingManager = config.contractAddressBreedingManager;
  }

  async WhitelistSignature(
    chainId,
    address,
  ) {
    // Domain data should match whats specified in the DOMAIN_SEPARATOR constructed in the contract
    // https://github.com/msfeldstein/EIP712-whitelisting/blob/main/contracts/EIP712Whitelisting.sol#L33-L43
    const domain = {
      name: "WhitelistMint",
      version: "1",
      chainId,
      verifyingContract: this.contractAddress,
    };
  
    // The types should match the TYPEHASH specified in the contract
    // https://github.com/msfeldstein/EIP712-whitelisting/blob/main/contracts/EIP712Whitelisting.sol#L27-L28
    const types = {
      Minter: [{ name: "wallet", type: "address" }],
    };
    const value = {
      wallet: address 
    }
    return this.sign(domain, types, value);
  }
  
  async RaritySignature(
    chainId,
    userAddress,
    nftId,
    rarityId,
  ) {
    const domain = {
      name: "RegisterForRewards",
      version: "1",
      chainId,
      verifyingContract: this.contractAddressEDOToken,
    };
  
    // The types should match the TYPEHASH specified in the contract
    // https://github.com/msfeldstein/EIP712-whitelisting/blob/main/contracts/EIP712Whitelisting.sol#L27-L28
    const types = {
      Rewards: [
        {
          name: "wallet",
          type: "address",
        }, 
        {
          name: "tokenId",
          type: "uint256",
        },
        {
          name: "rarityId",
          type: "uint256"
        }
      ]
    };
    const value = {
      wallet: userAddress,
      tokenId: nftId,
      rarityId: rarityId,
    }
    return this.sign(domain, types, value);
  }
  

  // @TODO Fix this value
  async GenderSignature(
    chainId,
    userAddress,
    nftId,
    genderId,
  ) {
    const domain = {
      name: "RegisterForBreeding",
      version: "1",
      chainId,
      verifyingContract: this.contractAddressBreedingManager,
    };
  
    // The types should match the TYPEHASH specified in the contract
    // https://github.com/msfeldstein/EIP712-whitelisting/blob/main/contracts/EIP712Whitelisting.sol#L27-L28
    const types = {
      Breed: [
        {
          name: "wallet",
          type: "address",
        }, 
        {
          name: "tokenId",
          type: "uint256",
        },
        {
          name: "genderId",
          type: "uint256"
        }
      ]
    };
    const value = {
      wallet: userAddress,
      tokenId: nftId,
      genderId: genderId,
    }
    return this.sign(domain, types, value);
  }
  async sign(domain, types, value) {
    const signature = await this.signerKey._signTypedData(domain, types, value);
    return signature
  }
}
