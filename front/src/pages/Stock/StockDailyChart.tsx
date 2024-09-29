import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { useLocation } from 'react-router-dom';
import { IDaily, IStock } from '@features/Stock/types';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import LoadingSpinner from '@components/LoadingSpinner';
import { Suspense, useState } from 'react';
import dayjs from 'dayjs';
import { axiosInstance } from '@api/axiosInstance';

const StockDailyChart = () => {
  const { state } = useLocation() as { state: { stock: IStock } };
  const { stock } = state;
  const queryClient = useQueryClient();

  // 날짜 범위를 상태로 관리
  const [params, setParams] = useState({
    startDate: '2024-08-01',
    endDate: '2024-08-31',
  });

  // 타임프레임 옵션 배열
  const timeframes = [
    // { label: '1주', value: 7 },
    { label: '1개월', value: 30 },
    { label: '3개월', value: 90 },
    { label: '1년', value: 365 },
  ];

  // 타임프레임 변경 함수
  const handleTimeframeChange = (days: number) => {
    const endDate = dayjs().format('YYYY-MM-DD');
    const startDate = dayjs().subtract(days, 'day').format('YYYY-MM-DD');
    setParams({ startDate, endDate });

    // 쿼리 무효화하여 새 params로 쿼리 실행
    queryClient.invalidateQueries([`stockDailyChart-${stock.stockCode}`, params]);
  };

  // params를 쿼리 키에 포함하여 관리
  const { data: stockDailyChart } = useQuery<IDaily[]>({
    queryKey: [`stockDailyChart-${stock.stockCode}`, params], // params 추가
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/stock/${stock.stockCode}/candle`,
        { params }
      );
      return response.data.data;
    },
    staleTime: 1000 * 60 * 5, // 5분 캐시 유지
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
    dataLabels: {
      enabled: false,
    },
    chart: {
      type: 'candlestick',
      height: 350,
      zoom: {
        enabled: true,
        autoScaleYaxis: true,
      },
      // animations: {
      //   enabled: false,
      // },
      events: {
        click: (_event, _chartContext, { dataPointIndex, seriesIndex }) => {
          const clickedDate = series[seriesIndex].data[dataPointIndex].x;

          // 날짜 범위 설정
          const startDate = dayjs(clickedDate).subtract(2, 'week').format('YYYY-MM-DD');
          const endDate = dayjs(clickedDate).add(2, 'week').format('YYYY-MM-DD');

          // 새로운 날짜로 params 업데이트
          setParams({ startDate, endDate });

          // 쿼리 무효화, 새 params로 다시 쿼리 실행
          queryClient.invalidateQueries([`stockDailyChart-${stock.stockCode}`, params]);
        },
      },
    },
    xaxis: {
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
          upward: '#FF0000',
          downward: '#0000FF',
        },
      },
    },
  };

  return (
    <div id="chart">
      {/* 타임프레임 선택 버튼 */}
      <div>
        {timeframes.map((tf) => (
          <button key={tf.value} onClick={() => handleTimeframeChange(tf.value)}>
            {tf.label}
          </button>
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
