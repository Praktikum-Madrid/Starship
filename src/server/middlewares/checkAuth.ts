import { TRes, TNext, TReqWithUserData } from 'types';
import getCookiesFromRequest from 'utils/getCookiesFromRequest';

const checkAuth = (req: TReqWithUserData, res: TRes, next: TNext) => {
  const cookie = getCookiesFromRequest(req);
  const authCookie = cookie?.authCookie;

  // Если кукиса нет, возвращаем 401 ошибку
  if (!authCookie) {
    res.status(401)
      .send({
        error: 'Unauthorised request',
      });

    return;
  }

  // Если кукис есть, сравниваем его с кукисом в базе данных
  // FIXME: Временное решение без запроса к бд, сейчас пейлоад будет всегда
  const dbCookie = authCookie;

  // Если кукис есть, мы проверяем токен и записываем пейлоад в req.user
  try {
    // ... Запрос к бд
    if (dbCookie === authCookie) {
      // Записали полученные данные пользователя в пейлоад
      req.userData = 'test user data';
      next();
    } else {
      res.status(401)
        .send({
          error: 'Unauthorised request',
        });

      return;
    }
  } catch (error) {
    // Если что-то пошло не так, вернётся ошибка, которую надо обработать в блоке catch
    console.log('Ошибка авторизации: кукис недействителен или просрочен.');
    res.clearCookie('authCookie').status(500).send({
      error: 'Auth check error',
    });
  }
};

export default checkAuth;
