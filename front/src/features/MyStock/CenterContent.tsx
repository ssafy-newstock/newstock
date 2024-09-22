// src/features/MyStock/CenterContent.tsx

import React from 'react';
import DonutChart from '@features/MyStock/DonutChart';
import { useStockHoldings } from '../../hooks/useStockHoldings';
import {
  CenterContentBottomiv,
  CenterContentDiv,
  MetricsContainer,
  MetricsRow,
  MetricItem,
} from '@features/MyStock/myStockCenterStyledComponent';
import { TextP_22 } from '@features/MyStock/myStockStyledComponent';

const CenterContent: React.FC = () => {
  const { data } = useStockHoldings();

  // 데이터가 없을 경우 대비 기본값 설정
  const stockData = data || [];

  // 메트릭 계산
  const totalPurchase =
    stockData.reduce(
      (acc, item) =>
        acc + item.stockHoldingBuyAmount * item.stockHoldingBuyPrice,
      0
    ) || 0;

  const totalPnl =
    stockData.reduce((acc, item) => acc + item.stockHoldingChange, 0) || 0;

  const totalValuation =
    stockData.reduce(
      (acc, item) =>
        acc +
        item.stockHoldingBuyAmount * item.stockHoldingBuyPrice +
        item.stockHoldingChange,
      0
    ) || 0;

  const roi = totalPurchase !== 0 ? (totalPnl / totalPurchase) * 100 : 0;

  return (
    <CenterContentDiv>
      {/* 메트릭 섹션 */}
      <MetricsContainer>
        <MetricsRow>
          <MetricItem>
            <TextP_22>총 매수 {totalPurchase.toLocaleString()}원</TextP_22>
          </MetricItem>
          <MetricItem>
            <TextP_22>평가손익 {totalPnl.toLocaleString()}원</TextP_22>
          </MetricItem>
        </MetricsRow>
        <MetricsRow>
          <MetricItem>
            <TextP_22>총 평가 {totalValuation.toLocaleString()}원</TextP_22>
          </MetricItem>
          <MetricItem>
            <TextP_22>수익률 {roi.toFixed(2)}%</TextP_22>
          </MetricItem>
        </MetricsRow>
      </MetricsContainer>

      {/* 차트 섹션 */}
      <CenterContentBottomiv>
        {/* 총 평가를 위한 도넛 차트 */}
        <DonutChart type="valuation" />

        {/* 보유 갯수를 위한 도넛 차트 */}
        <DonutChart type="count" />
      </CenterContentBottomiv>
    </CenterContentDiv>
  );
};

export default CenterContent;
