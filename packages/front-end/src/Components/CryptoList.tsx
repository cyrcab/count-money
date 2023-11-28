// CryptoList.tsx
import React, { useState } from "react";
import { Container, Tabs, Tab, List, ListItem, ListItemText } from "@mui/material";
import "../Css/CryptoList.css";

const CryptoList: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<string>("topCrypto");

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
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
      <List>
        {favoriteCryptos.map((crypto) => (
          <ListItem key={crypto.id}>
            <ListItemText primary={`${crypto.name} (${crypto.symbol})`} />
          </ListItem>
        ))}
      </List>
    </Container>)}
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
