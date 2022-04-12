import axios from 'axios';
import Api from './Api';

class Avatar extends Api {
  private readonly _saveAvatarURL: string;

  constructor({
    saveAvatar,
    apiURL,
  }: Record<string, string>) {
    super(apiURL);
    this._saveAvatarURL = this.apiUrl + saveAvatar;
  }

  saveAvatarOnServer(formData: FormData, formConfig: any) {
    return axios.put(this._saveAvatarURL, formData, formConfig);
    // return this.putFile(this._saveAvatarURL, formData, formConfig);
  }
}

export default Avatar;
