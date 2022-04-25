/* eslint-disable arrow-body-style */
/* eslint-disable import/prefer-default-export */
import { ISSRRouteObject, TNext, TReqWithUserData, TRes } from 'types';
import createStore from 'store/createStore';
import { matchRoutes } from 'react-router-dom';
import routes from 'routes';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom/server';
import App from 'components/App';
import Layout from 'components/Layout';
import serialize from 'serialize-javascript';
import React from 'react';

export const serverSideRendering = (req: TReqWithUserData, res: TRes, next: TNext) => {
  const store = createStore(req);
  // @ts-ignore
  // Проверяем роуты.
  const matchedRoutes = matchRoutes(routes, req.url);
  // Если совпадения есть, делаем SSR
  if (matchedRoutes?.length) {
    const routeDataLoaded = matchedRoutes.map(({ route }: { route: ISSRRouteObject }) => (route.loadData ? route.loadData(store, req.url) : null));
    const layoutDataLoaded = Layout.loadData(store);

    Promise.all([routeDataLoaded, layoutDataLoaded])
      .then(() => {
        const content = renderToString(
          <Provider store={store}>
            <StaticRouter location={req.url}>
              <App />
            </StaticRouter>
          </Provider>,
        );

        res.send(`<!DOCTYPE html>
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
            <script src="/bundle.js"></script>
          </body>
        </html>
      `);
      })
      .catch((error) => {
        console.log('SSR Controller error:');
        console.log(error);
      });
  } else {
    // Если совпадений нет - отправляем юзера дальше по роутеру
    console.log('В контроллер после SSR');
    next();
  }
};
