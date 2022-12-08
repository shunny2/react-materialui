import { Api } from '../axios';

export interface UserDetails {
  name: string;
  email: string;
  password: string;
  repeatPassword?: string;
}

const create = async (userData: UserDetails): Promise<number | Error> => {
  try {
    const { data } = await Api.post('/user', userData);

    if (data)
      return data.id;

    return new Error('Error creating a record.');
  } catch (error) {
    return new Error((error as { message: string }).message || 'Error creating a record.');
  }
};

export const UserService = {
  create
};