import { Center } from '@components/Center';
import CenterTitle from '@features/MyStock/CenterTitle';
import SectionTitle from '@features/MyStock/SectionTitle';
import { CenterDiv, MyStockHr } from '@features/MyStock/myStockStyledComponent';
import CenterContent from '@features/MyStock/CenterContent';

import { useMyStockData } from '@hooks/useStockHoldings';
import StockHoldingList, {
  StockHoldingsFirstRow,
} from '@features/MyStock/StockHoldingList';
import {
  CenterHistoryDiv,
  MyStockGridRow,
  StockGridColumn,
} from '@features/MyStock/myStockCenterStyledComponent';
import TradingHistoryList, {
  TradingHistoryFirstRow,
} from '@features/MyStock/TradingHistoryList';
import FavoriteStockList from '@features/MyStock/FavoriteStockList';
import Left from '@components/Left';

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
  const { data } = useMyStockData();
  const FavoriteData = data?.stockFavoriteDtoList || [];
  console.log(FavoriteData);
  // 보유 내역 총액 계산 함수
  const calculateTotalAmount = (stock: StockHolding) => {
    const currentPrice = stock.stockHoldingBuyPrice + stock.stockHoldingChange;
    return currentPrice * stock.stockHoldingBuyAmount;
  };

  // 보유 내역을 총액 기준으로 내림차순 정렬 후 상위 5개 추출
  const stockDataTop10 =
    data?.stockMyPageHoldingDtoList
      .slice()
      .sort((a, b) => calculateTotalAmount(b) - calculateTotalAmount(a))
      .slice(0, 10) || [];

  // 거래 내역을 날짜 기준으로 내림차순 정렬 후 상위 5개 추출
  const TradingDataTop10 =
    data?.stockMyPageTransactionDtoList
      .slice()
      .sort(
        (a, b) =>
          new Date(b.stockTransactionDate).getTime() -
          new Date(a.stockTransactionDate).getTime()
      )
      .slice(0, 10) || [];

  const handleMoreClick = () => {};

  return (
    <>
      <Left />
      <Center>
        <CenterDiv>
          <CenterTitle title={'관심 종목'} />
          <MyStockHr />
          <StockGridColumn>
            {FavoriteData?.map((stock: stockFavoriteDto) => (
              <FavoriteStockList key={stock.stockId} stock={stock} />
            ))}
          </StockGridColumn>
          <CenterTitle title={'나의 자산'} />
          <MyStockHr />
          <CenterContent />
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <CenterHistoryDiv>
              <SectionTitle
                title="내 주식 TOP 10"
                onMoreClick={() => handleMoreClick()}
              />
              <MyStockHr />
              <MyStockGridRow>
                <StockHoldingsFirstRow />
                {stockDataTop10.map((stock: StockHolding) => (
                  <StockHoldingList key={stock.stockId} stock={stock} />
                ))}
              </MyStockGridRow>
            </CenterHistoryDiv>
            <CenterHistoryDiv>
              <SectionTitle
                title="최근 거래 내역"
                onMoreClick={() => handleMoreClick()}
              />
              <MyStockHr />
              <MyStockGridRow>
                <TradingHistoryFirstRow />
                {TradingDataTop10.map((stock: TransactionDto) => (
                  <TradingHistoryList
                    key={stock.stockTransactionDate}
                    stock={stock}
                  />
                ))}
              </MyStockGridRow>
            </CenterHistoryDiv>
          </div>
        </CenterDiv>
      </Center>
    </>
  );
};

export default MyStock;
