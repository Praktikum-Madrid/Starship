// По идее, мы можем получать location прямо из окна
// Настройки для фронтенда
export const apiURL = 'http://localhost:3000'; // TODO то же самое: стоит прописать отдельный конфиг для деплоя
// export const apiURL = document.location.origin;

export const RESOURCES_URL = 'http://localhost:3000/resources';

// FIXME: Прийти к единому стилю именования данных переменных
// Авторизация и работа с пользователем
export const signUp = '/auth/signup';
export const signIn = '/auth/signin';
export const getUser = '/auth/user';
export const logOut = '/auth/logout';
export const oauthYandex = '/oauth/yandex';
export const getServiceIdYandex = '/oauth/yandex/service-id';
export const redirectURL = 'http://localhost:3000'; // TODO доставать из переменной окружения, для хероку должен быть https://my-game1222.herokuapp.com/

// Настройки пользователей
export const saveProfile = '/user/profile';
export const savePassword = '/user/password';
export const saveAvatar = '/user/profile/avatar';
export const getUserById = '/user/';
export const findUser = '/user/search';
export const userDB = '/user/db/';

// Работа с Leaderboard
export const addToLeaderboard = '/leaderboard';
export const getTeamLeaderboard = '/leaderboard/all';

// Работа с темами
export const getThreads = '/thread/all';
export const getThreadById = '/thread/'; // /thread/:id
export const createThread = '/thread';

// Смайлы
export const getEmotions = '/emotion/all';

// Работа с сообщениями и комментами
export const getMessagesByThread = '/message/'; // /message/:threadId
export const createMessage = '/message';
export const createMessageToMessage = '/comment';
export const getMessagesByParentIdMessage = '/comment/'; // /comment/:replyToMessageId
