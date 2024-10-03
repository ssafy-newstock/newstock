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

const StockInfo = ({stockDetail}:{stockDetail:IStock}) => {
  // 주식 종목 이미지
  const getStockImageUrl = () => {
    // 이미지 URL 생성
    const url = `https://thumb.tossinvest.com/image/resized/96x0/https%3A%2F%2Fstatic.toss.im%2Fpng-icons%2Fsecurities%2Ficn-sec-fill-${stockDetail.stockCode}.png`;
    return url;
  };
  return (
    <FlexGapEnd $gap="1rem">
      {/* 주식 정보 */}
      <StockTitle>
        <StockImageDetail
          src={getStockImageUrl()}
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
