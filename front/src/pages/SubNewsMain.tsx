import { Outlet, useLocation } from 'react-router-dom';

const SubNewsMainPage = () => {
    const location = useLocation();

    const isEconomicNews = location.pathname.includes('economicNews');

  return (
    <>
      <div>
        <h1>{isEconomicNews ? '시황 뉴스' : '종목 뉴스'}</h1>
        <Outlet />
      </div>
    </>
  );
};

export default SubNewsMainPage;
