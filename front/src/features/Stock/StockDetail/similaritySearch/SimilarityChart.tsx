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
  stock: ICandleData[];
}

const LineChart = ({ stock }: ChartPageProps) => {
  const options = {
    responsive: true,
    animation: {
      // Change the type of animation property
      duration: 0, // Set duration to 0 to disable animation
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
        display: true, // y축 숨기기
      },
    },
  };

  const data = {
    labels: stock.map((item) => item.date),
    datasets: [
      {
        label: '종가',
        data: stock.map((item) => item.close),
        borderColor: '#FF0000',
        backgroundColor: '#FF0000',
        // pointRadius: 0,
      },
    ],
  };

  return (
    <div style={{ width: '200px' }}>
      <Line options={options} data={data} />
    </div>
  );
};

export default LineChart;
