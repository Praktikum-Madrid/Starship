import URLS from './assetsList';
const CACHE_NAME = 'cache-v1';

// eslint-disable-next-line no-restricted-globals
self.addEventListener('install', (event: any) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(URLS))
      .catch((err) => {
        throw err;
      }),
  );
});

// eslint-disable-next-line no-restricted-globals
self.addEventListener('activate', (event: any) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => Promise.all(
      cacheNames
        .filter((name) => false) /* Нужно вернуть true, если хотите удалить этот файл из кеша совсем */
        .map((name) => caches.delete(name)),
    )),
  );
});

// период обновления кэша - минута
const MAX_AGE = 60;

// eslint-disable-next-line no-restricted-globals
// self.addEventListener('fetch', (event: any) => {
//   if (!(event.request.url.indexOf('http') === 0)) return;
//   event.respondWith(
//     // ищем запрошенный ресурс среди закэшированных
//     caches.match(event.request).then((cachedResponse) => {
//       let lastModified;
//       const fetchRequest = event.request.clone();
//       // если ресурс есть в кэше
//       if (cachedResponse) {
//         // получаем дату последнего обновления
//         lastModified = new Date(cachedResponse.headers.get('last-modified') as any);
//         // и если мы считаем ресурс устаревшим
//         if (lastModified && (Date.now() - lastModified.getTime()) > MAX_AGE) {
//           // создаём новый запрос
//           return fetch(fetchRequest).then((response) => {
//             // при неудаче всегда можно выдать ресурс из кэша
//             if (!response || response.status > 500) {
//               return cachedResponse;
//             }
//             // обновляем кэш
//             updateCache(event.request, response.clone());
//             // возвращаем свежий ресурс
//             return response;
//           }).catch(() => cachedResponse);
//         }
//         return cachedResponse;
//       }
//       // если ресурса нет в кэше запрашиваем из сети как обычно
//       return fetch(fetchRequest)
//         .then((response) => {
//           const responseClone = response.clone();
//           // обновляем кэш
//           updateCache(event.request, responseClone);
//           // возвращаем свежий ресурс
//           return response;
//         });
//     }),
//   );
// });

const updateCache = (req: any, res: any) => {
  caches.open(CACHE_NAME).then((cache) => {
    cache.put(req, res);
  });
};
