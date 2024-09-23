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
import FavoriteStock from '@features/MyStock/FavoriteStock';
import { useState } from 'react';
import CenterContent from '@features/MyStock/CenterContent';

import { useMyStockData } from '@hooks/useStockHoldings';
import StockHoldingList, {
  StockHoldingsFirstRow,
} from '@features/MyStock/StockHoldingList';
import { MyStockGridRow } from '@features/MyStock/myStockCenterStyledComponent';
import TradingHistoryList, {
  TradingHistoryFirstRow,
} from '@features/MyStock/TradingHistoryList';

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
  stockCode: number;
  stockName: string;
  stockTransactionAmount: number;
  stockTransactionPrice: number;
  stockTransactionTotalPrice: number;
  stockTransactionType: string;
  stockTransactionDate: string;
}

const MyStock: React.FC = () => {
  // 상태 추가: 현재 활성화된 섹션을 추적
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const { data } = useMyStockData();
  const stockData = data?.stockMyPageHoldingDtoList || [];
  const TradingData = data?.stockMyPageTransactionDtoList || [];
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
          <CenterTitle />
          <MyStockHr />
          <CenterContent />
          <SectionTitle
            title={'주식 보유 내역'}
            onMoreClick={() => handleMoreClick('StockHoldings')}
          />
          <MyStockHr />
          <MyStockGridRow>
            <StockHoldingsFirstRow />
            {stockData.map((stock: StockHolding, index: number) => (
              <StockHoldingList key={index} stock={stock} />
            ))}
          </MyStockGridRow>
          <SectionTitle
            title={'주식 거래 내역'}
            onMoreClick={() => handleMoreClick('TradingHistory')}
          />
          <MyStockHr />
          <MyStockGridRow>
            <TradingHistoryFirstRow />
            {TradingData.map((stock: TransactionDto, index: number) => (
              <TradingHistoryList key={index} stock={stock} />
            ))}
          </MyStockGridRow>
          <SectionTitle
            title={'관심 종목'}
            onMoreClick={() => handleMoreClick('FavoriteStock')}
          />
          <MyStockHr />
        </CenterDiv>
      </Center>
      <Right>
        <RightDiv>
          {activeSection === 'StockHoldings' && <StockHoldings />}
          {activeSection === 'TradingHistory' && <TradingHistory />}
          {activeSection === 'FavoriteStock' && <FavoriteStock />}
        </RightDiv>
      </Right>
    </>
  );
};

export default MyStock;
