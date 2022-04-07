/* eslint-disable arrow-body-style */
/* eslint-disable no-unused-expressions */
import 'babel-polyfill';
import React from 'react';
import express from 'express';
import { StaticRouter } from 'react-router-dom/server';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import serialize from 'serialize-javascript';
import { matchRoutes } from 'react-router-dom';
import App from './components/App';
import createStore from './store/createStore';
import routes from './Routes';
import { dbConnect } from './init';

dbConnect().then(async () => {
  /* Запуск приложения только после старта БД */

  const app = express();
  const PORT = process.env.PORT || 3000;
  app.use(express.static('public'));
  app.get('*', (req, res, next) => {
    const store = createStore(req);

    const promises = matchRoutes(routes, req.path)?.map(({ route }) => {
      // @ts-ignore
      return route.loadData ? route.loadData(store) : null;
    });

    promises
      && Promise.all(promises)
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
          </head>
          <title>Starship</title>
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
