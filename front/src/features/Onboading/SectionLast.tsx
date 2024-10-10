import { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  SectionContainerDefault,
  SectionTitle,
  SmallText,
  Text,
} from '@features/Onboading/OnboadingStyledComponent';
import { AllowIcon } from '@features/Onboading/Icon';
import LastImg from '@assets/OnBoarding/LastImg.jpg';

const SectionLastContainer = styled(SectionContainerDefault)<{
  $isExpanded: boolean;
}>`
  gap: ${({ $isExpanded }) => ($isExpanded ? '1rem' : '10rem')};
`;

// SectionLast 컴포넌트 props 타입 정의
interface SectionProps {
  $isVisible: boolean;
  sectionRef: React.RefObject<HTMLDivElement>;
  onStart: () => void;
}

// 섹션 타이틀
const SectionLastTitle = styled(SectionTitle)`
  animation: bounce 2s infinite;
  margin-bottom: 2rem;
  transition: opacity 0.5s ease;
  @keyframes bounce {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-1rem);
    }
  }
`;

// 섹션 이미지 컨테이너
const ImageContainer = styled.div<{ $isExpanded: boolean }>`
  width: ${({ $isExpanded }) => ($isExpanded ? '1280px' : '426px')};
  height: ${({ $isExpanded }) =>
    $isExpanded ? '720px' : '240px'}; /* 16:9 비율 */
  position: relative;
  transition:
    width 1s ease,
    height 1s ease;
  cursor: ${({ $isExpanded }) => ($isExpanded ? 'default' : 'pointer')};
  border: ${({ $isExpanded }) => ($isExpanded ? 'none' : '1px solid #828282')};
  border-radius: 2rem;

  /* 반응형 디자인 - 이미지 크기 조정 */
  @media (max-width: 1600px) {
    width: ${({ $isExpanded }) => ($isExpanded ? '1280px' : '426px')};
    height: ${({ $isExpanded }) =>
      $isExpanded ? '720px' : '240px'}; /* 16:9 비율 */
  }

  @media (max-width: 1200px) {
    width: ${({ $isExpanded }) => ($isExpanded ? '800px' : '256px')};
    height: ${({ $isExpanded }) =>
      $isExpanded ? '450px' : '144px'}; /* 16:9 비율 */
  }

  @media (max-width: 768px) {
    width: ${({ $isExpanded }) => ($isExpanded ? '400px' : '200px')};
    height: ${({ $isExpanded }) =>
      $isExpanded ? '225px' : '112px'}; /* 16:9 비율 */
  }
`;
// 이미지 스타일
const BackgroundImage = styled.img<{ $tiltX: number; $tiltY: number }>`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 2rem;
  transition: transform 0.1s ease;
  transform: perspective(1000px) rotateX(${({ $tiltY }) => $tiltY}deg)
    rotateY(${({ $tiltX }) => $tiltX}deg);
`;

const ImageDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const ClickDiv = styled.div`
  display: flex;
  height: 4rem;
  align-items: center;
  animation: pulse 2s infinite;

  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }
`;

const SectionLast: React.FC<SectionProps> = ({
  $isVisible,
  sectionRef,
  onStart,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [tiltX, setTiltX] = useState(0); // X축 기울기
  const [tiltY, setTiltY] = useState(0); // Y축 기울기

  // 섹션이 보일 때 상태 초기화
  useEffect(() => {
    if (!$isVisible) {
      setIsExpanded(false); // 이미지 크기 원상 복구
    }
  }, [$isVisible]);

  const handleStartClick = () => {
    onStart();
  };

  const handleImageClick = () => {
    setIsExpanded(true);
  };

  // 마우스 움직임에 따른 기울기 계산
  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = (e.target as HTMLDivElement).getBoundingClientRect();
    const x = e.clientX - rect.left; // 이미지 내부에서의 X 좌표
    const y = e.clientY - rect.top; // 이미지 내부에서의 Y 좌표

    // 기울기 값 계산 (-10 ~ 10 사이로 설정)
    const tiltAmountX = (x / rect.width - 0.5) * 6;
    const tiltAmountY = (y / rect.height - 0.5) * 6;

    setTiltX(tiltAmountX);
    setTiltY(tiltAmountY);
  };

  const handleMouseLeave = () => {
    // 마우스가 이미지 밖으로 나갔을 때 기울기를 초기화
    setTiltX(0);
    setTiltY(0);
  };

  return (
    <SectionLastContainer
      ref={sectionRef}
      $isVisible={$isVisible}
      data-section="sectionLast"
      $isExpanded={isExpanded}
    >
      {!isExpanded && <SectionLastTitle>뉴스톡과 함께하기</SectionLastTitle>}
      <ImageDiv>
        {!isExpanded && (
          <ClickDiv>
            <Text>클릭해 주세요</Text>
            <AllowIcon />
          </ClickDiv>
        )}
        <ImageContainer
          $isExpanded={isExpanded}
          onMouseMove={isExpanded ? handleMouseMove : undefined}
          onMouseLeave={isExpanded ? handleMouseLeave : undefined}
          onClick={!isExpanded ? handleImageClick : handleStartClick}
        >
          <BackgroundImage
            src={LastImg}
            alt="배경 이미지"
            $tiltX={tiltX}
            $tiltY={tiltY}
            style={{ cursor: 'pointer' }}
          />
        </ImageContainer>
      </ImageDiv>
      {isExpanded && <SmallText>이미지를 클릭하여 시작해보세요!</SmallText>}
    </SectionLastContainer>
  );
};

export default SectionLast;
