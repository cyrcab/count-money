import { Container, Card, CardContent, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import "../Css/TopCryptoInfos.css";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import { useState } from "react";

interface CryptoInfo {
  name: string;
  price: number;
  hourlyChange: number;
  dailyChange: number;
  weeklyChange: number;
  marketCap: number;
  volume: number;
}

const mockCryptoData: CryptoInfo[] = [
  {
    name: "Bitcoin",
    price: 50000,
    hourlyChange: 2.5,
    dailyChange: -1.3,
    weeklyChange: 5.8,
    marketCap: 900000000000,
    volume: 80000000000,
  },
  {
    name: "Bitcoin",
    price: 50000,
    hourlyChange: 2.5,
    dailyChange: -1.3,
    weeklyChange: 5.8,
    marketCap: 900000000000,
    volume: 80000000000,
  },
  {
    name: "Bitcoin",
    price: 50000,
    hourlyChange: 2.5,
    dailyChange: -1.3,
    weeklyChange: 5.8,
    marketCap: 900000000000,
    volume: 80000000000,
  }
];

const TopCryptoInfos: React.FC = () => {
  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleFavorite = (cryptoName: string) => {
    if (favorites.includes(cryptoName)) {
      setFavorites(favorites.filter((name: string) => name !== cryptoName));
    } else {
      setFavorites([...favorites, cryptoName]);
    }
  }
  return (
    <Container className="containerTopCryptoInfos">
      <div className="cryptoContainer">
        {mockCryptoData.map((crypto) => (
          <Link to={`/crypto/${crypto.name}`}>
          <Card key={crypto.name} className="cryptoCard">
            <CardContent className="cryptoInfos">
              <Typography variant="h5">{crypto.name}</Typography>
              <Typography variant="body1">Price: ${crypto.price}</Typography>
              <Typography variant="body1">Hourly Change: {crypto.hourlyChange}%</Typography>
              <Typography variant="body1">Daily Change: {crypto.dailyChange}%</Typography>
              <Typography variant="body1">Weekly Change: {crypto.weeklyChange}%</Typography>
              <Typography variant="body1">Market Cap: ${crypto.marketCap}</Typography>
              <Typography variant="body1">Volume (24h): ${crypto.volume}</Typography>
              <Button onClick={() => toggleFavorite(crypto.name)}>
                {favorites.includes(crypto.name) ? <StarIcon /> : <StarBorderIcon />}
              </Button>
            </CardContent>
          </Card>  
          </Link>
        ))}
      </div>
    </Container>
  );
};

export default TopCryptoInfos;
