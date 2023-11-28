// cryptoSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Draft } from "immer";

interface CryptoData {
  symbol: string;
  price: string;
  iconUrl?: string;
}

interface CryptoState {
  BTCEUR: CryptoData | null;
  ETHEUR: CryptoData | null;
  BNBEUR: CryptoData | null;
  XRPEUR: CryptoData | null;
  DOGEEUR: CryptoData | null;
  LTCEUR: CryptoData | null;
  SOLEUR: CryptoData | null;
  ADAEUR: CryptoData | null;
  TRXEUR: CryptoData | null;
}

const iconUrls: { [key: string]: string } = {
  BTCEUR:
    "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png",
  ETHEUR:
    "https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png",
  BNBEUR:
    "https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png",
  XRPEUR:
    "https://s2.coinmarketcap.com/static/img/coins/64x64/52.png",
  DOGEEUR:
    "https://s2.coinmarketcap.com/static/img/coins/64x64/74.png",
  LTCEUR:
    "https://s2.coinmarketcap.com/static/img/coins/64x64/2.png",
  SOLEUR:
    "https://s2.coinmarketcap.com/static/img/coins/64x64/5426.png",
  ADAEUR:
    "https://s2.coinmarketcap.com/static/img/coins/64x64/2010.png",
  TRXEUR:
    "https://s2.coinmarketcap.com/static/img/coins/64x64/1958.png",
};

const initialState: CryptoState = {
  BTCEUR: { symbol: "BTCEUR", price: "34115.24", iconUrl: iconUrls.BTCEUR },
  ETHEUR: { symbol: "ETHEUR", price: "1854.51", iconUrl: iconUrls.ETHEUR },
  BNBEUR: { symbol: "BNBEUR", price: "209.82", iconUrl: iconUrls.BNBEUR },
  XRPEUR: { symbol: "XRPEUR", price: "0.556", iconUrl: iconUrls.XRPEUR },
  DOGEEUR: { symbol: "DOGEEUR", price: "0.07", iconUrl: iconUrls.DOGEEUR },
  LTCEUR: { symbol: "LTCEUR", price: "63.01", iconUrl: iconUrls.LTCEUR },
  SOLEUR: { symbol: "SOLEUR", price: "51.23", iconUrl: iconUrls.SOLEUR },
  ADAEUR: { symbol: "ADAEUR", price: "0.34", iconUrl: iconUrls.ADAEUR },
  TRXEUR: { symbol: "TRXEUR", price: "0.09", iconUrl: iconUrls.TRXEUR },
};

const cryptoSlice = createSlice({
  name: "crypto",
  initialState,
  reducers: {
    updateCryptoData: (
      state: Draft<CryptoState>,
      action: PayloadAction<{ symbol: string; data: CryptoData }>
    ) => {
      const { symbol, data } = action.payload;
      state[symbol as keyof CryptoState] = {
        ...data,
        iconUrl: iconUrls[symbol],
      };
    },
  },
});

export const { updateCryptoData } = cryptoSlice.actions;
export default cryptoSlice.reducer;
