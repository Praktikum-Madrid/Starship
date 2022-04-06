// По идее, мы можем получать location прямо из окна
const apiProtocol = 'https://';
const apiRoute = 'ya-praktikum.tech/api/v2';
// export const apiURL = `${apiProtocol}${apiRoute}`;
export const apiURL = 'http://localhost:3000';

export const RESOURCES_URL = 'https://ya-praktikum.tech/api/v2/resources';

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

// Работа с Leaderboard
export const addToLeaderboard = '/leaderboard';
export const getTeamLeaderboard = '/leaderboard/all';
