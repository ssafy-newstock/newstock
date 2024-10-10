import styled from 'styled-components';
import { motion } from 'framer-motion';
import videoFileDark from '@assets/3129957-hd_1920_1080_25fps.mp4';
import { DownIcon } from '@features/Onboading/Icon';

const SectionContainer = styled.div<{ $isVisible: boolean }>`
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  font-weight: bold;
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
  transition: opacity 1s ease;
`;

const BackgroundVideo = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -10;
`;

const CenterDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  position: relative;
  z-index: 1;
`;

const ScrollButton = styled(motion.button)`
  position: absolute;
  bottom: 5rem;
  padding: 1rem 1.8rem;
  background-color: ${({ theme }) => theme.buttonBackgroundColor};
  color: ${({ theme }) => theme.buttonTextColor};
  border: none;
  border-radius: 3rem;
  cursor: pointer;
`;

const TitleP = styled.p`
  font-size: 4rem;
  font-weight: bold;
  color: #fff;
`;

const SubTitleP = styled.p`
  font-size: 2rem;
  font-weight: bold;
  color: #828282;
`;

interface SectionFirstProps {
  $isVisible: boolean;
  sectionRef: React.RefObject<HTMLDivElement>;
  scrollToSectionSecond: () => void; // 스크롤 함수 추가
}

const SectionFirst: React.FC<SectionFirstProps> = ({
  $isVisible,
  sectionRef,
  scrollToSectionSecond,
}) => {
  return (
    <SectionContainer
      ref={sectionRef}
      $isVisible={$isVisible}
      data-section="SectionFirst"
    >
      <CenterDiv>
        <TitleP>뉴스와 함께 하는 똑똑한 투자!</TitleP>
        <SubTitleP>
          뉴스로 키우는 투자 안목, 모의 투자로 다지는 실전 감각
        </SubTitleP>
      </CenterDiv>
      <BackgroundVideo autoPlay muted loop>
        <source src={videoFileDark} type="video/mp4" />
      </BackgroundVideo>

      {/* 스크롤 버튼 */}
      <ScrollButton
        onClick={scrollToSectionSecond}
        initial={{ y: 0 }}
        animate={{ y: [0, -10, 0] }}
        transition={{
          repeat: Infinity,
          duration: 1.5,
          ease: 'easeInOut',
        }}
      >
        <DownIcon />
      </ScrollButton>
    </SectionContainer>
  );
};

export default SectionFirst;
