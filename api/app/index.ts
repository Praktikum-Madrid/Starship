/* eslint-disable import/prefer-default-export */

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import apiRouter from './router/apiRouter';
import { dbConnect } from './init';

export const startApp = () => {
  dbConnect().then(async () => {
    /* Запуск приложения только после старта БД */
    const app = express();
    app.use(cors());
    const PORT = process.env.PORT || 8080;

    app.use(bodyParser.json());

    app.use('/', ...apiRouter);

    app.listen(PORT, () => {
      console.log('Listening on prot', PORT);
    });
  });
};
