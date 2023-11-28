import { useState, useEffect } from "react";
import "../Css/Home.css";
import HeadBandCryptoPrice from "../Components/HeadBandCryptoPrice";
import TopBar from "../Components/TopBar";
import CarousselFlux from "../Components/Rss/CarousselFlux";
import CryptoList from "../Components/CryptoList";
import { Box, Container } from "@mui/material";
import NewsList from "../Components/NewsList";
import TopNewsInfos from "../Components/TopNewsInfos";
import SpecificCrypto from "../Components/SpecificCrypto";

const Home: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<string | null>("Crypto");

  const handleTabChange = (tab: string) => {
    setSelectedTab(tab);
  };

  useEffect(() => {
  }, []); 

  return (
    <Container className="containerHome" maxWidth="xl">
      <HeadBandCryptoPrice />
      <TopBar onTabChange={handleTabChange} />
      <CarousselFlux />
      <Box className="containerCrypto">
        {selectedTab === "Crypto" && (
          <>
            <CryptoList />
            <SpecificCrypto />
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
  );
};

export default Home;
