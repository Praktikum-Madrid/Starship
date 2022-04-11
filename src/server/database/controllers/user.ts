import { TPostgresUserInfo } from 'types';
import { User } from 'server/init';

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
