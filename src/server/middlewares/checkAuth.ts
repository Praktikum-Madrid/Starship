import { getUuidCookie } from 'database/postgres';
import { TRes, TNext, TReqWithUserData } from 'types';
import getCookiesFromRequest from 'utils/getCookiesFromRequest';

const checkAuth = async (req: TReqWithUserData, res: TRes, next: TNext) => {
  const cookie = getCookiesFromRequest(req);
  const uuidCookie = cookie.uuid || null;

  if (!uuidCookie) {
    res.status(401)
      .send({
        error: 'Unauthorised request',
      });

    return;
  }

  try {
    const isAuth = await getUuidCookie(uuidCookie);
    // @ts-ignore
    console.log('isAuth', isAuth.dataValues);
    if (isAuth) {
      next();
    } else {
      res.status(401)
        .send({
          error: 'Unauthorised request',
        });

      return;
    }
  } catch (error) {
    console.log('Ошибка авторизации: кукис недействителен или просрочен.');
    res.clearCookie('uuid').status(500).send({
      error: 'Auth check error',
    });
  }
};

export default checkAuth;
