import styled from 'styled-components';

export const StockHeader = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;

export const StockHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  `

export const DividedSection = styled.div`
  margin: 1.5rem 0rem;
`;

export const HrTag = styled.hr`
  width: 100%;
`;

export const StockGridColumn = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.25rem;
`;

export const CategoryGridColumn = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.25rem;
`;

export const StockGridRow = styled.div`
  display: grid;
  grid-template-rows: repeat(auto-fill, minmax(50px, 1fr));
  gap: 0.25rem;
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

export const StockImageDetail = styled(StockImage)`
  width: 3rem;
  height: 3rem;
`

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
  grid-template-columns: 4fr 4fr 4fr 4fr 4fr; /* 각 열의 너비를 설정 */
`;

export const Text = styled.div`
  font-size: 1rem;
  color: ${({ theme }) => theme.textColor};
`;

export const TextBold = styled(Text)`
  font-weight: bold;
`;

export const TextBoldLeft = styled(TextBold)`
  text-align: left;
`;

export const TextBoldLarge = styled(TextBold)`
  font-size: 1.5rem;
`;

export const TextLarge = styled(Text)`
  font-size: 1.5rem;
`;

export const TextLeft = styled(Text)`
  text-align: left;
`;

export const TextRight = styled(Text)`
  text-align: right;
`;

export const TextCenter = styled(Text)`
  text-align: center;
`;

export const CategoryCardColumn = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem 1.25rem;
  border-radius: 1.25rem;
  background-color: ${({ theme }) => theme.stockBackgroundColor};
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.1);
  gap: 1rem; /* 이미지와 텍스트 사이의 간격 */
  cursor: pointer;
`;

export const CategoryImgWrapper = styled.div<{$bgColor:string}>`
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1rem;
  background-color: ${({ $bgColor }) => $bgColor};
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
  color: ${({ $isPositive, theme }) =>
    $isPositive ? theme.stockBlue : theme.stockRed};
`;

// 버튼 컨테이너 스타일
export const ButtonWrapper = styled.div`
  display: flex;
  gap: 1rem;
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

export const SearchInputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const SearchInput = styled.input`
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  padding: 0.5rem 1rem 0.5rem 2.5rem;
  width: 100%;
  border-radius: 1rem;
  border: none;
  background-color: ${({ theme }) => theme.stockBackgroundColor};
  color: ${({ theme }) => theme.textColor};
  font-size: 1rem;
`;

export const IconWrapper = styled.div`
  position: absolute;
  left: 1rem;
  top: 1.5rem;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  pointer-events: none;
`;