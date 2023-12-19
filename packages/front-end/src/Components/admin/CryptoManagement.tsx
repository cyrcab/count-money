import "../../Css/CryptoManagement.css";
import React, { useEffect, useState } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Button,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import api from "../../axios.config";

interface Crypto {
  id: number;
  name: string;
  label: string;
}

const availableCryptos: Partial<Crypto>[] = [
  { name: "Bitcoin", label: "BTC" },
  { name: "Ethereum", label: "ETH" },
  { name: "Altcoin", label: "ALT" },
  { name: "Dogecoin", label: "DOGE" },
  { name: "Litecoin", label: "LTC" },
  { name: "Monero", label: "XMR" },
  { name: "Ripple", label: "XRP" },
  { name: "Tether", label: "USDT" },
  { name: "Cardano", label: "ADA" },
  { name: "Polkadot", label: "DOT" },
  { name: "Uniswap", label: "UNI" },
  { name: "Chainlink", label: "LINK" },
  { name: "Bitcoin Cash", label: "BCH" },
  { name: "Stellar", label: "XLM" },
  { name: "Binance Coin", label: "BNB" },
  { name: "USD Coin", label: "USDC" },
  { name: "Solana", label: "SOL" },
  { name: "Wrapped Bitcoin", label: "WBTC" },];

const CryptoManagement: React.FC = () => {
  const [selectedCryptos, setSelectedCryptos] = useState<Partial<Crypto[]>>([]);

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const selectedCryptoLabel = event.target.value as string;
    const selectedCrypto = availableCryptos.find((crypto) => crypto.label === selectedCryptoLabel);
  
    if (selectedCrypto && !selectedCryptos.find((crypto) => crypto?.label === selectedCryptoLabel)) {
      setSelectedCryptos([...selectedCryptos, selectedCrypto as Crypto]);

      addCrypto(selectedCrypto as Crypto);
    }
  };

  const handleRemoveCrypto = (crypto: Crypto) => {
    const updatedCryptos = selectedCryptos.filter((c) => c?.label !== crypto.label);
    setSelectedCryptos(updatedCryptos);

    removeCrypto(crypto);
  };

  const addCrypto = (crypto: Crypto) => {
    api.post("/crypto/", crypto)
      .then((response) => {
        setSelectedCryptos([...selectedCryptos, response.data]);
        console.log("Crypto ajoutée avec succès :", response);
      })
      .catch((error) => {
        console.error("Erreur lors de l'ajout de la crypto :", error);
      });
  };

  const removeCrypto = (crypto: Crypto) => {
    api.delete(`/crypto/${crypto.id}`)
      .then((response) => {
        console.log("Crypto supprimée avec succès :", response);
      })
      .catch((error) => {
        console.error("Erreur lors de la suppression de la crypto :", error);
      });
  }

  useEffect(() => {
    api.get("/crypto/")
      .then((response) => {
        const responseData = response.data;
        const fetchedCryptos = responseData ? responseData || [] : [];
        setSelectedCryptos(fetchedCryptos);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des cryptos :", error);
      });
  }, []);

  return (
    <div className="containerCryptoLayout">
    <div className="containerCryptoManagement">
      <Typography variant="h2">Gestion des Crypto-monnaies</Typography>
      <br />
      <Typography variant="h6">Crypto-monnaies disponibles :</Typography>
      <br />
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-helper-label">Crypto-monnaies</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value=""
          label="Mots clés"
          onChange={handleSelectChange}
        >
          <MenuItem value="" disabled>
            Sélectionnez une Crypto-monnaie
          </MenuItem>
          {availableCryptos.map((crypto) => (
            <MenuItem key={crypto.label} value={crypto.label}>
              {crypto.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Typography variant="h6">Crypto-monnaies sélectionnées :</Typography>
      {selectedCryptos.map((crypto, index) => (
        <Button
          key={index}
          variant="contained"
          onClick={() => handleRemoveCrypto(crypto as Crypto)}
          sx={{ margin: 1 }}
        >
          {crypto?.name} &#10006;
        </Button>
      ))}
    </div>
    </div>
  );
}
export default CryptoManagement;