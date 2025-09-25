import {
  type AnyAction,
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";

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

import storage from "redux-persist/lib/storage";
import { globalSlice } from "./slice/globalSlice";
import { productSlice } from "./slice/productSlice";
import { authApi } from "../service/auth";
import { authSlice } from "./slice/authSlice";
import { productApi } from "../service/product";
import { adminApi } from "../service/admin";

const rootReducers = combineReducers({
  global: globalSlice.reducer,
  product: productSlice.reducer,
  auth: authSlice.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [productApi.reducerPath]: productApi.reducer,
  [adminApi.reducerPath]: adminApi.reducer,
});

const persistConfig = {
  key: "ashobox",
  storage,
};

export type RootReducer = ReturnType<typeof rootReducers>;

const persistedReducer = persistReducer<RootReducer, AnyAction>(
  persistConfig,
  rootReducers
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(authApi.middleware, productApi.middleware, adminApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
