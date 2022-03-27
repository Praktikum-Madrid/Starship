import {
  getServiceIdYandex,
  getUser,
  logOut,
  oauthYandex,
  redirectURL,
  signIn,
  signUp,
} from 'config/api';
import { TRequestData } from 'types';
import Api from './Api';

// Регистрация пользователя
class Auth extends Api {
  private readonly _signUpURL: string;

  private readonly _signInURL: string;

  private readonly _getUserURL: string;

  private readonly _logOutURL: string;

  private readonly _oauthYandexURL: string;

  private readonly _getServiceIdYandexURL: string;

  constructor() {
    super();
    this._signUpURL = this.apiUrl + signUp;
    this._signInURL = this.apiUrl + signIn;
    this._getUserURL = this.apiUrl + getUser;
    this._logOutURL = this.apiUrl + logOut;
    this._oauthYandexURL = this.apiUrl + oauthYandex;
    this._getServiceIdYandexURL = this.apiUrl + getServiceIdYandex;
  }

  signUp(data: TRequestData) {
    return this.post(this._signUpURL, data);
  }

  signIn(data: TRequestData) {
    return this.post(this._signInURL, data);
  }

  getUserData() {
    return this.get(this._getUserURL);
  }

  logOut() {
    return this.post(this._logOutURL, {});
  }

  oauthYandex(data: TRequestData) {
    return this.post(this._oauthYandexURL, data);
  }

  getServiceIdYandex() {
    return this.get(`${this._getServiceIdYandexURL}/?redirect_uri=${redirectURL}`);
  }
}

export default new Auth();
