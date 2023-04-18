import Web3 from 'web3';
import axios from "axios";
import config from '../config/index.js'
import metadataJSON from '../config/metadata.js';

class Metadata {
  constructor() {
    // Show web3 where it needs to look for the Ethereum node
    this.web3 = new Web3(new Web3.providers.HttpProvider(`https://${config.contract.network}.infura.io/v3/${config.infuraId}`));
    const abi = config.contract.abi;
    const addr = config.contract.address;

    // Build a new variable based on the web3 API including the ABI and address of the contract
    this.NFTContract = new this.web3.eth.Contract(abi, addr);
  }
  async verifyOwnership(tokenId, nounce, signature) {
    const [ owner, account ] = await Promise.all([
      this.NFTContract.methods.ownerOf(tokenId).call(),
      this.web3.eth.accounts.recover(nounce, signature)
    ])
    if(owner !== account) {
      throw new Error('Only the owner can perform this action')
    }
    return true;
  }

  getId (tokenIdString) {
    const id = parseInt(tokenIdString.toString().split('.json')[0]);
    return id;
  }

  async getRarity(tokenId) {
    const id = this.getId(tokenId);
    if(!metadataJSON[id-1]) {
      throw new Error('Inexisting nft');
    } else {
      const nftMetadata = metadataJSON[id-1];
      const rarityObj = nftMetadata.attributes.find(attr => {
        return attr.trait_type === "rarity";
      })
      // Special case
      if(['111', '333', '777', '1111', '1499', '1998'].includes(id.toString())) {
        return 4;
      }
      if(!rarityObj) {
        throw new Error(`Rarity inexistant, please contact the administrations - NFT ID: ${tokenId}`);
      }
      const rarityIds = {
        "Samurai": 1,
        "Ronin": 2,
        "Onna-musha": 2,
        "Kunoichi": 3,
        "Shogun": 3,
        "Emperor": 4,
        "Empress": 4,
      }
      return rarityIds[rarityObj.value];
    }
  }

  async getMetadata(tokenId) {
    const id = this.getId(tokenId);
    if(!metadataJSON[id-1]) {
      throw new Error('Inexisting nft');
    } else {
      let image;
      if(['111', '333', '777', '1111', '1499', '1998'].includes(id)) {
        image = `https://storage.googleapis.com/vsamurai-images/${id}.gif`; 
      } else {
        image = `https://storage.googleapis.com/vsamurai-images/${id}.png`; 
      }
      return {
        ...metadataJSON[id-1],
        image,
      };
    }
  }
}

export default Metadata;