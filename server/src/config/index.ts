import dotenv from 'dotenv';
import fs from 'fs';

const ENV_FILE = `${__dirname}/../../.env`;

if(!fs.existsSync(ENV_FILE)){ throw new Error('No .env file found, please create one. You can copy the example from .env-example file.'); }

dotenv.config({ path: ENV_FILE });

export default {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  ID_LENGTH: process.env.ID_LENGTH,
  MONGO_URI: process.env.MONGO_URI,
  MONGO_DB: process.env.MONGO_DB,
  SECRET: process.env.SECRET,
};