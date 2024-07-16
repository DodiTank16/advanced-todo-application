import { AxiosResponse, AxiosError } from "axios";
import { axiosInstance } from "./AxiosInterceptor";

interface DefaultOptions {
  showToast: boolean;
  successToast: string;
  errorToast: string;
}

const defaultOptions: DefaultOptions = {
  showToast: false,
  successToast: "Record has been saved successfully",
  errorToast: "Something Went Wrong",
};

const get = (
  url: string,
  options: Partial<DefaultOptions> = defaultOptions,
  ...other: any[]
): Promise<AxiosResponse<any>> => {
  options = { ...defaultOptions, ...options };

  return axiosInstance
    .get(url)
    .then((res) => {
      return res;
    })
    .catch((err: AxiosError) => {
      return Promise.reject(err);
    });
};

const post = (
  url: string,
  payload?: any,
  options: Partial<DefaultOptions> = defaultOptions
): Promise<AxiosResponse<any>> => {
  options = { ...defaultOptions, ...options };

  return axiosInstance
    .post(url, payload)
    .then((res) => {
      return res;
    })
    .catch((err: AxiosError) => {
      return Promise.reject(err);
    });
};

const put = (
  url: string,
  payload: any,
  options: Partial<DefaultOptions> = defaultOptions
): Promise<AxiosResponse<any>> => {
  options = { ...defaultOptions, ...options };

  return axiosInstance
    .put(url, payload)
    .then((res) => {
      return res;
    })
    .catch((err: AxiosError) => {
      return Promise.reject(err);
    });
};

const Delete = (
  url: string,
  options: Partial<DefaultOptions> = defaultOptions
): Promise<AxiosResponse<any>> => {
  options = { ...defaultOptions, ...options };

  return axiosInstance
    .delete(url)
    .then((res) => {
      return res;
    })
    .catch((err: AxiosError) => {
      return Promise.reject(err);
    });
};

const postWithFormData = (
  url: string,
  payload: FormData,
  options: Partial<DefaultOptions> = defaultOptions
): Promise<AxiosResponse<any>> => {
  options = { ...defaultOptions, ...options };

  return axiosInstance
    .post(url, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      return res;
    })
    .catch((err: AxiosError) => {
      return Promise.reject(err);
    });
};

const putWithFormData = (
  url: string,
  payload: FormData,
  options: Partial<DefaultOptions> = defaultOptions
): Promise<AxiosResponse<any>> => {
  options = { ...defaultOptions, ...options };

  return axiosInstance
    .put(url, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      return res;
    })
    .catch((err: AxiosError) => {
      return Promise.reject(err);
    });
};

const ApiService = {
  get,
  post,
  Delete,
  put,
  postWithFormData,
  putWithFormData,
};

export default ApiService;
