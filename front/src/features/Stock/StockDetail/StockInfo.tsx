import { formatChange } from '@utils/formatChange';
import { formatNumber } from '@utils/formatNumber';
import blueLogo from '@assets/Stock/blueLogo.png';
import {
  SpanTag,
  StckPrice,
  StockImageDetail,
  StockPrev,
  StockTitle,
  TextLarge,
} from '@features/Stock/styledComponent';
import { DivTag, FlexGapEnd } from '@components/styledComponent';
import { IStock } from '@features/Stock/types';
import { getStockImageUrl } from '@utils/getStockImageUrl';

const StockInfo = ({stockDetail}:{stockDetail:IStock}) => {
  return (
    <FlexGapEnd $gap="1rem">
      {/* 주식 정보 */}
      <StockTitle>
        <StockImageDetail
          src={getStockImageUrl(stockDetail.stockCode)}
          onError={(e) => (e.currentTarget.src = blueLogo)} // 기본 이미지 설정
          alt=""
        />
        <DivTag>
          <SpanTag>코스피 {stockDetail?.stockCode}</SpanTag>
          <TextLarge>{stockDetail?.stockName}</TextLarge>
        </DivTag>
      </StockTitle>
      <StckPrice>
        {stockDetail && formatChange(formatNumber(stockDetail.stckPrpr))}원
      </StckPrice>
      <StockPrev
        $isPositive={stockDetail?.prdyVrss.toString().startsWith('-') ?? false}
      >
        <SpanTag>어제보다</SpanTag>{' '}
        {stockDetail && formatChange(formatNumber(stockDetail.prdyVrss))}원 (
        {stockDetail?.prdyCtrt}
        %)
      </StockPrev>
    </FlexGapEnd>
  );
};
export default StockInfo;
