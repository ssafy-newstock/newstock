import { IDaily } from '@features/Stock/types';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface ICandleData {
  date: string;
  close: number;
}

interface ChartPageProps {
  stock?: ICandleData[];
  selectionStock?: IDaily[];
}

const LINE_COLORS = {
  stock: '#FF0000',
  selectionStock: '#0000FF',
};

const createDataset = (
  label: string,
  data: number[] | undefined,
  color: string
) => ({
  label,
  data,
  borderColor: color,
  backgroundColor: color,
  pointRadius: 1,
  hoverRadius: 5, // 호버할 때 점 나타내기
});

const LineChart = ({ stock, selectionStock }: ChartPageProps) => {
  const options = {
    responsive: true,
    animation: {
      duration: 0, // 애니메이션 비활성화
    },
    plugins: {
      legend: {
        display: false,
      },
      zoom: {
        enabled: false,
      },
    },
    scales: {
      x: {
        display: false, // x축 숨기기
      },
      y: {
        display: true, // y축 보이기
      },
    },
  };

  const labels = stock?.map(item => item.date) || selectionStock?.map(item => item.stockCandleDay);
  
  const datasets = [
    createDataset('종가', stock?.map(item => item.close), LINE_COLORS.stock),
    createDataset('종가', selectionStock?.map(item => item.stockCandleClose), LINE_COLORS.selectionStock),
  ];

  const data = {
    labels,
    datasets,
  };

  return (
    <>
      <Line options={options} data={data} />
    </>
  );
};

export default LineChart;
