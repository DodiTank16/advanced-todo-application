import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AlertState {
  type?: "Success" | "Info" | "Warning" | "Error";
  message: string;
  description: string;
}

const initialState: AlertState = {
  type: undefined,
  message: "",
  description: "",
};

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    setAlert(
      state,
      action: PayloadAction<{
        type: AlertState["type"];
        message: AlertState["message"];
      }>
    ) {
      state.type = action.payload.type;
      state.message = action.payload.message;
    },
    setDescriptiveAlert(
      state,
      action: PayloadAction<{
        type: AlertState["type"];
        message: AlertState["message"];
        description: AlertState["description"];
      }>
    ) {
      state.type = action.payload.type;
      state.message = action.payload.message;
    },
    setCustomeAlert(
      state,
      action: PayloadAction<{
        type: AlertState["type"];
        message: AlertState["message"];
      }>
    ) {
      state.type = action.payload.type;
      state.message = action.payload.message;
    },
    clearAlert(state) {
      state.type = undefined;
      state.message = "";
    },
  },
});

export const { setAlert, clearAlert } = alertSlice.actions;
export default alertSlice.reducer;
