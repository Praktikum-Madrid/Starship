import { TNext, TReqWithUserData, TRes } from 'types';
import createStore from 'store/createStore';
import { matchRoutes } from 'react-router-dom';
import routes from 'routes';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom/server';
import App from 'components/App';
import serialize from 'serialize-javascript';
import React from 'react';

export const serverSideRendering = (req: TReqWithUserData, res: TRes, next: TNext) => {
  //  TODO: Здесь передавать в объект стора данные из базы данных
  console.log(req.userData);
  const store = createStore(req);

  // @ts-ignore
  const promises = matchRoutes(routes, req.path)?.map(({ route }) => route.loadData ?? null);

  // FIXME: Что делает здесь Promise.all??? Почему не возвращает значения? Для чего эта переменная???
  Promise.all(promises!)
    .then(() => {
      const content = renderToString(
        <Provider store={store}>
          <StaticRouter location={req.url}>
            <App />
          </StaticRouter>
        </Provider>,
      );

      // TODO: Если у нас ошибка 404, отдавать соответствующий код (404)
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
};
