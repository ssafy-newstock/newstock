import styled from 'styled-components';

const NewsBodyHeaderWrapper = styled.div`
  display: flex;
  width: 18rem;
  justify-content: space-between;
  align-items: flex-end;
`;

const NewsBodyHeaderText = styled.div`
  color: #828282;
  font-family: Inter;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.9rem;
`;

const NewsBodyStockPriceWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem; /* 가격과 변화량 사이에 간격 */
`;

const StockPrice = styled.span`
  color: ${({ theme }) => theme.editorTextColor};
  font-family: Inter;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 400;
  line-height: 0.75rem;
`;

const StockChange = styled.span`
  color: #006dff; /* 파란색으로 지정 */
  font-family: Inter;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 400;
  line-height: 0.75rem;
`;

interface NewsBodyHeaderProps {
  header: string;
}

const StockNewsMainBodyHeader: React.FC<NewsBodyHeaderProps> = ({ header }) => {
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

export default StockNewsMainBodyHeader;
