import { apiURL } from 'config/api';
import axios, { AxiosPromise } from 'axios';
import { TRequestData, TRrequestOptions } from '../types';

class Api {
  protected apiUrl: string;

  constructor() {
    this.apiUrl = apiURL;
  }

  // Конструкторы опций
  private static _createOptionsFile(method: string, data: TRequestData): TRrequestOptions {
    return {
      method,
      credentials: 'include',
      body: data,
    };
  }

  private static _createOptions(method: string, data?: TRequestData): TRrequestOptions {
    const options: TRrequestOptions = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    };

    if (data) {
      options.data = data;
    }

    return options;
  }

  // Метод, выполняющий запрос
  private static _makeRequest(requestUrl: string, options?: TRrequestOptions): AxiosPromise<any> {
    return axios({
      url: requestUrl,
      ...options,
    });
  }

  protected get(url: string) {
    const options = Api._createOptions('GET');

    return Api._makeRequest(url, options);
  }

  protected post(url: string, data: TRequestData) {
    const options = Api._createOptions('POST', data);

    return Api._makeRequest(url, options);
  }

  protected put(url: string, data: TRequestData) {
    const options = Api._createOptions('PUT', data);

    return Api._makeRequest(url, options);
  }

  protected putFile(url: string, data: TRequestData) {
    const options = Api._createOptionsFile('PUT', data);

    return Api._makeRequest(url, options);
  }
}

export default Api;
