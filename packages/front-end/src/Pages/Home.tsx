// Home.tsx
import "../Css/Home.css";
import HeadBandCryptoPrice from "../Components/HeadBandCryptoPrice";
import TopBar from "../Components/TopBar";
import CarousselFlux from "../Components/CarousselFlux";
import CryptoList from "../Components/CryptoList";
import { Box, Container } from "@mui/material";
import TopCryptoInfos from "../Components/TopCryptoInfos";

const Home: React.FC = () => {
  return (
    <Container className="containerHome" maxWidth="xl">
      <HeadBandCryptoPrice />
      <TopBar />
      <CarousselFlux />
      <Box className="containerCrypto">
        <CryptoList />
        <TopCryptoInfos />
      </Box>
    </Container>
  );
};

export default Home;
