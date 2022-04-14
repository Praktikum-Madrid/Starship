/* eslint-disable arrow-body-style */
/* eslint-disable import/prefer-default-export */
import { TNext, TReqWithUserData, TRes } from 'types';
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
  // console.log(req);
  // TODO:
  //  1) В стор передаём данные, полученные из базы данных
  //  2) Делаем нормальную проверку роутов, если раут не найден - отдаем 404 страницу
  //  3) При получении рабочего раута используем бекенд-геттер для получения данных (имея куку юзера)
  const store = createStore({
    auth: {
      isLogined: req.userAuthorised ?? '',
      data: req.userData ?? '',
    },
  });
  // @ts-ignore
  // TODO: вот тут интересный момент: мы матчим роуты, и в результате должны:
  //  а) Получить компонент, который рендерим с данными, если совпадения есть
  //  б) Получить null, и таким образом вернуть страницу с 404 статусом и темплейтом страницы ошибок
  const promises = matchRoutes(routes, req.url)
    ?.map(({ route }) => (route.loadData ? route.loadData(store) : null));
  promises?.push(Layout.loadData(store));

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
            <script src="bundle.js"></script>
          </body>
        </html>
      `);
    })
    .catch(next);
};
