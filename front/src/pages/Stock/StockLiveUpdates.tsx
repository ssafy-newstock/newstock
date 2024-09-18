import { useState, useEffect } from 'react';
import Chart from "react-apexcharts";
import { ApexOptions } from 'apexcharts';

const StockLiveUpdates: React.FC = () => {
  const [series, setSeries] = useState([{ data: [] as { x: number; y: number }[] }]);
  const [options, setOptions] = useState<ApexOptions>({
    chart: {
      type: 'line',
      animations: {
        enabled: true,
        easing: 'linear',
        dynamicAnimation: { speed: 1000 }
      },
      toolbar: { show: false },
      zoom: { enabled: false }
    },
    dataLabels: { enabled: false },
    stroke: { curve: 'smooth', width: 2 },
    title: { text: '주식 실시간 차트', align: 'left' },
    xaxis: {
      type: 'datetime',
      range: 6.5 * 60 * 60 * 1000, // 6시간 30분
      labels: {
        datetimeUTC: false,
        format: 'HH:mm'
      }
    },
    yaxis: {
      labels: {
        formatter: (value) => value.toFixed(2)
      }
    },
    tooltip: {
      x: { format: 'HH:mm:ss' }
    },
    legend: { show: false }
  });

  useEffect(() => {
    const getCurrentTime = () => {
      const now = new Date();
      return new Date(now.getFullYear(), now.getMonth(), now.getDate(), 9, 0, 0, 0);
    };

    const generateDayData = () => {
      const startTime = getCurrentTime();
      const data = [];
      let lastClose = 10000; // 시작 가격
      for (let i = 0; i < 390; i++) { // 6.5시간 (9:00 - 15:30)
        const time = new Date(startTime.getTime() + i * 60000);
        if (time.getHours() >= 9 && (time.getHours() < 15 || (time.getHours() === 15 && time.getMinutes() <= 30))) {
          const changePercent = (Math.random() - 0.5) * 0.002; // -0.1% to 0.1%
          lastClose = lastClose * (1 + changePercent);
          data.push({
            x: time.getTime(),
            y: parseFloat(lastClose.toFixed(2))
          });
        }
      }
      return data;
    };

    const updateChart = () => {
      const newData = generateDayData();
      setSeries([{ data: newData }]);
    };

    updateChart();
    const interval = setInterval(updateChart, 60000); // 1분마다 업데이트

    return () => clearInterval(interval);
  }, []);

  return (
    <div id="chart">
      <Chart options={options} series={series} type="line" height={350} />
    </div>
  );
};

export default StockLiveUpdates;