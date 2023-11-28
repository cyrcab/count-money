import { useState, useEffect } from "react";
import "../Css/Home.css";
import HeadBandCryptoPrice from "../Components/HeadBandCryptoPrice";
import TopBar from "../Components/TopBar";
import CarousselFlux from "../Components/Rss/CarousselFlux";
import CryptoList from "../Components/CryptoList";
import { Box, Container } from "@mui/material";
import TopCryptoInfos from "../Components/TopCryptoInfos";
import WebSocketService from "../Websockets/WebSocketService";
import { Provider } from "react-redux";
import store from "../Context/store";
import NewsList from "../Components/NewsList";
import TopNewsInfos from "../Components/TopNewsInfos";
// import SpecificCrypto from "../Components/SpecificCrypto";

const Home: React.FC = () => {

  const [selectedTab, setSelectedTab] = useState<string | null>("Crypto");

  const handleTabChange = (tab: string) => {
    setSelectedTab(tab);
  };

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
      <TopBar onTabChange={handleTabChange} />
      <CarousselFlux />
      <Box className="containerCrypto">
        {selectedTab === "Crypto" && (
          <>
            <CryptoList />
            <TopCryptoInfos />
          </>
        )}
        {selectedTab === "Actualité" && (
          <>
            <NewsList />
            <TopNewsInfos />
          </>
        )}
      </Box>
    </Container>
    </Provider>

  );
}
export default Home;
