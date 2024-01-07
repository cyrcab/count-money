// Importez les modules nécessaires
import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import ReactApexChart from "react-apexcharts";
import "../../Css/chart.css";
import { ApexOptions } from "apexcharts";
import { useGetCryptoExternalQuery } from "../../api";

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
  label: string;
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

// Composant de graphique
const ChartComponent: React.FC<BinanceParams> = ({ label }) => {
  const [limit, setLimit] = useState(365);
  const [series, setSeries] = useState<ApexAxisChartSeries>([
    {
      name: "Series 1",
      data: [],
    },
  ]);

  const [selectedInterval, setSelectedInterval] = useState<BinanceIntervals>(
    BinanceIntervals["1d"]
  );
  label = label.toUpperCase() + "EUR";
  const [selectedButton, setSelectedButton] = useState(BinanceIntervals["1d"]);
  const {data} = useGetCryptoExternalQuery({label, interval: selectedInterval, limit})

  const formattedData = data?.map((item:CryptoDataItem) => ({
            x: new Date(item[0]).getTime(),
            y: parseFloat(item[1]),
          })) as { x: number; y: number }[]

  useEffect(() => {
    if (data) {
      setSeries([{ name: label, data: formattedData }]);
    }
  }, [data]);
        
  const apexOptions: ApexOptions = {
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
    stroke: {
      width: [2, 2],
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
          className={selectedButton === BinanceIntervals["1d"] ? "selected" : ""}
          onClick={() => {
            setSelectedInterval(BinanceIntervals["1d"]);
            setLimit(365);
            setSelectedButton(BinanceIntervals["1d"]);
          }}
        >
          Année
        </Button>
        <Button
          size="small"
          className={selectedButton === BinanceIntervals["1h"] ? "selected" : ""}
          onClick={() => {
            setSelectedInterval(BinanceIntervals["1h"]);
            setLimit(730);
            setSelectedButton(BinanceIntervals["1h"]);
          }}
        >
          Mois
        </Button>
        <Button
          size="small"
          className={selectedButton === BinanceIntervals["15m"] ? "selected" : ""}
          onClick={() => {
            setSelectedInterval(BinanceIntervals["15m"]);
            setLimit(672);
            setSelectedButton(BinanceIntervals["15m"]);
          }}
        >
          Semaine
        </Button>
        <Button
          size="small"
          className={selectedButton === BinanceIntervals["5m"] ? "selected" : ""}
          onClick={() => {
            setSelectedInterval(BinanceIntervals["5m"]);
            setLimit(288);
            setSelectedButton(BinanceIntervals["5m"]);
          }}
        >
          Jour
        </Button>
      </CardActions>
    </Card>
  );
};

export default ChartComponent;
