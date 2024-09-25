import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { useOutletContext } from 'react-router-dom';
import { OutletContext } from '@features/Stock/types';
import LoadingPage from '@components/LodingPage';

const StockDailyChart = () => {
  // 구조분해할당 활용
  // const { state } = useLocation() as { state: { stock: IStock } };
  // const { stock } = state;

  const { chartData } = useOutletContext<OutletContext>();
  // console.log('chartData', chartData);

  const stockDailyChart = chartData?.stockCandleDtoList;
  if ( !chartData ) {
    return <LoadingPage/>
  }
  // stockDailyChart가 undefined가 아닌 경우에만 데이터 생성
  const series = stockDailyChart
    ? [
        {
          data: stockDailyChart.map((item) => ({
            // x: new Date(item.stockCandleDay).getTime(),
            x: item.stockCandleDay,
            y: [
              item.stockCandleOpen,
              item.stockCandleHigh,
              item.stockCandleLow,
              item.stockCandleClose,
            ],
          })),
        },
      ]
    : [];

  const options: ApexOptions = {
    dataLabels: {
      enabled: false, // 데이터 레이블 비활성화
    },
    chart: {
      type: 'candlestick',
      height: 350,
      zoom: {
        enabled: true, // 줌 기능 활성화
        autoScaleYaxis: true, // 줌에 따라 Y축 자동 조정
      },
    },
    title: {
      text: '월별 주식 차트',
      align: 'left',
    },
    xaxis: {
      // type: 'datetime',
      type: 'category',
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
    },
    plotOptions: {
      candlestick: {
        colors: {
          upward: '#FF0000', // 양봉 색상 (빨간색)
          downward: '#0000FF', // 음봉 색상 (파란색)
        },
      },
    },
  };

  return (
    <div id="chart">
      <Chart
        options={options}
        series={series}
        type="candlestick"
        height={350}
      />
    </div>
  );
};

export default StockDailyChart;
