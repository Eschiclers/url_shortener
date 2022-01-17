import mongoose from 'mongoose';
import Config from '../config';

export let database: mongoose.Connection;

export const connect = () => {
  if(database){ return; }

  mongoose.connect(Config.MONGO_URI, { dbName: Config.MONGO_DB });
  database = mongoose.connection;

  database.once('open', () => {
    console.log('Conexión establecida con la base de datos');
  });

  database.on('error', (error) => {
    console.error('Error de conexión con la base de datos: ', error);
  });
};

export const disconnect = () => {
  if(!database){ return; }
  mongoose.disconnect();
};