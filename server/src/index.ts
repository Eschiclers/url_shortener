import express from 'express';
import cors from 'cors';
import { connect } from './database';
import Config from './config';

import ping from './routes/ping';
import url from './routes/url';

const app = express();
connect(); // Database connection

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());

// ROUTES

app.get('/', (req, res) => {
  res.json({message: "Navega, velero mío, sin temor que ni enemigo navío, ni tormenta, ni bonanza tu rumbo a torcer alcanza, ni a sujetar tu valor."});
});

app.use('/api/v1/', url);
// just for testing purposes
app.use('/api/v1/ping', ping);

app.get('*', (req, res) => {
  res.status(404).json({success: false, message: "Not Found"});
});

app.listen(Config.PORT, () => {
  console.log(`Server is listening on port ${Config.PORT}`);
});