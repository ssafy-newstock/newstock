import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { calculateDates } from '@utils/dateUtils';
import { ApexOptions } from 'apexcharts';
import { IStock } from '@features/Stock/types';
import { useTheme } from 'styled-components';
import { useStockChartQuery } from '@hooks/useStockChartQuery';

interface ChartPageProps {
  stock: IStock;
  timeframe: number;
}

const CandleChart = ({ stock, timeframe }: ChartPageProps) => {
  // 타임프레임에 따라 날짜 계산
  const [params, setParams] = useState(calculateDates(timeframe));
  const theme = useTheme();

  useEffect(() => {
    // 타임프레임이 변경되면 params를 다시 계산하여 반영
    setParams(calculateDates(timeframe));
  }, [timeframe]);

  // 차트 데이터를 fetch하는 useQuery
  const { data: stockDailyChart } = useStockChartQuery(stock.stockCode, params);

  const series = stockDailyChart
    ? [
        {
          data: stockDailyChart?.data.map((item) => ({
            x: item.stockCandleDay,
            y: [
              item.stockCandleOpen,
              item.stockCandleHigh,
              item.stockCandleLow,
              item.stockCandleClose,
            ],
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
