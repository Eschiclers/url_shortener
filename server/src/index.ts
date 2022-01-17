import express from 'express';
import Config from './config';

const app = express();

app.get('/', (req, res) => {
  res.json({message: "Navega, velero mío, sin temor que ni enemigo navío, ni tormenta, ni bonanza tu rumbo a torcer alcanza, ni a sujetar tu valor."});
});

app.listen(Config.PORT, () => {
  console.log(`Server is listening on port ${Config.PORT}`);
});