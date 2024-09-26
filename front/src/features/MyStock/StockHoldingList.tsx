// 필요한 임포트 추가
import styled from 'styled-components';
import {
  StckPrice,
  StockImage,
  StockTitle,
  Text,
  TextLeft,
} from '@features/Stock/styledComponent';
import blueLogo from '@assets/Stock/blueLogo.png';
import { useNavigate } from 'react-router-dom';
import { MyStockCardRow } from '@features/MyStock/myStockCenterStyledComponent';

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
      <Text>보유량</Text>
      <Text>구매가</Text>
      <Text>현재가</Text>
      <Text>수익률</Text>
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

  const handleNavigate = () => {
    navigate(`/stock-detail/${stock.stockCode}`, { state: { stock } });
  };

  const StockCurrentPrice =
    stock.stockHoldingBuyPrice + stock.stockHoldingChange;
  const TotalPrice = StockCurrentPrice * stock.stockHoldingBuyAmount;

  // 수익률 상태 판단
  const profitStatus: 'positive' | 'negative' | 'zero' =
    stock.stockHoldingChangeRate > 0
      ? 'positive'
      : stock.stockHoldingChangeRate < 0
        ? 'negative'
        : 'zero';

  return (
    <MyStockCardRow onClick={handleNavigate} style={{ cursor: 'pointer' }}>
      <StockTitle>
        <StockImage
          src={`https://thumb.tossinvest.com/image/resized/96x0/https%3A%2F%2Fstatic.toss.im%2Fpng-icons%2Fsecurities%2Ficn-sec-fill-${stock.stockCode}.png`}
          alt={blueLogo}
        />
        {stock.stockName}
      </StockTitle>
      <StckPrice>
        {stock.stockHoldingBuyAmount.toLocaleString()}주
      </StckPrice>
      <Text>{stock.stockHoldingBuyPrice.toLocaleString()}원</Text>
      {/* 현재가에 색상 적용 */}
      <ColoredText $profitStatus={profitStatus}>
        {StockCurrentPrice.toLocaleString()}원
      </ColoredText>
      {/* 수익률에 색상 적용 */}
      <ColoredText $profitStatus={profitStatus}>
        {stock.stockHoldingChangeRate.toFixed(2)}%
      </ColoredText>
      <Text>{TotalPrice.toLocaleString()}원</Text>
    </MyStockCardRow>
  );
};

export default StockHoldingList;
