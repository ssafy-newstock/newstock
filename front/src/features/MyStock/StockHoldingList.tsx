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

  // 수익률 상태 판단
  const profitStatus: 'positive' | 'negative' | 'zero' =
    matchedStock && matchedStock.prdyVrss > 0
      ? 'positive'
      : matchedStock && matchedStock.prdyVrss < 0
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
          src={`https://thumb.tossinvest.com/image/resized/96x0/https%3A%2F%2Fstatic.toss.im%2Fpng-icons%2Fsecurities%2Ficn-sec-fill-${stock.stockCode}.png`}
          alt={blueLogo}
        />
        {stock.stockName}
      </StockTitle>
      <Text>{stock.stockHoldingBuyPrice.toLocaleString()}원</Text>
      <ColoredText $profitStatus={profitStatus}>
        {StockCurrentPrice.toLocaleString()}원
      </ColoredText>
      <ColoredText $profitStatus={profitStatus}>
        {matchedStock
          ? matchedStock.prdyCtrt.toFixed(2)
          : stock.stockHoldingChangeRate.toFixed(2)}
        %
      </ColoredText>
      <Text>{stock.stockHoldingBuyAmount.toLocaleString()}주</Text>
      <Text>{TotalPrice.toLocaleString()}원</Text>
    </MyStockCardRow>
  );
};

export default StockHoldingList;
