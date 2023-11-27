import React, { useState, useEffect } from "react";
import { Container } from "@mui/material";
import "../Css/HeadBandCryptoPrice.css";

const data = [
  "Bitcoin: $60,000",
  "Ethereum: $2,000",
  "Cardano: $1.50",
  "Binance Coin: $300",
  "Ripple: $0.50",
  "Dogecoin: $0.10",
  "Tether: $1.00",
  "Polkadot: $40.00",
  "Bitcoin Cash: $500",
];

interface CryptoData {
  symbol: string;
  price: string;
}

const HeadBandCryptoPrice: React.FC = () => {
  const [cryptoData, setCryptoData] = useState<CryptoData | null>(null);

  // List of cryptocurrency symbols
  const cryptoSymbols = ["btcusdt", "ethusdt", "adausdt", "bnbusdt", "xrpusdt", "dogeusdt", "usdtusdt", "dotusdt", "bchusdt"];

  useEffect(() => {
    const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${cryptoSymbols.join('@trade/') + '@trade'}`);

    ws.onmessage = (event) => {
      const eventData = JSON.parse(event.data);
      const symbol = eventData.s;
      const price = parseFloat(eventData.p).toFixed(2);

      setCryptoData({ symbol, price });
    };

    return () => {
      ws.close();
    };
  }, [cryptoSymbols]);

  return (
    <Container className="containerHeadBand" maxWidth="xl">
      <div className="slider">
        <div className="slide-track">
          {cryptoData && (
            cryptoSymbols.map((symbol, index) => (
              <div key={index} className="slide">
                <h1>
                  {symbol.toUpperCase()}: €{cryptoData.price}
                </h1>
              </div>
            ))
          )}
          {cryptoData && (
            cryptoSymbols.map((symbol, index) => (
              <div key={index} className="slide">
                <h1>
                  {symbol.toUpperCase()}: €{cryptoData.price}
                </h1>
              </div>
            ))
          )}
        </div>
      </div>
    </Container>
  );
};

export default HeadBandCryptoPrice;
