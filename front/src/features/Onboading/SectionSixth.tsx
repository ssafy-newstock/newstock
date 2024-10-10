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
import videoAIChatBot from '@assets/OnBoarding/videoAIChatBot.gif';
import videoScrap from '@assets/OnBoarding/videoScrap.gif';
import videoEasy from '@assets/OnBoarding/videoEasy.gif';

interface SectionProps {
  $isVisible: boolean;
  sectionRef: React.RefObject<HTMLDivElement>;
}

// 이미지와 관련된 텍스트 데이터를 배열로 관리
const slides = [
  {
    image: videoAIChatBot,
    title: 'AI 챗봇',
    text: 'Newstock의 AI 챗봇은 학습된 데이터를 활용해 사용자의 경제 및 금융 질문에 신속하게 답변하며, 관련 뉴스와 시장 동향을 실시간으로 제공합니다. 투자자가 필요한 정보를 빠르게 얻을 수 있도록 지원합니다.',
  },
  {
    image: videoScrap,
    title: '스크랩',
    text: '뉴스 스크랩 기능을 통해 사용자는 관심 있는 경제 및 금융 뉴스를 손쉽게 저장하고 관리할 수 있습니다. 스크랩한 뉴스는 언제든지 다시 확인할 수 있어 중요한 정보를 놓치지 않고 활용할 수 있습니다.',
  },
  {
    image: videoEasy,
    title: '편리한 기능',
    text: '그 외 사용자 친화적인 기능을 통해 사용자는 자신의 정보와 다양한 경제 뉴스를 손쉽게 관리하고 편리하게 제공받을 수 있으며, 개인 맞춤형 설정을 통해 필요한 정보만 빠르게 확인할 수 있습니다.',
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
