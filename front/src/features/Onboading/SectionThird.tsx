import styled from 'styled-components';
import {
  CardDescription,
  CardTitle,
  MoreButton,
  SectionContainerDefault,
  SectionTitle,
} from '@features/Onboading/OnboadingStyledComponent';
import { RightIcon } from '@features/Onboading/Icon';
import { useState } from 'react';

// 카드가 들어갈 부분
const CardDiv = styled.div`
  display: flex;
  flex-direction: row;
  gap: 3rem;
`;

// 개별 카드 스타일
const Card = styled.div`
  background-color: ${({ theme }) => theme.newsBackgroundColor};
  width: 25rem;
  height: 36rem;
  border-radius: 2rem;
  box-shadow: 0rem 0.25rem 0.375rem rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 1rem;

  position: relative; /* position을 relative로 설정 */
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.1); /* 마우스를 올렸을 때 살짝 커짐 */
    box-shadow: 0rem 0.25rem 0.375rem rgba(0, 0, 0, 0.1); /* 그림자 효과 */
  }
`;
interface LazyIframe {
  src: any;
  width: any;
  height: any;
}

const LazyIframe: React.FC<LazyIframe> = ({ src, width, height }) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const handleLoad = () => {
    setLoaded(true);
  };

  const handleError = () => {
    setError(true);
  };

  return !error ? (
    <iframe
      src={src}
      width={width}
      height={height}
      onLoad={handleLoad}
      onError={handleError}
      style={{ display: loaded ? 'block' : 'none' }}
    ></iframe>
  ) : null;
};

interface SectionProps {
  $isVisible: boolean;
  sectionRef: React.RefObject<HTMLDivElement>;
  scrollToSectionFourth: () => void;
  scrollToSectionFifth: () => void;
}

const SectionThird: React.FC<SectionProps> = ({
  $isVisible,
  sectionRef,
  scrollToSectionFourth,
  scrollToSectionFifth,
}) => {
  return (
    <SectionContainerDefault
      ref={sectionRef}
      $isVisible={$isVisible}
      data-section="sectionThird"
    >
      <SectionTitle>뉴스톡에선 이런 것을 했어요!</SectionTitle>
      <CardDiv>
        <Card>
          <LazyIframe
            src="https://lottie.host/embed/6c6db83e-5c2c-48cf-958f-7f970a23d28d/HGGH9egLm2.json"
            width="300"
            height="300"
          ></LazyIframe>
          <CardTitle>빅데이터</CardTitle>
          <CardDescription>
            최신 경제 뉴스를 수집하고 분석했어요!
          </CardDescription>
          <MoreButton onClick={scrollToSectionFourth}>
            더 알아보기
            <RightIcon />
          </MoreButton>
        </Card>
        <Card>
          <LazyIframe
            src="https://lottie.host/embed/d0671a61-5cda-4dff-ab50-777d78ef9871/SX57iSefwj.json"
            width="300"
            height="300"
          ></LazyIframe>
          <CardTitle>유사도 분석</CardTitle>
          <CardDescription>
            과거와 현재의 시장 흐름을 비교해 유사한 차트를 찾아드려요!
          </CardDescription>
          <MoreButton onClick={scrollToSectionFifth}>
            더 알아보기
            <RightIcon />
          </MoreButton>
        </Card>
        <Card>
          <LazyIframe
            src="https://lottie.host/embed/1e3f87aa-3b6c-432b-9011-ca1d54838bb0/SiHKrgFc23.json"
            width="300"
            height="300"
          ></LazyIframe>
          <CardTitle>AI 요약</CardTitle>
          <CardDescription>
            중요한 뉴스와 레포트를 AI로 요약했어요!
          </CardDescription>
          <MoreButton onClick={scrollToSectionFifth}>
            더 알아보기
            <RightIcon />
          </MoreButton>
        </Card>
      </CardDiv>
    </SectionContainerDefault>
  );
};

export default SectionThird;
