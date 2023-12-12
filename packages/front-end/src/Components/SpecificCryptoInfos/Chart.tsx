import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ReactApexChart from 'react-apexcharts';
import "../../Css/chart.css"

interface ChartComponentProps {}

const ChartComponent: React.FC<ChartComponentProps> = () => {
  const [chartOptions, setChartOptions] = useState({
    chart: {
      id: 'basic-line',
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    },
  });

  const [series, setSeries] = useState([
    {
      name: 'Series 1',
      data: [30, 40, 25, 50, 49, 21, 70, 51, 60, 45, 30, 20],
    },
  ]);

  const generateRandomData = () => {
    const newData = Array.from({ length: 12 }, () => Math.floor(Math.random() * 100));
    return newData;
  };

  const handleTimeRangeChange = (range: string) => {
    // Générez de nouvelles données aléatoires
    const newData = generateRandomData();

    // Mettez à jour les données du graphique avec les nouvelles données
    setSeries([{ name: 'Series 1', data: newData }]);

    console.log(`Changing time range to ${range}`);
    // Mettez à jour les options du graphique en fonction de la plage de temps sélectionnée
    // (ex. charger des données différentes en fonction de la plage de temps)
  };

  return (
    <Card className='containerChart'>
      <CardContent>
        <ReactApexChart
          options={chartOptions}
          series={series}
          type="line"
          height={180}
        />
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => handleTimeRangeChange('year')}>
          Année
        </Button>
        <Button size="small" onClick={() => handleTimeRangeChange('month')}>
          Mois
        </Button>
        <Button size="small" onClick={() => handleTimeRangeChange('week')}>
          Semaine
        </Button>
        <Button size="small" onClick={() => handleTimeRangeChange('day')}>
          Jour
        </Button>
      </CardActions>
    </Card>
  );
};

export default ChartComponent;
