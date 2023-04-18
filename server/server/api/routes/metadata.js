import controllers from '../controllers/index.js';
import { Router } from 'express';

const route = Router();
export default (app) => {
  app.use('/metadata', route)
  
  route.get('/:id',
    controllers.metadata.getMetadata
  )
}