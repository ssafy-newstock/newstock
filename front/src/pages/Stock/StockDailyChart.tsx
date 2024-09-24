import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';
import { IStock } from '@features/Stock/types';
import axios from 'axios';

interface IStockDailyChart {
  stockId: number;
  stockCode: string;
  stockCandleId: number;
  stockCandleDay: string;
  stockCandleOpen: number;
  stockCandleClose: number;
  stockCandleHigh: number;
  stockCandleLow: number;
}

// interface IStockDailyChartData {
//   [key: string]: IStockDailyChart;
// }

const StockDailyChart = () => {
  // 구조분해할당 활용
  // const { state } = useLocation() as { state: { stock: IStock } };
  // const { stock } = state;

  const location = useLocation();
  const { stock } = location.state as { stock: IStock };

  const { data: stockDailyChart, isLoading } = useQuery<IStockDailyChart[]>({
    queryKey: [`stockDailyChart-${stock.stockCode}`],
    queryFn: async () => {
      const response = await axios.get(
        `https://newstock.info/api/stock/${stock.stockCode}`
      );
      return response.data.data;
    },
  });

  if (isLoading) {
    return <div>로딩 중...</div>;
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
    title: {
      text: '월별 주식 차트',
      align: 'left',
    },
    xaxis: {
      // type: 'datetime',
      type: 'category',
    },
    yaxis: {
      tooltip: {
        enabled: true,
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
