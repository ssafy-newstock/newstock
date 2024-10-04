import React from 'react';
import styled, { useTheme } from 'styled-components';
import {
  SubTitleP_GRAY,
  TitleP,
} from '@features/Oboading/OboadingStyledComponent';
import videoFileDark from '@assets/3129957-hd_1920_1080_25fps.mp4';
import videoFileLight from '@assets/2324166-hd_1920_1080_25fps.mp4';

const SectionContainer = styled.div<{ isVisible: boolean }>`
  position: relative; /* 자식 요소가 절대 위치를 가질 수 있도록 설정 */
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  font-weight: bold;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transition: opacity 1s ease;
`;

const BackgroundVideo = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover; /* 비디오를 화면에 맞게 조정 */
  z-index: -10; /* 비디오를 가장 뒤에 배치 */
`;

const CenterDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  position: relative; /* 텍스트가 비디오 위에 위치하도록 설정 */
  z-index: 1; /* 텍스트를 비디오보다 위에 배치 */
`;

interface SectionFirstProps {
  isVisible: boolean;
  sectionRef: React.RefObject<HTMLDivElement>;
}

const SectionFirst: React.FC<SectionFirstProps> = ({
  isVisible,
  sectionRef,
}) => {
  const theme = useTheme(); // 현재 테마 가져오기

  // theme이 'light'일 때는 videoFileLight, 그렇지 않을 때는 videoFileDark
  const videoSrc = theme.mode === 'light' ? videoFileLight : videoFileDark;

  return (
    <SectionContainer
      ref={sectionRef}
      isVisible={isVisible}
      data-section="SectionFirst"
    >
      <CenterDiv>
        <TitleP>뉴스와 함께 하는 똑똑한 투자!</TitleP>
        <SubTitleP_GRAY>
          뉴스로 키우는 투자 안목, 모의 투자로 다니는 실전 감각
        </SubTitleP_GRAY>
      </CenterDiv>
      <BackgroundVideo autoPlay muted loop>
        <source src={videoSrc} type="video/mp4" />
      </BackgroundVideo>
    </SectionContainer>
  );
};

export default SectionFirst;
