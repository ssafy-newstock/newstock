import { useLocation } from 'react-router-dom';
import {IStock } from '@features/Stock/types';
import CandleChart from '@features/Stock/StockDetail/CandleChart';

const WeekPage = () => {
  const { state } = useLocation() as { state: { stock: IStock } };
  return <CandleChart stock={state.stock} timeframe={7} />;
};

export default WeekPage;