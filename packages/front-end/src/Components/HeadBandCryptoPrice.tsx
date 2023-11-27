import React from "react";
import { Container } from "@mui/material";
import "../Css/HeadBandCryptoPrice.css";

const data = [
  "Bitcoin: $60,000",
  "Ethereum: $2,000",
  "Cardano: $1.50",
  "Binance Coin: $300",
  "ripple: $0.50",
  "Dogecoin: $0.10",
  "Tether: $1.00",
  "Polkadot: $40.00",
  "Bitcoin Cash: $500",
];

const HeadBandCryptoPrice: React.FC = () => {
  return (
    <Container className="containerHeadBand" maxWidth="xl">
      <div className="slider">
        <div className="slide-track">
          
          <div className="slide">
            <h1>{data[0]}</h1>
          </div>
          <div className="slide">
            <h1>{data[1]}</h1>
          </div>
          <div className="slide">
            <h1>{data[2]}</h1>
          </div>
          <div className="slide">
            <h1>{data[3]}</h1>
          </div>
          <div className="slide">
            <h1>{data[4]}</h1>
          </div>
          <div className="slide">
            <h1>{data[5]}</h1>
          </div>
          <div className="slide">
            <h1>{data[6]}</h1>
          </div>
          <div className="slide">
            <h1>{data[7]}</h1>
          </div>
          <div className="slide">
            <h1>{data[8]}</h1>
          </div>


          <div className="slide">
            <h1>{data[0]}</h1>
          </div>
          <div className="slide">
            <h1>{data[1]}</h1>
          </div>
          <div className="slide">
            <h1>{data[2]}</h1>
          </div>
          <div className="slide">
            <h1>{data[3]}</h1>
          </div>
          <div className="slide">
            <h1>{data[4]}</h1>
          </div>
          <div className="slide">
            <h1>{data[5]}</h1>
          </div>
          <div className="slide">
            <h1>{data[6]}</h1>
          </div>
          <div className="slide">
            <h1>{data[7]}</h1>
          </div>
          <div className="slide">
            <h1>{data[8]}</h1>
          </div>

        </div>
      </div>
    </Container>
  );
};

export default HeadBandCryptoPrice;
