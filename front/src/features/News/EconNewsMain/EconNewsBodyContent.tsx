import React from 'react';
import styled from 'styled-components';

const NewsBodyContentWrapper = styled.div`
  display: flex;
  width: 290px;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const NewsBodyContentText = styled.div`
  width: 275px;
  /* flex-shrink: 0; */
  color: #828282;
  font-family: Inter;
  font-size: 15px;
  font-style: normal;
  /* font-weight: 400; */
  line-height: 25px;
`;

interface NewsBodyContentProps {
  content: string;
}

const NewsBodyContent: React.FC<NewsBodyContentProps> = ({ content }) => {
  const trimmedContent =
    content.length > 70 ? `${content.slice(0, 71)}...` : content;

  return (
    <NewsBodyContentWrapper>
      <NewsBodyContentText>{trimmedContent}</NewsBodyContentText>
    </NewsBodyContentWrapper>
  );
};

export default NewsBodyContent;
