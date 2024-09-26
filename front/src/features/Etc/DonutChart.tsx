import styled from 'styled-components';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

// 그래프의 크기를 부모 컨테이너의 100%로 설정
const ChartContainer = styled.div`
  width: 25rem;
  height: 13rem;
`;

interface DonutChartProps {
  labels: string[];
  series: number[];
  colors: string[];
  totalCounts: number[];
}

const DonutChart: React.FC<DonutChartProps> = ({
  labels,
  series,
  colors,
  totalCounts,
}) => {
  const chartOptions: ApexOptions = {
    chart: {
      type: 'donut',
    },
    labels: labels.map((label, index) => `${label} (${totalCounts[index]} 건)`),
    colors: colors,
    dataLabels: {
      enabled: true,
      formatter: (val: number) => `${val.toFixed(0)}%`,
    },
    legend: {
      position: 'right',
    },
  };

  return (
    <ChartContainer>
      <Chart options={chartOptions} series={series} type="donut" />
    </ChartContainer>
  );
};

export default DonutChart;
