import { getUuidCookie } from 'server/database/controllers/user';
import { TRes, TNext, TReqWithUserData } from 'types';
import getCookiesFromRequest from 'utils/getCookiesFromRequest';

// TODO: Тут мы просто проверяем, авторизован ли юзер, и если авторизован - передаем далее по цепочке
//  данные в req.userData и req.userAuthorised. Можем хоть всю бд туда передать, если надо.
const checkAuth = async (req: TReqWithUserData, res: TRes, next: TNext) => {
  const cookie = getCookiesFromRequest(req);
  const uuidCookie = cookie?.uuid || null;

  if (!uuidCookie) {
    next();
    // eslint-disable-next-line no-useless-return
    return;
  }

  console.log('Мидлварь');
  try {
    const isAuth = await getUuidCookie(uuidCookie);

    // TODO: Пишем SSR
    if (isAuth || true) {
      console.log('Юзер авторизован');
      // TODO:
      //  1) получить из апи данные юзера в случае наличия куки
      //  2) получить из бд настройки юзера
      //  3) записать полученные данные в req.userData
      req.userAuthorised = true;
    } else {
      req.userAuthorised = false;
    }
  } catch (error) {
    console.log('Ошибка проверки авторизации!');
    res.status(500)
      .send({
        error: 'Ошибка проверки авторизации',
      });
  }

  next();
};

export default checkAuth;
