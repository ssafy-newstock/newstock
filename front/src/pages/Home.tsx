import { Center } from '@components/Center';
import More from '@features/Stock/More';
import RealTimeStock, {
  RealTimeStockFirstRow,
} from '@features/Stock/StockMain/RealTimeStock';
import RealTimeStockSkeleton from '@features/Stock/StockMain/RealTimeStockSkeleton';
import {
  DividedSection,
  HrTag,
  MainGridColumn,
  StockGridRow,
  StockHeader,
  StockHeaderWrapper,
} from '@features/Stock/styledComponent';
import { IStock } from '@features/Stock/types';
import NewsCard from '@features/home/NewsCard';
import StockIndexCard from '@features/home/StockIndexCard';
import { useTop4NewsQuery } from '@hooks/useTop4news';
import useTop10StockStore from '@store/useTop10StockStore';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const { top10Stock } = useTop10StockStore();
  const allStockNavigate = () => {
    navigate('/all-stock');
  };

  const { data, isLoading } = useTop4NewsQuery();

  if (isLoading) {
    return <div>로딩중...</div>;
  }

  return (
    <Center style={{ padding: '1rem' }}>
      <StockHeader>주가지수</StockHeader>
      <HrTag />
      <DividedSection>
        <MainGridColumn>
          <StockIndexCard />
          <StockIndexCard />
          <StockIndexCard />
          <StockIndexCard />
        </MainGridColumn>
      </DividedSection>

      <DividedSection>
        <StockHeaderWrapper>
          <StockHeader>실시간 차트</StockHeader>
          <More handlClick={allStockNavigate} />
        </StockHeaderWrapper>
        <HrTag />
        <StockGridRow>
          <RealTimeStockFirstRow />
          {top10Stock.length > 0 ? (
            top10Stock?.map((stock: IStock, index: number) => (
              <RealTimeStock key={index} stock={stock} />
            ))
          ) : (
            <RealTimeStockSkeleton />
          )}
        </StockGridRow>
      </DividedSection>

      <StockHeader>종목 뉴스</StockHeader>
      <HrTag />
      {data && data.data.map((news) => (
        <NewsCard key={news.id} news={news} />
      ))}
    </Center>
  );
};

export default Home;
