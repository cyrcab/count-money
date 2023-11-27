import "../Css/TopCryptoInfos.css";
import { Container } from "@mui/material";

const TopCryptoInfos: React.FC = () => {
  return (
    <Container className="containerTopCryptoInfos">
      <h1 style={{ color: "#FEDA84" }}>Crypto price</h1>
    </Container>
  );
};

export default TopCryptoInfos;