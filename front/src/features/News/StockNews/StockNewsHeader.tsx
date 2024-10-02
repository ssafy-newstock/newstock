import styled from 'styled-components';
import { StockPrev } from '@features/Stock/styledComponent';

import { formatChange } from '@utils/formatChange';
import { formatNumber } from '@utils/formatNumber';

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

const CustomStockPrev = styled(StockPrev)`
  font-size: 1.5rem;
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

interface StockNewsHeaderProps {
  header: string;
  stockDetail: IStockDetail;
}

const StockNewsHeader: React.FC<StockNewsHeaderProps> = ({
  header,
  stockDetail,
}) => {
  if (!stockDetail) {
    console.log('stockDetail이 아직 정의되지 않음.');
    return null; // 또는 로딩 상태 등을 반환할 수 있습니다.
  } else {
    console.log('스톡디테일 : ', stockDetail);
  }

  return (
    <StockNewsOuter>
      <StockNewsCorpText>{header}</StockNewsCorpText>
      <StockNewsPrice>
        <StockNewsCorpText>
          {formatNumber(stockDetail.stckPrpr)}원
        </StockNewsCorpText>
        {/* <StockNewsPriceText>-300 (-0.3%)</StockNewsPriceText> */}
        <CustomStockPrev
          $isPositive={stockDetail.prdyVrss.toString().startsWith('-')}
        >
          {formatChange(formatNumber(stockDetail.prdyVrss))} (
          {stockDetail.prdyCtrt}
          %)
        </CustomStockPrev>
      </StockNewsPrice>
    </StockNewsOuter>
  );
};

export default StockNewsHeader;
