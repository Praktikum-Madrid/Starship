import { TRes, TNext, TReqWithUserData } from 'types';
import getCookiesFromRequest from 'utils/getCookiesFromRequest';
import { auth } from 'api/backend';

const checkAuth = async (req: TReqWithUserData, res: TRes, next: TNext) => {
  const cookie = getCookiesFromRequest(req);
  const { authCookie } = cookie || null;

  console.log(authCookie);
  // Если кукиса нет, просто возвращаем ошибку
  if (!authCookie) {
    console.log('Auth cookie not found');
    return;
  }

  // Если кукис есть, проверим его валидность
  return auth.getUserData(req.headers.cookie)
    .then((response: { status: number; data: any }) => {
      console.log('User is authorised, cookie is valid');
      // Если данные получены, запишем их в объект реквеста
      if (response.status === 200) {
        req.isUserLogined = true;
        req.userData = response.data;
      }
      next();
    }).catch((error: any) => {
      // FIXME: Для нужд дебага
      console.log('Check auth error');
      console.log(error.response.status);
      console.log(error.response.data);
      next();
    });
};

export default checkAuth;
