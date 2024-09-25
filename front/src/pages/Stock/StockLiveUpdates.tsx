import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { useLocation } from 'react-router-dom';
import { IChartData, IStock } from '@features/Stock/types';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import LoadingPage from '@components/LodingPage';

const StockLiveUpdates: React.FC = () => {
  const { state } = useLocation() as { state: { stock: IStock } };
  const { stock } = state;

  const { data: chartData, isLoading: chartLoading } = useQuery<IChartData>({
    queryKey: [`chartData-${stock.stockCode}`],
    queryFn: async () => {
      const response = await axios.get(
        `https://newstock.info/api/stock/${stock.stockCode}`
      );
      return response.data.data;
    },
    staleTime: 1000 * 60 * 5, // 5분 이내에는 캐시된 데이터 사용
  });

  const StockLiveChart = chartData?.stocksPriceLiveDailyChartRedisDtoList;
  console.log('StockLiveChart', StockLiveChart);

  if (chartLoading) {
    return <LoadingPage />;
  }

  const series = [
    {
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
    title: {
      text: '주식 실시간 차트',
      align: 'left',
    },
  };

  return (
    <div id="chart">
      <Chart options={options} series={series} type="line" height={350} />
    </div>
  );
};

export default StockLiveUpdates;

//
// const [series, setSeries] = useState([
//   { data: [] as { x: number; y: number }[] },
// ]);
// const [options] = useState<ApexOptions>({
//   chart: {
//     type: 'line',
//     animations: {
//       enabled: true,
//       easing: 'linear',
//       dynamicAnimation: { speed: 1000 },
//     },
//     toolbar: { show: false },
//     zoom: { enabled: false },
//   },
//   dataLabels: { enabled: false },
//   stroke: { curve: 'smooth', width: 2 },
//   title: { text: '주식 실시간 차트', align: 'left' },
//   xaxis: {
//     type: 'datetime',
//     range: 6.5 * 60 * 60 * 1000, // 6시간 30분
//     labels: {
//       datetimeUTC: false,
//       format: 'HH:mm',
//     },
//   },
//   yaxis: {
//     labels: {
//       formatter: (value) => value.toFixed(2),
//     },
//   },
//   tooltip: {
//     x: { format: 'HH:mm:ss' },
//   },
//   legend: { show: false },
// });

// useEffect(() => {
//   const getCurrentTime = () => {
//     const now = new Date();
//     return new Date(
//       now.getFullYear(),
//       now.getMonth(),
//       now.getDate(),
//       9,
//       0,
//       0,
//       0
//     );
//   };

//   const generateDayData = () => {
//     const startTime = getCurrentTime();
//     const data = [];
//     let lastClose = 10000; // 시작 가격
//     for (let i = 0; i < 390; i++) {
//       // 6.5시간 (9:00 - 15:30)
//       const time = new Date(startTime.getTime() + i * 60000);
//       if (
//         time.getHours() >= 9 &&
//         (time.getHours() < 15 ||
//           (time.getHours() === 15 && time.getMinutes() <= 30))
//       ) {
//         const changePercent = (Math.random() - 0.5) * 0.002; // -0.1% to 0.1%
//         lastClose = lastClose * (1 + changePercent);
//         data.push({
//           x: time.getTime(),
//           y: parseFloat(lastClose.toFixed(2)),
//         });
//       }
//     }
//     return data;
//   };

//   const updateChart = () => {
//     const newData = generateDayData();
//     setSeries([{ data: newData }]);
//   };

//   updateChart();
//   const interval = setInterval(updateChart, 60000); // 1분마다 업데이트

//   return () => clearInterval(interval);
// }, []);

// return (
//   <div id="chart">
//     <Chart options={options} series={series} type="line" height={350} />
//   </div>
// );
// };
