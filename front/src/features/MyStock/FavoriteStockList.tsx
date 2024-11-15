import { HeartFill } from '@features/Stock/HeartFill';
import {
  StockCardColumn,
  StockCardTitle,
  StockTitle,
  StockImage,
} from '@features/MyStock/myStockCenterStyledComponent';
import blueLogo from '@assets/Stock/blueLogo.png';
import { useNavigate } from 'react-router-dom';
import {
  SpanTag,
  StckPrice,
  StockPrev,
  Text,
} from '@features/Stock/styledComponent';
import useAllStockStore from '@store/useAllStockStore';
import useTop10StockStore from '@store/useTop10StockStore';
import { formatNumber } from '@utils/formatNumber';
import { formatChange } from '@utils/formatChange';
import { getStockImageUrl } from '@utils/getStockImageUrl';
import { useTheme } from 'styled-components';

interface stockFavoriteDto {
  stockFavoriteId: number;
  stockId: number;
  stockCode: string;
  stockName: string;
}

interface FavoriteStockProps {
  stock: stockFavoriteDto;
}

const FavoriteStock: React.FC<FavoriteStockProps> = ({ stock }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  // 주식 상세 페이지 + 월봉 차트 조회
  const handleNavigate = () => {
    navigate(`/stock-detail/${stock.stockCode}/day-chart`, {
      state: { stock },
    });
  };

  // Zustand 스토어에서 allStock과 top10Stock 가져오기
  const allStock = useAllStockStore((state) => state.allStock);
  const top10Stock = useTop10StockStore((state) => state.top10Stock);

  // allStock 또는 top10Stock에서 해당 stockCode로 주식 찾기
  const matchedStock =
    allStock.find((s) => s.stockCode === stock.stockCode) ||
    top10Stock.find((s) => s.stockCode === stock.stockCode);

  const getTextColor = (priceChange: number | undefined) => {
    if (priceChange === undefined) return theme.textColor;
    if (priceChange > 0) return theme.stockRed || 'red'; // 상승일 때 빨간색
    if (priceChange < 0) return theme.stockBlue || 'blue'; // 하락일 때 파란색
    return ''; // 변화가 없을 때는 색상 없음
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
      {matchedStock ? (
        <>
          <StckPrice>{formatNumber(matchedStock.stckPrpr)}원</StckPrice>
          <StockPrev
            $isPositive={!matchedStock.prdyVrss.toString().startsWith('-')}
          >
            <SpanTag>어제보다</SpanTag>{' '}
            <SpanTag style={{ color: getTextColor(matchedStock.prdyVrss) }}>
              {formatChange(formatNumber(matchedStock.prdyVrss))}원 (
              {formatChange(formatNumber(matchedStock.prdyCtrt))}%)
            </SpanTag>
          </StockPrev>
        </>
      ) : (
        <Text>데이터 없음</Text> // 매칭되는 주식이 없을 때 출력
      )}
    </StockCardColumn>
  );
};

export default FavoriteStock;
