import { Router } from 'express';
import signatures from './routes/signatures.js';
import metadata from './routes/metadata.js';

export default () => {
  const app = Router();
  signatures(app);
  metadata(app);
  return app;
}