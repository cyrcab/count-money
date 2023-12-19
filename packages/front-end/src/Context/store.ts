// store.ts
import { configureStore } from "@reduxjs/toolkit";
import cryptoReducer from "./Crypto";
import { setupListeners } from '@reduxjs/toolkit/query'
import { api } from "../api";

const store = configureStore({
  reducer: {
    crypto: cryptoReducer,
    [api.reducerPath]: api.reducer,

  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

setupListeners(store.dispatch)



export default store;
