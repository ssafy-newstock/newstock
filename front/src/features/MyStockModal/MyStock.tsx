import { useMyStockHoldingData } from '@hooks/useStockHoldings';
import blueLogo from '@assets/Stock/blueLogo.png';
import styled, { useTheme } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import useAllStockStore from '@store/useAllStockStore';
import useTop10StockStore from '@store/useTop10StockStore';
import LoadingSpinner from '@components/LoadingSpinner';
import {
  CardDiv,
  CardLeftDiv,
  CardLeftRightDiv,
  CardRightDiv,
  CenteredMessage,
  RightContentDiv,
  StockImage,
  TextP_14_NOTGRAY,
} from '@features/MyStockModal/styledComponent';
import { getStockImageUrl } from '@utils/getStockImageUrl';

const ColoredText = styled(TextP_14_NOTGRAY)<{ $color: string }>`
  color: ${({ $color }) => $color};
`;

const MyStock: React.FC = () => {
  // 커스텀 훅으로 보유 주식 데이터를 가져옴
  const { data: stocks, isLoading, error } = useMyStockHoldingData();
  const theme = useTheme();
  const navigate = useNavigate();

  // 스토어에서 allStock과 top10Stock 가져오기
  const allStock = useAllStockStore((state) => state.allStock);
  const top10Stock = useTop10StockStore((state) => state.top10Stock);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error || !stocks) {
    return <CenteredMessage>Error loading data.</CenteredMessage>;
  }

  if (stocks.length === 0) {
    return <CenteredMessage>보유한 주식이 없습니다.</CenteredMessage>;
  }

  return (
    <RightContentDiv>
      {stocks.map((stock) => {
        // allStock 또는 top10Stock에서 해당 stockCode로 주식 찾기
        const matchedStock =
          allStock.find((s) => s.stockCode === stock.stockCode) ||
          top10Stock.find((s) => s.stockCode === stock.stockCode);

        const profitOrLoss =
          matchedStock && matchedStock.stckPrpr && stock.stockHoldingBuyPrice
            ? (matchedStock.stckPrpr - stock.stockHoldingBuyPrice) *
              stock.stockHoldingBuyAmount
            : 0;

        // 수익률 계산 (현재가 - 구매가) / 구매가 * 100
        const profitRate =
          matchedStock && stock.stockHoldingBuyPrice
            ? ((matchedStock.stckPrpr - stock.stockHoldingBuyPrice) /
                stock.stockHoldingBuyPrice) *
              100
            : 0;

        // 색상 결정: 수익이 양수일 경우 빨간색, 음수일 경우 파란색
        const color =
          profitOrLoss > 0
            ? theme.stockRed || 'red'
            : profitOrLoss < 0
              ? theme.stockBlue || 'blue'
              : theme.textColor;

        const handleNavigate = () => {
          navigate(`/stock-detail/${stock.stockCode}/day-chart`, {
            state: { stock },
          });
        };

        return (
          <CardDiv
            key={stock.stockId}
            style={{ cursor: 'pointer' }}
            onClick={handleNavigate}
          >
            <CardLeftDiv>
              <StockImage
                src={getStockImageUrl(stock.stockCode)}
                onError={(e) => (e.currentTarget.src = blueLogo)}
                alt=""
              />
              <CardLeftRightDiv>
                <TextP_14_NOTGRAY>{stock.stockName}</TextP_14_NOTGRAY>
                <TextP_14_NOTGRAY>
                  {stock.stockHoldingBuyPrice.toLocaleString()}원 /{' '}
                  {stock.stockHoldingBuyAmount.toLocaleString()}주
                </TextP_14_NOTGRAY>
              </CardLeftRightDiv>
            </CardLeftDiv>
            <CardRightDiv>
              {matchedStock && (
                <>
                  {/* 현재 총 금액 */}
                  <ColoredText $color={color}>
                    {(
                      matchedStock.stckPrpr * stock.stockHoldingBuyAmount
                    ).toLocaleString()}
                    원
                  </ColoredText>
                  {/* 손익과 수익률 */}
                  <ColoredText $color={color}>
                    {profitOrLoss?.toLocaleString()}원 ({profitRate?.toFixed(2)}
                    %)
                  </ColoredText>
                </>
              )}
            </CardRightDiv>
          </CardDiv>
        );
      })}
    </RightContentDiv>
  );
};

export default MyStock;
