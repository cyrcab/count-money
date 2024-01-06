// rootReducer.ts

import { combineReducers } from 'redux';
import cryptoReducer from './Crypto';
import userReducer from './user.reducer';

const rootReducer = combineReducers({
  crypto: cryptoReducer,
  auth: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
