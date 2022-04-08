/* eslint-disable camelcase */
import { profile } from 'api/backend';
import { TPassword, TReq, TRes, TUserInfo } from 'types';
import FormData from 'form-data';

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

  const formData: FormData = new FormData();
  formData.append('avatar', file!.buffer, file!.originalname);

  profile.saveAvatar(formData, req.headers.cookie)
    .then((apiResponse) => {
      res.status(apiResponse.status)
        .send(apiResponse.data);
    })
    .catch((error) => {
      console.log(error);
      res.status(error.response.status)
        .send(error.response.data);
    });
};
