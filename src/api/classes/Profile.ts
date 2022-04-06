import Api from 'api/classes/Api';
import { TUserInfo, TPassword } from 'types';

// Настройки пользователя
class Profile extends Api {
  private readonly _saveProfileURL: string;

  private readonly _savePasswordURL: string;

  private readonly _saveAvatarURL: string;

  constructor({
    saveAvatar,
    savePassword,
    saveProfile,
    apiURL,
  }: Record<string, string>) {
    super(apiURL);
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

export default Profile;
