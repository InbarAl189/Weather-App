import axios, { AxiosResponse } from 'axios';
import { RequestWrapperPayload } from '../types';

const instance: any = axios.create({
  baseURL: 'http://dataservice.accuweather.com',
  headers: {
    'content-type': 'application/json'
  },
  timeout: 20000
});

export const requestWrapper = ({ method, url, params = {} }: RequestWrapperPayload): Promise<AxiosResponse> => {
  try {
    return instance[method](url, method === 'get' ? { params } : params);
  } catch (error) {
    return Promise.reject(error);
  }
};
