import { useState } from 'react';
import styled from 'styled-components';

// FlipCard를 감싸는 Wrapper, 카드 간의 간격을 3rem로 설정
const FlipCardWrapper = styled.div`
  display: flex;
  gap: 3rem;
`;

// 개별 FlipCard의 3D 회전을 위한 perspective 설정
const FlipCard = styled.div`
  perspective: 60rem; // 3D 효과를 내기 위한 원근법 적용
`;

// 카드가 뒤집힐 때 적용되는 스타일
const FlipCardInner = styled.div<{ $isFlipped: boolean }>`
  position: relative;
  width: 25rem;
  height: 36rem;
  transition: transform 0.6s ease-in-out; // 카드가 회전할 때 애니메이션 적용
  transform-style: preserve-3d; // 3D 회전을 유지하도록 설정
  will-change: transform; // 성능 최적화를 위한 will-change 속성
  transform: ${({ $isFlipped }) =>
    $isFlipped
      ? 'rotateY(180deg)'
      : 'rotateY(0deg)'}; // 카드가 뒤집혔는지 여부에 따라 Y축 회전
`;

// 카드의 앞면과 뒷면에 공통적으로 적용되는 스타일
const FlipCardFace = styled.div`
  position: absolute; // 앞면과 뒷면을 같은 위치에 배치
  width: 100%;
  height: 100%;
  backface-visibility: hidden; // 뒤집힌 면이 보이지 않도록 설정
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 1rem;
  border-radius: 2rem;
  box-shadow: 0rem 0.25rem 0.375rem rgba(0, 0, 0, 0.1); // 가벼운 그림자 효과
`;

// 앞면 카드의 배경색을 동적으로 받는 스타일
const FlipCardFront = styled(FlipCardFace)<{ $bgColor: string }>`
  background-color: ${({ theme }) => theme.cardBackgroundColor};
`;

// 뒷면 카드의 스타일
const FlipCardBack = styled(FlipCardFace)`
  background-color: ${({ theme }) =>
    theme.cardBackBackgroundColor}; // 뒷면 카드의 기본 배경색 설정
  transform: rotateY(
    180deg
  ); // 뒷면을 180도 회전해서 뒤집힌 상태로 보이도록 설정
  width: 100%;
  height: 100%;
`;

interface FlipCardProps {
  cards: { front: React.ReactNode; back: React.ReactNode; bgColor: string }[]; // 카드 정보 (앞면, 뒷면, 배경색) 배열로 전달
}

const FlipCardContainer: React.FC<FlipCardProps> = ({ cards }) => {
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null); // 현재 뒤집힌 카드의 인덱스를 관리하는 상태

  // 마우스를 올렸을 때 카드가 뒤집히도록 설정하는 핸들러
  const handleMouseEnter = (index: number) => {
    setTimeout(() => setFlippedIndex(index), 150); // 150ms 딜레이 후 카드 뒤집기
  };

  // 마우스를 나갔을 때 카드가 다시 원래대로 돌아오도록 설정하는 핸들러
  const handleMouseLeave = () => {
    setFlippedIndex(null); // 마우스가 나가면 다시 원래 상태로 (카드가 뒤집히지 않음)
  };

  return (
    <FlipCardWrapper>
      {cards.map((card, index) => (
        <FlipCard
          key={index}
          onMouseEnter={() => handleMouseEnter(index)} // 마우스가 카드 위로 올라왔을 때 핸들러 실행
          onMouseLeave={handleMouseLeave} // 마우스가 카드 밖으로 나갔을 때 핸들러 실행
        >
          <FlipCardInner $isFlipped={flippedIndex === index}>
            {' '}
            {/* 현재 카드가 뒤집혔는지 여부에 따라 스타일 적용 */}
            <FlipCardFront $bgColor={card.bgColor}>
              {card.front}
            </FlipCardFront>{' '}
            {/* 카드의 앞면 */}
            <FlipCardBack>{card.back}</FlipCardBack> {/* 카드의 뒷면 */}
          </FlipCardInner>
        </FlipCard>
      ))}
    </FlipCardWrapper>
  );
};

export default FlipCardContainer;
