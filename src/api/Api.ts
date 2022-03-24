import { apiURL } from 'config/api';
import { TRequestData, TRrequestOptions } from '../types';
const axios = require('axios').default;

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
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (data) {
      options.body = JSON.stringify(data);
    }

    return options;
  }

  // Метод, выполняющий запрос
  private static _makeRequest(requestUrl: string, options?: TRrequestOptions): Promise<Response> {
    return axios({
      url: requestUrl,
      ...options,
    });
  }

  protected get(url: string): Promise<Response> {
    const options = Api._createOptions('GET');

    return Api._makeRequest(url, options);
  }

  protected post(url: string, data: TRequestData): Promise<Response> {
    const options = Api._createOptions('POST', data);

    return Api._makeRequest(url, options);
  }

  protected put(url: string, data: TRequestData): Promise<Response> {
    const options = Api._createOptions('PUT', data);

    return Api._makeRequest(url, options);
  }

  protected putFile(url: string, data: TRequestData): Promise<Response> {
    const options = Api._createOptionsFile('PUT', data);

    return Api._makeRequest(url, options);
  }
}

export default Api;
