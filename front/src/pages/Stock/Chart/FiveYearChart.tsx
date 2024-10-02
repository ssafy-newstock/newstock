import { useLocation } from 'react-router-dom';
import {IStock } from '@features/Stock/types';
import CandleChart from '@features/Stock/StockDetail/CandleChart';

const FiveYearChart = () => {
  const { state } = useLocation() as { state: { stock: IStock } };
  return <CandleChart stock={state.stock} timeframe={365*5} />;
};

export default FiveYearChart;