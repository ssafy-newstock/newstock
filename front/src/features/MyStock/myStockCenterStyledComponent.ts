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

export const CenterContentBottomiv = styled.div`
  display: flex;
  padding: 25px 100px;
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

export const MetricsRow = styled.div`
  display: flex;
  gap: 40px;
  justify-content: center;
  width: 100%;

  @media (max-width: 768px) {
    gap: 20px;
  }
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
