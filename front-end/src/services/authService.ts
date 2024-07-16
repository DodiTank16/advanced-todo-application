import ApiService from "./ApiService";

let postURL = "http://localhost:3001/api/v1/auth/";

export const loginAPI = (data: any, options = null) => {
  return ApiService.post(postURL + "login", data);
};

export const registerAPI = (data: any, options = null) => {
  return ApiService.post(postURL + "register", data);
};

export const logoutAPI = () => {
  return ApiService.post(postURL + "logout");
};
