import { composeWithDevTools } from "@redux-devtools/extension/lib/types/logOnly";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import alertSlice from "./alert/alertSlice";

// Combine all the reducers
const rootReducer = combineReducers({
  alert: alertSlice,
  // auth: authReducer,

  // Add other reducers here
});

// Configuration for redux-persist
const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: [""], // Add reducers you want to persist
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: process.env.NODE_ENV !== "production", // Enable Redux DevTools extension
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
