import React from 'react';
import styled from 'styled-components';

const NewsBodyFooterWrapper = styled.div`
  display: flex;
  padding: 0px 10px;
  align-items: center;
  gap: 12px;
`;

const NewsBodyFooterWriter = styled.div`
  color: #828282;
  font-family: Inter;
  font-size: 18px;
  font-style: normal;
  /* font-weight: 400; */
  line-height: 30px;
`;

const LineSVG = styled.div`
  width: 1.5px;
  height: 22px;
  background: #e0e0e0;
`;

const NewsBodyFooterDate = styled.div`
  color: #828282;
  font-family: Inter;
  font-size: 18px;
  font-style: normal;
  /* font-weight: 400; */
  line-height: 30px;
`;

interface NewsBodyFooterProps {
  media: string;
  date: string;
}

const NewsBodyFooter: React.FC<NewsBodyFooterProps> = ({ media, date }) => {
  const formattedDate = date.split(' ')[0].replace(/-/g, '.');

  return (
    <NewsBodyFooterWrapper>
      <NewsBodyFooterWriter>{media}</NewsBodyFooterWriter>
      <LineSVG />
      <NewsBodyFooterDate>{formattedDate}</NewsBodyFooterDate>
    </NewsBodyFooterWrapper>
  );
};

export default NewsBodyFooter;
