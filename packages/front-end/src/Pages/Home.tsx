// Home.tsx
import "../Css/Home.css";
import HeadBandCryptoPrice from "../Components/HeadBandCryptoPrice";
import TopBar from "../Components/TopBar";
import CarousselFlux from "../Components/CarousselFlux";
import CryptoList from "../Components/CryptoList";
import { Box, Container } from "@mui/material";
import TopCryptoInfos from "../Components/TopCryptoInfos";
import { useEffect } from "react";
import WebSocketService from "../Websockets/WebSocketService";
import { Provider } from "react-redux";
import store from "../Context/store";

const Home: React.FC = () => {
  useEffect(() => {
    const cleanupWebSocket = WebSocketService();

    return () => {
      cleanupWebSocket();
    };
  }, []);
  return (
    <Provider store={store}>
      <Container className="containerHome" maxWidth="xl">
        <HeadBandCryptoPrice />
        <TopBar />
        <CarousselFlux />
        <Box className="containerCrypto">
          <CryptoList />
          <TopCryptoInfos />
        </Box>
      </Container>
    </Provider>
  );
};

export default Home;
