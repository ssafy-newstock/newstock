import { Center } from '@components/Center';
import More from '@features/Stock/More';
import RealTimeStock, {
  RealTimeStockFirstRow,
} from '@features/Stock/StockMain/RealTimeStock';
import RealTimeStockSkeleton from '@features/Stock/StockMain/RealTimeStockSkeleton';
import {
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
import styled from 'styled-components';

export const DividedSection = styled.div`
  margin: 1rem 0rem;
`;

const Home = () => {
  const navigate = useNavigate();
  const { top10Stock } = useTop10StockStore();
  const allStockNavigate = () => {
    navigate('/all-stock');
  };

  const stockNewsNavigate = () => {
    navigate('/subnews-main/stock-news');
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
        <MainGridColumn $gap="5rem">
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
        <DividedSection>
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
      </DividedSection>

      <StockHeaderWrapper>
        <StockHeader>주요 뉴스</StockHeader>
        <More handlClick={stockNewsNavigate} />
      </StockHeaderWrapper>
      <HrTag />
      <DividedSection>
        <MainGridColumn $gap="1rem">
          {data &&
            data.data.map((news) => <NewsCard key={news.id} news={news} />)}
        </MainGridColumn>
      </DividedSection>
    </Center>
  );
};

export default Home;
