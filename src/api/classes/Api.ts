import axios, { AxiosPromise } from 'axios';
import { TRequestData, TRequestOptions } from '../../types';

class Api {
  protected apiUrl: string;

  constructor(apiURL: string) {
    this.apiUrl = apiURL;
  }

  // Конструкторы опций
  private static _createOptionsFile(method: string, data: TRequestData, cookie?: string): TRequestOptions {
    const options: TRequestOptions = {
      method,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
    };

    if (data) {
      options.data = data;
    }

    if (cookie) {
      // FIXME: Исправить типизацию
      /* eslint-disable dot-notation */
      // @ts-ignore
      options.headers = {
        'Cookie': cookie,
      };
    }

    return options;
  }

  private static _createOptions(method: string, data?: TRequestData, cookie?: string): TRequestOptions {
    const options: TRequestOptions = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    };

    if (data) {
      options.data = data;
    }

    if (cookie) {
      // FIXME: Исправить типизацию
      /* eslint-disable dot-notation */
      // @ts-ignore
      options.headers['Cookie'] = cookie;
    }

    return options;
  }

  // Метод, выполняющий запрос
  private static _makeRequest(requestUrl: string, options?: TRequestOptions): AxiosPromise<any> {
    return axios({
      url: requestUrl,
      ...options,
    });
  }

  protected get(url: string, cookie?: any) {
    const options = Api._createOptions('GET', undefined, cookie);

    return Api._makeRequest(url, options);
  }

  protected post(url: string, data: TRequestData, cookie?: string) {
    const options = Api._createOptions('POST', data, cookie);

    return Api._makeRequest(url, options);
  }

  protected put(url: string, data: TRequestData, cookie?: string) {
    const options = Api._createOptions('PUT', data, cookie);

    return Api._makeRequest(url, options);
  }

  protected putFile(url: string, data: TRequestData, cookie?: string) {
    const options = Api._createOptionsFile('PUT', data, cookie);

    return Api._makeRequest(url, options);
  }
}

export default Api;
