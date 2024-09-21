import styled from 'styled-components';

const StockNewsOuter = styled.div`
  width: 100%;
  display: flex;
  padding: 0 0.625rem;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
`;

const StockNewsCorpText = styled.p`
  color: ${({ theme }) => theme.textColor};
  font-family: Inter;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.875rem;
`;

const StockNewsPrice = styled.div`
  display: flex;
  gap: 0.3rem;
`;

const StockNewsPriceText = styled.p`
  color: #006dff;
  font-family: Inter;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.875rem;
`;

const StockNewsHeader: React.FC = () => {
  return (
    <StockNewsOuter>
      <StockNewsCorpText>삼성전자</StockNewsCorpText>
      <StockNewsPrice>
        <StockNewsCorpText>75,500원</StockNewsCorpText>
        <StockNewsPriceText>-300 (-0.3%)</StockNewsPriceText>
      </StockNewsPrice>
    </StockNewsOuter>
  );
};

export default StockNewsHeader;
