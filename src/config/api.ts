const apiProtocol = 'https://';
const apiRoute = 'ya-praktikum.tech/api/v2';
export const apiURL = `${apiProtocol}${apiRoute}`;

// Авторизация и работа с пользователем
export const signUp = '/auth/signup';
export const signIn = '/auth/signin';
export const getUser = '/auth/user';
export const logOut = '/auth/logout';

// Настройки пользователей
export const saveProfile = '/user/profile';
export const savePassword = '/user/password';
export const saveAvatar = '/user/profile/avatar';
export const getUserById = '/user/';
export const findUser = '/user/search';

// Работа с Leaderboard
export const addToLeaderboard = '/leaderboard';
export const getTeamLeaderboard = '/leaderboard/starship';
