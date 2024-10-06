import { useState, useEffect } from 'react';
import {
  ContentWrapper,
  ImageSlider,
  Indicator,
  IndicatorWrapper,
  SectionContainerWhite,
  SectionTitle,
  SlideImage,
  SubTitle,
  Text,
  TextWrapper,
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
    title: '뉴스 조회',
    text: 'Newstock은 최신 경제 뉴스를 실시간으로 제공하며, 시황 뉴스와 종목별 뉴스를 세분화하여 제공함으로써 투자자들이 보다 전략적으로 뉴스를 활용할 수 있도록 돕습니다.',
  },
  {
    image:
      'https://via.placeholder.com/960x540/808080/FFFFFF?text=960x540 Image+2',
    title: '감정 분석',
    text: '뉴스 감정 분석을 통해 해당 뉴스가 긍정적인지 부정적인지를 빠르게 파악할 수 있습니다. 이 기능을 통해 주식 시장의 흐름을 예측하고, 특정 종목에 대한 투자 결정을 더 쉽게 내릴 수 있습니다.',
  },
  {
    image:
      'https://via.placeholder.com/960x540/808080/FFFFFF?text=960x540 Image+3',
    title: '관심 뉴스',
    text: '사용자가 관심 종목으로 등록한 기업이나 분야에 대한 최신 뉴스를 제공하며, 관심 종목에 대해 분석된 감정 데이터를 바탕으로 투자 전략을 세울 수 있도록 도와줍니다.',
  },
];

const SectionFourth: React.FC<SectionProps> = ({ $isVisible, sectionRef }) => {
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
      <SectionTitle>뉴스</SectionTitle>
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

export default SectionFourth;
