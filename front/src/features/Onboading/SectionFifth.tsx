import { useState, useEffect } from 'react';
import {
  ContentWrapper,
  ImageSlider,
  Indicator,
  IndicatorWrapper,
  SectionContainerDefault,
  SlideImage,
  SubTitle,
  Text,
  TextWrapper,
  SectionTitle,
} from '@features/Onboading/OnboadingStyledComponent';
import videoStockFirst from '@assets/OnBoarding/실시간 주식.gif';
import videoStockSecond from '@assets/OnBoarding/주식 매수.gif';
import videoSimilaritySearch from '@assets/OnBoarding/videoSimilaritySearch.gif';

interface SectionProps {
  $isVisible: boolean;
  sectionRef: React.RefObject<HTMLDivElement>;
}

// 이미지와 관련된 텍스트 데이터를 배열로 관리
const slides = [
  {
    image: videoStockFirst,
    title: '주식 조회',
    text: 'Newstock에서는 실시간 주식 데이터를 기반으로 다양한 종목을 조회할수 있습니다. 이를 통해 사용자는 현재 시장 상황을 빠르게 파악하고,필요한 경우 빠르게 종목을 변경하거나 투자 전략을 수정할 수있습니다.',
  },
  {
    image: videoStockSecond,
    title: '모의 투자',
    text: '가상의 포인트를 사용해 실제 시장 데이터를 기반으로 모의 투자를진행할 수 있습니다. 이를 통해 사용자는 리스크 없이 다양한 투자전략을 실험해볼 수 있으며, 실제 시장 상황에 대한 감각을 키울 수있습니다.',
  },
  {
    image: videoSimilaritySearch,
    title: '유사도 분석',
    text: 'Newstock은 과거 데이터와 현재 데이터를 비교하여 시장 흐름과 패턴을분석하는 유사도 분석을 제공합니다. 이 기능을 통해 투자자는 과거와 유사한시장 상황을 식별하고,유사도 분석을 통하여 사용자의 주식 분석에 도움을 줍니다.',
  },
];

const SectionFifth: React.FC<SectionProps> = ({ $isVisible, sectionRef }) => {
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
    <SectionContainerDefault ref={sectionRef} $isVisible={$isVisible}>
      <SectionTitle>주식</SectionTitle>
      <ContentWrapper>
        {/* 좌측 텍스트 */}
        <TextWrapper>
          <SubTitle>{slides[currentIndex].title}</SubTitle>
          <Text>{slides[currentIndex].text}</Text>
        </TextWrapper>
        {/* 우측 이미지 슬라이더 */}
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
      </ContentWrapper>
    </SectionContainerDefault>
  );
};

export default SectionFifth;
