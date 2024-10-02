import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import LoadingSpinner from '@components/LoadingSpinner';
import { calculateDates } from '@utils/dateUtils'; // 날짜 계산 유틸로 분리
import { axiosInstance } from '@api/axiosInstance';
import { toast } from 'react-toastify';
import { Suspense } from 'react';
import { ApexOptions } from 'apexcharts';
import { IDaily, IStock } from '@features/Stock/types';
import { useTheme } from 'styled-components';

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
  const { data: stockDailyChart } = useQuery<IDaily[]>({
    queryKey: [
      'stockDailyChart',
      stock.stockCode,
      params.startDate,
      params.endDate,
    ],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/stock/${stock.stockCode}/candle`,
        { params }
      );
      toast.success(`${stock.stockName} 조회 완료`);
      return response.data.data;
    },
  });

  const series = stockDailyChart
    ? [
        {
          data: stockDailyChart.map((item) => ({
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
      <Suspense fallback={<LoadingSpinner />}>
        <Chart
          options={options}
          series={series}
          type="candlestick"
          height={350}
        />
      </Suspense>
    </div>
  );
};

export default CandleChart;
