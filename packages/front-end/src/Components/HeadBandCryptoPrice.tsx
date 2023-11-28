import React, { useState, useEffect } from "react";
import { Container } from "@mui/material";
import "../Css/HeadBandCryptoPrice.css";

interface CryptoData {
  symbol: string;
  price: string;
}

const HeadBandCryptoPrice: React.FC = () => {
  const [btcData, setBtcData] = useState<CryptoData | null>(null);
  const [ethData, setEthData] = useState<CryptoData | null>(null);
  const [bnbData, setBnbData] = useState<CryptoData | null>(null);
  const [xrpData, setXrpData] = useState<CryptoData | null>(null);
  const [dogeData, setDogeData] = useState<CryptoData | null>(null);
  const [usdtData, setUsdtData] = useState<CryptoData | null>(null);
  const [solData, setSolData] = useState<CryptoData | null>(null);
  const [adaData, setAdaData] = useState<CryptoData | null>(null);
  const [trxDatadata, setTrxData] = useState<CryptoData | null>(null);

  useEffect(() => {
    const cryptoSymbols = ["btceur", "etheur", "bnbeur", "xrpeur", "dogeeur", "usdteur", "soleur", "adaeur", "trxeur"];
    const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${cryptoSymbols.map(symbol => `${symbol}@trade`).join('/')}`);

    ws.onmessage = (event) => {
      const eventData = JSON.parse(event.data);

      const symbol = eventData.s;
      const price = parseFloat(eventData.p).toFixed(2);
  
      // Set state based on the symbol
      switch (symbol) {
        case "BTCEUR":
          setBtcData({ symbol, price });
          break;
        case "ETHEUR":
          setEthData({ symbol, price });
          break;
        case "BNBEUR":
          setBnbData({ symbol, price });
          break;
        case "XRPEUR":
          setXrpData({ symbol, price });
          break;
        case "DOGEUR":
          setDogeData({ symbol, price });
          break;
        case "USDTEUR":
          setUsdtData({ symbol, price });
          break;
        case "SOLEUR":
          setSolData({ symbol, price });
          break;
        case "ADAEUR":
          setAdaData({ symbol, price });
          break;
        case "TRXEUR":
          setTrxData({ symbol, price });
          break;
        default:
          console.log("Symbol not handled:", symbol);
          break;
      }      
    };
  
    ws.onopen = () => {
      console.log("WebSocket connection opened");
    };
  
    ws.onclose = (event) => {
      console.log("WebSocket connection closed:", event);
    };
  
    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };
  
    return () => {
      ws.close();
    };
  }, []);

  const getIconUrl = (symbol: string) => {
    // Replace these URLs with the actual URLs of your icons
    const iconUrls: { [key: string]: string } = {
      BTCEUR: "	https://s2.coinmarketcap.com/static/img/coins/64x64/1.png",
      ETHEUR: "url_for_eth_icon",
      BNBEUR: "url_for_bnb_icon",
      XRPEUR: "url_for_xrp_icon",
      DOGE: "url_for_doge_icon",
      USDT: "url_for_usdt_icon",
      SOL: "url_for_sol_icon",
      ADA: "url_for_ada_icon",
      TRX: "url_for_trx_icon",
    };

    return iconUrls[symbol];
  };


  return (
    <Container className="containerHeadBand" maxWidth="xl">
      <div className="slider">
        <div className="slide-track">
          <div className="slide">
            <img src={getIconUrl('BTCEUR')} alt={`${'BTCEUR'} icon`} />
            <h1>{btcData ? `BTC: €${btcData.price}` : 'BTC: N/A'}</h1>
          </div>
          <div className="slide">
          <img src={getIconUrl('BTCEUR')} alt={`${'BTCEUR'} icon`} />
            <h1>{ethData ? `ETH: €${ethData.price}` : 'ETH: N/A'}</h1>
          </div>
          <div className="slide">
          <img src={getIconUrl('BTCEUR')} alt={`${'BTCEUR'} icon`} />
            <h1>{bnbData ? `BNB: €${bnbData.price}` : 'BNB: N/A'}</h1>
          </div>
          <div className="slide">
          <img src={getIconUrl('BTCEUR')} alt={`${'BTCEUR'} icon`} />
            <h1>{xrpData ? `XRP: €${xrpData.price}` : 'XRP: N/A'}</h1>
          </div>
          <div className="slide">
          <img src={getIconUrl('BTCEUR')} alt={`${'BTCEUR'} icon`} />
            <h1>{dogeData ? `DOGE: €${dogeData.price}` : 'DOGE: N/A'}</h1>
          </div>
          <div className="slide">
          <img src={getIconUrl('BTCEUR')} alt={`${'BTCEUR'} icon`} />
            <h1>{usdtData ? `USDT: €${usdtData.price}` : 'USDT: N/A'}</h1>
          </div>
          <div className="slide">
          <img src={getIconUrl('BTCEUR')} alt={`${'BTCEUR'} icon`} />
            <h1>{solData ? `SOL: €${solData.price}` : 'SOL: N/A'}</h1>
          </div>
          <div className="slide">
          <img src={getIconUrl('BTCEUR')} alt={`${'BTCEUR'} icon`} />
            <h1>{adaData ? `ADA: €${adaData.price}` : 'ADA: N/A'}</h1>
          </div>
          <div className="slide">
          <img src={getIconUrl('BTCEUR')} alt={`${'BTCEUR'} icon`} />
            <h1>{trxDatadata ? `TRX: €${trxDatadata.price}` : 'TRX: N/A'}</h1>
          </div>

          <div className="slide">
          <img src={getIconUrl('BTCEUR')} alt={`${'BTCEUR'} icon`} />
            <h1>{btcData ? `BTC: €${btcData.price}` : 'BTC: N/A'}</h1>
          </div>
          <div className="slide">
          <img src={getIconUrl('BTCEUR')} alt={`${'BTCEUR'} icon`} />
            <h1>{ethData ? `ETH: €${ethData.price}` : 'ETH: N/A'}</h1>
          </div>
          <div className="slide">
          <img src={getIconUrl('BTCEUR')} alt={`${'BTCEUR'} icon`} />
            <h1>{bnbData ? `BNB: €${bnbData.price}` : 'BNB: N/A'}</h1>
          </div>
          <div className="slide">
          <img src={getIconUrl('BTCEUR')} alt={`${'BTCEUR'} icon`} />
            <h1>{xrpData ? `XRP: €${xrpData.price}` : 'XRP: N/A'}</h1>
          </div>
          <div className="slide">
          <img src={getIconUrl('BTCEUR')} alt={`${'BTCEUR'} icon`} />
            <h1>{dogeData ? `DOGE: €${dogeData.price}` : 'DOGE: N/A'}</h1>
          </div>
          <div className="slide">
          <img src={getIconUrl('BTCEUR')} alt={`${'BTCEUR'} icon`} />
            <h1>{usdtData ? `USDT: €${usdtData.price}` : 'USDT: N/A'}</h1>
          </div>
          <div className="slide">
          <img src={getIconUrl('BTCEUR')} alt={`${'BTCEUR'} icon`} />
            <h1>{solData ? `SOL: €${solData.price}` : 'SOL: N/A'}</h1>
          </div>
          <div className="slide">
          <img src={getIconUrl('BTCEUR')} alt={`${'BTCEUR'} icon`} />
            <h1>{adaData ? `ADA: €${adaData.price}` : 'ADA: N/A'}</h1>
          </div>
          <div className="slide">
          <img src={getIconUrl('BTCEUR')} alt={`${'BTCEUR'} icon`} />
            <h1>{trxDatadata ? `TRX: €${trxDatadata.price}` : 'TRX: N/A'}</h1>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default HeadBandCryptoPrice;
