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

// ok
export const handleGetUuidCookie = (req: TReq, res: TRes) => {
  const { uuidCookie } = req.body;
  return getUuidCookie(uuidCookie).then((user) => {
    res.status(200).send(user);
  }).catch((error) => {
    res.status(error.response.status).send(error.response.data);
  });
};

// ok
export const handleCreateUser = (req: TReq, res: TRes) => {
  const { userData } = req.body;
  return createUser(userData).then((user) => {
    res.status(200).send(user);
  }).catch((error) => {
    res.status(error.response.status).send(error.response.data);
  });
};

// ok
export const handleGetUserById = (req: TReq, res: TRes) => {
  const { userId } = req.body;
  return getUserById(userId).then((user) => {
    res.status(200).send(user);
  }).catch((error) => {
    res.status(500).send(error);
  });
};

// ok
export const handleUpdateUserById = (req: TReq, res: TRes) => {
  const { userId, data } = req.body;
  return updateUserById(userId, data).then((user) => {
    res.status(200).send(user);
  }).catch((error) => {
    res.status(error.response.status).send(error.response.data);
  });
};

// ok
export const handleSetTheme = async (req: TReq, res: TRes) => {
  try {
    const { userId, theme } = req.body;
    const user = await getUserById(userId);
    // @ts-ignore
    user.mode = theme;
    await user.save();
    return res.status(200).send(user);
  } catch (error) {
    console.log(error);
  }
};
