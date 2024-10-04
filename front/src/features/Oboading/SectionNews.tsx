import styled from 'styled-components';
import FlipCardContainer from './FlipCardContainer';

const SectionContainer = styled.div<{ isVisible: boolean }>`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.backgroundColor};
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transition: opacity 1s ease;
`;

interface SectionNewsProps {
  isVisible: boolean;
  sectionRef: React.RefObject<HTMLDivElement>;
}

const SectionNews: React.FC<SectionNewsProps> = ({ isVisible, sectionRef }) => {
  return (
    <SectionContainer
      ref={sectionRef}
      isVisible={isVisible}
      data-section="SectionNews"
    >
      <FlipCardContainer
        cards={[
          { front: '시황 뉴스', back: 'Back 1' },
          { front: '종목 뉴스', back: 'Back 2' },
          { front: '관심 뉴스', back: 'Back 3' },
        ]}
      />
    </SectionContainer>
  );
};

export default SectionNews;
