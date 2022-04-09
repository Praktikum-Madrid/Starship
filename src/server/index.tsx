/* eslint-disable arrow-body-style */
import 'babel-polyfill';
import React from 'react';
import express from 'express';
import { StaticRouter } from 'react-router-dom/server';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import serialize from 'serialize-javascript';
import { matchRoutes } from 'react-router-dom';
import cors from 'cors';
import publicRouter from 'server/router/publicRouter';
import bodyParser from 'body-parser';
import App from 'components/App';
import createStore from 'store/createStore';
import protectedRouter from 'server/router/protectedRouter';
import routes from '../routes';
import { dbConnect } from '../init';
import { auth } from './middlewares/auth'; // для теста - удалить

dbConnect().then(async () => {
  /* Запуск приложения только после старта БД */
  const app = express();
  app.use(cors());
  const PORT = process.env.PORT || 3000;

  app.use(express.static('public'));

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  app.use('/', ...publicRouter);
  // TODO: Добавить защищенный роут в проект

  app.use(auth); // для теста - удалить!

  app.use('/', ...protectedRouter);

  app.get('*', (req, res, next) => {
    //  TODO: Здесь передавать в объект стора данные из базы данных
    const store = createStore(req);

    const promises = matchRoutes(routes, req.path)?.map(({ route }) => {
      // @ts-ignore
      return route.loadData ?? null;
    });

    Promise.all(promises!)
      .then(() => {
        const content = renderToString(
          <Provider store={store}>
            <StaticRouter location={req.url}>
              <App />
            </StaticRouter>
          </Provider>,
        );

        res.send(`
        <!DOCTYPE html>
        <html lang="ru">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta http-equiv="X-UA-Compatible" content="ie=edge" />
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/7.0.0/normalize.css" />
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
            <title>Starship</title>
          </head>
          <body>
            <div id="root">${content}</div>
            <script>
              window.INITIAL_STATE = ${serialize(store.getState())}
            </script>
            <script src="bundle.js"></script>
          </body>
        </html>
      `);
      })
      .catch(next);
  });

  app.listen(PORT, () => {
    console.log('Listening on prot', PORT);
  });
});
