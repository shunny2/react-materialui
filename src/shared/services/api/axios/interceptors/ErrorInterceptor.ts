import { AxiosError } from 'axios';

export const errorInterceptor = (error: AxiosError) => {
  if (error.message === 'Network Error')
    return Promise.reject(new Error('Connection error.'));

  if (error.response?.status === 401)
    // Go to login page (window.href.location = Login)
    return Promise.reject(new Error('Unauthorized.'));

  return Promise.reject(error);
};