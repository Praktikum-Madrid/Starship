import axios, { AxiosPromise } from 'axios';
import { TRequestData, TRequestOptions } from '../../types';

class Api {
  protected apiUrl: string;

  constructor(apiURL: string) {
    this.apiUrl = apiURL;
  }

  // Конструкторы опций
  private static _createOptionsFile(cookie?: string): TRequestOptions {
    const options: TRequestOptions = {
      // method,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
    };

    if (cookie) {
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

  // Метод, выполняющий запрос с файлом
  private static _makePutRequestWithFormData(requestUrl: string, formData: TRequestData, options: TRequestOptions): AxiosPromise<any> {
    // return axios(requestUrl, formData, {...options});
    return axios.put(requestUrl, formData, {
      ...options,
    });
  }

  protected get(url: string, cookie?: any) {
    const options = Api._createOptions('GET', null, cookie);

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
    const options = Api._createOptionsFile(cookie);

    return Api._makePutRequestWithFormData(url, data, options);
  }
}

export default Api;
