import styled from 'styled-components';

export const PositiveIcon = styled.div`
  display: flex;
  width: 6rem;
  height: 3rem;
  padding: 0.3rem;
  justify-content: center;
  align-items: center;
  border-radius: 1.25rem;
  border: 0.125rem solid #ea1212;
`;

export const PositiveIconText = styled.p`
  color: #e31837;
  font-family: Inter;
  font-size: 2rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.875rem; /* 93.75% */
  text-align: center;
`;

export const NeutralIcon = styled.div`
  display: flex;
  width: 6rem;
  height: 3rem;
  padding: 0.3rem;
  justify-content: center;
  align-items: center;
  border-radius: 1.25rem;
  border: 0.125rem solid #828282;
`;

export const NeutralIconText = styled.p`
  color: #828282;
  font-family: Inter;
  font-size: 2rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.875rem; /* 93.75% */
  text-align: center;
`;

export const NegativeIcon = styled.div`
  display: flex;
  width: 6rem;
  height: 3rem;
  padding: 0.3rem;
  justify-content: center;
  align-items: center;
  border-radius: 1.25rem;
  border: 0.125rem solid #006dff;
`;

export const NegativeIconText = styled.p`
  color: #006dff;
  font-family: Inter;
  font-size: 2rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.875rem; /* 93.75% */
  text-align: center;
`;

import React from 'react';

interface SentimentIconProps {
  sentiment: string;
}

const SentimentIcon: React.FC<SentimentIconProps> = ({ sentiment }) => {
  let IconComponent;
  let IconText;

  switch (sentiment) {
    case '0': // 부정적
      IconComponent = NegativeIcon;
      IconText = <NegativeIconText>부정</NegativeIconText>;
      break;
    case '1': // 중립적
      IconComponent = NeutralIcon;
      IconText = <NeutralIconText>중립</NeutralIconText>;
      break;
    case '2': // 긍정적
      IconComponent = PositiveIcon;
      IconText = <PositiveIconText>긍정</PositiveIconText>;
      break;
    default:
      IconComponent = NeutralIcon; // 기본값으로 중립 아이콘을 사용
      IconText = <NeutralIconText>중립</NeutralIconText>;
      break;
  }

  return <IconComponent>{IconText}</IconComponent>;
};

export default SentimentIcon;

