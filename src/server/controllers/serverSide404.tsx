import createStore from 'store/createStore';
import Layout from 'components/Layout/Layout';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom/server';
import App from 'components/App';
import serialize from 'serialize-javascript';
import React from 'react';
import { TReqWithUserData, TRes } from 'types';

/* eslint-disable import/prefer-default-export */
export const renderErrorPage = (req: TReqWithUserData, res: TRes) => {
  console.log('В контроллере 404 ошибки');
  const store = createStore(req);

  Layout.loadData(store).then(() => {
    const content = renderToString(
      <Provider store={store}>
        <StaticRouter location='/404'>
          <App />
        </StaticRouter>
      </Provider>,
    );

    res.status(404).send(`<!DOCTYPE html>
        <html lang="ru">
          <head>
            <title>Ошибка 404</title>
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
    .catch((error: any) => {
      console.log('404 SSR controller error:');
      console.log(error);
    });
};
