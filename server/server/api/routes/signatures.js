import controllers from '../controllers/index.js';
import { Router } from 'express';

const route = Router();
export default (app) => {
  app.use('/signatures', route)

  route.get('/whitelist',
    controllers.signatures.getWhitelistSignature
  )
  route.get('/breed',
    controllers.signatures.getBreedingSignature
  )
  route.get('/rarity',
    controllers.signatures.getRaritySignature
  )
}
