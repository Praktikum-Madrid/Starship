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
  // console.log(req.file);
  // console.log(req.file?.buffer);
  //
  // if (!req.files || Object.keys(req.files).length === 0) {
  //   return res.status(400)
  //     .send('Ни одного файла не загружено!');
  // }
  //
  // // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  // const avatar = req.files.avatar;
  //
  // const formData = new FormData();
  // formData.append('avatar', avatar);
  const file = req.file;
  console.log(file);

  const formData: FormData = new FormData();
  formData.append('file', file!.buffer);

  profile.saveAvatar(formData, req.headers.cookie)
    .then((apiResponse) => {
      res.status(apiResponse.status)
        .send(apiResponse.data);
    })
    .catch((error) => {
      res.status(error.response.status)
        .send(error.response.data);
    });
};
