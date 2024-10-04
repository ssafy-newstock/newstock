import React from 'react';
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

interface SectionStockProps {
  isVisible: boolean;
  sectionRef: React.RefObject<HTMLDivElement>;
}

const SectionStock: React.FC<SectionStockProps> = ({
  isVisible,
  sectionRef,
}) => {
  return (
    <SectionContainer
      ref={sectionRef}
      isVisible={isVisible}
      data-section="SectionStock"
    >
      <iframe
        src="https://lottie.host/embed/687b168d-6cf4-4357-a3a9-f3ef3a4efc8f/6aJfpOudUD.json"
        height={500}
        width={500}
      />
      <FlipCardContainer
        cards={[
          { front: '실시간 주식 조회', back: 'Back 4' },
          { front: '모의 투자', back: 'Back 5' },
          { front: '유사도 검색', back: 'Back 6' },
        ]}
      />
    </SectionContainer>
  );
};

export default SectionStock;
