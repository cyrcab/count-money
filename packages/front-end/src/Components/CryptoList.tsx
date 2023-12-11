// CryptoList.tsx
import React, { useState } from "react";
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

interface CryptoListProps {
  onSelectCrypto: (cryptoName: string) => void;
}


const CryptoList: React.FC<CryptoListProps> = ({ onSelectCrypto })  => {
  const [selectedTab, setSelectedTab] = useState<string>("topCrypto");

  const handleTabChange = (_event: React.SyntheticEvent, newValue: string) => {
    setSelectedTab(newValue);
  };

  const favoriteCryptos = [
    { id: 1, name: "Bitcoin", symbol: "BTC" },
    { id: 2, name: "Ethereum", symbol: "ETH" },
    { id: 3, name: "Ripple", symbol: "XRP" },
    { id: 4, name: "Litecoin", symbol: "LTC" },
    { id: 5, name: "Cardano", symbol: "ADA" },
  ];

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
              className="buttonGroup"
              orientation="vertical"
              aria-label="vertical contained button group"
              variant="text"
              onClick={() => onSelectCrypto(crypto.symbol)}
            >
              <Button key={crypto.id}>
                {crypto.name} {crypto.symbol}
              </Button>
            </ButtonGroup>
          ))}
        </Container>
      )}
      {selectedTab === "favorite" && (
        <Container>
          <List>
            {favoriteCryptos.map((crypto) => (
              <ListItem key={crypto.id}>
                <ListItemText primary={`${crypto.name} (${crypto.symbol})`} />
              </ListItem>
            ))}
          </List>
        </Container>
      )}
    </Container>
  );
};

export default CryptoList;
