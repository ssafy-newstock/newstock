import styled from 'styled-components';

// 섹션 스타일 정의(배경 기본)
export const SectionContainerDefault = styled.div<{ $isVisible: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
  transition: opacity 0.5s ease;
  gap: 5rem;
`;

// 섹션 스타일 정의(배경 흰색)
export const SectionContainerWhite = styled.div<{ $isVisible: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
  transition: opacity 0.5s ease;
  gap: 5rem;
  background-color: ${({ theme }) => theme.newsBackgroundColor};
`;

// Section 2 ~ 7
// 섹션 타이틀 스타일
export const SectionTitle = styled.p`
  font-size: 3.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.onBoadingTextColor};
`;

// Section 2 ~ 3에서 쓰는 스타일
// 카드 전면 타이틀 스타일
export const CardTitle = styled.p`
  font-size: 2rem;
  font-weight: bold;
  margin-top: 1.5rem; /* iframe과 CardTitle 사이의 여백 */
  color: ${({ theme }) => theme.onBoadingTextColor};
`;

// 카드 내용 스타일
export const CardDescription = styled.p`
  font-size: 1.5rem;
  margin: 0.5rem 0;
  color: ${({ theme }) => theme.onBoadingTextColor};
`;

// 더 알아보기 버튼 스타일
export const MoreButton = styled.button`
  background-color: rgba(128, 128, 128, 0.5); /* 회색 반투명 설정 */
  color: white;
  border: none;
  padding: 0.6rem 1rem;
  border-radius: 2rem;
  cursor: pointer;
  font-size: 1rem;
  position: absolute; /* 버튼을 카드 안에서 절대 위치로 설정 */
  bottom: 1rem;
  right: 1rem;
  display: flex; /* flexbox로 변경하여 아이콘과 텍스트를 나란히 배치 */
  align-items: center; /* 수직 중앙 정렬 */

  &:hover {
    background-color: rgba(128, 128, 128, 0.7); /* hover 시 더 진하게 */
  }

  svg {
    vertical-align: middle;
  }
`;

// Section 4 ~ 6에서 쓰는 스타일
// 슬라이더와 텍스트를 담는 래퍼 컨테이너 스타일
// 슬라이더와 텍스트를 담는 래퍼 컨테이너 스타일
export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  width: 80%;
  gap: 2rem;

  /* 반응형 - 작은 화면에서는 flex-direction을 column으로 변경 */
  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
  }
`;

// 슬라이더 이미지 스타일
interface SlideImageProps {
  $isActive: boolean;
}

export const SlideImage = styled.img<SlideImageProps>`
  flex: 2;
  width: 100%;
  height: auto;
  max-width: 100%;
  object-fit: contain;
  transition: opacity 1s ease-in-out;
  position: absolute;
  opacity: ${({ $isActive }) => ($isActive ? 1 : 0)};
  z-index: ${({ $isActive }) => ($isActive ? 1 : 0)};
  border-radius: 2rem;

  /* 반응형 - 작은 화면에서 이미지 크기 조정 */
  @media (max-width: 1200px) {
    height: auto;
  }

  @media (max-width: 768px) {
    height: 240px;
    position: relative;
  }

  @media (max-width: 480px) {
    height: 180px;
  }
`;

// 슬라이더 컨테이너 스타일
export const ImageSlider = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 1rem;
  width: 50%;
  height: 36rem;
  overflow: hidden;
  position: relative;

  /* 반응형 - 작은 화면에서 슬라이더 높이 조정 */
  @media (max-width: 1200px) {
    height: 30rem;
  }

  @media (max-width: 768px) {
    width: 100%;
    height: 24rem;
  }

  @media (max-width: 480px) {
    height: 20rem;
  }
`;

// 인디케이터 스타일 (점 모양)
export const IndicatorWrapper = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: 0rem; /* 슬라이더 하단에 인디케이터를 배치 */
  width: 100%;
`;

export const Indicator = styled.div<{ $isActive: boolean }>`
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 50%;
  background-color: ${({ $isActive }) => ($isActive ? 'black' : 'lightgray')};
  margin: 0 0.3rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  /* 반응형 - 작은 화면에서 인디케이터 크기 조정 */
  @media (max-width: 768px) {
    width: 0.6rem;
    height: 0.6rem;
  }
`;

// 텍스트 영역 스타일
export const TextWrapper = styled.div`
  flex: 1;
  padding: 1rem;
  width: 50%;
  display: block;

  /* 반응형 - 작은 화면에서 텍스트 영역 너비 조정 */
  @media (max-width: 768px) {
    width: 100%;
  }
`;

// 서브 제목 스타일
export const SubTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.onBoadingTextColor};

  /* 반응형 - 작은 화면에서 제목 크기 조정 */
  @media (max-width: 768px) {
    font-size: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.8rem;
  }
`;

// 텍스트 스타일
export const Text = styled.p`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.onBoadingTextColor};

  /* 반응형 - 작은 화면에서 텍스트 크기 조정 */
  @media (max-width: 768px) {
    font-size: 1.6rem;
  }

  @media (max-width: 480px) {
    font-size: 1.4rem;
  }
`;
