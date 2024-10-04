import React from 'react';
import styled from 'styled-components';
import Card from './Card'; // Card 컴포넌트
import { SubTitleP, TextP } from '@features/Oboading/OboadingStyledComponent';

const SectionContainer = styled.div<{ isVisible: boolean }>`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.newsBackgroundColor};
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transition: opacity 1s ease;
  gap: 5rem;
`;

const CardDiv = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
`;

interface SectionGoProps {
  isVisible: boolean;
  sectionRef: React.RefObject<HTMLDivElement>;
}

const SectionGo: React.FC<SectionGoProps> = ({ isVisible, sectionRef }) => {
  return (
    <SectionContainer
      ref={sectionRef}
      isVisible={isVisible}
      data-section="sectionGo"
    >
      <TextP>"newStock" 에선 이런 것을 할 수 있어요</TextP>
      <CardDiv>
        <Card>
          <SubTitleP>뉴스</SubTitleP>
        </Card>
        <Card>
          <SubTitleP>주식</SubTitleP>
        </Card>
      </CardDiv>
    </SectionContainer>
  );
};

export default SectionGo;
