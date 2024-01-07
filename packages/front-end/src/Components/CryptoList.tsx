// CryptoList.tsx

import React, { useState, useEffect } from "react";
import { Container, Tabs, Tab } from "@mui/material";
import "../Css/CryptoList.css";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import api from "../axios.config";
import { useSelector } from "react-redux";
import { RootState } from "../Context/RootReducer";

interface CryptoListProps {
  onSelectCrypto: (crypto: { id: number; name: string; label: string }) => void;
}

const CryptoList: React.FC<CryptoListProps> = ({ onSelectCrypto }) => {
  const [selectedTab, setSelectedTab] = useState<string>("topCrypto");
  const [cryptos, setCryptos] = useState<
    { id: number; name: string; label: string }[]
  >([]);
  const [favoriteCryptos, setFavoriteCryptos] = useState<
    { id: number; name: string; label: string }[]
  >([]);
  const [selectedCrypto, setSelectedCrypto] = useState<{
    id: number;
    name: string;
    label: string;
  } | null>(null);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: string) => {
    setSelectedTab(newValue);
    setSelectedCrypto(null); // Réinitialiser selectedCrypto lors du changement d'onglet
  };

  useEffect(() => {
    getCrypto();
    handleFavoriteCrypto();
  }, [selectedTab]);

  function handleFavoriteCrypto() {
    api
      .get("/crypto/me/fav/crypto")
      .then((response) => {
        console.log(response);
        setFavoriteCryptos(response.data.userCrypto);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function getCrypto() {
    api
      .get("/crypto")
      .then((response) => {
        setCryptos(response.data);
        if (response.data.length > 0) {
          const initialSelectedCrypto = response.data[0];
          setSelectedCrypto(initialSelectedCrypto);
          onSelectCrypto(initialSelectedCrypto);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleCryptoClick = (crypto: {
    id: number;
    name: string;
    label: string;
  }) => {
    setSelectedCrypto(crypto);
    onSelectCrypto(crypto);
  };

  const { isLoggedIn } = useSelector((state: RootState) => state.auth);

  return (
    <Container className="containerCryptoList">
      <Tabs
        value={selectedTab}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
      >
        <Tab label="TopCrypto" value="topCrypto" />
        <Tab label="Favorite" value="favorite" disabled={!isLoggedIn} />
      </Tabs>
      {selectedTab === "topCrypto" && (
        <Container>
          {cryptos.map((crypto) => (
            <ButtonGroup
              className={`buttonGroup ${
                selectedCrypto?.id === crypto.id ? "selected" : ""
              }`}
              orientation="vertical"
              aria-label="vertical contained button group"
              variant="text"
              key={crypto.id}
            >
              <Button onClick={() => handleCryptoClick(crypto)}>
                {crypto.name} {crypto.label}
              </Button>
            </ButtonGroup>
          ))}
        </Container>
      )}
      {selectedTab === "favorite" && (
        <Container>
          {favoriteCryptos.map((crypto) => (
            <ButtonGroup
              className={`buttonGroup ${
                selectedCrypto?.id === crypto.id ? "selected" : ""
              }`}
              orientation="vertical"
              aria-label="vertical contained button group"
              variant="text"
              key={crypto.id}
            >
              <Button onClick={() => handleCryptoClick(crypto)}>
                {crypto.name} {crypto.label}
              </Button>
            </ButtonGroup>
          ))}
        </Container>
      )}
    </Container>
  );
};

export default CryptoList;
