import React, { useState } from "react";
import { Container, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useSelector } from "react-redux";
import { RootState } from "../../Context/RootReducer";
import "../../Css/SpecificCrypto.css";
import { IconButton } from "@mui/material";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import ChartComponent from "./Chart.tsx";
import InformationComponent from "./Informations.tsx";

interface CryptoData {
  name: string;
  symbol: string;
  price?: string;
  iconUrl?: string;
}

interface CryptoDataList {
  symbol: string;
  price?: string;
  iconUrl?: string;
}


interface SpecificCryptoProps {
  selectedCrypto: CryptoData;
  onSelectCrypto: (crypto: { name: string; symbol: string } | null) => void;
}

const SpecificCrypto: React.FC<SpecificCryptoProps> = ({
  selectedCrypto,
  onSelectCrypto,
}) => {
  const cryptoData = useSelector((state: RootState) => state.crypto);
  const [isHovered, setIsHovered] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);


  const handleBack = () => {
    onSelectCrypto(null);
  };

  // Ajoutez le "EUR" à la fin de selectedCrypto si ce n'est pas déjà le cas
  const normalizedSelectedCrypto = selectedCrypto.symbol.toUpperCase().endsWith("EUR")
    ? selectedCrypto.symbol.toUpperCase()
    : `${selectedCrypto.symbol.toUpperCase()}EUR`;

  const selectedCryptoInfo: CryptoDataList | null =
    cryptoData[normalizedSelectedCrypto as keyof typeof cryptoData] || null;

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  return (
    <Container className="containerSpecificCrypto">
      {selectedCryptoInfo && (
        <>
          <div className="TopbarSpecificCrypto">
            <div className="priceIcon">
              {selectedCryptoInfo.iconUrl && (
                <img src={selectedCryptoInfo.iconUrl} />
              )}
              <p>{selectedCrypto.name}</p>
              <p>{selectedCryptoInfo.price}€</p>
            </div>
            <Button
              variant="contained"
              color="secondary"
              style={{
                backgroundColor: isHovered ? "gold" : "gray",
                marginLeft: "10px",
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              endIcon={isHovered ? <StarIcon /> : <StarBorderIcon />}
            >
              Add to Watchlist
            </Button>
            <IconButton onClick={handleBack}  color="primary">
              <ArrowBackIcon />
            </IconButton>
          </div>
          <div className="ongletSelection">
            <Tabs
              value={selectedTab}
              onChange={handleTabChange}
              aria-label="crypto details tabs"
            >
              <Tab label="Chart" />
              <Tab label="Informations" />
            </Tabs>
          </div>
          <div className="selectedOnglet">
            {selectedTab === 0 && <ChartComponent symbol={selectedCrypto.symbol}/>}
            {selectedTab === 1 && <InformationComponent selectedCrypto={selectedCrypto}/>}
          </div>
        </>
      )}
    </Container>
  );
};

export default SpecificCrypto;
