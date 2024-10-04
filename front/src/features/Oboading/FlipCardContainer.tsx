import React from 'react';
import styled from 'styled-components';

const FlipCardWrapper = styled.div`
  display: flex;
  gap: 20px;
`;

const FlipCard = styled.div`
  perspective: 1000px;
`;

const FlipCardInner = styled.div`
  position: relative;
  width: 300px;
  height: 200px;
  transition: transform 0.8s cubic-bezier(0.68, -0.55, 0.27, 1.55);
  transform-style: preserve-3d;
  will-change: transform;

  &:hover {
    transform: rotateY(180deg);
  }
`;

const FlipCardFace = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const FlipCardFront = styled(FlipCardFace)`
  background-color: #f1c40f;
`;

const FlipCardBack = styled(FlipCardFace)`
  background-color: #2980b9;
  transform: rotateY(180deg);
`;

interface FlipCardProps {
  cards: { front: string; back: string }[];
}

const FlipCardContainer: React.FC<FlipCardProps> = ({ cards }) => {
  return (
    <FlipCardWrapper>
      {cards.map((card, index) => (
        <FlipCard key={index}>
          <FlipCardInner>
            <FlipCardFront>{card.front}</FlipCardFront>
            <FlipCardBack>{card.back}</FlipCardBack>
          </FlipCardInner>
        </FlipCard>
      ))}
    </FlipCardWrapper>
  );
};

export default FlipCardContainer;
