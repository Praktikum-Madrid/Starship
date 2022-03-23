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

const app = express();
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
        <html>
          <head></head>
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

app.listen(3000, () => {
  console.log('Listening on prot 3000');
});
