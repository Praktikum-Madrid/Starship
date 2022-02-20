import {
  saveAvatar,
  savePassword,
  saveProfile,
} from 'config/api';
import Api from 'api/Api';

type TIdUser = number | string;
type TLoginUser = string;

export type TUserInfo = {
  first_name?: string,
  second_name?: string,
  login?: TLoginUser,
  email?: string,
  phone?: string,
  avatar?: string,
  id?: TIdUser,
}

export type TPassword = {
  oldPassword?: string,
  newPassword?: string,
}

// Настройки пользователя
class Profile extends Api {
  private readonly _saveProfileURL: string;

  private readonly _savePasswordURL: string;

  private readonly _saveAvatarURL: string;

  constructor() {
    super();
    this._saveProfileURL = this.apiUrl + saveProfile;
    this._savePasswordURL = this.apiUrl + savePassword;
    this._saveAvatarURL = this.apiUrl + saveAvatar;
  }

  saveProfile(data: TUserInfo) {
    return this.put(this._saveProfileURL, data);
  }

  savePassword(data: TPassword) {
    return this.put(this._savePasswordURL, data);
  }

  saveAvatar(form: FormData) {
    return this.putFile(this._saveAvatarURL, form);
  }
}

export default new Profile();
