import {
  MyStockHr,
  TextP_20_NOTGRAY,
  TitleDiv,
  TitleP,
} from '@features/MyStock/myStockStyledComponent';
import blueLogo from '@assets/Stock/blueLogo.png';
import {
  RightContentDiv,
  StockHoldingCardDiv,
  StockHoldingCardLeftDiv,
  StockHoldingCardLeftRightDiv,
  StockHoldingCardRightDiv,
  StockImage,
} from '@features/MyStock/myStockRightStyledComponent';
import styled, { useTheme } from 'styled-components';
// import { Navigate } from 'react-router-dom';

interface StockHolding {
  stockId: number;
  stockCode: string;
  stockName: string;
  stockHoldingBuyAmount: number;
  stockHoldingBuyPrice: number;
  stockHoldingChange: number;
  stockHoldingChangeRate: number;
}

interface StockHoldingsProps {
  stocks: StockHolding[];
}

// 텍스트 색상을 변경하기 위한 스타일드 컴포넌트 생성
const ColoredText = styled(TextP_20_NOTGRAY)<{ $color: string }>`
  color: ${({ $color }) => $color};
`;

const StockHoldings: React.FC<StockHoldingsProps> = ({ stocks }) => {
  const theme = useTheme(); // 테마 사용을 위한 훅

  return (
    <>
      <TitleDiv>
        <TitleP>주식 보유 내역</TitleP>
      </TitleDiv>
      <MyStockHr />
      <RightContentDiv>
        {stocks.map((stock) => {
          // 수익률에 따라 색상 결정
          const color =
            stock.stockHoldingChangeRate > 0
              ? theme.stockRed || 'red'
              : theme.stockBlue || 'blue';
          const handleNavigate = () => {
            // Navigate(`/stock-detail/${stock.stockCode}`, { state: { stock } });
          };
          return (
            <StockHoldingCardDiv key={stock.stockId}>
              <StockHoldingCardLeftDiv
                onClick={handleNavigate}
                style={{ cursor: 'pointer' }}
              >
                <StockImage
                  src={`https://thumb.tossinvest.com/image/resized/96x0/https%3A%2F%2Fstatic.toss.im%2Fpng-icons%2Fsecurities%2Ficn-sec-fill-${stock.stockCode}.png`}
                  alt={blueLogo}
                />
                <StockHoldingCardLeftRightDiv>
                  <TextP_20_NOTGRAY>{stock.stockName}</TextP_20_NOTGRAY>
                  <TextP_20_NOTGRAY>
                    {stock.stockHoldingBuyPrice.toLocaleString()}원 /{' '}
                    {stock.stockHoldingBuyAmount.toLocaleString()}주
                  </TextP_20_NOTGRAY>
                </StockHoldingCardLeftRightDiv>
              </StockHoldingCardLeftDiv>
              <StockHoldingCardRightDiv>
                <ColoredText $color={color}>
                  {(
                    stock.stockHoldingBuyPrice + stock.stockHoldingChange
                  ).toLocaleString()}
                  원
                </ColoredText>
                <ColoredText $color={color}>
                  {(
                    (stock.stockHoldingBuyPrice + stock.stockHoldingChange) *
                    stock.stockHoldingBuyAmount
                  ).toLocaleString()}
                  원 (
                  {stock.stockHoldingChangeRate > 0
                    ? `+${stock.stockHoldingChangeRate.toFixed(2)}`
                    : `${stock.stockHoldingChangeRate.toFixed(2)}`}
                  %)
                </ColoredText>
              </StockHoldingCardRightDiv>
            </StockHoldingCardDiv>
          );
        })}
      </RightContentDiv>
    </>
  );
};

export default StockHoldings;
