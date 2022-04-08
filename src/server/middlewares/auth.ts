/* eslint-disable import/prefer-default-export */

// TODO: файл для тестирования, удалить после настройки основного решения!
import { getUuidCookie } from 'database/postgres';

export const auth = async (req: any, res: any, next: any) => {
  const cookies = req.headers.cookie;
  let uuid = '';

  if (cookies) {
    const cookiesArray = cookies.split('; ');

    const arr = cookiesArray.reduce((acc: Record<string, string>, item: string) => {
      const [name, value] = item.split('=');
      acc[name] = value;
      return acc;
    }, {});
    uuid = arr.uuid || '';
  }

  const isAuth = await getUuidCookie(uuid);
  if (isAuth) {
    console.log('isAuth=TRUE');
  } else {
    console.log('isAuth=FALSE');
  }

  next(); // пропускаем запрос дальше

  return null;
};
