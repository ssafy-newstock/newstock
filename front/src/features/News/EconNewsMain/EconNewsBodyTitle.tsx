import React from 'react';
import styled from 'styled-components';
import {
  PositiveIcon,
  PositiveIconText,
  // NegativeIcon,
  // NegativeIconText,
  // NeutralIcon,
  // NeutralIconText,
} from '@features/News/PNicon';

const NewsBodyTitleWrapper = styled.div`
  display: flex;
  /* width: 299px; */
  justify-content: space-between;
  align-items: flex-start;
  position: relative;
`;

const NewsBodyTitleText = styled.p`
  width: 299px;
  /* height: 64px; */
  /* flex-shrink: 0; */
  color: ${({ theme }) => theme.highlightColor};
  font-family: Inter;
  font-size: 25px;
  font-style: normal;
  /* font-weight: 400; */
  line-height: 32px;
  text-indent: 55px;
`;

interface NewsBodyTitleProps {
  title: string;
}

const NewsBodyTitle: React.FC<NewsBodyTitleProps> = ({ title }) => {
  const trimmedTitle = title.length > 27 ? `${title.slice(0, 27)}...` : title;

  return (
    <NewsBodyTitleWrapper>
      <NewsBodyTitleText>{trimmedTitle}</NewsBodyTitleText>
      <PositiveIcon>
        <PositiveIconText>긍정</PositiveIconText>
      </PositiveIcon>
    </NewsBodyTitleWrapper>
  );
};

export default NewsBodyTitle;
