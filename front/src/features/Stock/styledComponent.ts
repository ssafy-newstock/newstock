import styled from 'styled-components';
import { ICategoryImgWrapper } from '@features/Stock/types';

export const StockHeader = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  margin: 1.25rem;
  padding: 0rem 0.625rem;
`;

export const StockHeaderMore = styled(StockHeader)`
  margin: 1.25rem 1.25rem 0rem;
`;

export const HrTag = styled.hr`
  width: 95%;
`;

export const StockGridColumn = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.25rem;
  margin: 1.25rem;
  padding: 0rem 1.125rem;
`;

export const CategoryGridColumn = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.25rem;
  margin: 1.25rem;
  padding: 0rem 1.125rem;
`;

export const StockGridRow = styled.div`
  display: grid;
  grid-template-rows: repeat(auto-fill, minmax(50px, 1fr));
  gap: 0.25rem;
  margin: 1.25rem;
  padding: 0rem 1.125rem;
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
  gap: 0.3rem;
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
  grid-template-columns: 2fr 1fr 1.5fr 1fr 1fr; /* 각 열의 너비를 설정 */
  text-align: center;
  align-items: center;
  width: 100%;
  padding: 0.5rem 1.25rem;
  border-radius: 1.25rem;
  background-color: ${({ theme }) => theme.stockBackgroundColor};
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.1);
  cursor: pointer;
`;

export const CategoryCardRow = styled(StockCardRow)`
  grid-template-columns: 1fr 4fr 4fr 4fr 4fr 4fr 1fr; /* 각 열의 너비를 설정 */
`;

export const Text = styled.div`
  font-size: 1rem;
  color: ${({ theme }) => theme.textColor};
`;

export const TextLarge = styled(Text)`
  font-size: 1.5rem;
`;

export const TextLeft = styled(Text)`
  text-align: left;
`;

export const CategoryCardColumn = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem 1.25rem;
  border-radius: 1.25rem;
  background-color: ${({ theme }) => theme.stockBackgroundColor};
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.1);
  gap: 1rem; /* 이미지와 텍스트 사이의 간격 */
`;

export const CategoryImgWrapper = styled.div<ICategoryImgWrapper>`
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1rem;
  background-color: ${({ backgroundColor }) => backgroundColor || 'white'};
`;

export const CategoryImgMain = styled.img`
  width: 5.5rem;
`;

export const CategoryImg = styled.img`
  width: 3rem;
`;

export const CategoryInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding-left: 1rem;
`;

export const CategoryData = styled(StockPrev)`
  font-size: 1rem;
  color: ${({ isPositive, theme }) =>
    isPositive ? theme.stockBlue : theme.stockRed};
`;

// 버튼 컨테이너 스타일
export const ButtonWrapper = styled.div`
  display: flex;
  gap: 1rem;
  margin: 1.25rem;
  padding: 0rem 0.625rem;
  position: relative; /* 밑줄이 이 영역 안에서 움직이도록 */
`;

// 버튼 스타일
export const SortButton = styled.button`
  background: none;
  border: none;
  font: inherit;
  cursor: pointer;
  padding: 0;
  margin: 0;
  position: relative;
  color: ${({theme})=>theme.textColor};
`;