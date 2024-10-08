// import React, { useState } from 'react';
// import ReactApexChart from 'react-apexcharts';
// import { ApexOptions } from 'apexcharts';

// interface TimelineChartProps {
//   id?: string;
// }

// const TimelineChart: React.FC<TimelineChartProps> = ({ id = 'chart-timeline' }) => {
//   const [chartData] = useState<number[][]>([
//     [1327359600000, 30.95],
//     [1327446000000, 31.34],
//     // ... (여기에 나머지 데이터 포인트들이 들어갑니다)
//     [1361919600000, 39.60],
//   ]);

//   const options: ApexOptions = {
//     chart: {
//       id: 'area-datetime',
//       type: 'area',
//       height: 350,
//       zoom: {
//         autoScaleYaxis: true
//       }
//     },
//     annotations: {
//       yaxis: [{
//         y: 30,
//         borderColor: '#999',
//         label: {
//           show: true,
//           text: 'Support',
//           style: {
//             color: "#fff",
//             background: '#00E396'
//           }
//         }
//       }],
//       xaxis: [{
//         x: new Date('14 Nov 2012').getTime(),
//         borderColor: '#999',
//         yAxisIndex: 0,
//         label: {
//           show: true,
//           text: 'Rally',
//           style: {
//             color: "#fff",
//             background: '#775DD0'
//           }
//         }
//       }]
//     },
//     dataLabels: {
//       enabled: false
//     },
//     markers: {
//       size: 0,
//       style: 'hollow',
//     },
//     xaxis: {
//       type: 'datetime',
//       min: new Date('01 Mar 2012').getTime(),
//       tickAmount: 6,
//     },
//     tooltip: {
//       x: {
//         format: 'dd MMM yyyy'
//       }
//     },
//     fill: {
//       type: 'gradient',
//       gradient: {
//         shadeIntensity: 1,
//         opacityFrom: 0.7,
//         opacityTo: 0.9,
//         stops: [0, 100]
//       }
//     },
//   };

//   const series = [{
//     data: chartData
//   }];

//   const handleZoom = (start: Date, end: Date) => {
//     if (chartRef.current) {
//       chartRef.current.zoomX(start.getTime(), end.getTime());
//     }
//   };

//   const chartRef = React.useRef<any>(null);

//   return (
//     <div>
//       <div id={id}>
//         <ReactApexChart
//           options={options}
//           series={series}
//           type="area"
//           height={350}
//           ref={chartRef}
//         />
//       </div>
//       <div className="toolbar">
//         <button
//           id="one_month"
//           onClick={() => handleZoom(new Date('28 Jan 2013'), new Date('27 Feb 2013'))}
//         >
//           1M
//         </button>
//         <button
//           id="six_months"
//           onClick={() => handleZoom(new Date('27 Sep 2012'), new Date('27 Feb 2013'))}
//         >
//           6M
//         </button>
//         <button
//           id="one_year"
//           onClick={() => handleZoom(new Date('27 Feb 2012'), new Date('27 Feb 2013'))}
//         >
//           1Y
//         </button>
//         <button
//           id="ytd"
//           onClick={() => handleZoom(new Date('01 Jan 2013'), new Date('27 Feb 2013'))}
//         >
//           YTD
//         </button>
//         <button
//           id="all"
//           onClick={() => handleZoom(new Date('23 Jan 2012'), new Date('27 Feb 2013'))}
//         >
//           ALL
//         </button>
//       </div>
//     </div>
//   );
// };

// export default TimelineChart;