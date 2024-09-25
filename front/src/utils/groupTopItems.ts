// src/utils/groupTopItems.ts

interface StockHolding {
  stockId: number;
  stockCode: string;
  stockName: string;
  stockHoldingBuyAmount: number;
  stockHoldingBuyPrice: number;
  stockHoldingChange: number;
  stockHoldingChangeRate: number;
}

/**
 * 상위 n개의 항목을 추출하고 나머지를 '기타'로 그룹화하는 함수
 * @param data 주식 보유 내역 데이터
 * @param n 상위 표시할 항목 수
 * @param type 'valuation' 또는 'count'
 * @returns { labels: string[], series: number[] }
 */
export const groupTopItems = (
  data: StockHolding[],
  n: number,
  type: 'valuation' | 'count'
): { labels: string[]; series: number[] } => {
  // 데이터 복사
  const sortedData = [...data];

  // 정렬 기준 설정
  if (type === 'valuation') {
    sortedData.sort(
      (a, b) =>
        b.stockHoldingBuyAmount * b.stockHoldingBuyPrice -
        a.stockHoldingBuyAmount * a.stockHoldingBuyPrice
    );
  } else if (type === 'count') {
    sortedData.sort(
      (a, b) => b.stockHoldingBuyAmount - a.stockHoldingBuyAmount
    );
  }

  // 상위 n개 항목 추출
  const topItems = sortedData.slice(0, n);
  const otherItems = sortedData.slice(n);

  // '기타' 항목 계산
  const otherTotal =
    type === 'valuation'
      ? otherItems.reduce(
          (acc, curr) =>
            acc + curr.stockHoldingBuyAmount * curr.stockHoldingBuyPrice,
          0
        )
      : otherItems.reduce((acc, curr) => acc + curr.stockHoldingBuyAmount, 0);

  // 레이블과 시리즈 데이터 구성
  const labels = topItems.map((item) => item.stockName);
  const series =
    type === 'valuation'
      ? topItems.map(
          (item) => item.stockHoldingBuyAmount * item.stockHoldingBuyPrice
        )
      : topItems.map((item) => item.stockHoldingBuyAmount);

  // '기타' 추가
  if (otherItems.length > 0) {
    labels.push('기타');
    series.push(otherTotal);
  }

  return { labels, series };
};
