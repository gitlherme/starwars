import { AxiosResponse } from 'axios';
import { getAxiosInstance } from './axios-instance'

export type SWAPIEndpoint = 'people' | 'films' | 'starships' | 'vehicles' | 'species' | 'planets';

export interface PageData {
  next: number | null;
  previous: number | null;
  total: number;
  totalRegisters: number;
}
export interface PageableResponse <Type> {
  data: Type[];
  page: PageData;
}
export interface ResourceReturn<Type> {
  getSchema: () => void;
  getById: (id: number) => Promise<Type>;
  getAll: (page:number) => Promise<PageableResponse<Type>>
}

export const genericController = <Type>(endpoint: SWAPIEndpoint):ResourceReturn<Type> => {
  const axios = getAxiosInstance();

  const getSchema = async () => {
    const response = await axios.get(`/${endpoint}/schema`);
    return response.data;
  }

  const getById = async (id: number):Promise<Type> => {
    const response = await axios.get(`/${endpoint}/${id}`)
    return response.data
  }

  const getAll = async (pageNumber:number):Promise<PageableResponse<Type>> => {
    const response = await axios.get(`/${endpoint}/?page=${pageNumber}`)
    const data: Type[] = response.data.results;
    const page: PageData = getPageData(response);
    return { data, page }
  }

  const getPageData = (response: AxiosResponse):PageData => {
    const next: number | null = getPageNumber(response.data.next);
    const previous: number | null = getPageNumber(response.data.previous);
    const resultSize = response.data.results.length;
    const count = response.data.count;
    const total: number = (count % resultSize) === 0 ? (count / resultSize) : Math.floor(count / resultSize) + 1;

    return {next, previous, total, totalRegisters: count}
  }

  const getPageNumber = (url: string | null):number | null => {
    if(!url) return null;
    const matchs = url.match('page=\\d+')
    if (matchs) return parseInt(matchs[0].replace('page=', ''));
    return null;
  }

  return { getSchema, getById, getAll }
}