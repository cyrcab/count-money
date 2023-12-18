// Importez les modules nécessaires
import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import ReactApexChart from "react-apexcharts";
import "../../Css/chart.css";
import api from "../../axios.config";
import { ApexOptions } from "apexcharts";

// Enum pour les intervalles de Binance
enum BinanceIntervals {
  "1d" = "1d",
  "1h" = "1h",
  "1m" = "1m",
  "15m" = "15m",
  "5m" = "5m",
}

// Interface pour les paramètres de Binance
interface BinanceParams {
  symbol: string;
}

interface CryptoDataItem {
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

// Composant de graphique
const ChartComponent: React.FC<BinanceParams> = ({ symbol }) => {
  const [limit, setLimit] = useState(365);

  const [series, setSeries] = useState([
    {
      name: "Series 1",
      data: [],
    },
  ]);

  const [selectedInterval, setSelectedInterval] = useState<BinanceIntervals>(
    BinanceIntervals["1d"]
  );

  useEffect(() => {
    handleTimeRangeChange(selectedInterval);
  }, [selectedInterval, symbol]);

  const handleTimeRangeChange = (range: BinanceIntervals) => {
    api
      .get("/crypto/external", {
        params: {
          symbol: symbol.toUpperCase() + "EUR",
          interval: range,
          limit: limit,
        },
      })
      .then((res) => {
        const formattedData = res.data.map((item: CryptoDataItem) => (        console.log(item),
        {
          x: new Date(item[0]).getTime(),
          y: parseFloat(item[1]),
        }));

        setSeries([{ name: symbol, data: formattedData }]);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // Options d'ApexCharts
  const apexOptions:ApexOptions = {
    chart: {
      id: "basic-line",
    },
    xaxis: {
      labels: {
        format: "dd/MM", 
      },
      type: "datetime",
    },
    tooltip: {
      x: {
        format: "dd/MM HH:mm", // Format de l'info-bulle (tooltip)
      },
    },
  };

  return (
    <Card className="containerChart">
      <CardContent>
        <ReactApexChart
          options={apexOptions}
          series={series}
          type="line"
          height={180}
        />
      </CardContent>
      <CardActions>
        <Button
          size="small"
          onClick={() => {
            setSelectedInterval(BinanceIntervals["1d"]);
            setLimit(365);
          }}
        >
          Année
        </Button>
        <Button
          size="small"
          onClick={() => {
            setSelectedInterval(BinanceIntervals["1h"]);
            setLimit(730);
          }}
        >
          Mois
        </Button>
        <Button
          size="small"
          onClick={() => {
            setSelectedInterval(BinanceIntervals["15m"]);
            setLimit(672);
          }}
        >
          Semaine
        </Button>
        <Button
          size="small"
          onClick={() => {
            setSelectedInterval(BinanceIntervals["5m"]);
            setLimit(288);
          }}
        >
          Jour
        </Button>
      </CardActions>
    </Card>
  );
};

export default ChartComponent;
