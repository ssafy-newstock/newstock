import { StockCardRow, StockGridRow } from '@features/Stock/styledComponent';
import styled, {keyframes} from 'styled-components';

const pulseAnimation = keyframes`
  0% {
    background-color: rgba(255, 255, 255, 0.6); // 시작 색상
  }
  50% {
    background-color: rgba(240, 240, 240, 0.8); // 중간 색상
  }
  100% {
    background-color: rgba(255, 255, 255, 0.6); // 종료 색상
  }
`;

export const CenterContentDiv = styled.div`
  display: flex;
  width: 100%;
  padding: 1.25rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.875rem;
  align-self: stretch;
`;

export const CenterContentBottomDiv = styled.div`
  display: flex;
  padding: 25px 0px;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
`;

export const MetricsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 20px; /* 차트와의 간격 조정 */
  width: 100%;
`;

export const MetricItem = styled.div`
  background-color: ${({ theme }) => theme.newsBackgroundColor};
  padding: 15px 20px;
  border-radius: 8px;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.1);
  text-align: center;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const MetricItemSkeleton = styled(MetricItem)`
  animation: ${pulseAnimation} 1.5s infinite;
  min-height: 3rem;
  min-width: 20rem;
`;

export const MyStockCardRow = styled(StockCardRow)`
  grid-template-columns: 1.9fr 1fr 1fr 0.9fr 0.7fr 1fr; /* 각 열의 너비를 설정 */
`;

export const MyStockCartRowSkeleton = styled(MyStockCardRow)`
  animation: ${pulseAnimation} 1.5s infinite;
  min-height: 3rem;
  opacity: 0.4;
`;

export const MyStockGridRow = styled(StockGridRow)`
  width: 100%;
  margin: 1.25rem 0rem;
`;

export const StockGridColumn = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.25rem;
  padding: 1.25rem;
`;

export const StockCardColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  width: 100%;
  gap: 1rem;
  padding: 0.6rem;
  border-radius: 1.25rem;
  background-color: ${({ theme }) => theme.stockBackgroundColor};
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.1);
  cursor: pointer;
`;

export const StockCardTitle = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
`;

export const StockTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  font-weight: bold;

  // 한줄로 넘칠 경우 ...으로 표시
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const StockImage = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
`;

export const StckPrice = styled.div`
  font-size: 1rem;
`;

export const StockPrev = styled.div<{ $isPositive: boolean }>`
  font-size: 0.8rem;
  color: ${({ $isPositive, theme }) =>
    $isPositive ? theme.stockBlue : theme.stockRed};
`;

export const SpanTag = styled.span`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.textColor};
`;

export const CenterHistoryDiv = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  padding: 0.875rem;
  margin: 0.625rem;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  border-radius: 1.25rem;
  background: ${({ theme }) => theme.centerContentSectionBackgroundColor};
`;

export const NoDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3rem;
`;
