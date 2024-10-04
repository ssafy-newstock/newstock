import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { ICandleData } from '@features/Stock/types';
import { useTheme } from 'styled-components';

interface ChartPageProps {
  stock: ICandleData[];
}

const CandleChart = ({ stock }: ChartPageProps) => {
  const theme = useTheme();
  const series = stock
    ? [
        {
          data: stock.map((item) => ({
            x: item.date,
            y: [item.open, item.high, item.low, item.close],
          })),
        },
      ]
    : [];

  const options: ApexOptions = {
    dataLabels: { enabled: false },
    chart: {
      type: 'candlestick',
      height: 350,
      zoom: { enabled: true, autoScaleYaxis: true },
    },
    xaxis: {
      type: 'category',
      labels: { style: { colors: theme.textColor } },
    },
    yaxis: {
      tooltip: { enabled: true },
      title: { text: '주가 (KRW)', style: { color: theme.textColor } },
      labels: { style: { colors: theme.textColor } },
    },
    plotOptions: {
      candlestick: {
        colors: { upward: '#FF0000', downward: '#0000FF' },
      },
    },
  };

  return (
    <div id="chart">
      <Chart
        options={options}
        series={series}
        type="candlestick"
        height={350}
      />
    </div>
  );
};

export default CandleChart;
