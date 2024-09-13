import LeftStock from '@components/LeftStock';
import { Outlet } from 'react-router-dom';

const StockDetailPage = () => {
  return (
    <>
      <LeftStock />
      <h1>주식 상세페이지</h1>
      <Outlet />
    </>
  );
};

export default StockDetailPage;
