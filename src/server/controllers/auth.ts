import { TReq, TRes } from 'types';
import { auth } from 'api/backend';
import setCookie from 'set-cookie-parser';

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
      // TODO: В этом месте записывать полученный Cookie в базу данных
      console.log(cookies);

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
