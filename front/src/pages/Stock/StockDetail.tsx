import { Center } from '@components/Center';
import {
  DetailPageButton,
  DividedSection,
  HrTag,
  StockHeader,
  Text,
} from '@features/Stock/styledComponent';
import { IStock } from '@features/Stock/types';
import { Outlet, useLocation } from 'react-router-dom';
import TradeForm from '@features/Stock/StockDetail/TradeForm';
import {
  FlexBetweenEnd,
  FlexBetweenStart,
  FlexGap,
} from '@components/styledComponent';
import ChartLink from '@features/Stock/StockDetail/ChartLink';
import LikeButton from '@features/Stock/StockDetail/LikeButton';
import StockInfo from '@features/Stock/StockDetail/StockInfo';
import StockHolding from '@features/Stock/StockDetail/StockHolding';
import { Suspense, useState } from 'react';
import StockHodingSkeleton from '@features/Stock/StockDetail/StockHoldingSkeleton';
import { ErrorBoundary } from 'react-error-boundary';
import StockHoldingError from '@features/Stock/StockDetail/StockHoldingError';
import SimilaritySearch from '@features/Stock/StockDetail/SimilaritySearch';
import { useFindStockByCode } from '@utils/uesFindStockByCode';
import useAuthStore from '@store/useAuthStore';
import AnalysisModal from '@features/Stock/StockDetail/AnalysisModal';
import { useAnalysisQuery } from '@hooks/useAnalysisQuery';

const StockDetailPage = () => {
  const location = useLocation();
  const { stock } = location.state as { stock: IStock };
  const [isShow, setIsShow] = useState<boolean>(false);
  const { isLogin } = useAuthStore();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  // 주식 상세 정보
  const stockDetail = useFindStockByCode(stock.stockCode);

  const handleClick = () => {
    setIsShow(!isShow);
  };

  const handleAnalysis = () => {
    setIsModalOpen(true);
  };

  const closeAnalysis = () => {
    setIsModalOpen(false);
  };

  const startDate = '2024-08-01';
  const endDate = '2024-09-01';

  const { data:analysisData } = useAnalysisQuery({
    analysisStock: {
      stockCode: stock.stockCode,
      stockName: stock.stockName,
    },
    startDate,
    endDate,
  });

  // const response = axiosInstance.get('/newsai/summary', {
  //   params: {
  //     base_stock_code: stock.stockCode,
  //     stock_name: stock.stockName,
  //     start_date: startDate,
  //     end_date: endDate,
  //   },
  // });

  return (
    <>
      <Center style={{ padding: '1rem' }}>
        <FlexBetweenEnd>
          {/* 주식 정보 */}
          {stockDetail && <StockInfo stockDetail={stockDetail} />}
          {/* 좋아요, 유사도 버튼 */}
          <FlexGap $gap="1rem">
            {isLogin && <LikeButton stockCode={stock.stockCode} />}
            <DetailPageButton onClick={handleAnalysis}>
              차트 분석
            </DetailPageButton>
            <DetailPageButton onClick={handleClick}>
              유사도 분석
            </DetailPageButton>
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

        {/* 유사도 분석 */}
        {isShow && (
          <DividedSection>
            <StockHeader>유사도 분석</StockHeader>
            <HrTag />
            <ErrorBoundary
              fallback={<SimilaritySearch stockCode={stock.stockCode} />}
            >
              <SimilaritySearch stockCode={stock.stockCode} />
            </ErrorBoundary>
            <HrTag />
          </DividedSection>
        )}

        {/* 매도, 매수 폼 */}
        <DividedSection>
          <TradeForm
            price={stockDetail?.stckPrpr ?? stock.stckPrpr}
            stockCode={stock.stockCode}
          />
        </DividedSection>

        {/* 주식 보유 내역 */}
        {isLogin && (
          <DividedSection>
            <StockHeader>나의 {stock?.stockName} 보유 내역</StockHeader>
            <ErrorBoundary FallbackComponent={StockHoldingError}>
              <Suspense fallback={<StockHodingSkeleton />}>
                <StockHolding stockCode={stock.stockCode} />
              </Suspense>
            </ErrorBoundary>
          </DividedSection>
        )}
      </Center>
      {isModalOpen && <AnalysisModal onClose={closeAnalysis} analysisData={analysisData} />}
    </>
  );
};

export default StockDetailPage;
