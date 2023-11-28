import React, { createContext, useContext, useState, useEffect } from "react";

interface CryptoData {
  symbol: string;
  price: string;
}

interface CryptoContextProps {
  cryptoData: { [key: string]: CryptoData | null };
  updateCryptoData: (symbol: string, data: CryptoData) => void;
}

const CryptoContext = createContext<CryptoContextProps | undefined>(undefined);

export const CryptoProvider: React.FC = ({ children }) => {
  const [cryptoData, setCryptoData] = useState<{ [key: string]: CryptoData | null }>({
    BTCEUR: null,
    ETHEUR: null,
    BNBEUR: null,
    XRPEUR: null,
    DOGE: null,
    USDT: null,
    SOL: null,
    ADA: null,
    TRX: null,
  });

  const updateCryptoData = (symbol: string, data: CryptoData) => {
    setCryptoData((prevData) => ({
      ...prevData,
      [symbol]: data,
    }));
  };

  useEffect(() => {
    // Your WebSocket logic here

    return () => {
      // Cleanup logic if needed
    };
  }, []);

  return (
    <CryptoContext.Provider value={{ cryptoData, updateCryptoData }}>
      {children}
    </CryptoContext.Provider>
  );
};

export const useCryptoContext = () => {
  const context = useContext(CryptoContext);
  if (!context) {
    throw new Error("useCryptoContext must be used within a CryptoProvider");
  }
  return context;
};
