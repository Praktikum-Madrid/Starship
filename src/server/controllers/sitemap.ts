import baseUrl from 'config/app';
import { IRouteObjectWithPrivacy, TReq, TRes } from 'types';
import routes from 'routes';

const createSitemapLocation = (baseUrl: string, itemsArray: IRouteObjectWithPrivacy[], priority = '1.0', changeFrequency = 'monthly') => {
  const dateNow = new Date().toISOString()
    .split('T')[0];

  const result: string[] = itemsArray.map((item: IRouteObjectWithPrivacy) => {
    console.log(baseUrl, item.path);
    const url = `${baseUrl}${item.path !== '/' ? item.path : ''}`;
    console.log(url);
    if (!item.isPrivate) {
      return `<url>
        <loc>${url}</loc>
        <lastmod>${dateNow}</lastmod>
        <changefreq>${changeFrequency}</changefreq>
        <priority>${priority}</priority>
      </url>`;
    }

    return '';
  });

  return result.join('');
};

const getSitemap = (req: TReq, res: TRes) => {
  // Создаем список урл адресов
  const sitemapUrls = createSitemapLocation(baseUrl, routes);
  // Создаем карту сайта
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${sitemapUrls}
      </urlset>`;

  // Отдаем карту сайта
  res.status(200)
    .type('application/xml')
    .send(sitemap);
};

export default getSitemap;
