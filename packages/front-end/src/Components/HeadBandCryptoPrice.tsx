import React from 'react';
import { Container } from "@mui/material";
import "../Css/HeadBandCryptoPrice.css";

const HeadBandCryptoPrice: React.FC = () => {
  return (
    <Container className="containerHeadBand" maxWidth="xl">
      <div className="container">
        <div className="horizontal-scrolling-items">
          <div className="horizontal-scrolling-items__item">
            Bitcoin: $60,000
          </div>
          <div className="horizontal-scrolling-items__item">
            Ethereum: $2,000
          </div>
          <div className="horizontal-scrolling-items__item">
            Cardano: $1.50
          </div>
          <div className="horizontal-scrolling-items__item">
            Binance Coin: $300
          </div>
          {/* Dupliquez les éléments pour assurer un défilement continu */}
          <div className="horizontal-scrolling-items__item">
            Bitcoin: $60,000
          </div>
          <div className="horizontal-scrolling-items__item">
            Ethereum: $2,000
          </div>
          <div className="horizontal-scrolling-items__item">
            Cardano: $1.50
          </div>
          <div className="horizontal-scrolling-items__item">
            Binance Coin: $300
          </div>
          {/* Dupliquez les éléments à nouveau pour une transition plus fluide */}
          <div className="horizontal-scrolling-items__item">
            Bitcoin: $60,000
          </div>
          <div className="horizontal-scrolling-items__item">
            Ethereum: $2,000
          </div>
          <div className="horizontal-scrolling-items__item">
            Cardano: $1.50
          </div>
          <div className="horizontal-scrolling-items__item">
            Binance Coin: $300
          </div>
        </div>
      </div>
    </Container>
  );
};

export default HeadBandCryptoPrice;