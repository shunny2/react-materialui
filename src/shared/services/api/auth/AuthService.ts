import { Api } from '../axios';

interface IAuth {
  accessToken: string;
}

const auth = async (email: string, password: string): Promise<IAuth | Error> => {
  try {
    const { data } = await Api.get<IAuth>('/auth', { data: { email, password } });

    if (data)
      return data;

    return new Error('Error when logging in.');
  } catch (error) {
    return new Error((error as { message: string }).message || 'Error when logging in.');
  }
};

export const AuthService = {
  auth
};