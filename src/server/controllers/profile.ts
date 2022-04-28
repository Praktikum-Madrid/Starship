/* eslint-disable camelcase */
import { profile, avatar } from 'api/backend';
import { TPassword, TReq, TRes, TUserInfo } from 'types';
import FormData from 'form-data';
import { handleErrorReq } from 'server/utils';
import { getUserById } from 'server/database/controllers/user';

export const handleSaveProfile = (req: TReq, res: TRes) => {
  const {
    first_name,
    second_name,
    login,
    email,
    phone,
    avatar,
    display_name,
    id,
  } = req.body;

  const requestData: TUserInfo = {
    first_name,
    second_name,
    login,
    email,
    phone,
    display_name,
  };

  if (avatar) {
    requestData.avatar = avatar;
  }

  if (id) {
    requestData.id = id;
  }

  profile.saveProfile(requestData, req.headers.cookie)
    .then((apiResponse) => {
      res.status(apiResponse.status)
        .send(apiResponse.data);
    })
    .catch((error) => {
      res.status(error.response.status)
        .send(error.response.data);
    });
};

export const handleSavePassword = (req: TReq, res: TRes) => {
  const {
    oldPassword,
    newPassword,
  } = req.body;

  const requestData: TPassword = {
    oldPassword,
    newPassword,
  };

  profile.savePassword(requestData, req.headers.cookie)
    .then((apiResponse) => {
      res.status(apiResponse.status)
        .send(apiResponse.data);
    })
    .catch((error) => {
      res.status(error.response.status)
        .send(error.response.data);
    });
};

export const handleSaveAvatar = (req: TReq, res: TRes) => {
  const file = req.file;
  // Передаем файл из запроса в данные формы для отправки
  const formData: any = new FormData();
  formData.append('avatar', file!.buffer, file!.originalname);

  const formConfig: any = {
    headers: {
      ...formData.getHeaders(),
      'Cookie': req.headers.cookie,
    },

    withCredentials: true,
  };

  avatar.saveAvatarOnServer(formData, formConfig)
    .then((apiResponse) => {
      res.status(apiResponse.status)
        .send(apiResponse.data);
    })
    .catch((error) => {
      res.status(error.response.status)
        .send(error.response.data);
    });
};

export const handleGetAvatar = (req: TReq, res: TRes) => {
  // Если кукисы есть, отправляем запрос
  if (req.headers.cookie) {
    const { id, avatarUrl } = req.params;
    const url = `/${id}/${avatarUrl}`;

    const formConfig: any = {
      headers: {
        'Cookie': req.headers.cookie,
      },
      withCredentials: true,
      responseType: 'arraybuffer',
      timeout: 30000,
    };

    avatar.getAvatarFromServer(url, formConfig)
      .then(({ headers, status, data }) => {
        res.status(status)
          .set({ ...headers })
          .send(data);
      })
      .catch((error) => {
        console.log(error);
        res.status(error.response.status).send(error.response.data);
      });
  } else {
    res.status(403).send({ reason: 'Cookies is not valid' });
  }
};

// FIXME: Этот запрос выполняется без авторизации, и идет в базу данных???
export const handleGetUserDB = (req: TReq, res: TRes) => {
  const { id } = req.params;
  getUserById(id)
    .then((apiResponse) => {
      res.status(apiResponse.status)
        .send(apiResponse.data);
    })
    .catch(handleErrorReq(res));
};
