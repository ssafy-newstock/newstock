import React from 'react';
import Chart from 'react-apexcharts';
import styled from 'styled-components';

const ChartContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
`;

const SkeletonChart: React.FC = () => {
  const chartOptions: ApexCharts.ApexOptions = {
    chart: {
      type: 'donut' as 'donut',
    },
    // labels: ['Apples', 'Oranges', 'Bananas', 'Berries'],
    colors: ['gray', 'gray', 'gray', 'gray'],
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
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      pie: {
        donut: {
          size: '60%',
        },
      },
    },
  };

  const series = [44, 55, 41, 17];

  return (
    <ChartContainer>
      <Chart options={chartOptions} series={series} type="donut" height={350} />
    </ChartContainer>
  );
};
export default SkeletonChart;
