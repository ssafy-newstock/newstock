import Chart from "react-apexcharts";
import { ApexOptions } from 'apexcharts';


const StockDailyChart = () => {
  const series = [
    {
      data: [
        // 음봉 (종가가 시가보다 낮음)
        { x: new Date("2024-09-01").getTime(), y: [7000, 7200, 6800, 6900] },
        // 양봉 (종가가 시가보다 높음)
        { x: new Date("2024-09-02").getTime(), y: [7100, 7300, 6900, 7250] },
        // 양봉
        { x: new Date("2024-09-03").getTime(), y: [7200, 7400, 7000, 7350] },
        // 음봉
        { x: new Date("2024-09-04").getTime(), y: [7300, 7500, 7200, 7250] },
        // 양봉
        { x: new Date("2024-09-05").getTime(), y: [7400, 7600, 7300, 7550] },
        // 음봉
        { x: new Date("2024-09-06").getTime(), y: [7500, 7700, 7400, 7450] },
        // 양봉
        { x: new Date("2024-09-07").getTime(), y: [7600, 7800, 7500, 7700] },
        // 음봉
        { x: new Date("2024-09-08").getTime(), y: [7700, 7900, 7600, 7650] },
        // 양봉
        { x: new Date("2024-09-09").getTime(), y: [7800, 8000, 7700, 7950] },
        // 음봉
        { x: new Date("2024-09-10").getTime(), y: [7900, 8100, 7800, 7850] },
        // 양봉
        { x: new Date("2024-09-11").getTime(), y: [8000, 8200, 7900, 8150] },
        // 음봉
        { x: new Date("2024-09-12").getTime(), y: [8100, 8300, 8000, 8050] },
        // 양봉
        { x: new Date("2024-09-13").getTime(), y: [8200, 8400, 8100, 8350] },
        // 음봉
        { x: new Date("2024-09-14").getTime(), y: [8300, 8500, 8200, 8250] },
        // 양봉
        { x: new Date("2024-09-15").getTime(), y: [8400, 8600, 8300, 8550] },
        // 음봉
        { x: new Date("2024-09-16").getTime(), y: [8500, 8700, 8400, 8450] },
      ],
    },
  ];

  const options: ApexOptions = {
    chart: {
      type: "candlestick",
      height: 350,
    },
    title: {
      text: "월별 주식 차트",
      align: "left",
    },
    xaxis: {
      type: "datetime",
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
    },
    plotOptions: {
      candlestick: {
        colors: {
          upward: "#00E396", // 양봉 색상 (파란색)
          downward: "#FF4560", // 음봉 색상 (빨간색)
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
