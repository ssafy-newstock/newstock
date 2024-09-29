import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { useLocation } from 'react-router-dom';
import { IDaily, IStock } from '@features/Stock/types';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import LoadingSpinner from '@components/LoadingSpinner';
import { Suspense, useState } from 'react';
import dayjs from 'dayjs';
import { axiosInstance } from '@api/axiosInstance';

// 타임프레임 상수
const TIMEFRAMES = [
  { label: '1개월', value: 31 },
  { label: '3개월', value: 90 },
  { label: '1년', value: 365 },
  { label: '3년', value: 365 * 3 },
];

// 날짜 계산 함수
const calculateDates = (days: number) => {
  const endDate = dayjs().format('YYYY-MM-DD');
  const startDate = dayjs().subtract(days, 'day').format('YYYY-MM-DD');
  return { startDate, endDate };
};

const StockDailyChart = () => {
  const { state } = useLocation() as { state: { stock: IStock } };
  const { stock } = state;
  const queryClient = useQueryClient();

  // 초기 날짜 설정
  const initialParams = calculateDates(30); // 30일로 초기화
  const [params, setParams] = useState(initialParams);

  // 타임프레임 변경 함수
  const handleTimeframeChange = (days: number) => {
    const newParams = calculateDates(days);
    setParams(newParams);

    // 쿼리 무효화하여 새 params로 쿼리 실행
    queryClient.invalidateQueries({
      queryKey: [
        'stockDailyChart',
        stock.stockCode,
        newParams.startDate,
        newParams.endDate,
      ],
    });
  };

  // params를 쿼리 키에 포함하여 관리
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
      return response.data.data;
    },
  });

  // 캔들 차트 시리즈 구성
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

  // 차트 옵션 설정
  const options: ApexOptions = {
    dataLabels: { enabled: false },
    chart: {
      type: 'candlestick',
      height: 350,
      zoom: { enabled: true, autoScaleYaxis: true },
    },
    xaxis: {
      type: 'category',
    },
    yaxis: {
      tooltip: { enabled: true },
      title: { text: '주가 (KRW)' },
    },
    plotOptions: {
      candlestick: {
        colors: { upward: '#FF0000', downward: '#0000FF' },
      },
    },
  };

  return (
    <div id="chart">
      {/* 타임프레임 선택 버튼 */}
      <div style={{ display: 'flex', gap: '1rem' }}>
        {TIMEFRAMES.map((tf) => (
          <div
            key={tf.value}
            onClick={() => handleTimeframeChange(tf.value)}
            style={{ cursor: 'pointer' }}
          >
            {tf.label}
          </div>
        ))}
      </div>

      {/* 차트 렌더링 */}
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

export default StockDailyChart;
