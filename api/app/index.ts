import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import apiRouter from './router/apiRouter';
import { dbConnect } from './init';

const startApp = () => {
  dbConnect().then(async () => {
    /* Запуск приложения только после старта БД */
    const app = express();
    app.use(cors());
    const PORT = process.env.PORT || 8081;

    app.use(bodyParser.json());

    app.use('/', ...apiRouter);

    app.listen(PORT, () => {
      console.log('Listening on prot', PORT);
    });
  });
};

export default startApp;
