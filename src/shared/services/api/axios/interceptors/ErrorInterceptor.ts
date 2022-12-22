import { AxiosError } from 'axios';

export const errorInterceptor = (error: AxiosError) => {
  if (error.message === 'Network Error')
    return Promise.reject(new Error('Connection error.'));

  if (error.response?.status === 401) {
    // Go to login page (window.location.href = Login)
    window.location.href = '/home';
    return Promise.reject(new Error('Unauthorized.'));
  }

  if (error.response?.status === 403) {
    // Go to login page (window.location.href = Login)
    window.location.href = '/home';
    return Promise.reject(new Error('Forbbiden.'));
  }

  return Promise.reject(error);
};