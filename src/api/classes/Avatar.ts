import axios from 'axios';
import Api from './Api';

class Avatar extends Api {
  private readonly _saveAvatarURL: string;

  private readonly _getAvatarURL: string;

  constructor({
    saveAvatar,
    apiURL,
    RESOURCES_URL,
  }: Record<string, string>) {
    super(apiURL);
    this._saveAvatarURL = this.apiUrl + saveAvatar;
    this._getAvatarURL = RESOURCES_URL;
  }

  saveAvatarOnServer(formData: FormData, formConfig: any) {
    return axios.put(this._saveAvatarURL, formData, formConfig);
  }

  getAvatarFromServer(avatarUrl: string, formConfig: any) {
    const fileUrl = `${this._getAvatarURL}${encodeURIComponent(avatarUrl)}`;
    return axios.get(fileUrl, formConfig);
  }
}

export default Avatar;
