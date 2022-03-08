const CACHE_NAME = 'cache-v1';

const URLS = [
  '/images/exc_024.png',
  '/images/exc_025.png',
  '/images/exc_023.png',
  '/images/exc_028.png',
  '/images/exc_027.png',
  '/images/exc_029.png',
  '/images/exc_032.png',
  '/images/exc_022.png',
  '/images/exc_030.png',
  '/images/exc_033.png',
  '/images/exc_026.png',
  '/images/exc_031.png',
  '/images/exc_021.png',
  '/images/exc_020.png',
  '/images/exc_034.png',
  '/images/exc_019.png',
  '/images/exc_018.png',
  '/images/exc_035.png',
  '/images/exc_036.png',
  '/images/exc_017.png',
  '/images/exc_016.png',
  '/images/exc_037.png',
  '/images/exc_015.png',
  '/images/exc_038.png',
  '/images/exc_014.png',
  '/images/background.png',
  '/images/exc_013.png',
  '/images/exc_039.png',
  '/images/exc_012.png',
  '/images/exc_011.png',
  '/images/exc_040.png',
  '/images/opponent.png',
  '/images/missile_1.png',
  '/images/missile_4.png',
  '/images/spaceship.png',
  '/images/missile_3.png',
  '/images/game-over.png',
  '/images/texts/gameOver.png',
  '/images/missile_2.png',
  '/images/background_space.png',
  '/images/exc_009.png',
  '/images/exc_010.png',
  '/images/exc_008.png',
  '/images/exc_007.png',
  '/images/exc_006.png',
  '/images/texts/go.png',
  '/images/exc_005.png',
  '/images/board.png',
  '/images/buttons/play.png',
  '/images/exc_004.png',
  '/images/buttons/quit.png',
  '/images/exc_003.png',
  '/images/exc_002.png',
  '/images/exc_001.png',
  '/images/texts/score.png',
  '/images/exc_000.png',
  '/images/digits/8.png',
  '/images/digits/9.png',
  '/images/digits/3.png',
  '/images/digits/6.png',
  '/images/digits/2.png',
  '/images/digits/5.png',
  '/images/digits/0.png',
  '/images/digits/4.png',
  '/images/digits/7.png',
  '/images/avatar.png',
  '/images/digits/1.png',
  '/bundle.js',
  '/sounds/bump.mp3',
  '/index.html',
  '/images/exa_000.png',
  '/images/exa_001.png',
  '/images/exa_002.png',
  '/images/exa_003.png',
  '/images/exa_004.png',
  '/images/exa_005.png',
  '/images/exa_006.png',
  '/images/exa_007.png',
  '/images/exa_008.png',
  '/images/exa_009.png',
  '/images/exa_010.png',
  '/images/exa_011.png',
  '/images/exa_012.png',
  '/images/exa_013.png',
  '/images/exa_014.png',
  '/images/exa_015.png',
  '/images/exa_016.png',
  '/images/exa_017.png',
  '/images/exa_018.png',
];

this.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(URLS))
      .catch((err) => {
        throw err;
      }),
  );
});

this.addEventListener('activate', (event) => {
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

this.addEventListener('fetch', (event) => {
  event.respondWith(
    // ищем запрошенный ресурс среди закэшированных
    caches.match(event.request).then((cachedResponse) => {
      let lastModified;
      const fetchRequest = event.request.clone();
      // если ресурс есть в кэше
      if (cachedResponse) {
        // получаем дату последнего обновления
        lastModified = new Date(cachedResponse.headers.get('last-modified'));
        // и если мы считаем ресурс устаревшим
        if (lastModified && (Date.now() - lastModified.getTime()) > MAX_AGE) {
          // создаём новый запрос
          return fetch(fetchRequest).then((response) => {
            // при неудаче всегда можно выдать ресурс из кэша
            if (!response || response.status > 500) {
              return cachedResponse;
            }
            // обновляем кэш
            updateCache(event.request, response.clone());
            // возвращаем свежий ресурс
            return response;
          }).catch(() => cachedResponse);
        }
        return cachedResponse;
      }
      // если ресурса нет в кэше запрашиваем из сети как обычно
      return fetch(fetchRequest)
        .then((response) => {
          const responseClone = response.clone();
          // обновляем кэш
          updateCache(event.request, responseClone);
          // возвращаем свежий ресурс
          return response;
        });
    }),
  );
});

const updateCache = (req, res) => {
  caches.open(CACHE_NAME).then((cache) => {
    cache.put(req, res);
  });
};
