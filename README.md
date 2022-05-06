[![code checks](https://github.com/Praktikum-Madrid/Starship/actions/workflows/pr_checks.yml/badge.svg)](https://github.com/Praktikum-Madrid/Starship/actions/workflows/pr_checks.yml)

# Starship / Звездолёт ™
Учебный проект в рамках Яндекс-Практикума по направлению **Middle фронтенд разработчик**.

## Установка
- `npm run init` - установка зависимостей в проекте,
- `npm run start` — запуск версии для разработчика,
- `npm run build` — production сборка приложения,
- `npm run test` — запуск тестов

## Docker установка
- `docker-compose build` — билд docker-контейнера
- `docker-compose up` — запуск docker-контейнера
- `docker-compose stop` — остановка docker-контейнера
- `docker-compose rm` — удаление docker-контейнера

_Примечание: с запуском `npm run init` в среде **windows** может возникнуть проблема: не распознается команда `cp -r` для скрипта `assets:copy`. 
При возникновении указанной проблемы, стоит поменять в **package.json** строку  `"cp -r ./src/assets/ public",`, на  `"robocopy ./src/assets/ public"`._

## Ссылки
* [Проект в интернете](https://madrid-starship-11.ya-praktikum.tech/)
* [Проект в хероку](https://my-game1222.herokuapp.com/)

## Рабочий процесс
* [Дизайн проекта в Figma](https://www.figma.com/file/nnxIiyjZvQ0bFcGyPITG2J/%D0%98%D0%93%D0%A0%D0%90?node-id=6%3A40)
* [Доска в Trello](https://trello.com/b/NZxdMp0x/%D0%B8%D0%B3%D1%80%D0%B0)
* [Доска в Miro](https://miro.com/app/board/uXjVOOg1bsg=/)

## Технологии
* React
* REDUX
* THUNK
* DOCKER
* NodeJS
* TypeScript
* CSSS
* MUI
* Stylelint
* Eslint
* ServerSide rendering
* Babel
* JEST
* Formik
* Multer
* serviceWorker

... и ещё много всего

## Code style
В проекте использовано [Руководство по стилю кода от Airbnb](https://leonidlebedev.github.io/javascript-airbnb/) при написании JS/TS.

Для именования элементов страниц и селекторов в CSS используем [методологию БЭМ / BEM](https://yoksel.github.io/easy-markup/bem-rules/).

## Файловая структура проекта
В проекте решено использовать следующую файловую структуру:

```
  /api                 -- Апи базы данных проекта
  /assetsCollector     -- Функция для создания списка статичных файлов проекта
  /nginx               -- Конфигурационные файлы Nginx 
  /src                 -- Исходные коды проекта
  ../api               -- Интерфейс для отправки запросов к апи (фронтенд и бекенд)
  ../assets            -- Статические файлы игры (изображения, звуки)
  ../components        -- Компоненты (React)
    ../ComponentName   -- Директория компонентов
      ../index.tsx     -- Экспорт компонента
      ../Name.tsx      -- Код компонента
  ../config            -- Конфигурационные константы игры
  ../game              -- Сама игра
  ../server            -- Сервер для SSR (backend)
  ../serviceWorker     -- Файо сервис воркера
  ../static            -- Статические файлы сервера
  ../store             -- Стор (состояние приложения)
  ../types             -- Собственные типы проекта
  ../utils             -- Собственные утилиты
  /webpack             -- Конфигурационные файлы сборщика Webpack
```

## Соглашение по именованию
Классовые компоненты React именуются с заглавной буквы: `class ComponentName extends Component {...}`

Функциональные компоненты React именуются с заглавной буквы: `function ComponentName() {...}`

## Пулл-реквесты и коммиты
Под каждую задачу создаем отдельную ветку с идентификатором задачи из Trello.

Коммиты обозначаем в соответствии с [общепринятым стилем оформления коммитов](https://gist.github.com/Voloshin-Sergei/ffbec67c6d9fcb32b0df014ababba0e9).

Аппрувнутые пулл-реквесты сливаем в ветку **stable**. Для загрузки на хероку используем ветку **deploy**. На хостинг заливается версия из ветки **main**.

## TODO и FIXME
Функционал, который необходимо реализовать в дальнейшем записываем в проекте как `TODO: Сделать что-то...`
Ошибки, недоработки, "костыли", и прочие штуки, требующие исправления в будущем обозначаем как `FIXME: Что надо исправить...`

