import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { ICandleData } from '@features/Stock/types';
import { useTheme } from 'styled-components';

interface ChartPageProps {
  stock: ICandleData[];
}

const CandleChart = ({ stock }: ChartPageProps) => {
  const theme = useTheme();
  const series = stock
    ? [
        {
          data: stock.map((item) => ({
            x: item.date,
            y: [item.open, item.high, item.low, item.close],
          })),
        },
      ]
    : [];

  const options: ApexOptions = {
    dataLabels: { enabled: false },
    chart: {
      type: 'candlestick',
      height: 350,
      // zoom: { enabled: true, autoScaleYaxis: true },

      zoom: { enabled: false }, // 줌 비활성화
      animations: { enabled: false }, // 애니메이션 비활성화
      toolbar: { show: false }, // 차트 툴바(예: 다운로드 버튼) 비활성화
      // pan: { enabled: false }, // 팬 기능 비활성화
    },
    stroke: { width: 1 },
    xaxis: {
      type: 'category',
      labels: { style: { colors: theme.textColor } },
    },
    yaxis: {
      tooltip: { enabled: true },
      title: { text: '주가 (KRW)', style: { color: theme.textColor } },
      labels: { style: { colors: theme.textColor } },
    },
    plotOptions: {
      candlestick: {
        colors: { upward: '#FF0000', downward: '#0000FF' },
      },
    },
  };

  return (
    <div id="chart" style={{ width: '200px'}}>
      <Chart
        options={options}
        series={series}
        type="candlestick"
        height={350}
      />
    </div>
  );
};

// 선차트
//   const theme = useTheme();
//   const series = stock
//     ? [
//         {
//           name: '종가',
//           data: stock.map((item) => ({
//             x: item.date,
//             y: item.close,
//           })),
//         },
//       ]
//     : [];

//   const options: ApexOptions = {
//     dataLabels: { enabled: false },
//     chart: {
//       type: 'line',
//       height: 350,
//       zoom: { enabled: false }, // 줌 비활성화
//       animations: { enabled: false }, // 애니메이션 비활성화
//       toolbar: { show: false }, // 차트 툴바(예: 다운로드 버튼) 비활성화
//       // pan: { enabled: false }, // 팬 기능 비활성화
//     },
//     stroke: { width: 2 },
//     xaxis: {
//       type: 'category',
//       labels: { style: { colors: theme.textColor } },
//     },
//     yaxis: {
//       tooltip: { enabled: true },
//       title: { text: '주가 (KRW)', style: { color: theme.textColor } },
//       labels: { style: { colors: theme.textColor } },
//     },
//   };

//   return (
//     <div id="chart" style={{width:'200px'}}>
//       <Chart options={options} series={series} type="line" height={350} />
//     </div>
//   );
// };

export default CandleChart;
