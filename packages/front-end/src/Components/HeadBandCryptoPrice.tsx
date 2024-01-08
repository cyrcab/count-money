import { Container } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../Context/RootReducer";
import "../Css/HeadBandCryptoPrice.css";

const HeadBandCryptoPrice: React.FC = () => {
  const cryptoData = useSelector((state: RootState) => state.crypto);
  return (
    <Container className="containerHeadBand">
      <div className="slider">
        <div className="slide-track">
          {Object.entries(cryptoData).map(([label, data]) => (
            <div className="slide" key={label}>
              <img src={data?.iconUrl} className="iconCrypto"/>
              <h1>
                 {label.slice(0, -3).toUpperCase()}: {data.price}€
              </h1>
            </div>
          ))}

          {Object.entries(cryptoData).map(([label, data]) => (
            <div className="slide" key={label}>
              <img src={data?.iconUrl}  className="iconCrypto" />
              <h1>
                 {label.slice(0, -3).toUpperCase()}: {data.price}€
              </h1>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default HeadBandCryptoPrice;
