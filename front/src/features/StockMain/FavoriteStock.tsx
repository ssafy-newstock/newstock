import { HeartFill } from '@features/StockMain/HeartFill';
import { IStock } from '@features/StockMain/type';
import {
  StockCardColumn,
  StockCardTitle,
  StockTitle,
  StockImage,
  StckPrice,
  StockPrev,
  SpanTag,
} from '@features/StockMain/styledComponent';
import { formatChange } from '@utils/formatChange';
import { formatNumber } from '@utils/formatNumber';
import blueLogo from '@assets/Stock/blueLogo.png';


const FavoriteStock = ({ stock }: { stock: IStock }) => {
  return (
    <StockCardColumn>
      <StockCardTitle>
        <StockTitle>
          <StockImage
            src={`https://thumb.tossinvest.com/image/resized/96x0/https%3A%2F%2Fstatic.toss.im%2Fpng-icons%2Fsecurities%2Ficn-sec-fill-${stock.stockCode}.png`}
            alt={blueLogo}
          />
          {stock.stockName}
        </StockTitle>
        <HeartFill />
      </StockCardTitle>
      <StckPrice>{formatChange(formatNumber(stock.stckPrpr))}원</StckPrice>
      <StockPrev isPositive={stock.prdyVrss.startsWith('-')}>
        <SpanTag>어제보다</SpanTag> {formatChange(formatNumber(stock.prdyVrss))}
        원 ({stock.prdyCtrt}
        %)
      </StockPrev>
    </StockCardColumn>
  );
};

export default FavoriteStock;