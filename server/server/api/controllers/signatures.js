import { Container } from 'typedi';
import Metadata from '../../services/metadata.js';
import SignatureService from '../../services/signatures.js';
import WhitelistManager from '../../services/whitelist.js';

export default {
  getWhitelistSignature: async (req, res) => {
    const logger = Container.get('logger');
    try{
      const { chainId, address } = req.query;
      const result = await WhitelistManager.getWhitelistInvitation(chainId, address)
      return res.send(result);
    } catch(e) {
      console.log(e)
      logger.error(JSON.stringify(e));
      return res.status(500).json(e).end()
    }
  },
  getRaritySignature: async (req, res) => {
    const logger = Container.get('logger');
    try{
      const signatureService = new SignatureService();
      const { chainId, address, nftId } = req.query;
      const metadataInstance = new Metadata();
      const rarityId = await metadataInstance.getRarity(nftId);
      const result = await signatureService.RaritySignature(chainId, address, nftId, rarityId);
      return res.json(result).end();
    } catch(e) {
      console.log(e)
      logger.error(JSON.stringify(e));
      return res.status(500).json(e).end()
    }
  },
  getBreedingSignature: async (req, res) => {
    const logger = Container.get('logger');
    try{
      const signatureService = new SignatureService();
      const { chainId, address, nftId, genderId } = req.query;
      const result = await signatureService.GenderSignature(chainId, address, nftId, genderId)
      return res.send(result);
    } catch(e) {
      console.log(e)
      logger.error(JSON.stringify(e));
      return res.status(500).json(e).end()
    }
  }
}

