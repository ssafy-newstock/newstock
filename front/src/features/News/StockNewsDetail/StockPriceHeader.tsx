import styled from 'styled-components';
import { StockPrev, StockImage } from '@features/Stock/styledComponent';

import { formatChange } from '@utils/formatChange';
import { formatNumber } from '@utils/formatNumber';
import blueLogo from '@assets/Stock/blueLogo.png';

const StockNewsOuter = styled.div`
  width: 100%;
  display: flex;
  padding: 0 0.625rem;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
`;

const StockCorp = styled.div`
  display: flex;
  gap: 0.3rem;
  align-items: center;
`;

const StockNewsCorpText = styled.p`
  color: ${({ theme }) => theme.textColor};
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1.875rem;
  white-space: nowrap; /* 텍스트가 줄바꿈되지 않도록 설정 */
`;

const CustomStockImage = styled(StockImage)`
  width: 2.25rem;
  height: 2.25rem;
  margin-right: 0.7rem;
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

interface StockPriceHeaderProps {
  header: string;
  stockDetail: IStockDetail;
}

const StockPriceHeader: React.FC<StockPriceHeaderProps> = ({
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
      <StockCorp>
        <CustomStockImage
          src={`https://thumb.tossinvest.com/image/resized/96x0/https%3A%2F%2Fstatic.toss.im%2Fpng-icons%2Fsecurities%2Ficn-sec-fill-${stockDetail.stockCode}.png`}
          alt={blueLogo}
        />
        <StockNewsCorpText>{header}</StockNewsCorpText>
      </StockCorp>
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

export default StockPriceHeader;
