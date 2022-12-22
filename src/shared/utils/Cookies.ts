import Cookies, { CookieAttributes } from 'js-cookie';

/**
 * The function is responsible for creating a cookie.
 * @param key string
 * @param value string | object
 * @param options CookieAttributes
 * @returns Cookie
 */
export const setCookie = (key: string, value: string, options?: CookieAttributes) => {
  Cookies.set(key, value, {
    ...options,
    secure: process.env.NODE_ENV === 'production' ? true : false,
  });
};

/**
 * The function is responsible for getting a cookie.
 * @param key string
 * @returns Cookie
 */
export const getCookie = (key: string) => {
  return Cookies.get(key);
};

/**
 * The function is responsible for removing a cookie.
 * @param key string
 * @returns Cookie
 */
export const removeCookie = (key: string) => {
  return Cookies.remove(key);
};