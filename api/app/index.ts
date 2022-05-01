/* eslint-disable import/prefer-default-export */

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import xssClean from 'xss-clean';
import bodyParser from 'body-parser';
import { expressCspHeader, SELF } from 'express-csp-header';
import apiRouter from './router/apiRouter';
import { dbConnect } from './init';

export const startApp = () => {
  dbConnect().then(async () => {
    /* Запуск приложения только после старта БД */
    const app = express();
    app.use(cors());
    app.use(helmet());
    app.use(xssClean());
    app.use(expressCspHeader({
      directives: {
        'default-src': [SELF],
        'script-src': [SELF],
        'child-src': [SELF],
        'connect-src': [SELF],
      },
    }));
    const PORT = process.env.PORT || 8081;

    app.use(bodyParser.json());

    app.use('/', ...apiRouter);

    app.listen(PORT, () => {
      console.log('Listening on prot', PORT);
    });
  });
};
