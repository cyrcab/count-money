// CryptoList.tsx

import React, { useState, useEffect } from "react";
import {
  Container,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import "../Css/CryptoList.css";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import api from "../axios.config";

interface CryptoListProps {
  onSelectCrypto: (crypto: { id: number; name: string; label: string }) => void;
}

const CryptoList: React.FC<CryptoListProps> = ({ onSelectCrypto }) => {
  const [selectedTab, setSelectedTab] = useState<string>("topCrypto");
  const [favoriteCryptos, setFavoriteCryptos] = useState<
    { id: number; name: string; label: string }[]
  >([]);
  const [selectedCrypto, setSelectedCrypto] = useState<{ id: number; name: string; label: string } | null>(null);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: string) => {
    setSelectedTab(newValue);
    setSelectedCrypto(null); // Réinitialiser selectedCrypto lors du changement d'onglet
  };

  useEffect(() => {
    api.get("/crypto")
      .then((response) => {
        setFavoriteCryptos(response.data);
        if (response.data.length > 0) {
          const initialSelectedCrypto = response.data[0];
          setSelectedCrypto(initialSelectedCrypto);
          onSelectCrypto(initialSelectedCrypto);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleCryptoClick = (crypto: { id: number; name: string; label: string }) => {
    setSelectedCrypto(crypto);
    onSelectCrypto(crypto);
  };

  return (
    <Container className="containerCryptoList">
      <Tabs
        value={selectedTab}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
      >
        <Tab label="TopCrypto" value="topCrypto" />
        <Tab label="Favorite" value="favorite" />
      </Tabs>
      {selectedTab === "topCrypto" && (
        <Container>
          {favoriteCryptos.map((crypto) => (
            <ButtonGroup
              className={`buttonGroup ${selectedCrypto?.id === crypto.id ? 'selected' : ''}`}
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
          <List>
            {favoriteCryptos.map((crypto) => (
              <ListItem
                key={crypto.id}
                className={`cryptoListItem ${selectedCrypto?.id === crypto.id ? 'selected' : ''}`}
                onClick={() => handleCryptoClick(crypto)}
              >
                <ListItemText primary={`${crypto.name} (${crypto.label})`} />
              </ListItem>
            ))}
          </List>
        </Container>
      )}
    </Container>
  );
};

export default CryptoList;
