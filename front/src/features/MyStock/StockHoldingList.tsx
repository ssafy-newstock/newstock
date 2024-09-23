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

const StockHoldingList = ({ stock }: { stock: StockHolding }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/stock-detail/${stock.stockCode}`, { state: { stock } });
  };

  const StockCurrentPrice =
    stock.stockHoldingChange + stock.stockHoldingBuyPrice;
  const TotalPrice = StockCurrentPrice * stock.stockHoldingBuyAmount;
  return (
    <MyStockCardRow onClick={handleNavigate}>
      <StockTitle>
        <StockImage
          src={`https://thumb.tossinvest.com/image/resized/96x0/https%3A%2F%2Fstatic.toss.im%2Fpng-icons%2Fsecurities%2Ficn-sec-fill-${stock.stockCode}.png`}
          alt={blueLogo}
        />
        {stock.stockName}
      </StockTitle>
      <StckPrice>
        {stock.stockHoldingBuyAmount.toLocaleString()}주(호)
      </StckPrice>
      <Text>{stock.stockHoldingBuyPrice.toLocaleString()}원</Text>
      <Text>{StockCurrentPrice.toLocaleString()}원</Text>
      <Text>{stock.stockHoldingChangeRate.toFixed(2)}%</Text>
      <Text>{TotalPrice.toLocaleString()}원</Text>
    </MyStockCardRow>
  );
};
export default StockHoldingList;
