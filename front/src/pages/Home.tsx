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
import useKospiQuery from '@hooks/useKospiQuery';
import { useTop4NewsQuery } from '@hooks/useTop4news';
import useTop10StockStore from '@store/useTop10StockStore';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

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

  const { data: kospiData, isLoading: isKospiLoading } = useKospiQuery();
  const { data: newsData, isLoading: isNewsLoading } = useTop4NewsQuery();
  console.log('kospiData', kospiData);

  return (
    <Center style={{ padding: '1rem' }}>
      <StockHeader>주가지수</StockHeader>
      <HrTag />
      <DividedSection>
        <MainGridColumn $gap="5rem">
          {isKospiLoading
            ? Array.from({ length: 4 }).map((_, index) => (
                <Skeleton
                  key={index}
                  style={{
                    width: '100%',
                    height: '7rem',
                    borderRadius: '1.25rem',
                  }}
                />
              ))
            : kospiData &&
              kospiData.data.map((kospiInfo, index) => (
                <StockIndexCard key={index} kospiInfo={kospiInfo} />
              ))}
        </MainGridColumn>
      </DividedSection>

      <StockHeaderWrapper>
        <StockHeader>주요 뉴스</StockHeader>
        <More handlClick={stockNewsNavigate} />
      </StockHeaderWrapper>
      <HrTag />
      <DividedSection>
        <MainGridColumn $gap="1rem">
          {isNewsLoading
            ? Array.from({ length: 4 }).map((_, index) => (
                <Skeleton
                  style={{
                    width: '100%',
                    height: '14rem',
                    borderRadius: '1.25rem',
                  }}
                  key={index}
                />
              ))
            : newsData?.data.map((news) => (
                <NewsCard key={news.id} news={news} />
              ))}
        </MainGridColumn>
      </DividedSection>

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
    </Center>
  );
};

export default Home;
