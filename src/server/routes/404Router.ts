import { Router } from 'express';
import { renderErrorPage } from 'server/controllers/serverSide404';
const ssr404Router = Router();

ssr404Router.get('*', renderErrorPage);

export default ssr404Router;
