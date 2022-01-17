import dotenv from 'dotenv';
dotenv.config({ path: `${__dirname}/../../.env` });

export default {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  ID_LENGTH: process.env.ID_LENGTH,
  MONGO_URI: process.env.MONGO_URI,
  MONGO_DB: process.env.MONGO_DB,
  SECRET: process.env.SECRET,
};