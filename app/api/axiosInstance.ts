import axios, {
  AxiosHeaders,
  AxiosInstance,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from "axios";
import getLocalStorageValue from "../helpers/getLocalStorageValue";
import { ICurrentUserStorage } from "../types/user";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}/api/v1`,
  responseType: "json",
  headers: {
    "Access-Control-Allow-Origin": "",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    Accept: "/*",
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  async (
    config: AxiosRequestConfig,
  ): Promise<InternalAxiosRequestConfig<any>> => {
    const storageCompanyID =
      getLocalStorageValue<ICurrentUserStorage>("divo-user-storage")?.state
        ?.currentUser?.data?.employees[0]?.company?.id;
    config.headers = {
      ...(config.headers as AxiosHeaders),
      // Authorization: `Bearer ${token}`,
      ...(storageCompanyID && { "COMP-ID": storageCompanyID }),
    };
    return config as InternalAxiosRequestConfig<any>;
  },
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // const statusCode = error?.response?.status || null;
    //
    // if (statusCode === 401) {
    //   localStorage.removeItem("divo-user-storage");
    //   window.location.replace("/sign-in");
    // }

    return Promise.reject(error);
  },
);

export { axiosInstance };
