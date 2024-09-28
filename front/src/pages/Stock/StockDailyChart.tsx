import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { useLocation } from 'react-router-dom';
import { IDaily, IStock } from '@features/Stock/types';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '@components/LoadingSpinner';

const StockDailyChart = () => {
  // 구조분해할당 활용
  const { state } = useLocation() as { state: { stock: IStock } };
  const { stock } = state;

  const params = {
    startDate: '2024-01-01',
    endDate: '2024-09-20',
  };

  const { data: stockDailyChart, isLoading: chartLoading } = useQuery<IDaily[]>({
    queryKey: [`stockDailyChart-${stock.stockCode}`],
    queryFn: async () => {
      const response = await axios.get(
        `https://newstock.info/api/stock/${stock.stockCode}/candle`,{params}
      );
      return response.data.data;
    },
    staleTime: 1000 * 60 * 5, // 5분 이내에는 캐시된 데이터 사용
  });

  if (chartLoading) {
    return <LoadingSpinner />;
  }
  // stockDailyChart가 undefined가 아닌 경우에만 데이터 생성
  const series = stockDailyChart
    ? [
        {
          data: stockDailyChart.map((item) => ({
            // x: new Date(item.stockCandleDay).getTime(),
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
    dataLabels: {
      enabled: false, // 데이터 레이블 비활성화
    },
    chart: {
      type: 'candlestick',
      height: 350,
      zoom: {
        enabled: true, // 줌 기능 활성화
        autoScaleYaxis: true, // 줌에 따라 Y축 자동 조정
      },
    },
    xaxis: {
      // type: 'datetime',
      type: 'category',
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
      title: {
        text: '주가 (KRW)',
      },
    },
    plotOptions: {
      candlestick: {
        colors: {
          upward: '#FF0000', // 양봉 색상 (빨간색)
          downward: '#0000FF', // 음봉 색상 (파란색)
        },
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

export default StockDailyChart;
