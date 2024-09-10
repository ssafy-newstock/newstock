import React from 'react';
import styled from 'styled-components';

const NewsBodyHeaderWrapper = styled.div`
  display: flex;
  width: 294px;
  justify-content: space-between;
  align-items: flex-end;
`;

const NewsBodyHeaderText = styled.div`
  color: #828282;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 30px; /* 187.5% */
`;

const NewsBodyStockPriceWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px; /* 가격과 변화량 사이에 간격 */
`;

const StockPrice = styled.span`
  color: #000; /* 검은색으로 지정 */
  font-family: Inter;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 12px;
`;

const StockChange = styled.span`
  color: #006dff; /* 파란색으로 지정 */
  font-family: Inter;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 12px;
`;

interface NewsBodyHeaderProps {
  header: string;
}

const NewsBodyHeader: React.FC<NewsBodyHeaderProps> = ({ header }) => {
  return (
    <NewsBodyHeaderWrapper>
      <NewsBodyHeaderText>{header}</NewsBodyHeaderText>
      <NewsBodyStockPriceWrapper>
        <StockPrice>75,500원 </StockPrice>
        <StockChange>-300 (-0.3%)</StockChange>
      </NewsBodyStockPriceWrapper>
    </NewsBodyHeaderWrapper>
  );
};

export default NewsBodyHeader;
