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

  const dummyData: IData[] = [
    { date: '2024-10-01T00:00:00Z', price: 169 },
    { date: '2024-10-02T00:00:00Z', price: 157 },
    { date: '2024-10-03T00:00:00Z', price: 159 },
    { date: '2024-10-04T00:00:00Z', price: 140 },
    { date: '2024-10-05T00:00:00Z', price: 161 },
    { date: '2024-10-06T00:00:00Z', price: 155 },
    { date: '2024-10-07T00:00:00Z', price: 165 },
    { date: '2024-10-08T00:00:00Z', price: 143 },
    { date: '2024-10-09T00:00:00Z', price: 142 },
    { date: '2024-10-10T00:00:00Z', price: 167 },
    { date: '2024-10-11T00:00:00Z', price: 147 },
    { date: '2024-10-12T00:00:00Z', price: 160 },
    { date: '2024-10-13T00:00:00Z', price: 162 },
    { date: '2024-10-14T00:00:00Z', price: 167 },
    { date: '2024-10-15T00:00:00Z', price: 170 },
    { date: '2024-10-16T00:00:00Z', price: 151 },
    { date: '2024-10-17T00:00:00Z', price: 161 },
    { date: '2024-10-18T00:00:00Z', price: 169 },
    { date: '2024-10-19T00:00:00Z', price: 146 },
    { date: '2024-10-20T00:00:00Z', price: 162 },
    { date: '2024-10-21T00:00:00Z', price: 170 },
    { date: '2024-10-22T00:00:00Z', price: 150 },
    { date: '2024-10-23T00:00:00Z', price: 159 },
    { date: '2024-10-24T00:00:00Z', price: 167 },
    { date: '2024-10-25T00:00:00Z', price: 149 },
    { date: '2024-10-26T00:00:00Z', price: 145 },
    { date: '2024-10-27T00:00:00Z', price: 165 },
    { date: '2024-10-28T00:00:00Z', price: 156 },
    { date: '2024-10-29T00:00:00Z', price: 155 },
    { date: '2024-10-30T00:00:00Z', price: 147 },
    { date: '2024-10-31T00:00:00Z', price: 163 },
    { date: '2024-11-01T00:00:00Z', price: 141 },
    { date: '2024-11-02T00:00:00Z', price: 159 },
    { date: '2024-11-03T00:00:00Z', price: 168 },
    { date: '2024-11-04T00:00:00Z', price: 150 },
    { date: '2024-11-05T00:00:00Z', price: 160 },
  ];

  // kospiChart 데이터가 비어 있거나 빈 배열인 경우 더미 데이터를 사용
  const chartData: IData[] = kospiChart.length > 0
    ? kospiChart.map(item => ({
        date: item.time, // kospiChart의 시간
        price: parseFloat(item.bstpNmixPrpr), // 가격을 숫자로 변환
      }))
    : dummyData;

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
