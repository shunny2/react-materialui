import { Api } from '../axios';

interface IAuth {
  token: string;
}

export interface IUserAuthProps {
  email: string;
  password: string;
}

const signIn = async (userData: IUserAuthProps): Promise<IAuth | Error> => {
  try {
    const { data } = await Api.post<IAuth | Error>('/auth/signIn', userData);

    if (data)
      return data;

    return new Error('Error when logging in.');
  } catch (error) {
    return new Error((error as { message: string }).message || 'Error when logging in.');
  }
};

const refresh = async (): Promise<IAuth | Error> => {
  try {
    const { data } = await Api.get<IAuth | Error>('/auth/refresh', {
      withCredentials: true
    });

    if (data)
      return data;

    return new Error('Error generating a new token.');
  } catch (error) {
    return new Error((error as { message: string }).message || 'Error generating a new token.');
  }
};

const logout = async (): Promise<void | Error> => {
  try {
    await Api.post<void | Error>('/auth/logout', {
      withCredentials: true
    });
  } catch (error) {
    return new Error((error as { message: string }).message || 'Error clearing cookies.');
  }
};

const me = async (): Promise<void | Error> => {
  try {
    await Api.get<void | Error>('/auth/me', {
      withCredentials: true
    });
  } catch (error) {
    return new Error((error as { message: string }).message || 'Error authenticating.');
  }
};

export const AuthService = {
  me,
  signIn,
  logout,
  refresh,
};