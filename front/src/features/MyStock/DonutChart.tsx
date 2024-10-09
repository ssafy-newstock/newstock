// src/features/MyStock/DonutChart.tsx

import styled, { useTheme } from 'styled-components';
import ReactApexChart from 'react-apexcharts';
import { useMyStockData } from '@hooks/useStockHoldings';
import { ApexOptions } from 'apexcharts';
import { groupTopItems } from '@utils/groupTopItems';

const ChartContainer = styled.div`
  position: relative;
  width: 80%;
  max-width: 500px;
  margin: 0 auto;
`;

const TotalAmount = styled.div`
  position: absolute;
  top: 54%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1rem;
  font-weight: 600;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

interface DonutChartProps {
  type: 'valuation' | 'count';
}

const DonutChart: React.FC<DonutChartProps> = ({ type }) => {
  const { data } = useMyStockData();
  const theme = useTheme();

  // 데이터 그룹화 (상위 5개 항목)
  const { labels, series } = groupTopItems(
    data?.stockMyPageHoldingDtoList || [],
    5,
    type
  );

  let titleText = '';
  let totalAmountDisplay = '';

  if (type === 'valuation') {
    titleText = '주식 평가';
    const totalValuation = series.reduce((acc, curr) => acc + curr, 0);
    totalAmountDisplay = `${totalValuation.toLocaleString()}원`;
  } else if (type === 'count') {
    titleText = '보유량';
    const totalCount = series.reduce((acc, curr) => acc + curr, 0);
    totalAmountDisplay = `${totalCount.toLocaleString()}주`;
  }

  const options: ApexOptions = {
    chart: {
      type: 'donut',
      background: theme.backgroundColor,
    },
    labels: labels,
    colors: ['#FF4560', '#008FFB', '#00E396', '#FEB019', '#775DD0', '#888888'],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 300,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
    legend: {
      show: false, // 레전드 제거
    },
    dataLabels: {
      enabled: true, // 데이터 레이블 활성화
      formatter: function (val: number) {
        return `${val.toFixed(1)}%`; // 소수점 첫째 자리까지 퍼센트 표시
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: '60%',
        },
      },
    },
    tooltip: {
      enabled: true,
      y: {
        formatter: function (val: number) {
          return type === 'valuation'
            ? `${val.toLocaleString()}원`
            : `${val.toLocaleString()}주`;
        },
      },
    },
    title: {
      text: titleText,
      align: 'center',
      style: {
        fontSize: '20px',
        color: theme.textColor,
      },
    },
  };

  return (
    <ChartContainer>
      <ReactApexChart
        options={options}
        series={series}
        type="donut"
        height={350}
      />
      <TotalAmount>
        <div>{totalAmountDisplay}</div>
      </TotalAmount>
    </ChartContainer>
  );
};

export default DonutChart;
