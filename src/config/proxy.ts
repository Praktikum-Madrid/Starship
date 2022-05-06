// Настройки для фронтенда
export const apiURL = 'https://madrid-starship-11.ya-praktikum.tech';

export const RESOURCES_URL = 'https://madrid-starship-11.ya-praktikum.tech/resources';

// Авторизация и работа с пользователем
export const signUp = '/auth/signup';
export const signIn = '/auth/signin';
export const getUser = '/auth/user';
export const logOut = '/auth/logout';
export const redirectURL = 'https://madrid-starship-11.ya-praktikum.tech';
export const oauthYandex = '/oauth/yandex';
export const getServiceIdYandex = 'https://ya-praktikum.tech/api/v2/oauth/yandex/service-id';

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
