/* eslint-disable camelcase */
import { TPostgresUserInfo, TReq, TRes } from 'types';
import { auth } from 'api/backend';
import setCookie from 'set-cookie-parser';
import { cookiesToString } from 'server/utils';
import { getUserById, createUser, updateUserById } from 'server/database/controllers/user';
import { THEMES } from 'config/consts';

export const handleSignIn = (req: TReq, res: TRes) => {
  const {
    login = '',
    password = '',
  } = req.body;

  auth.signIn({
    login,
    password,
  })
    .then((apiResponse) => {
      const cookies = setCookie.parse((apiResponse as any), {
        decodeValues: true, // default: true
      });

      // Запрашиваем данные пользователя и сохраняем их в базу данных
      auth.getUserData(cookiesToString(cookies))
        .then((apiResponse) => {
          const { id } = apiResponse.data;
          // Проверяем есть ли юзер в базе данных
          getUserById(`${id}`)
            .then((user) => {
              if (!user) {
                // если юзера нет
                const userData: TPostgresUserInfo = {
                  userId: id,
                  authCookie: `${cookies[1].value}`,
                  uuid: `${cookies[2].value}`,
                  mode: THEMES.LIGHT,
                };
                // сохраняем данные юзера и куки в базе данных
                createUser(userData);
              } else {
                console.log('saved mode', user.data.mode);
                const userData: TPostgresUserInfo = {
                  userId: id,
                  authCookie: `${cookies[1].value}`,
                  uuid: `${cookies[2].value}`,
                  mode: user.data.mode,
                };
                // обновляем данные юзера и куки в базе данных
                updateUserById(`${id}`, userData);
              }
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });

      cookies.forEach((cookieObject) => res.cookie(cookieObject.name, cookieObject.value, {
        httpOnly: true,
        secure: true,
        expires: cookieObject.expires,
      }));
      res.status(apiResponse.status).send(apiResponse.data);
    })
    .catch((error) => {
      res.status(error.response.status).send(error.response.data);
      // TODO: Сделать здесь свои ответы сервера на каждый вариант
    });
};

export const handleSignUp = (req: TReq, res: TRes) => {
  const {
    first_name = '',
    second_name = '',
    login = '',
    email = '',
    password = '',
    phone = '',
  } = req.body;

  auth.signUp({
    first_name,
    second_name,
    login,
    email,
    password,
    phone,
  })
    .then((apiResponse) => {
      res.status(apiResponse.status).send(apiResponse.data);
    })
    .catch((error) => {
      res.status(error.response.status).send(error.response.data);
    });
};

export const handleGetUserData = (req: TReq, res: TRes) => {
  auth.getUserData(req.headers.cookie)
    .then((apiResponse) => {
      res.status(apiResponse.status).send(apiResponse.data);
    })
    .catch((error) => {
      res.status(error.response.status).send(error.response.data);
    });
};

export const handleLogOut = (req: TReq, res: TRes) => {
  auth.logOut(req.headers.cookie)
    .then((apiResponse) => {
      res.clearCookie('authCookie');
      res.clearCookie('uuid');
      res.status(apiResponse.status).send(apiResponse.data);

      // TODO: Здесь удалять куку юзера из базы данных
    })
    .catch((error) => {
      res.status(error.response.status).send(error.response.data);
    });
};
