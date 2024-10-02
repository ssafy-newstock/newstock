import { TextP_16_NOTGRAY } from '@features/MyStock/myStockStyledComponent';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import useAllStockStore from '@store/useAllStockStore';
import useTop10StockStore from '@store/useTop10StockStore'; // Zustand 스토어 가져오기
import { useMyStockFavoriteData } from '@hooks/useStockHoldings';

const FavoriteCardDiv = styled.div`
  display: flex;
  padding: 10px;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  border-radius: 30px;
  background-color: ${({ theme }) => theme.newsBackgroundColor};
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.1);
  margin: 0.5rem 0;
`;

const FavoriteCardLeftDiv = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
`;

const FavoriteStock: React.FC = () => {
  // 커스텀 훅으로 찜 목록 데이터를 가져옴
  const { data: favoriteStocks, isLoading, error } = useMyStockFavoriteData();
  const navigate = useNavigate();

  // Zustand 스토어에서 allStock과 top10Stock 가져오기
  const allStock = useAllStockStore((state) => state.allStock);
  const top10Stock = useTop10StockStore((state) => state.top10Stock);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error || !favoriteStocks) {
    return <p>Error loading data.</p>;
  }

  return (
    <>
      {favoriteStocks.map((favoriteStock) => {
        // allStock 또는 top10Stock에서 해당 stockCode로 주식 찾기
        const matchedStock =
          allStock.find((s) => s.stockCode === favoriteStock.stockCode) ||
          top10Stock.find((s) => s.stockCode === favoriteStock.stockCode);

        const handleNavigate = () => {
          navigate(`/stock-detail/${favoriteStock.stockCode}/day-chart`, {
            state: { stockId: favoriteStock.stockId },
          });
        };

        return (
          <FavoriteCardDiv
            key={favoriteStock.stockFavoriteId}
            onClick={handleNavigate}
          >
            <FavoriteCardLeftDiv>
              <TextP_16_NOTGRAY>{favoriteStock.stockName}</TextP_16_NOTGRAY>
              <TextP_16_NOTGRAY>({favoriteStock.stockCode})</TextP_16_NOTGRAY>
              {/* 주식 데이터를 찾은 경우, 가격 정보도 표시 */}
              {matchedStock && (
                <TextP_16_NOTGRAY>
                  현재가: {matchedStock?.stckPrpr?.toLocaleString()}원
                </TextP_16_NOTGRAY>
              )}
            </FavoriteCardLeftDiv>
          </FavoriteCardDiv>
        );
      })}
    </>
  );
};

export default FavoriteStock;
