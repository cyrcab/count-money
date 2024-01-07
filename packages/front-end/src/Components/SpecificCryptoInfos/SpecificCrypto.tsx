import React, { useEffect, useState } from "react";
import { Container, Button } from "@mui/material";
import "../../Css/SpecificCrypto.css";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import ChartComponent from "./Chart.tsx";
import InformationComponent from "./Informations.tsx";
import { useGetCryptoExternalQuery } from "../../api";
import api from "../../axios.config.ts";
import { useSelector } from "react-redux";
import { RootState } from "../../Context/RootReducer";

interface CryptoData {
  name: string;
  label: string;
  price?: string;
  iconUrl?: string;
  id?: number;
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

const SpecificCrypto: React.FC<SpecificCryptoProps> = ({ selectedCrypto }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [favoriteCryptos, setFavoriteCryptos] = useState<
    { id: number; name: string; label: string }[]
  >([]);
  const [isInFavorites, setIsInFavorites] = useState(false);

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

  const selectedCryptoInfo: CryptoDataItem | null =
    data && data.length > 0 ? data[0] : null;

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const { user } = useSelector((state: RootState) => state.auth);

  function setFavorite() {
    api
      .get("/crypto/" + user?.id + "/" + selectedCrypto.id)
      .then((response) => {
        console.log(response);
        getFavorite();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function getFavorite() {
    api
      .get("/crypto/me/fav/crypto")
      .then((response) => {
        setFavoriteCryptos(response.data.userCrypto);
        const isInFavorites = response.data.userCrypto.some(
          (crypto: { id: number }) => crypto.id === selectedCrypto.id
        );
        setIsInFavorites(isInFavorites);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function deleteFavorite() {
    api
      .delete("/crypto/" + user?.id + "/" + selectedCrypto.id)
      .then((response) => {
        console.log(response);
        getFavorite();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getFavorite();
  }, [selectedTab, selectedCrypto]);

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
                onClick={isInFavorites ? deleteFavorite : setFavorite}
              >
                {isInFavorites ? "Remove from Watchlist" : "Add to Watchlist"}
              </Button>
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
