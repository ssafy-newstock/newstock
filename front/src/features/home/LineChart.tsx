import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import LoadingSpinner from '@components/LoadingSpinner';
import { Suspense } from 'react';
import { useTheme } from 'styled-components';
import { IKospiChart } from '@hooks/useKospiQuery';

const LinChart = ({
  kospiChart,
  $isPositive,
}: {
  kospiChart: IKospiChart[];
  $isPositive: boolean;
}) => {
  const theme = useTheme();
  // 9:00부터 15:30까지의 타임스탬프 계산
  const startTime = new Date();
  startTime.setHours(9, 0, 0, 0); // 9시 00분 00초
  const endTime = new Date();
  endTime.setHours(15, 30, 0, 0); // 15시 30분 00초

  const series = [
    {
      name: '',
      data: kospiChart
        ? kospiChart
            .filter((item) => {
              const time = new Date(item.time).getTime();
              return time >= startTime.getTime() && time <= endTime.getTime(); // 9:00 ~ 15:30 사이의 데이터만 포함
            })
            .map((item) => ({
              x: new Date(item.time).getTime(),
              y: item.bstpNmixPrpr,
            }))
        : [],
    },
  ];

  const isPositive = $isPositive ? '#0000FF' : '#FF0000';

  // ApexCharts 옵션 설정
  const options: ApexOptions = {
    chart: {
      type: 'line', // 차트 종류 (선형 차트)
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    colors: [isPositive],
    stroke: {
      width: 2, // 선 두께 설정
      curve: 'smooth', // 선을 부드럽게
    },
    xaxis: {
      type: 'datetime', // 시간 데이터를 datetime으로 설정
      min: startTime.getTime(), // x축의 최소값 (9시)
      max: endTime.getTime(), // x축의 최대값 (15시 30분)
      labels: {
        show: false,
      },
      axisBorder: {
        show: true, // x축 경계선 제거
      },
      axisTicks: {
        show: false, // x축 눈금 제거
      },
    },
    yaxis: {
      show: false,
      title: {
        style: { color: theme.textColor },
      },
      labels: {
        show: false,
        style: { colors: theme.textColor },
      },
    },
    grid: {
      show: false, // Hide grid lines
    },
    tooltip: {
      enabled: false,
    },
  };

  return (
    <div id="chart">
      <Suspense fallback={<LoadingSpinner />}>
        <Chart
          options={options}
          series={series}
          type="line"
          width={140}
          height={100}
        />
      </Suspense>
    </div>
  );
};

export default LinChart;
