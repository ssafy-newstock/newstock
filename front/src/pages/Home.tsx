import { Center } from '@components/Center';
import More from '@features/Stock/More';
import RealTimeStock, {
  RealTimeStockFirstRow,
} from '@features/Stock/StockMain/RealTimeStock';
import RealTimeStockSkeleton from '@features/Stock/StockMain/RealTimeStockSkeleton';
import {
  DividedSection,
  HrTag,
  StockGridRow,
  StockHeader,
  StockHeaderWrapper,
} from '@features/Stock/styledComponent';
import { IStock } from '@features/Stock/types';
import useTop10StockStore from '@store/useTop10StockStore';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const { top10Stock } = useTop10StockStore();
  const allStockNavigate = () => {
    navigate('/all-stock');
  };
  return (
    <Center>
      <StockHeader>주가지수</StockHeader>
      <HrTag />

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
      
    </Center>
  );
};

export default Home;
