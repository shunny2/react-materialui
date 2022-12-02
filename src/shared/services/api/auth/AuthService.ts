import { Api } from '../axios';

interface IAuth {
  accessToken: string;
}

export interface IUserAuthProps {
  email: string;
  password: string;
}

const auth = async (userData: IUserAuthProps): Promise<IAuth | Error> => {
  try {
    const { data } = await Api.post<IAuth>('/auth', userData);
 
    if (data)
      return data;

    return new Error('Error when logging in.');
  } catch (error) {
    return new Error((error as { message: string }).message || 'Error when logging in.');
  }
};

export const AuthService = {
  auth,
};