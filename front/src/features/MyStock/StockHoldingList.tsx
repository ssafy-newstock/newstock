import styled from 'styled-components';
import {
  StockImage,
  StockTitle,
  Text,
  TextLeft,
} from '@features/Stock/styledComponent';
import blueLogo from '@assets/Stock/blueLogo.png';
import { useNavigate } from 'react-router-dom';
import { MyStockCardRow } from '@features/MyStock/myStockCenterStyledComponent';
import { getStockImageUrl } from '@utils/getStockImageUrl';
import useAllStockStore from '@store/useAllStockStore'; // Zustand 스토어에서 allStock 데이터 참조
import useTop10StockStore from '@store/useTop10StockStore'; // Zustand 스토어에서 top10Stock 데이터 참조

// 인터페이스 정의
interface StockHolding {
  stockId: number;
  stockCode: string;
  stockName: string;
  stockHoldingBuyAmount: number;
  stockHoldingBuyPrice: number;
  stockHoldingChange: number;
  stockHoldingChangeRate: number;
}

export const StockHoldingsFirstRow = () => {
  return (
    <MyStockCardRow>
      <TextLeft>종목명</TextLeft>
      <Text>구매가</Text>
      <Text>현재가</Text>
      <Text>수익률</Text>
      <Text>보유량</Text>
      <Text>총액</Text>
    </MyStockCardRow>
  );
};

// 수익률 상태에 따라 텍스트 색상을 변경하는 스타일드 컴포넌트 정의
const ColoredText = styled(Text)<{
  $profitStatus: 'positive' | 'negative' | 'zero';
}>`
  color: ${({ theme, $profitStatus }) =>
    $profitStatus === 'positive'
      ? theme.stockRed || 'red'
      : $profitStatus === 'negative'
        ? theme.stockBlue || 'blue'
        : theme.textColor || 'black'};
`;

const StockHoldingList = ({ stock }: { stock: StockHolding }) => {
  const navigate = useNavigate();

  // Zustand 스토어에서 실시간 주가 데이터 가져오기
  const allStock = useAllStockStore((state) => state.allStock);
  const top10Stock = useTop10StockStore((state) => state.top10Stock);

  // 해당 주식에 대한 실시간 데이터를 찾음
  const matchedStock =
    allStock.find((s) => s.stockCode === stock.stockCode) ||
    top10Stock.find((s) => s.stockCode === stock.stockCode);

  // 실시간 데이터로부터 현재가 계산
  const StockCurrentPrice = matchedStock
    ? matchedStock.stckPrpr
    : stock.stockHoldingBuyPrice + stock.stockHoldingChange;
  const TotalPrice = StockCurrentPrice * stock.stockHoldingBuyAmount;

  // 수익률 계산 (현재가 - 구매가) / 구매가 * 100
  const profitRate =
    matchedStock && stock.stockHoldingBuyPrice
      ? ((matchedStock.stckPrpr - stock.stockHoldingBuyPrice) /
          stock.stockHoldingBuyPrice) *
        100
      : 0;

  // 수익률 상태 판단
  const profitStatus: 'positive' | 'negative' | 'zero' =
    matchedStock && profitRate > 0
      ? 'positive'
      : matchedStock && profitRate < 0
        ? 'negative'
        : 'zero';

  const handleNavigate = () => {
    navigate(`/stock-detail/${stock.stockCode}/day-chart`, {
      state: { stock },
    });
  };

  return (
    <MyStockCardRow onClick={handleNavigate} style={{ cursor: 'pointer' }}>
      <StockTitle>
        <StockImage
          src={getStockImageUrl(stock.stockCode)}
          onError={(e) => (e.currentTarget.src = blueLogo)}
          alt=""
        />
        {/* 종목명 */}
        {stock.stockName}
      </StockTitle>
      {/* 구매가 */}
      <Text>{stock.stockHoldingBuyPrice.toLocaleString()}원</Text>
      {/* 현재가 */}
      <ColoredText $profitStatus={profitStatus}>
        {StockCurrentPrice.toLocaleString()}원
      </ColoredText>
      {/*수익률*/}
      <ColoredText $profitStatus={profitStatus}>
        {profitRate.toFixed(2)}%
      </ColoredText>
      {/* 보유량 */}
      <Text>{stock.stockHoldingBuyAmount.toLocaleString()}주</Text>
      {/* 총액 */}
      <Text>{TotalPrice.toLocaleString()}원</Text>
    </MyStockCardRow>
  );
};

export default StockHoldingList;
