import axios, { AxiosError } from 'axios';

import { Environment } from '../../../environment';
import { getCookie } from '../../../utils';
import { errorInterceptor, ResponseInterceptor } from './interceptors';

// Instances
const Api = axios.create({
  baseURL: Environment.BASE_URL
});

const JsonServerApi = axios.create({
  baseURL: Environment.JSON_SERVER_BASE_URL
});

// Interceptors
Api.interceptors.response.use(
  (response) => ResponseInterceptor(response),
  (error) => errorInterceptor(error),
);

export { Api, JsonServerApi };