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
import { getStockImageUrl } from '@utils/getStockImageUrl';


const FavoriteStock = ({ stock }: { stock: IStock }) => {
  const navigate = useNavigate();

    // 주식 상세 페이지 + 월봉 차트 조회
  const handleNavigate = () => {
    navigate(`/stock-detail/${stock.stockCode}/day-chart`, { state: { stock } });
  };

  return (
    <StockCardColumn onClick={handleNavigate}>
      <StockCardTitle>
        <StockTitle>
          <StockImage
            src={getStockImageUrl(stock.stockCode)}
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
