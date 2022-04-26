import { Router } from 'express';
import getSitemap from 'server/controllers/sitemap';

const sitemapRouter = Router();
sitemapRouter.get('/sitemap.xml', getSitemap);

export default sitemapRouter;
