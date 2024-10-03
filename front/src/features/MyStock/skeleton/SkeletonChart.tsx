import React from 'react';
import Chart from 'react-apexcharts';

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
    <div>
      <Chart options={chartOptions} series={series} type="donut" width="380" />
    </div>
  );
};
export default SkeletonChart;
