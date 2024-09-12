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

const FavoriteStock = ({ stock }: { stock: IStock }) => {
  const formatNumber = (number: string): string => {
    // 쉼표가 포함된 숫자를 포맷팅
    return new Intl.NumberFormat().format(Number(number.replace(/,/g, '')));
  };

  const formatChange = (change: string) => {
    // 변경값이 '-'로 시작하지 않으면 '+'를 붙여줍니다.
    return change.startsWith('-') ? change : `+${change}`;
  };

  return (
    <StockCardColumn>
      <StockCardTitle>
        <StockTitle>
          <StockImage
            src={`https://thumb.tossinvest.com/image/resized/96x0/https%3A%2F%2Fstatic.toss.im%2Fpng-icons%2Fsecurities%2Ficn-sec-fill-${stock.stockCode}.png`}
            alt={stock.stockName}
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
