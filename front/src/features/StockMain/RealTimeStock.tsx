import {
  StckPrice,
  StockCardRow,
  StockImage,
  StockPrev,
  StockTitle,
  Text,
  TextLeft,
} from '@features/StockMain/styledComponent';
import { Heart } from '@features/StockMain/Heart';
import { formatChange } from '@utils/formatChange';
import { formatNumber } from '@utils/formatNumber';
import { formatUnit } from '@utils/formatUnit';
import { IStock } from '@features/StockMain/type';

export const RealTimeStockFirstRow = () => {
  return (
    <StockCardRow>
      <TextLeft>종목명</TextLeft>
      <Text>현재가</Text>
      <Text>등락률</Text>
      <Text>거래대금</Text>
      <Text>거래량</Text>
      <Text>관심</Text>
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
          {formatChange(formatNumber(stock.prdyVrss))}원 ({stock.prdyCtrt}
          %)
        </StockPrev>
        <Text>{formatUnit(stock.acmlTrPbmn)}</Text>
        <Text>{formatNumber(stock.acmlVol)}주</Text>
        <Heart />
      </StockCardRow>
  );
};
export default RealTimeStock;
