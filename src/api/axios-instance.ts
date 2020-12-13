import Axios, { AxiosInstance } from "axios";

const baseUrl = 'https://swapi.dev/api';

export const getAxiosInstance = (): AxiosInstance => {
  let axiosInstance = Axios.create({ baseURL: baseUrl });
  axiosInstance.interceptors.response.use(response => response, (error) => {
    const { status } = error.response
    if (status > 399) console.info(`Erro na API. Status: ${status}`)
  })
  return axiosInstance;
}