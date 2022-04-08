import { TPostgresUserInfo } from 'types';
import { User } from '../init';

// Создание пользователя
export async function createUser(userData: TPostgresUserInfo) {
  return User.create(userData);
}

// Обновление пользователя по ID
export async function updateUserById(userId: number, data: TPostgresUserInfo) {
  return User.update(data, { where: { userId } });
}

// Получение пользователя по ID
export async function getUserById(userId: number) {
  return User.findOne({ where: { userId } });
}
