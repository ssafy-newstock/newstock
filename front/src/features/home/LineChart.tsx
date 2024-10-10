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
import { IKospiChart } from '@hooks/useKospiQuery';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface IData {
  date: string;
  price: number;
}

const LINE_COLORS = {
  stock: '#FF0000',
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
});

const filterEvenIndices = (data: IData[]) => {
  return data.filter((_, index) => index % 2 === 0);
};

const LineChart = ({ kospiChart }: { kospiChart: IKospiChart[] }) => {
  const options = {
    responsive: true,
    animation: {
      duration: 0,
    },
    elements: {
      line: {
        tension: 0.4, // 이 설정은 선을 부드럽게 만듭니다
      },
      point: {
        radius: 0, // 점을 제거합니다
        hoverRadius: 0, // 마우스 오버 시 점도 제거합니다
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      },
    },
  };



  // kospiChart 데이터가 비어 있거나 빈 배열인 경우 더미 데이터를 사용
  const chartData: IData[] = kospiChart.length > 0
    ? kospiChart.map(item => ({
        date: item.time, // kospiChart의 시간
        price: parseFloat(item.bstpNmixPrpr), // 가격을 숫자로 변환
      }))
    : [];

  // 선택된 데이터에서 짝수 인덱스의 데이터 필터링
  const evenData = filterEvenIndices(chartData);
  const labels = evenData.map((item) => item.date);

  const datasets = [
    createDataset(
      '지수',
      evenData.map((item) => item.price),
      LINE_COLORS.stock
    ),
  ];

  const data = {
    labels,
    datasets,
  };

  return (
    <div style={{ width: '5rem' }}>
      <Line options={options} data={data} />
    </div>
  );
};

export default LineChart;
