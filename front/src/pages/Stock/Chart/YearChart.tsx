import { useLocation } from 'react-router-dom';
import {IStock } from '@features/Stock/types';
import CandleChart from '@features/Stock/StockDetail/CandleChart';

const YearChart = () => {
  const { state } = useLocation() as { state: { stock: IStock } };
  return <CandleChart stock={state.stock} timeframe={365} />;
};

export default YearChart;