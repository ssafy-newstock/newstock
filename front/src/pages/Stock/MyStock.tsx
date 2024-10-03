import { Center } from '@components/Center';
import CenterTitle from '@features/MyStock/CenterTitle';
import SectionTitle from '@features/MyStock/SectionTitle';
import {
  CenterDiv,
  MyStockHr,
  TextP_20_NOTGRAY,
} from '@features/MyStock/myStockStyledComponent';
import CenterContent from '@features/MyStock/CenterContent';

import { useMyStockData } from '@hooks/useStockHoldings';
import StockHoldingList, {
  StockHoldingsFirstRow,
} from '@features/MyStock/StockHoldingList';
import {
  CenterHistoryDiv,
  MyStockGridRow,
  NoDiv,
  StockGridColumn,
} from '@features/MyStock/myStockCenterStyledComponent';
import TradingHistoryList, {
  TradingHistoryFirstRow,
} from '@features/MyStock/TradingHistoryList';
import FavoriteStockList from '@features/MyStock/FavoriteStockList';

import { Flex } from '@components/styledComponent';
import { useOutletContext } from 'react-router-dom';
import MyStockSkeleton from '@features/MyStock/skeleton/MyStockSkeleton';

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

interface OutletContext {
  setIsOpen: (isOpen: boolean) => void;
}
const MyStock: React.FC = () => {
  const { data, isLoading } = useMyStockData();
  const { setIsOpen } = useOutletContext<OutletContext>();
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

  const handleMoreClick = () => {
    setIsOpen(true);
  };

  if (isLoading) {
    return <MyStockSkeleton />;
  }

  return (
    <>
      <Center>
        <CenterDiv>
          <CenterTitle title={'관심 종목'} />
          <MyStockHr />
          {FavoriteData.length > 0 ? (
            <StockGridColumn>
              {FavoriteData.map((stock: stockFavoriteDto) => (
                <FavoriteStockList key={stock.stockId} stock={stock} />
              ))}
            </StockGridColumn>
          ) : (
            <NoDiv>
              <TextP_20_NOTGRAY>관심 종목이 없습니다.</TextP_20_NOTGRAY>
            </NoDiv>
          )}
          <CenterTitle title={'나의 자산'} />
          <MyStockHr />
          <CenterContent />
          <Flex>
            <CenterHistoryDiv>
              <SectionTitle
                title="내 주식 TOP 10"
                onMoreClick={() => handleMoreClick()}
              />
              <MyStockHr />
              {stockDataTop10.length > 0 ? (
                <MyStockGridRow>
                  <StockHoldingsFirstRow />
                  {stockDataTop10.map((stock: StockHolding) => (
                    <StockHoldingList key={stock.stockId} stock={stock} />
                  ))}
                </MyStockGridRow>
              ) : (
                <NoDiv>
                  <TextP_20_NOTGRAY>
                    보유하고 있는 주식이 없습니다.
                  </TextP_20_NOTGRAY>
                </NoDiv>
              )}
            </CenterHistoryDiv>
            <CenterHistoryDiv>
              <SectionTitle
                title="최근 거래 내역"
                onMoreClick={() => handleMoreClick()}
              />
              <MyStockHr />
              {TradingDataTop10.length > 0 ? (
                <MyStockGridRow>
                  <TradingHistoryFirstRow />
                  {TradingDataTop10.map((stock: TransactionDto) => (
                    <TradingHistoryList
                      key={stock.stockTransactionDate}
                      stock={stock}
                    />
                  ))}
                </MyStockGridRow>
              ) : (
                <NoDiv>
                  <TextP_20_NOTGRAY>거래 내역이 없습니다.</TextP_20_NOTGRAY>
                </NoDiv>
              )}
            </CenterHistoryDiv>
          </Flex>
        </CenterDiv>
      </Center>
    </>
  );
};

export default MyStock;
