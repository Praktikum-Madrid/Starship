import { Router } from 'express';
import { serverSideRendering } from 'server/controllers/serverSideRendering';
const ssrRouter = Router();

ssrRouter.get('*', serverSideRendering);

export default ssrRouter;
