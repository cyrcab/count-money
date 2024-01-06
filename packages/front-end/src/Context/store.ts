// store.ts
import { configureStore } from "@reduxjs/toolkit";
import cryptoReducer from "./Crypto";
import { setupListeners } from '@reduxjs/toolkit/query'
import { api } from "../api";
import { authSlice } from "./user.reducer";

const store = configureStore({
  reducer: {
    crypto: cryptoReducer,
    [api.reducerPath]: api.reducer,
    auth: authSlice.reducer,

  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

setupListeners(store.dispatch)



export default store;
