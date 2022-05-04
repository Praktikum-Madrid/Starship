import { TRes, TNext, TReqWithUserData } from 'types';
import getCookiesFromRequest from 'utils/getCookiesFromRequest';
import { auth } from 'api/backend';

const checkAuth = async (req: TReqWithUserData, res: TRes, next: TNext) => {
  const cookie = getCookiesFromRequest(req);
  const authCookie = cookie?.authCookie || null;

  // Если кукиса нет, просто возвращаем ошибку
  if (!authCookie) {
    console.log('Auth cookie not found');
    next();
    return;
  }

  // Если кукис есть, проверим его валидность
  return auth.getUserData(req.headers.cookie)
    .then((response: { status: number; data: any }) => {
      // Если данные получены, запишем их в объект реквеста
      if (response.status === 200) {
        req.isUserLogined = true;
        req.userData = response.data;
      }
      next();
    }).catch(() => {
      next();
    });
};

export default checkAuth;
