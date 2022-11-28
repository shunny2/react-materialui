import { Environment } from '../../../environment';
import { Api } from '../axios';

export interface IPeoplesListing {
  id: number;
  email: string;
  cityId: number;
  fullName: string;
}

export interface IPeoplesDetails {
  id: number;
  email: string;
  cityId: number;
  fullName: string;
}

type TPeoplesWithTotalCount = {
  data: IPeoplesListing[];
  totalCount: number;
}

const getAll = async (page = 1, filter = ''): Promise<TPeoplesWithTotalCount | Error> => {
  try {
    const relativeUrl = `/peoples?_page=${page}&_limit=${Environment.LINE_LIMIT}&fullName_like=${filter}`;
    const { data, headers } = await Api.get(relativeUrl);

    if (data)
      return { data, totalCount: Number(headers['x-total-count'] || Environment.LINE_LIMIT) };

    return new Error('Error to listing records.');
  } catch (error) {
    return new Error((error as { message: string }).message || 'Error to listing records.');
  }
};

const getById = async (id: number): Promise<IPeoplesDetails | Error> => {
  try {
    const { data } = await Api.get(`/peoples/${id}`);

    if (data)
      return data;

    return new Error('Error querying a record.');
  } catch (error) {
    return new Error((error as { message: string }).message || 'Error querying a record.');
  }
};

const create = async (personData: Omit<IPeoplesDetails, 'id'>): Promise<number | Error> => {
  try {
    const { data } = await Api.post<IPeoplesDetails>('/peoples', personData);

    if (data)
      return data.id;

    return new Error('Error creating a record.');
  } catch (error) {
    return new Error((error as { message: string }).message || 'Error creating a record.');
  }
};

const updateById = async (id: number, personData: IPeoplesDetails): Promise<void | Error> => {
  try {
    await Api.put(`/peoples/${id}`, personData);
  } catch (error) {
    return new Error((error as { message: string }).message || 'Error updating record.');
  }
};

const deleteById = async (id: number): Promise<void | Error> => {
  try {
    await Api.delete(`/peoples/${id}`);
  } catch (error) {
    return new Error((error as { message: string }).message || 'Error deleting the record.');
  }
};

export const PeoplesService = {
  getAll,
  getById,
  create,
  updateById,
  deleteById
};