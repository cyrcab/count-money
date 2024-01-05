import React, { useState } from "react";
import { Container, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "../../Css/SpecificCrypto.css";
import { IconButton } from "@mui/material";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import ChartComponent from "./Chart.tsx";
import InformationComponent from "./Informations.tsx";
import { useGetCryptoExternalQuery } from "../../api";

interface CryptoData {
  name: string;
  label: string;
  price?: string;
  iconUrl?: string;
}

export interface CryptoDataItem {
  0: number; // Timestamp
  1: string; // Price
  2: string; // Open
  3: string; // Low
  4: string; // High
  5: string; // Volume
  6: number; // Close timestamp
  7: string; // Close price
  8: number; // Trades count
  9: string; // Taker buy base asset volume
  10: string; // Taker buy quote asset volume
  11: string; // Ignore
}

interface SpecificCryptoProps {
  selectedCrypto: CryptoData;
  onSelectCrypto: (crypto: { name: string; label: string } | null) => void;
}

const SpecificCrypto: React.FC<SpecificCryptoProps> = ({
  selectedCrypto,
  onSelectCrypto,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);

  const normalizedSelectedCrypto = selectedCrypto.label
    .toUpperCase()
    .endsWith("EUR")
    ? selectedCrypto.label.toUpperCase()
    : `${selectedCrypto.label.toUpperCase()}EUR`;

  const { data } = useGetCryptoExternalQuery({
    label: normalizedSelectedCrypto,
    interval: "1m",
    limit: 1,
  });

  const handleBack = () => {
    onSelectCrypto(null);
  };

  const selectedCryptoInfo: CryptoDataItem | null =
    data && data.length > 0 ? data[0] : null;

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  return (
    <Container className="containerSpecificCrypto">
      {selectedCryptoInfo && (
        <>
          <div className="TopbarSpecificCrypto">
            <div className="priceIcon">
              <p>{selectedCrypto.name}</p>
              <p>{parseFloat(selectedCryptoInfo[1]).toFixed(2)}€</p>
            </div>
            <div className="containerButton">
              <Button
                variant="contained"
                color="secondary"
                style={{
                  backgroundColor: isHovered ? "gold" : "gray",
                  marginRight: "80px",
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                endIcon={isHovered ? <StarIcon /> : <StarBorderIcon />}
              >
                Add to Watchlist
              </Button>
              <IconButton onClick={handleBack} color="primary">
                <ArrowBackIcon />
              </IconButton>
            </div>
          </div>
          <div className="ongletSelection">
            <Tabs
              value={selectedTab}
              onChange={handleTabChange}
              aria-label="crypto details tabs"
            >
              <Tab
                label="Chart"
                style={{
                  color: selectedTab === 0 ? "#FEDA84" : "white",
                }}
              />
              <Tab
                label="Informations"
                style={{
                  color: selectedTab === 1 ? "#FEDA84" : "white",
                }}
              />
            </Tabs>
          </div>
          <div className="selectedOnglet">
            {selectedTab === 0 && (
              <ChartComponent label={selectedCrypto.label} />
            )}
            {selectedTab === 1 && (
              <InformationComponent selectedCrypto={selectedCrypto} />
            )}
          </div>
        </>
      )}
    </Container>
  );
};

export default SpecificCrypto;
