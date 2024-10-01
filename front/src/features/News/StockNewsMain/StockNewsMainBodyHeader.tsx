import styled from 'styled-components';
import { StockPrev } from '@features/Stock/styledComponent';

import { formatChange } from '@utils/formatChange';
import { formatNumber } from '@utils/formatNumber';
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

interface IStockDetail {
  stockCode: string;
  stockName: string;
  stockIndustry: string;
  stckPrpr: number;
  prdyVrss: number;
  prdyCtrt: number;
  acmlVol: number;
  acmlTrPbmn: number;
}

interface NewsBodyHeaderProps {
  header: string;
  stockDetail?: IStockDetail;
}

const StockNewsMainBodyHeader: React.FC<NewsBodyHeaderProps> = ({
  header,
  stockDetail,
}) => {
  // stockDetail이 존재하는지 확인하여 렌더링
  if (!stockDetail) {
    return <p>Loading stock data...</p>; // 데이터가 없을 경우 표시
  }

  return (
    <NewsBodyHeaderWrapper>
      <NewsBodyHeaderText>{header}</NewsBodyHeaderText>
      <NewsBodyStockPriceWrapper>
        <StockPrice>{formatNumber(stockDetail.stckPrpr)}원 </StockPrice>
        {/* <StockChange>-300 (-0.3%)</StockChange> */}
        <StockPrev
          $isPositive={stockDetail.prdyVrss.toString().startsWith('-')}
        >
          {formatChange(formatNumber(stockDetail.prdyVrss))} (
          {stockDetail.prdyCtrt}
          %)
        </StockPrev>
      </NewsBodyStockPriceWrapper>
    </NewsBodyHeaderWrapper>
  );
};

export default StockNewsMainBodyHeader;
