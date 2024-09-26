import { Center } from '@components/Center';
import LeftStock from '@components/LeftStock';
import { Right } from '@components/Right';
import CenterTitle from '@features/MyStock/CenterTitle';
import SectionTitle from '@features/MyStock/SectionTitle';
import {
  CenterDiv,
  MyStockHr,
  RightDiv,
} from '@features/MyStock/myStockStyledComponent';
import StockHoldings from '@features/MyStock/StockHoldings';
import TradingHistory from '@features/MyStock/TradingHistory';
import FavoriteStockContent from '@features/MyStock/FavoriteStockContent';
import { useState } from 'react';
import CenterContent from '@features/MyStock/CenterContent';

import { useMyStockData } from '@hooks/useStockHoldings';
import StockHoldingList, {
  StockHoldingsFirstRow,
} from '@features/MyStock/StockHoldingList';
import {
  MyStockGridRow,
  StockGridColumn,
} from '@features/MyStock/myStockCenterStyledComponent';
import TradingHistoryList, {
  TradingHistoryFirstRow,
} from '@features/MyStock/TradingHistoryList';
import FavoriteStockList from '@features/MyStock/FavoriteStockList';
import { RightVacant } from '@components/RightVacant';

interface StockHolding {
  stockId: number;
  stockCode: string;
  stockName: string;
  stockHoldingBuyAmount: number;
  stockHoldingBuyPrice: number;
  stockHoldingChange: number;
  stockHoldingChangeRate: number;
}

interface TransactionDto {
  stockId: number;
  stockCode: string;
  stockName: string;
  stockTransactionAmount: number;
  stockTransactionPrice: number;
  stockTransactionTotalPrice: number;
  stockTransactionType: string;
  stockTransactionDate: string;
}

interface stockFavoriteDto {
  stockFavoriteId: number;
  stockId: number;
  stockCode: string;
  stockName: string;
}

const MyStock: React.FC = () => {
  // 상태 추가: 현재 활성화된 섹션을 추적
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const { data } = useMyStockData();
  const stockData = data?.stockMyPageHoldingDtoList || [];
  const TradingData = data?.stockMyPageTransactionDtoList || [];
  const FavoriteData = data?.stockFavoriteDtoList || [];
  console.log(FavoriteData);
  // 보유 내역 총액 계산 함수
  const calculateTotalAmount = (stock: StockHolding) => {
    const currentPrice = stock.stockHoldingBuyPrice + stock.stockHoldingChange;
    return currentPrice * stock.stockHoldingBuyAmount;
  };

  // 보유 내역을 총액 기준으로 내림차순 정렬 후 상위 5개 추출
  const stockDataTop5 =
    data?.stockMyPageHoldingDtoList
      .slice()
      .sort((a, b) => calculateTotalAmount(b) - calculateTotalAmount(a))
      .slice(0, 5) || [];

  // 거래 내역을 날짜 기준으로 내림차순 정렬 후 상위 5개 추출
  const TradingDataTop5 =
    data?.stockMyPageTransactionDtoList
      .slice()
      .sort(
        (a, b) =>
          new Date(b.stockTransactionDate).getTime() -
          new Date(a.stockTransactionDate).getTime()
      )
      .slice(0, 5) || [];

  // 핸들러 함수: 섹션 타이틀 클릭 시 상태 업데이트
  const handleMoreClick = (section: string) => {
    setActiveSection((prevSection) =>
      prevSection === section ? null : section
    );
  };

  return (
    <>
      <LeftStock />
      <Center>
        <CenterDiv>
          <SectionTitle
            title="관심 종목"
            onMoreClick={() => handleMoreClick('FavoriteStock')}
          />
          <StockGridColumn>
            {FavoriteData?.map((stock: stockFavoriteDto) => (
              <FavoriteStockList key={stock.stockId} stock={stock} />
            ))}
          </StockGridColumn>
          <MyStockHr />
          <CenterTitle />
          <MyStockHr />
          <CenterContent />
          <SectionTitle
            title="주식 보유 내역"
            onMoreClick={() => handleMoreClick('StockHoldings')}
          />
          <MyStockHr />
          <MyStockGridRow>
            <StockHoldingsFirstRow />
            {stockDataTop5.map((stock: StockHolding) => (
              <StockHoldingList key={stock.stockId} stock={stock} />
            ))}
          </MyStockGridRow>
          <SectionTitle
            title="주식 거래 내역"
            onMoreClick={() => handleMoreClick('TradingHistory')}
          />
          <MyStockHr />
          <MyStockGridRow>
            <TradingHistoryFirstRow />
            {TradingDataTop5.map((stock: TransactionDto) => (
              <TradingHistoryList
                key={stock.stockTransactionDate}
                stock={stock}
              />
            ))}
          </MyStockGridRow>
        </CenterDiv>
      </Center>
      {!activeSection ? (
        <RightVacant>
          <RightVacant />
        </RightVacant>
      ) : (
        <Right>
          <RightDiv>
            {activeSection === 'StockHoldings' && (
              <StockHoldings stocks={stockData} />
            )}
            {activeSection === 'TradingHistory' && (
              <TradingHistory histories={TradingData} />
            )}
            {activeSection === 'FavoriteStock' && <FavoriteStockContent />}
          </RightDiv>
        </Right>
      )}
    </>
  );
};

export default MyStock;
