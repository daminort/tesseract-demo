import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { config } from 'common/config/config';

class BaseService {

  get agent(): AxiosInstance {
    const headers = {};
    return axios.create({
      baseURL: config.apiURL,
      headers,
    });
  }

  async processResponse<T>(response: AxiosResponse): Promise<T> {
    const axiosData = response?.data; // 'data' from Axios
    const data = axiosData && axiosData?.data; // 'data' from our backend: { status: 200, data: {...} }
    const result = data || axiosData;

    return (result as T);
  }

  async processError(error: AxiosError): Promise<null> {
    if (config.isDevelopment) {
      console.dir(error);
    }
    return null;
  }
}

export {
  BaseService,
};
