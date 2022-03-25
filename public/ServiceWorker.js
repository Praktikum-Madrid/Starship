/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/serviceWorker/assetsList.ts":
/*!*****************************************!*\
  !*** ./src/serviceWorker/assetsList.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (['/images/avatar.png', '/images/background.png', '/images/background_space.png', '/images/board.png', '/buttons/play.png', '/buttons/quit.png', '/digits/0.png', '/digits/1.png', '/digits/2.png', '/digits/3.png', '/digits/4.png', '/digits/5.png', '/digits/6.png', '/digits/7.png', '/digits/8.png', '/digits/9.png', '/images/exa_000.png', '/images/exa_001.png', '/images/exa_002.png', '/images/exa_003.png', '/images/exa_004.png', '/images/exa_005.png', '/images/exa_006.png', '/images/exa_007.png', '/images/exa_008.png', '/images/exa_009.png', '/images/exa_010.png', '/images/exa_011.png', '/images/exa_012.png', '/images/exa_013.png', '/images/exa_014.png', '/images/exa_015.png', '/images/exa_016.png', '/images/exa_017.png', '/images/exa_018.png', '/images/exc_000.png', '/images/exc_001.png', '/images/exc_002.png', '/images/exc_003.png', '/images/exc_004.png', '/images/exc_005.png', '/images/exc_006.png', '/images/exc_007.png', '/images/exc_008.png', '/images/exc_009.png', '/images/exc_010.png', '/images/exc_011.png', '/images/exc_012.png', '/images/exc_013.png', '/images/exc_014.png', '/images/exc_015.png', '/images/exc_016.png', '/images/exc_017.png', '/images/exc_018.png', '/images/exc_019.png', '/images/exc_020.png', '/images/exc_021.png', '/images/exc_022.png', '/images/exc_023.png', '/images/exc_024.png', '/images/exc_025.png', '/images/exc_026.png', '/images/exc_027.png', '/images/exc_028.png', '/images/exc_029.png', '/images/exc_030.png', '/images/exc_031.png', '/images/exc_032.png', '/images/exc_033.png', '/images/exc_034.png', '/images/exc_035.png', '/images/exc_036.png', '/images/exc_037.png', '/images/exc_038.png', '/images/exc_039.png', '/images/exc_040.png', '/images/game-over.png', '/images/meteor_opponent.png', '/images/missile_1.png', '/images/missile_2.png', '/images/missile_3.png', '/images/missile_4.png', '/images/spaceship.png', '/images/spaceship_opponent.png', '/texts/gameOver.png', '/texts/go.png', '/texts/score.png', '/sounds/bump.mp3', '/sounds/explosion.mp3', '/sounds/music.mp3']);\n\n//# sourceURL=webpack://starship/./src/serviceWorker/assetsList.ts?");

/***/ }),

/***/ "./src/serviceWorker/serviceWorker.ts":
/*!********************************************!*\
  !*** ./src/serviceWorker/serviceWorker.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _assetsList__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./assetsList */ \"./src/serviceWorker/assetsList.ts\");\n\nvar CACHE_NAME = 'cache-v1'; // eslint-disable-next-line no-restricted-globals\n\nself.addEventListener('install', function (event) {\n  event.waitUntil(caches.open(CACHE_NAME).then(function (cache) {\n    return cache.addAll(_assetsList__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\n  })[\"catch\"](function (err) {\n    throw err;\n  }));\n}); // eslint-disable-next-line no-restricted-globals\n\nself.addEventListener('activate', function (event) {\n  event.waitUntil(caches.keys().then(function (cacheNames) {\n    return Promise.all(cacheNames.filter(function (name) {\n      return false;\n    })\n    /* Нужно вернуть true, если хотите удалить этот файл из кеша совсем */\n    .map(function (name) {\n      return caches[\"delete\"](name);\n    }));\n  }));\n}); // период обновления кэша - минута\n\nvar MAX_AGE = 60; // eslint-disable-next-line no-restricted-globals\n\nself.addEventListener('fetch', function (event) {\n  if (!(event.request.url.indexOf('http') === 0)) return;\n  event.respondWith( // ищем запрошенный ресурс среди закэшированных\n  caches.match(event.request).then(function (cachedResponse) {\n    var lastModified;\n    var fetchRequest = event.request.clone(); // если ресурс есть в кэше\n\n    if (cachedResponse) {\n      // получаем дату последнего обновления\n      lastModified = new Date(cachedResponse.headers.get('last-modified')); // и если мы считаем ресурс устаревшим\n\n      if (lastModified && Date.now() - lastModified.getTime() > MAX_AGE) {\n        // создаём новый запрос\n        return fetch(fetchRequest).then(function (response) {\n          // при неудаче всегда можно выдать ресурс из кэша\n          if (!response || response.status > 500) {\n            return cachedResponse;\n          } // обновляем кэш\n\n\n          updateCache(event.request, response.clone()); // возвращаем свежий ресурс\n\n          return response;\n        })[\"catch\"](function () {\n          return cachedResponse;\n        });\n      }\n\n      return cachedResponse;\n    } // если ресурса нет в кэше запрашиваем из сети как обычно\n\n\n    return fetch(fetchRequest).then(function (response) {\n      var responseClone = response.clone(); // обновляем кэш\n\n      updateCache(event.request, responseClone); // возвращаем свежий ресурс\n\n      return response;\n    });\n  }));\n});\n\nvar updateCache = function updateCache(req, res) {\n  caches.open(CACHE_NAME).then(function (cache) {\n    cache.put(req, res);\n  });\n};\n\n//# sourceURL=webpack://starship/./src/serviceWorker/serviceWorker.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/serviceWorker/serviceWorker.ts");
/******/ 	
/******/ })()
;