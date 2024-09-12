import {
  SpanTag,
  StckPrice,
  StockCardRow,
  StockImage,
  StockPrev,
  StockTitle,
} from '@features/StockMain/styledComponent';
import { Heart } from './Heart';
import { formatChange } from '@utils/formatChange';
import { formatNumber } from '@utils/formatNumber';
import { IStock } from './type';

export const RealTimeStockFirstRow = () => {
  return (
    <StockCardRow>
      <div style={{ textAlign: 'start' }}>종목명</div>
      <div>현재가</div>
      <div>등락률</div>
      <div>관심</div>
    </StockCardRow>
  );
};

const RealTimeStock = ({stock}:{stock:IStock}) => {
  return (
      <StockCardRow>
        <StockTitle>
          <StockImage
            src={`https://thumb.tossinvest.com/image/resized/96x0/https%3A%2F%2Fstatic.toss.im%2Fpng-icons%2Fsecurities%2Ficn-sec-fill-${stock.stockCode}.png`}
            alt={stock.stockName}
          />
          {stock.stockName}
        </StockTitle>
        <StckPrice>{formatChange(formatNumber(stock.stckPrpr))}원</StckPrice>
        <StockPrev isPositive={stock.prdyVrss.startsWith('-')}>
          <SpanTag>어제보다</SpanTag>{' '}
          {formatChange(formatNumber(stock.prdyVrss))}원 ({stock.prdyCtrt}
          %)
        </StockPrev>
        <Heart />
      </StockCardRow>
  );
};
export default RealTimeStock;
