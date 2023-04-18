import dotenv from 'dotenv';

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (envFound.error) {
  // This error should crash whole process

  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
  /**
   * Your favorite port
   */
  port: parseInt(process.env.PORT || "3000", 10),

  /**
   * That long string from mlab
   */
  databaseURL: process.env.MONGODB_URI,

  /**
   * Your secret sauce
   */
  jwtSecret: process.env.JWT_SECRET,

  /**
   * Used by winston logger
   */
  logs: {
    level: process.env.LOG_LEVEL || 'silly',
  },

  infuraId: process.env.INFURA_PROJECT_ID || '',
  contract: {
    revealed: process.env.CONTRACT_REVEALED || false,
    abi: (await import('./vsamurai-abi.js')).default,
    network: process.env.CONTRACT_NETWORK,
    address: process.env.CONTRACT_ADDRESS_VSAMURAIS || '',
  },
  ipfs: {
    uri: process.env.IPFS_URI || 'QmWTJaHZDEVUztzr6TWapVHxe3Ksutyr6NTET1cWgCGXib',
  },
  contractAddress: process.env.CONTRACT_ADDRESS_VSAMURAIS || '',
  contractAddressEDOToken: process.env.CONTRACT_ADDRESS_EDOTOKEN,
  contractAddressBreedingManager: process.env.CONTRACT_ADDRESS_BREEDING_MANAGER,
  contractNetwork: process.env.CONTRACT_NETWORK,
  pkSigner: '95778f04ea39268625b4bffe1d627153ccd797c1c2d2affd8f211ac4f11152fd',
  pubkeySigner: '0xeAB1e71AF80a159f6A03c6Ab4BEB52356f7d6dB4',
  google_cloud: {
    projectId: process.env.GOOGLE_CLOUD_PROJECT_ID || '',
    clientEmail: process.env.GOOGLE_CLOUD_CLIENT_EMAIL || '',
    privateKey: process.env.GOOGLE_CLOUD_PRIVATE_KEY || ''
  },

  /**
   * Agenda.js stuff
   */
  agenda: {
    dbCollection: process.env.AGENDA_DB_COLLECTION,
    pooltime: process.env.AGENDA_POOL_TIME,
    concurrency: parseInt(process.env.AGENDA_CONCURRENCY, 10),
  },

  /**
   * Agendash config
   */
  agendash: {
    user: process.env.AGENDASH_USER || 'agendash',
    password: process.env.AGENDASH_PASSWORD || '123456',
  },
  /**
   * API configs
   */
  api: {
    prefix: '/api',
  },
  /**
   * Mailgun email credentials
   */
  emails: {
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN,
  },
  cloud: {
    bucket: process.env.GOOGLE_CLOUD_STORAGE_BUCKET || '',
  },
  mongo: {
    uri: process.env.MONGODB_URI || "",
  },
  jobsqueue: {
    db_uri:  process.env.MONGODB_URI || "",
  }
};