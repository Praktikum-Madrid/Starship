import { apiURL } from 'config/api';
import { TRequestData, TRrequestOptions } from '../types';

class Api {
  protected apiUrl: string;

  constructor() {
    this.apiUrl = apiURL;
  }

  // Конструктор опций
  private static _createOptions(method: string, data?: TRequestData, file = false): TRrequestOptions {
    const options: TRrequestOptions = {
      method,
      credentials: 'include',
    };
    if (!file) {
      options.headers = {
        'Content-Type': 'application/json',
      };
    }

    if (data) {
      options.body = file ? data : JSON.stringify(data);
    }

    return options;
  }

  // Метод, выполняющий запрос
  private static _makeRequest(requestUrl: string, options?: TRrequestOptions): Promise<Response> {
    return fetch(requestUrl, options);
  }

  protected get(url: string): Promise<Response> {
    const options = Api._createOptions('GET');

    return Api._makeRequest(url, options);
  }

  protected post(url: string, data: TRequestData): Promise<Response> {
    const options = Api._createOptions('POST', data);

    return Api._makeRequest(url, options);
  }

  protected put(url: string, data: TRequestData, file = false): Promise<Response> {
    const options = Api._createOptions('PUT', data, file);

    return Api._makeRequest(url, options);
  }
}

export default Api;
