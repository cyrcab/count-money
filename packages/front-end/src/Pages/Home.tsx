// Home.tsx
import { useState, useEffect } from "react";
import "../Css/Home.css";
import HeadBandCryptoPrice from "../Components/HeadBandCryptoPrice";
import TopBar from "../Components/TopBar";
import CarousselFlux from "../Components/Rss/CarousselFlux";
import CryptoList from "../Components/CryptoList";
import { Box, Container } from "@mui/material";
import WebSocketService from "../Websockets/WebSocketService";
import NewsList, { ArticleData } from "../Components/NewsList";
import TopNewsInfos from "../Components/TopNewsInfos";
import Profile from "../Components/Profile/Profile";
import SpecificCrypto from "../Components/SpecificCryptoInfos/SpecificCrypto";

const Home: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<string | null>("Crypto");
  const [selectedCrypto, setSelectedCrypto] = useState<{
    name: string;
    label: string;
  } | null>(null);

  const [selectedArticles, setSelectedArticles] = useState<ArticleData | null>(
    null
  );

  const handleCryptoSelection = (
    crypto: { name: string; label: string } | null
  ) => {
    setSelectedCrypto(crypto);
  };

  const handleArticleSelection = (article: ArticleData | null) => {
    setSelectedArticles(article);
  };

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
    <Container className="containerHome" maxWidth="xl">
      <HeadBandCryptoPrice />
      <TopBar onTabChange={handleTabChange} />
      <CarousselFlux />
      <Box className="containerCrypto">
        {selectedTab === "Crypto" && (
          <>
            <CryptoList onSelectCrypto={handleCryptoSelection} />
            {selectedCrypto && (
              <SpecificCrypto
                selectedCrypto={selectedCrypto}
                onSelectCrypto={handleCryptoSelection}
              />
            )}
          </>
        )}

        {selectedTab === "Actualité" && (
          <>
            <NewsList onSelectArticle={handleArticleSelection} />
            <TopNewsInfos selectedArticles={selectedArticles} />
          </>
        )}
        {selectedTab === "Profile" && (
          <>
            <CryptoList onSelectCrypto={handleCryptoSelection} />
            <Profile />
          </>
        )}
      </Box>
    </Container>
  );
};

export default Home;
