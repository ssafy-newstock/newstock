import styled from 'styled-components';

export const StockCardColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  width: 100%;
  gap: 1rem;
  padding: 10px;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.stockBackgroundColor};
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
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
  gap: 0.3rem;
  font-size: 1.5rem;
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

export const StockPrev = styled.div<{ isPositive: boolean }>`
  font-size: 0.8rem;
  color: ${({ isPositive, theme }) =>
    isPositive ? theme.stockBlue : theme.stockRed};
`;

export const SpanTag = styled.span`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.textColor};
`;

export const HeartWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StockCardRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1.5fr 1fr 1fr 0.5fr; /* 각 열의 너비를 설정 */
  text-align: center;
  align-items: center;
  width: 100%;
  padding: 10px 20px;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.stockBackgroundColor};
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

export const CategoryCardRow = styled(StockCardRow)`
  grid-template-columns: repeat(5, 1fr); /* 각 열의 너비를 설정 */
`;

export const Text = styled.h1`
  color: ${({ theme }) => theme.textColor};
`;

export const TextLeft = styled(Text)`
  text-align: left;
`;

export const CategoryImgWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CategoryImg = styled.img`
  width: 3rem;
`;

export const CategoryData = styled(StockPrev)`
  font-size: 1rem;
  color: ${({ isPositive, theme }) =>
    isPositive ? theme.stockBlue : theme.stockRed};
`;
