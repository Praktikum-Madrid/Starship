import 'babel-polyfill';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import publicRouter from 'server/router/publicRouter';
import protectedRouter from 'server/router/protectedRouter';
import ssrRouter from 'server/router/ssrRouter';
import { dbConnect } from './init';
// import checkAuth from './middlewares/checkAuth';

dbConnect().then(async () => {
  /* Запуск приложения только после старта БД */
  const app = express();
  app.use(cors());
  const PORT = process.env.PORT || 3000;

  app.use(express.static('public'));

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  app.use('/', ...publicRouter); // Эти роутеры первыми (не нужна авторизация)
  app.use('/', ...ssrRouter);
  app.use('/', ...protectedRouter); // FIXME: Эти роуты требуют авторизации
  // app.use('/', checkAuth, ...protectedRouter); // Эти роуты требуют авторизации

  app.listen(PORT, () => {
    console.log('Listening on prot', PORT);
  });
});
