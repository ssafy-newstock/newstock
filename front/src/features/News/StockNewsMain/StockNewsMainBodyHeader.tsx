import styled from 'styled-components';
import { StockPrev } from '@features/Stock/styledComponent';
import { formatChange } from '@utils/formatChange';
import { formatNumber } from '@utils/formatNumber';

const NewsBodyHeaderWrapper = styled.div`
  display: flex;
  flex-direction: column; /* 세로로 쌓이게 설정 */
  width: 100%;
`;

const NewsBodyHeaderText = styled.div`
  color: ${({ theme }) => theme.editorTextColor};
  font-size: 1.2rem;
  font-weight: 600;
  line-height: 1.9rem;
  align-self: flex-start; /* 왼쪽 정렬 */
`;

const NewsBodyStockPriceWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem; /* 가격과 변화량 사이에 간격 */
  align-self: flex-end; /* 오른쪽 정렬 */
  margin-bottom: 1.5rem;
`;

const StockPrice = styled.span`
  color: ${({ theme }) => theme.editorTextColor};
  font-size: 1.4rem;
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
        <StockPrice>{formatNumber(stockDetail.stckPrpr)}원</StockPrice>
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
