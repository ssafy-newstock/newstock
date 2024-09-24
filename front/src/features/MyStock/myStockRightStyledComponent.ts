import styled from 'styled-components';
import { TextP_20_NOTGRAY } from './myStockStyledComponent';

export const RightContainerDiv = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  align-self: stretch;
`;

export const RightContentDiv = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
`;

export const StockHoldingCardDiv = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  border-radius: 30px;
  background-color: ${({ theme }) => theme.newsBackgroundColor};
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.1);
`;

export const StockImage = styled.img`
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
`;

export const StockHoldingCardRightDiv = styled.div`
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
`;

export const StockHoldingCardLeftDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

export const StockHoldingCardLeftRightDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 1rem;
`;

export const DateTitle = styled(TextP_20_NOTGRAY)`
  margin-top: 20px;
  margin-bottom: 10px;
  font-weight: bold;
`;
