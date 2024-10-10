import { useState, useEffect } from 'react';
import {
  ContentWrapper,
  ImageSlider,
  Indicator,
  IndicatorWrapper,
  SectionContainerWhite,
  SlideImage,
  SubTitle,
  Text,
  TextWrapper,
  SectionTitle,
} from '@features/Onboading/OnboadingStyledComponent';

interface SectionProps {
  $isVisible: boolean;
  sectionRef: React.RefObject<HTMLDivElement>;
}

// 이미지와 관련된 텍스트 데이터를 배열로 관리
const slides = [
  {
    image:
      'https://via.placeholder.com/960x540/828282/FFFFFF?text=960x540 Image+1',
    title: 'AI 챗봇',
    text: 'Newstock은 과거 데이터와 현재 데이터를 비교하여 시장 흐름과 패턴을분석하는 기능을 제공합니다. 이 기능을 통해 투자자는 과거와 유사한시장 상황을 식별하고, 이를 기반으로 미래를 예측할 수 있습니다.',
  },
  {
    image:
      'https://via.placeholder.com/960x540/808080/FFFFFF?text=960x540 Image+2',
    title: '스크랩',
    text: '사용자는 종목별 차트 및 데이터를 분석하여 투자할 종목을 선택할 수있습니다. 각 주식의 성장 가능성을 감정 분석과 함께 제공하며,다양한 분석 도구를 통해 더 깊은 인사이트를 얻을 수 있습니다.',
  },
  {
    image:
      'https://via.placeholder.com/960x540/808080/FFFFFF?text=960x540 Image+3',
    title: '편리한 정보 제공',
    text: '우측 사이드바를 통하여 사용자는 편리하게 어느 페이지에서든 자신의 정보 및 랭킹을 확인할 수 있습니다.',
  },
];

const SectionSixth: React.FC<SectionProps> = ({ $isVisible, sectionRef }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // 자동 슬라이드 효과
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000); // 5초마다 이미지 및 텍스트 변경

    return () => clearInterval(interval); // 컴포넌트 언마운트 시 인터벌 제거
  }, []);

  // 인디케이터 클릭 시 해당 슬라이드로 이동
  const handleIndicatorClick = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <SectionContainerWhite ref={sectionRef} $isVisible={$isVisible}>
      <SectionTitle>부가 기능</SectionTitle>
      <ContentWrapper>
        {/* 좌측 이미지 슬라이더 */}
        <ImageSlider>
          {slides.map((slide, index) => (
            <SlideImage
              key={index}
              src={slide.image}
              alt={`Slide ${index + 1}`}
              $isActive={index === currentIndex}
            />
          ))}
          {/* 인디케이터 (점 모양) */}
          <IndicatorWrapper>
            {slides.map((_, index) => (
              <Indicator
                key={index}
                $isActive={index === currentIndex}
                onClick={() => handleIndicatorClick(index)}
              />
            ))}
          </IndicatorWrapper>
        </ImageSlider>

        {/* 우측 텍스트 */}
        <TextWrapper>
          <SubTitle>{slides[currentIndex].title}</SubTitle>
          <Text>{slides[currentIndex].text}</Text>
        </TextWrapper>
      </ContentWrapper>
    </SectionContainerWhite>
  );
};

export default SectionSixth;
