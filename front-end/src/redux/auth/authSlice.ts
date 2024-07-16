import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  password: string;
  role: string;
  token: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isError: boolean;
  message: string;
  isSuccess: boolean;
}

const initialState: AuthState = {
  user: null,
  isLoading: false,
  isError: false,
  message: "",
  isSuccess: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state) {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
      state.user = null;
      state.message = "";
    },
    loginSuccess(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
      state.isSuccess = false;
      state.user = null;
    },
    logout(state, action: PayloadAction<string>) {
      state.user = null;
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
      state.isSuccess = false;
    },
  },
});

export const { login, loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;
