import { Container } from 'typedi';
import Metadata from '../../services/metadata.js';
export default {
  getMetadata: async (req, res) => {
    const logger = Container.get('logger');
    try{
      const { id } = req.params;
      const metadataService = new Metadata();
      const result = await metadataService.getMetadata(id)
      return res.send(result);
    } catch(e) {
      console.log(e)
      logger.error(JSON.stringify(e));
      return res.status(500).json(e).end()
    }
  },
}

