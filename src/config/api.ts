// Конфиг для запросов в апи с бекенда
const apiProtocol = 'https://';
const apiRoute = 'ya-praktikum.tech/api/v2';
export const apiURL = `${apiProtocol}${apiRoute}`;
export const RESOURCES_URL = 'https://ya-praktikum.tech/api/v2/resources';

// Авторизация и работа с пользователем
export const signUp = '/auth/signup';
export const signIn = '/auth/signin';
export const getUser = '/auth/user';
export const logOut = '/auth/logout';
export const oauthYandex = '/oauth/yandex';
export const getServiceIdYandex = 'https://ya-praktikum.tech/api/v2/oauth/yandex/service-id';
// TODO доставать из переменной окружения, для yandex должен быть https://madrid-starship-11.ya-praktikum.tech
// export const redirectURL = 'http://localhost:3000';
export const redirectURL = 'https://madrid-starship-11.ya-praktikum.tech';
// Настройки пользователей
export const saveProfile = '/user/profile';
export const savePassword = '/user/password';
export const saveAvatar = '/user/profile/avatar';
export const getUserById = '/user/';
export const findUser = '/user/search';
export const userDB = '/user/db/:id';

// Работа с Leaderboard
export const addToLeaderboard = '/leaderboard';
export const getTeamLeaderboard = '/leaderboard/all';

// Работа с темами
export const getThreads = '/thread/all';
export const getThreadById = '/thread/:id';
export const createThread = '/thread';
export const getEmotions = '/emotion/all';

// Работа с сообщениями и комментами
export const getMessagesByThread = '/message/:threadId';
export const createMessage = '/message';
export const createMessageToMessage = '/comment';
export const getMessagesByParentIdMessage = '/comment/:replyToMessageId';
