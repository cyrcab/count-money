// cryptoSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Draft } from "immer";

interface CryptoData {
  label: string;
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
  BTCEUR: { label: "BTCEUR", price: "41077,04", iconUrl: iconUrls.BTCEUR },
  ETHEUR: { label: "ETHEUR", price: "2062,20", iconUrl: iconUrls.ETHEUR },
  BNBEUR: { label: "BNBEUR", price: "274,92", iconUrl: iconUrls.BNBEUR },
  XRPEUR: { label: "XRPEUR", price: "0,52", iconUrl: iconUrls.XRPEUR },
  DOGEEUR: { label: "DOGEEUR", price: "0,072", iconUrl: iconUrls.DOGEEUR },
  LTCEUR: { label: "LTCEUR", price: "59,58", iconUrl: iconUrls.LTCEUR },
  SOLEUR: { label: "SOLEUR", price: "85.49", iconUrl: iconUrls.SOLEUR },
  ADAEUR: { label: "ADAEUR", price: "0,47", iconUrl: iconUrls.ADAEUR },
  TRXEUR: { label: "TRXEUR", price: "0.09", iconUrl: iconUrls.TRXEUR },
};


const cryptoSlice = createSlice({
  name: "crypto",
  initialState,
  reducers: {
    updateCryptoData: (
      state: Draft<CryptoState>,
      action: PayloadAction<{ label: string; data: CryptoData }>
    ) => {
      const { label, data } = action.payload;
      state[label as keyof CryptoState] = {
        ...data,
        iconUrl: iconUrls[label],
      };
    },
  },
});

export const { updateCryptoData } = cryptoSlice.actions;
export default cryptoSlice.reducer;
