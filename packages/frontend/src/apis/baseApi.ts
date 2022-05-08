import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

export interface ErrorDataModel {
  code: number;
  description: string;
  message: string;
  name: string;
  data: {
    message: string;
  };
}

export interface ErrorModel<T = ErrorDataModel> {
  data: T | undefined;
  message: string;
  status: number | undefined;
}

function axiosResponseToData<T>(res: AxiosResponse<T>): T {
  return res.data;
}

function axiosErrorToData<T>({
  response,
  message,
}: AxiosError<T>): ErrorModel<T> {
  return {
    data: response?.data,
    message,
    status: response?.status,
  };
}

const createApiClient = () => {
  const request = axios.create({
    baseURL: publicRuntimeConfig.API_URL,
  });

  request.interceptors.request.use((config) => {
    return {
      ...config,
      credentials: "same-origin",
      withCredentials: true,
    };
  });

  return {
    async get<Response, Params = Record<string, any>, Error = void>(
      url: string,
      params?: Params
    ) {
      try {
        const res = await request.get<Response>(url, {
          params,
        });
        return axiosResponseToData(res);
      } catch (error) {
        return Promise.reject(axiosErrorToData<Error>(error as AxiosError));
      }
    },
    async post<Response, Data = Record<string, any>, Error = void>(
      url: string,
      data?: Data
    ) {
      try {
        const res = await request.post<Response>(url, data);
        return axiosResponseToData(res);
      } catch (error) {
        return Promise.reject(axiosErrorToData<Error>(error as AxiosError));
      }
    },
  };
};

export const baseApi = createApiClient();
