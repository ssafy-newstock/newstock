import { HeartFill } from '@features/Stock/HeartFill';
import { IStock } from '@features/Stock/types';
import {
  StockCardColumn,
  StockCardTitle,
  StockTitle,
  StockImage,
  StckPrice,
  StockPrev,
  SpanTag,
} from '@features/Stock/styledComponent';
import { formatChange } from '@utils/formatChange';
import { formatNumber } from '@utils/formatNumber';
import blueLogo from '@assets/Stock/blueLogo.png';
import { useNavigate } from 'react-router-dom';


const FavoriteStock = ({ stock }: { stock: IStock }) => {
  const navigate = useNavigate();

    // 주식 상세 페이지 + 월봉 차트 조회
  const handleNavigate = () => {
    navigate(`/stock-detail/${stock.stockCode}/daily-chart`, { state: { stock } });
  };

  const getStockImageUrl = () => {
    // 이미지 URL 생성
    const url = `https://thumb.tossinvest.com/image/resized/96x0/https%3A%2F%2Fstatic.toss.im%2Fpng-icons%2Fsecurities%2Ficn-sec-fill-${stock.stockCode}.png`;
    return url;
  };

  return (
    <StockCardColumn onClick={handleNavigate}>
      <StockCardTitle>
        <StockTitle>
          <StockImage
            src={getStockImageUrl()}
            onError={(e) => (e.currentTarget.src = blueLogo)}
            alt=""
          />
          {stock.stockName}
        </StockTitle>
        <HeartFill />
      </StockCardTitle>
      <StckPrice>{formatNumber(stock.stckPrpr)}원</StckPrice>
      <StockPrev $isPositive={stock.prdyVrss.toString().startsWith('-')}>
        <SpanTag>어제보다</SpanTag> {formatChange(formatNumber(stock.prdyVrss))}
        원 ({stock.prdyCtrt}
        %)
      </StockPrev>
    </StockCardColumn>
  );
};

export default FavoriteStock;
