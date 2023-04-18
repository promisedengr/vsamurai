import controllers from '../controllers/index.js';
import { Router } from 'express';

const route = Router();
export default (app) => {
  app.use('/members', route)
  
  route.get('/',
    controllers.members.get
  )
}