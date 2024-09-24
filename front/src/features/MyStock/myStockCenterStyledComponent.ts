import { StockCardRow, StockGridRow } from '@features/Stock/styledComponent';
import styled from 'styled-components';

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

export const MyStockCardRow = styled(StockCardRow)`
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr; /* 각 열의 너비를 설정 */
`;

export const MyStockGridRow = styled(StockGridRow)`
  width: 100%;
  margin: 1.25rem 0rem;
`;
