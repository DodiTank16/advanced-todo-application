import { AppDispatch } from "../store";
import { setAlert } from "./alertSlice";

// Types of Alerts
// Default
// Description
// Success
// Info
// Warning
// Error
// Action
// Promise
// Custom

export const showAlert = (
  type: "Success" | "Info" | "Warning" | "Error",
  message: string
) => {
  return function (dispatch: AppDispatch) {
    dispatch(setAlert({ type, message }));
  };
};
