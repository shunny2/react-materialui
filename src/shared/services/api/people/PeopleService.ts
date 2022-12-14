import { Environment } from '../../../environment';
import { JsonServerApi } from '../axios';

export interface IPeopleListing {
  id: number;
  email: string;
  cityId: number;
  fullName: string;
}

export interface IPeopleDetails {
  id: number;
  email: string;
  cityId: number;
  fullName: string;
}

type TPeopleWithTotalCount = {
  data: IPeopleListing[];
  totalCount: number;
}

const getAll = async (page = 1, filter = ''): Promise<TPeopleWithTotalCount | Error> => {
  try {
    const relativeUrl = `/people?_page=${page}&_limit=${Environment.LINE_LIMIT}&fullName_like=${filter}`;
    const { data, headers } = await JsonServerApi.get(relativeUrl);

    if (data)
      return { data, totalCount: Number(headers['x-total-count'] || Environment.LINE_LIMIT) };

    return new Error('Error to listing records.');
  } catch (error) {
    return new Error((error as { message: string }).message || 'Error to listing records.');
  }
};

const getById = async (id: number): Promise<IPeopleDetails | Error> => {
  try {
    const { data } = await JsonServerApi.get(`/people/${id}`);

    if (data)
      return data;

    return new Error('Error querying a record.');
  } catch (error) {
    return new Error((error as { message: string }).message || 'Error querying a record.');
  }
};

const create = async (personData: Omit<IPeopleDetails, 'id'>): Promise<number | Error> => {
  try {
    const { data } = await JsonServerApi.post<IPeopleDetails>('/people', personData);

    if (data)
      return data.id;

    return new Error('Error creating a record.');
  } catch (error) {
    return new Error((error as { message: string }).message || 'Error creating a record.');
  }
};

const updateById = async (id: number, personData: IPeopleDetails): Promise<void | Error> => {
  try {
    await JsonServerApi.put(`/people/${id}`, personData);
  } catch (error) {
    return new Error((error as { message: string }).message || 'Error updating record.');
  }
};

const deleteById = async (id: number): Promise<void | Error> => {
  try {
    await JsonServerApi.delete(`/people/${id}`);
  } catch (error) {
    return new Error((error as { message: string }).message || 'Error deleting the record.');
  }
};

export const PeopleService = {
  getAll,
  getById,
  create,
  updateById,
  deleteById
};