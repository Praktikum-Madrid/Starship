import { TPostgresUserInfo, TReq, TRes } from '../config/types';
import { User } from '../init';

// Создание пользователя
export async function createUser(userData: TPostgresUserInfo) {
  return User.create(userData);
}

// Обновление пользователя по ID
export async function updateUserById(userId: string, data: TPostgresUserInfo) {
  return User.update(data, { where: { userId } });
}

// Получение пользователя по ID
export async function getUserById(userId: string) {
  return User.findOne({ where: { userId } });
}

// Получение пользователя по UUID
export async function getUuidCookie(uuid: string) {
  return User.findOne({ where: { uuid } });
}

export const handleGetUserData = (req: TReq, res: TRes) => {
  res.status(200).send('user is ok');
  // auth.getUserData(req.headers.cookie)
  //   .then((apiResponse) => {
  //     res.status(apiResponse.status).send(apiResponse.data);
  //   })
  //   .catch((error) => {
  //     res.status(error.response.status).send(error.response.data);
  //   });
};
