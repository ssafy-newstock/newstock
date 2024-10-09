import { useNavigate } from 'react-router-dom';
import useAllStockStore from '@store/useAllStockStore';
import useTop10StockStore from '@store/useTop10StockStore';
import { useMyStockFavoriteData } from '@hooks/useStockHoldings';
import blueLogo from '@assets/Stock/blueLogo.png';
import { formatNumber } from '@utils/formatNumber';
import { formatChange } from '@utils/formatChange';
import LoadingSpinner from '@components/LoadingSpinner';
import {
  CardDiv,
  CardLeftDiv,
  CardLeftRightDiv,
  CardRightDiv,
  CenteredMessage,
  ContentDiv,
  StockImage,
  TextP_14_NOTGRAY,
} from '@features/SideModal/styledComponent';
import { getStockImageUrl } from '@utils/getStockImageUrl';
import { useTheme } from 'styled-components';

const FavoriteStock: React.FC = () => {
  const { data: favoriteStocks, isLoading, error } = useMyStockFavoriteData();
  const navigate = useNavigate();
  const theme = useTheme();
  // 스토어에서 allStock과 top10Stock 가져오기
  const allStock = useAllStockStore((state) => state.allStock);
  const top10Stock = useTop10StockStore((state) => state.top10Stock);

  if (isLoading) {
    return (
      <CenteredMessage>
        <LoadingSpinner />
      </CenteredMessage>
    );
  }

  if (error || !favoriteStocks) {
    return <CenteredMessage>Error loading data.</CenteredMessage>;
  }

  if (favoriteStocks.length === 0) {
    return <CenteredMessage>관심 종목이 없습니다.</CenteredMessage>;
  }

  const getTextColor = (priceChange: number | undefined) => {
    if (priceChange === undefined) return theme.textColor;
    if (priceChange > 0) return theme.stockRed || 'red'; // 상승일 때 빨간색
    if (priceChange < 0) return theme.stockBlue || 'blue'; // 하락일 때 파란색
    return ''; // 변화가 없을 때는 색상 없음
  };

  return (
    <ContentDiv>
      {favoriteStocks.map((stock) => {
        // allStock 또는 top10Stock에서 해당 stockCode로 주식 찾기
        const matchedStock =
          allStock.find((s) => s.stockCode === stock.stockCode) ||
          top10Stock.find((s) => s.stockCode === stock.stockCode);

        const handleNavigate = () => {
          navigate(`/stock-detail/${stock.stockCode}/day-chart`, {
            state: { stock },
          });
        };

        return (
          <CardDiv onClick={handleNavigate} style={{ cursor: 'pointer' }}>
            <CardLeftDiv>
              <StockImage
                src={getStockImageUrl(stock.stockCode)}
                onError={(e) => (e.currentTarget.src = blueLogo)}
                alt=""
              />
              <CardLeftRightDiv>
                <TextP_14_NOTGRAY>{stock.stockName}</TextP_14_NOTGRAY>
              </CardLeftRightDiv>
            </CardLeftDiv>
            <CardRightDiv>
              {matchedStock && (
                <>
                  <TextP_14_NOTGRAY
                    style={{ color: getTextColor(matchedStock.prdyVrss) }}
                  >
                    {matchedStock?.stckPrpr?.toLocaleString()}원
                  </TextP_14_NOTGRAY>
                  <TextP_14_NOTGRAY
                    style={{ color: getTextColor(matchedStock.prdyVrss) }}
                  >
                    {formatChange(formatNumber(matchedStock.prdyVrss))}원 (
                    {formatChange(formatNumber(matchedStock.prdyCtrt))}%)
                  </TextP_14_NOTGRAY>
                </>
              )}
            </CardRightDiv>
          </CardDiv>
        );
      })}
    </ContentDiv>
  );
};

export default FavoriteStock;
