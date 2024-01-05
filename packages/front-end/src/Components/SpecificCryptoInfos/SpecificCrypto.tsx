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

interface CryptoDataList {
  label: string;
  price?: string;
  iconUrl?: string;
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
  const { data: cryptoData } = useGetCryptoExternalQuery({
    label: selectedCrypto.label,
    interval: "1h", // You may need to adjust the default interval as per your requirements
    limit: 10, // You may need to adjust the default limit as per your requirements
  });

  const handleBack = () => {
    onSelectCrypto(null);
  };

  const normalizedSelectedCrypto = selectedCrypto.label
    .toUpperCase()
    .endsWith("EUR")
    ? selectedCrypto.label.toUpperCase()
    : `${selectedCrypto.label.toUpperCase()}EUR`;

  const selectedCryptoInfo: CryptoDataList | null =
    cryptoData && cryptoData.length > 0 ? cryptoData[0] : null;

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  return (
    <Container className="containerSpecificCrypto">
      {selectedCryptoInfo && (
        <>
          <div className="TopbarSpecificCrypto">
            <div className="priceIcon">
              {selectedCryptoInfo.iconUrl && (
                <img height={50} src={selectedCryptoInfo.iconUrl} alt="Crypto Icon" />
              )}
              <p>{selectedCrypto.name}</p>
              <p>{selectedCryptoInfo.price}€</p>
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
