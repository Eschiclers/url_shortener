import dotenv from 'dotenv';
dotenv.config();

export default {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 3000,
  MONGO_URI: process.env.DB_URI || 'mongodb://localhost:27017/url_shortener',
  MONGO_DB: process.env.DB_NAME || 'url_shortener',
  SECRET: process.env.SECRET || 'url_shortener_secret',
};