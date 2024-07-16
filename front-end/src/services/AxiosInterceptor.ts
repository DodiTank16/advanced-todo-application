import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";

const defaultOptions: AxiosRequestConfig = {
  baseURL: "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Headers": "*",
    "Cross-Origin-Opener-Policy": "same-origin",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
};

const axiosInstance = axios.create(defaultOptions);

const requestHandler = (request: AxiosRequestConfig): AxiosRequestConfig => {
  const token = localStorage.getItem("token");
  if (token && request?.headers) request.headers["x-auth-token"] = token;
  return request;
};

const responseHandler = (response: AxiosResponse): any => {
  return response.data;
};

axiosInstance.interceptors.request.use((request: AxiosRequestConfig): any => {
  return requestHandler(request);
});

axiosInstance.interceptors.response.use(
  (response) => {
    return responseHandler(response);
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

export { axiosInstance };
