import mongoose from 'mongoose';
import config from '../config/index.js';

const mongoLoader = async () => {
  const connection = await mongoose.connect(
    config.mongo.uri
  )
  return connection.connection.db
}

export default mongoLoader;