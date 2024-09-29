import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { useLocation } from 'react-router-dom';
import { ILive, IStock } from '@features/Stock/types';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import LoadingSpinner from '@components/LoadingSpinner';
import { Suspense } from 'react';

const StockLiveUpdates: React.FC = () => {
  const { state } = useLocation() as { state: { stock: IStock } };
  const { stock } = state;

  const { data: StockLiveChart } = useQuery<ILive[]>({
    queryKey: [`StockLiveChart-${stock.stockCode}`],
    queryFn: async () => {
      const response = await axios.get(
        `https://newstock.info/api/stock/${stock.stockCode}/daily`
      );
      return response.data.data;
    },
    staleTime: 1000 * 60 * 5, // 5분 이내에는 캐시된 데이터 사용
  });

  const series = [
    {
      name: '',
      data: StockLiveChart
        ? StockLiveChart.map((item) => ({
            x: new Date(item.time).getTime(), // x축에 표시할 시간 (timestamp)
            y: item.stckPrpr, // 주가 가격
          }))
        : [],
    },
  ];

  // 9:00부터 15:30까지의 타임스탬프 계산
  const startTime = new Date();
  startTime.setHours(9, 0, 0, 0); // 9시 00분 00초
  const endTime = new Date();
  endTime.setHours(15, 30, 0, 0); // 15시 30분 00초

  // ApexCharts 옵션 설정
  const options: ApexOptions = {
    chart: {
      type: 'line', // 차트 종류 (선형 차트)
      zoom: {
        enabled: true,
      },
    },
    colors: ['#FF0000'],
    xaxis: {
      type: 'datetime', // 시간 데이터를 datetime으로 설정
      min: startTime.getTime(), // x축의 최소값 (9시)
      max: endTime.getTime(), // x축의 최대값 (15시 30분)
      labels: {
        // 라벨 포맷팅 (시:분 형식)
        formatter: (value) => {
          const date = new Date(value);
          return `${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`;
        },
      },
    },
    yaxis: {
      title: {
        text: '주가 (KRW)',
      },
    },
    tooltip: {
      y: {
        formatter: (value) => {
          return `${value} KRW`;
        },
      },
      marker: {
        show: false,
      },
    },
  };

  return (
    <div id="chart">
      <Suspense fallback={<LoadingSpinner />}>
        <Chart options={options} series={series} type="line" height={350} />
      </Suspense>
    </div>
  );
};

export default StockLiveUpdates;
