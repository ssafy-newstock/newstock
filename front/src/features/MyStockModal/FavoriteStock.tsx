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
  ContainerDiv,
  RightContentDiv,
  StockImage,
  TextP_14_NOTGRAY,
} from '@features/MyStockModal/styledComponent';

const FavoriteStock: React.FC = () => {
  const { data: favoriteStocks, isLoading, error } = useMyStockFavoriteData();
  const navigate = useNavigate();

  // 스토어에서 allStock과 top10Stock 가져오기
  const allStock = useAllStockStore((state) => state.allStock);
  const top10Stock = useTop10StockStore((state) => state.top10Stock);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error || !favoriteStocks) {
    return <CenteredMessage>Error loading data.</CenteredMessage>;
  }

  if (favoriteStocks.length === 0) {
    return <CenteredMessage>관심 종목이 없습니다.</CenteredMessage>;
  }

  const getTextColor = (priceChange: number | undefined) => {
    if (priceChange === undefined) return '';
    if (priceChange > 0) return 'red'; // 상승일 때 빨간색
    if (priceChange < 0) return 'blue'; // 하락일 때 파란색
    return ''; // 변화가 없을 때는 색상 없음
  };

  return (
    <RightContentDiv>
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
          <ContainerDiv
            key={stock.stockFavoriteId}
            style={{ cursor: 'pointer' }}
          >
            <CardDiv onClick={handleNavigate}>
              <CardLeftDiv>
                <StockImage
                  src={`https://thumb.tossinvest.com/image/resized/96x0/https%3A%2F%2Fstatic.toss.im%2Fpng-icons%2Fsecurities%2Ficn-sec-fill-${stock.stockCode}.png`}
                  alt={blueLogo}
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
          </ContainerDiv>
        );
      })}
    </RightContentDiv>
  );
};

export default FavoriteStock;
