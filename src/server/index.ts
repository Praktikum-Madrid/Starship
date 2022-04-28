import 'babel-polyfill';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import publicRouter from 'server/router/publicRouter';
import protectedRouter from 'server/router/protectedRouter';
import ssrRouter from 'server/router/ssrRouter';
import errorRouter from 'server/router/errorRouter';
import sitemapRouter from 'server/router/sitemapRouter';
import checkAuth from './middlewares/checkAuth';
import protectRoute from './middlewares/protectRoute';

const app = express();

app.use(cors({
  origin: 'https://ya-praktikum.tech',
  optionsSuccessStatus: 200, // Поддержка старых браузеров (IE11, некоторые SmartTVs) зависают при статусе 204
}));

const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(checkAuth); // Проверяем авторизацию юзера
app.use('/', ...publicRouter); // Эти роутеры первыми (не нужна авторизация)
app.use('/', sitemapRouter); // Эти роутеры первыми (не нужна авторизация)
app.use('/', ...ssrRouter); // FIXME: Эти роуты должны работать только по соответствующим урлам
app.use('/', protectRoute, ...protectedRouter); // Эти роуты требуют авторизации
app.use('/', errorRouter); // Эти роуты требуют авторизации

app.listen(PORT, () => {
  console.log('Listening on prot', PORT);
});
