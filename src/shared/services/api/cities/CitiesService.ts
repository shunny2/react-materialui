import { Environment } from '../../../environment';
import { JsonServerApi } from '../axios';

export interface ICitiesListing {
  id: number;
  name: string;
}

export interface ICitiesDetails {
  id: number;
  name: string;
}

type TCitiesWithTotalCount = {
  data: ICitiesListing[];
  totalCount: number;
}

const getAll = async (page = 1, filter = '', id = ''): Promise<TCitiesWithTotalCount | Error> => {
  try {
    const relativeUrl = `/cities?_page=${page}&_limit=${Environment.LINE_LIMIT}&name_like=${filter}&id_like=${id}`;
    const { data, headers } = await JsonServerApi.get(relativeUrl);

    if (data)
      return { data, totalCount: Number(headers['x-total-count'] || Environment.LINE_LIMIT) };

    return new Error('Error to listing records.');
  } catch (error) {
    return new Error((error as { message: string }).message || 'Error to listing records.');
  }
};

const getById = async (id: number): Promise<ICitiesDetails | Error> => {
  try {
    const { data } = await JsonServerApi.get(`/cities/${id}`);

    if (data)
      return data;

    return new Error('Error querying a record.');
  } catch (error) {
    return new Error((error as { message: string }).message || 'Error querying a record.');
  }
};

const create = async (cityData: Omit<ICitiesDetails, 'id'>): Promise<number | Error> => {
  try {
    const { data } = await JsonServerApi.post<ICitiesDetails>('/cities', cityData);

    if (data)
      return data.id;

    return new Error('Error creating a record.');
  } catch (error) {
    return new Error((error as { message: string }).message || 'Error creating a record.');
  }
};

const updateById = async (id: number, cityData: ICitiesDetails): Promise<void | Error> => {
  try {
    await JsonServerApi.put(`/cities/${id}`, cityData);
  } catch (error) {
    return new Error((error as { message: string }).message || 'Error updating record.');
  }
};

const deleteById = async (id: number): Promise<void | Error> => {
  try {
    await JsonServerApi.delete(`/cities/${id}`);
  } catch (error) {
    return new Error((error as { message: string }).message || 'Error deleting the record.');
  }
};

export const CitiesService = {
  getAll,
  getById,
  create,
  updateById,
  deleteById
};