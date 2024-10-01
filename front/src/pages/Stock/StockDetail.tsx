import { Center } from '@components/Center';
import LeftStock from '@components/LeftStock';
import {
  DetailPageButton,
  DividedSection,
  HrTag,
  Text,
} from '@features/Stock/styledComponent';
import { IStock } from '@features/Stock/types';
import { Outlet, useLocation } from 'react-router-dom';
import TradeForm from '@features/Stock/StockDetail/TradeForm';
import { RightVacant } from '@components/RightVacant';
import useAllStockStore from '@store/useAllStockStore';
import useTop10StockStore from '@store/useTop10StockStore';
import {
  FlexBetweenEnd,
  FlexBetweenStart,
  FlexGap,
} from '@components/styledComponent';
import ChartLink from '@features/Stock/StockDetail/ChartLink';
import LikeButton from '@features/Stock/StockDetail/LikeButton';
import StockInfo from '@features/Stock/StockDetail/StockInfo';
import StockHolding from '@features/Stock/StockDetail/StockHolding';
import { Suspense } from 'react';
import StockHodingSkeleton from '@features/Stock/StockDetail/StockHodingSkeleton';

const StockDetailPage = () => {
  const location = useLocation();
  const { stock } = location.state as { stock: IStock };
  const { allStock } = useAllStockStore();
  const { top10Stock } = useTop10StockStore();

  // 주식 상세 정보
  const stockDetail =
    allStock?.find((s) => s.stockCode === stock.stockCode) ||
    top10Stock?.find((s) => s.stockCode === stock.stockCode);

  // 유사도 버튼 버튼 표시 여부
  const showButton = location.pathname.includes('day-chart');

  return (
    <>
      <LeftStock />
      <Center style={{ padding: '1rem' }}>
        <FlexBetweenEnd>
          {/* 주식 정보 */}
          {stockDetail && <StockInfo stockDetail={stockDetail} />}
          {/* 좋아요, 유사도 버튼 */}
          <FlexGap $gap="1rem">
            {stock && <LikeButton stockCode={stock.stockCode} />}
            {!showButton && <DetailPageButton>유사도 분석</DetailPageButton>}
          </FlexGap>
        </FlexBetweenEnd>
        <HrTag />
        {/* 차트 링크, 산업군 */}
        <FlexBetweenStart>
          <ChartLink stock={stock} />
          <Text style={{ marginRight: '1rem' }}>{stock.stockIndustry}</Text>
        </FlexBetweenStart>
        {/* 주식 차트 */}
        <DividedSection>
          <Outlet />
        </DividedSection>
        {/* 매도, 매수 폼 */}
        <TradeForm
          price={stockDetail?.stckPrpr ?? stock.stckPrpr}
          stockCode={stock.stockCode}
        />

        <DividedSection>
          <Suspense fallback={<StockHodingSkeleton/>}>
            <StockHolding stockCode={stock.stockCode} />
          </Suspense>
        </DividedSection>
      </Center>
      <RightVacant />
    </>
  );
};

export default StockDetailPage;
