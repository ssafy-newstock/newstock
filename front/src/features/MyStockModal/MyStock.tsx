import { useMyStockHoldingData } from '@hooks/useStockHoldings'; // 커스텀 훅 경로
import { TextP_16_NOTGRAY } from '@features/MyStock/myStockStyledComponent';
import blueLogo from '@assets/Stock/blueLogo.png';
import {
  RightContentDiv,
  StockHoldingCardLeftDiv,
  StockHoldingCardLeftRightDiv,
} from '@features/MyStock/myStockRightStyledComponent';
import styled, { useTheme } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import useAllStockStore from '@store/useAllStockStore'; // Zustand 스토어에서 allStock 데이터 참조
import useTop10StockStore from '@store/useTop10StockStore'; // Zustand 스토어에서 top10Stock 데이터 참조

// 텍스트 색상을 변경하기 위한 스타일드 컴포넌트 생성
const ColoredText = styled(TextP_16_NOTGRAY)<{ $color: string }>`
  color: ${({ $color }) => $color};
`;

const StockImage = styled.img`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
`;

const StockHoldingCardDiv = styled.div`
  display: flex;
  padding: 10px;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  border-radius: 30px;
  background-color: ${({ theme }) => theme.newsBackgroundColor};
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.1);
  margin: 0rem 0.5rem;
`;

const StockHoldingCardRightDiv = styled.div`
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
`;

const MyStock: React.FC = () => {
  // 커스텀 훅으로 보유 주식 데이터를 가져옴
  const { data: stocks, isLoading, error } = useMyStockHoldingData();
  const theme = useTheme();
  const navigate = useNavigate();

  // Zustand 스토어에서 allStock과 top10Stock 가져오기
  const allStock = useAllStockStore((state) => state.allStock);
  const top10Stock = useTop10StockStore((state) => state.top10Stock);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error || !stocks) {
    return <p>Error loading data.</p>;
  }

  return (
    <>
      <RightContentDiv>
        {stocks.map((stock) => {
          // allStock 또는 top10Stock에서 해당 stockCode로 주식 찾기
          const matchedStock =
            allStock.find((s) => s.stockCode === stock.stockCode) ||
            top10Stock.find((s) => s.stockCode === stock.stockCode);

          const color =
            stock.stockHoldingChangeRate > 0
              ? theme.stockRed || 'red'
              : theme.stockBlue || 'blue';

          const handleNavigate = () => {
            navigate(`/stock-detail/${stock.stockCode}/day-chart`, {
              state: { stock },
            });
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
                  <TextP_16_NOTGRAY>
                    {stock.stockName}/
                    {stock.stockHoldingBuyAmount.toLocaleString()}주
                  </TextP_16_NOTGRAY>
                </StockHoldingCardLeftRightDiv>
              </StockHoldingCardLeftDiv>
              <StockHoldingCardRightDiv>
                {matchedStock && (
                  <>
                    <TextP_16_NOTGRAY>
                      {matchedStock.stckPrpr?.toLocaleString()}원
                    </TextP_16_NOTGRAY>
                    <ColoredText $color={color}>
                      {(
                        (stock.stockHoldingBuyPrice +
                          stock.stockHoldingChange) *
                        stock.stockHoldingBuyAmount
                      ).toLocaleString()}
                      원 (
                      {stock.stockHoldingChangeRate > 0
                        ? `+${stock.stockHoldingChangeRate.toFixed(2)}`
                        : `${stock.stockHoldingChangeRate.toFixed(2)}`}
                      %)
                    </ColoredText>
                  </>
                )}
              </StockHoldingCardRightDiv>
            </StockHoldingCardDiv>
          );
        })}
      </RightContentDiv>
    </>
  );
};

export default MyStock;
