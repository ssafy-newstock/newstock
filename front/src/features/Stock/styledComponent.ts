import styled, { keyframes } from 'styled-components';

export const StockHeader = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;

export const StockHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

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

export const MainGridColumn = styled.div<{ $gap: string }>`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${({ $gap }) => $gap};
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

export const HoldingStockGridRow = styled(StockGridRow)`
  grid-template-rows: repeat(auto-fill, minmax(2.5rem, 2.5rem));
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

export const MainCardRow = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  gap: 1rem;
  padding: 1rem 0.5rem;
  border-radius: 1.25rem;
  background-color: ${({ theme }) => theme.stockBackgroundColor};
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.1);
  cursor: pointer;
`;

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

export const SkeletonDiv = styled.div<{ $width: string; $height: string }>`
  width: ${({ $width }) => $width};
  height: ${({ $height }) => $height};
  animation: ${pulseAnimation} 3s infinite;
`;

export const StockCardColumnSkeleton = styled(StockCardColumn)`
  animation: ${pulseAnimation} 3s infinite;
  cursor: none;
  height: 7rem;
`;

export const StockCardTitle = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
`;

export const StockTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  font-weight: 500;

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
`;

export const StckPrice = styled.div`
  font-size: 1rem;
  font-weight: 500;
`;

export const StockPrev = styled.div<{ $isPositive: boolean }>`
  font-size: 1rem;
  color: ${({ $isPositive, theme }) =>
    $isPositive ? theme.stockBlue : theme.stockRed};
  font-weight: 500;
`;

export const HoldingStockPrev = styled(StockPrev)`
  font-size: 1rem;
  font-weight: 500;
`;

export const SpanTag = styled.span`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.textColor};
  font-weight: 500;
`;

export const HeartWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export const StockCardRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1.5fr 1fr 1fr;
  text-align: center;
  align-items: center;
  width: 100%;
  padding: 0.5rem 1.25rem;
  border-radius: 1.25rem;
  background-color: ${({ theme }) => theme.stockBackgroundColor};
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.1);
  cursor: pointer;
`;

export const HoldingStockCardRow = styled(StockCardRow)`
  grid-template-columns: 4fr 4fr 4fr 4fr 4fr;
  cursor: default;
`;

export const HoldingStockCardRowNone = styled(StockCardRow)`
  grid-template-columns: 1fr;
  cursor: default;
`;

export const HoldingStockCardRowSkeleton = styled(HoldingStockCardRow)`
  animation: ${pulseAnimation} 3s infinite;
  height: 2.5rem;
`;

export const StockCardRowSkeleton = styled(StockCardRow)`
  animation: ${pulseAnimation} 3s infinite;
  height: 2.5rem;
`;

export const CategoryCardRow = styled(StockCardRow)`
  grid-template-columns: 4fr 4fr 4fr 4fr 4fr; /* 각 열의 너비를 설정 */
`;

export const Text = styled.div`
  font-size: 1rem;
  color: ${({ theme }) => theme.textColor};
  font-weight: 500;
`;

export const TextBold = styled(Text)`
  font-weight: 600;
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

export const TextLeftLine = styled(TextLeft)`
  line-height: 1.2;
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

export const CategoryImgWrapper = styled.div<{ $bgColor: string }>`
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
  /* gap: 1rem; */
`;

// 버튼 스타일
export const SortButton = styled.button<{ $isActive: boolean }>`
  background: none;
  border: none;
  padding: 0rem 0.5rem;
  cursor: pointer;
  color: ${({ theme }) => theme.textColor};
  position: relative;
  font-size: 1rem;

  &::after {
    content: '';
    position: absolute;
    bottom: -0.3rem;
    left: 50%;
    transform: translateX(-50%);
    width: ${({ $isActive }) => ($isActive ? '2.5rem' : '0')};
    height: 0.15rem;
    background-color: ${({ theme }) => theme.textColor};
    transition: width 0.3s ease;
  }
`;

export const CategorySortButton = styled(SortButton)`
  &::after {
    width: ${({ $isActive }) => ($isActive ? '4rem' : '0')};
  }
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
  font-weight: 500;
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

export const DetailPageButton = styled.div`
  background-color: ${({ theme }) => theme.profileBackgroundColor};
  color: ${({ theme }) => theme.profileColor};
  border-radius: 1rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-weight: 500;
`;

export const FormWrapper = styled.div`
  display: flex;
  gap: 2rem;
  max-width: 100%;
`;

export const ColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex: 1;
`;

export const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const InputRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const InputLabel = styled.label`
  min-width: 60px;
  font-size: 1.2rem;
  font-weight: 500;
`;

export const InputTag = styled.input`
  padding: 0.5rem;
  border-radius: 1rem;
  border: none;
  background-color: ${({ theme }) => theme.profileBackgroundColor};
  color: ${({ theme }) => theme.profileColor};
  flex-grow: 1;
  font-size: 1rem;
  font-weight: 500;
`;

export const TradeButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const TradeButton = styled.button<{ $variant: 'buy' | 'sell' }>`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 1rem;
  color: #fff;
  cursor: pointer;
  background-color: ${(props) =>
    props.$variant === 'buy' ? '#4caf50' : '#f44336'};
  &:hover {
    opacity: 0.8;
  }
  font-weight: 500;
`;

export const TradeModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const TradeModalContent = styled.div`
  background-color: ${({ theme }) => theme.stockBackgroundColor};
  padding: 1rem;
  border-radius: 1rem;
  min-width: 15rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
`;

export const TradeCloseButton = styled.button`
  background-color: #f0f0f0;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  cursor: pointer;
  &:hover {
    background-color: #ccc;
  }
`;

export const CategoryModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const CategoryModalContent = styled.div`
  background: ${({ theme }) => theme.stockBackgroundColor};
  padding: 1rem;
  border-radius: 1rem;
  position: relative;
  max-width: 1000px;
  width: 100%;
`;

export const CategoryCloseButton = styled.button`
  color: ${({ theme }) => theme.textColor};
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  :hover {
  }
`;

export const NoneButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

export const SimilarityButton = styled.button`
  background-color: ${({ theme }) => theme.profileBackgroundColor};
  color: ${({ theme }) => theme.profileColor};
  border-radius: 1rem;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
`;

export const AnalysisButton = styled(DetailPageButton)`
  align-self: flex-end;
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

export const ErrorBuuton = styled(SimilarityButton)`
  font-size: 2rem;
  font-weight: 500;
  animation: ${pulse} 1.5s infinite;
  &:hover {
    background-color: white; /* 호버 효과 */
  }
`;
