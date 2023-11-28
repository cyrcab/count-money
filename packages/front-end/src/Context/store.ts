// store.ts
import { configureStore } from "@reduxjs/toolkit";
import cryptoReducer from "./Crypto";

const store = configureStore({
  reducer: {
    crypto: cryptoReducer,
  },
});

export default store;
