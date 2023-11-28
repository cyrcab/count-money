// rootReducer.ts

import { combineReducers } from 'redux';
import cryptoReducer from './Crypto';

const rootReducer = combineReducers({
  crypto: cryptoReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
