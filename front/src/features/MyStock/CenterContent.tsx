// src/features/MyStock/CenterContent.tsx

import DonutChart from '@features/MyStock/DonutChart';
import { useMyStockData } from '@hooks/useStockHoldings';
import {
  CenterContentDiv,
  MetricsContainer,
  MetricItem,
  CenterContentBottomDiv,
  NoDiv,
} from '@features/MyStock/myStockCenterStyledComponent';
import {
  TextP_20_NOTGRAY,
  TextP_22,
} from '@features/MyStock/myStockStyledComponent';
import styled from 'styled-components';

const CenterContent: React.FC = () => {
  const { data } = useMyStockData();

  // 데이터가 없을 경우 대비 기본값 설정
  const stockData = data?.stockMyPageHoldingDtoList || [];

  // 메트릭 계산
  const totalPurchase =
    stockData.reduce(
      (acc, item) =>
        acc + item.stockHoldingBuyAmount * item.stockHoldingBuyPrice,
      0
    ) || 0;

  const totalPnl =
    stockData.reduce(
      (acc, item) => acc + item.stockHoldingChange * item.stockHoldingBuyAmount,
      0
    ) || 0;

  const totalValuation = totalPurchase + totalPnl;

  const roi = totalPurchase !== 0 ? (totalPnl / totalPurchase) * 100 : 0;

  // 수익률 상태 판단
  const profitStatus: 'positive' | 'negative' | 'zero' =
    roi > 0 ? 'positive' : roi < 0 ? 'negative' : 'zero';

  return (
    <CenterContentDiv>
      {stockData.length > 0 ? (
        <CenterContentBottomDiv>
          <MetricsContainer>
            <MetricItem>
              <TextP_22>총 매수 {totalPurchase.toLocaleString()}원</TextP_22>
            </MetricItem>
            <MetricItem>
              {/* 평가손익에 색상 적용 */}
              <ColoredText $profitStatus={profitStatus}>
                평가손익 {totalPnl.toLocaleString()}원
              </ColoredText>
            </MetricItem>
            <MetricItem>
              <TextP_22>총 평가 {totalValuation.toLocaleString()}원</TextP_22>
            </MetricItem>
            <MetricItem>
              {/* 수익률에 색상 적용 */}
              <ColoredText $profitStatus={profitStatus}>
                수익률 {roi.toFixed(2)}%
              </ColoredText>
            </MetricItem>
          </MetricsContainer>
          {/* 총 평가를 위한 도넛 차트 */}
          <DonutChart type="valuation" />

          {/* 보유 갯수를 위한 도넛 차트 */}
          <DonutChart type="count" />
        </CenterContentBottomDiv>
      ) : (
        <NoDiv>
          <TextP_20_NOTGRAY>보유하고 있는 주식이 없습니다.</TextP_20_NOTGRAY>
        </NoDiv>
      )}
    </CenterContentDiv>
  );
};

export default CenterContent;

// 스타일드 컴포넌트 추가
const ColoredText = styled(TextP_22)<{
  $profitStatus: 'positive' | 'negative' | 'zero';
}>`
  color: ${({ theme, $profitStatus }) =>
    $profitStatus === 'positive'
      ? theme.stockRed || 'red'
      : $profitStatus === 'negative'
        ? theme.stockBlue || 'blue'
        : theme.textColor || 'black'};
`;
