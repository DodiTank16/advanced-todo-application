import { AppDispatch } from "../store";
import { loginAPI, logoutAPI } from "../../services/authService";
import { setAlert } from "../alert/alertSlice";
import { login, loginFailure, loginSuccess, logout } from "./authSlice";

interface LoginCredentials {
  email: string;
  password: string;
}

export const loginUser = (credentials: LoginCredentials) => {
  return function (dispatch: AppDispatch) {
    dispatch(login());
    loginAPI(credentials)
      .then((res: any) => {
        console.log("res", res);
        localStorage.setItem("token", res.data.token);
        dispatch(loginSuccess(res.data));
        dispatch(setAlert({ type: "Success", message: res.data.message }));
      })
      .catch((error: any) => {
        console.log(error);
        dispatch(loginFailure(error.message || "Failed to login"));
        dispatch(
          setAlert({
            type: "Error",
            message: error?.response?.data?.message || "Failed to login",
          })
        );
      });
  };
};

export const logoutUser = (navigate: any) => {
  return function (dispatch: AppDispatch) {
    logoutAPI()
      .then((res: any) => {
        dispatch(logout(res.message));
        dispatch(setAlert({ type: "Success", message: res.message }));
        localStorage.removeItem("token");
        navigate("/login");
      })
      .catch((error: any) => {
        console.log(error);
        dispatch(
          setAlert({
            type: "Error",
            message: error.message || "Something went wrong.",
          })
        );
      });
  };
};
