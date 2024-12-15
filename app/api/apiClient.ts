import { AxiosHeaders } from "axios";
import { axiosInstance } from "./axiosInstance";

const makeApiRequest = async <T>(
  endpoint: string,
  method: string = "GET",
  data = null,
  headers?: AxiosHeaders,
): Promise<T> => {
  const response = await axiosInstance.request<T>({
    url: endpoint,
    method,
    data,
    headers: { Accept: "*/*", ...headers },
  });
  return response.data;
};

export const api = {
  get: async <T>(endpoint: string): Promise<T> =>
    makeApiRequest<T>(endpoint, "GET"),
  post: async <T>(endpoint: string, data: any, headers?: any): Promise<T> =>
    makeApiRequest<T>(endpoint, "POST", data, headers),
  put: async <T>(endpoint: string, data: any): Promise<T> =>
    makeApiRequest<T>(endpoint, "PUT", data),
  patch: async <T>(endpoint: string, data: any): Promise<T> =>
    makeApiRequest<T>(endpoint, "PATCH", data),
  delete: async <T>(endpoint: string): Promise<T> =>
    makeApiRequest<T>(endpoint, "DELETE"),
};
