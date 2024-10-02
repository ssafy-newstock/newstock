import FavoriteStock from '@features/Stock/StockMain/FavoriteStock';
import useAllStockStore from '@store/useAllStockStore';
import { toast } from 'react-toastify';
import { useFavoriteStockQuery } from '@hooks/useFavortiteStockQuery';
import { useMemo } from 'react';
import {
  HrTag,
  StockGridColumn,
  StockHeader,
  TextCenter,
} from '@features/Stock/styledComponent';
import { IFavoriteStock, IStock } from '@features/Stock/types';
import useAuthStore from '@store/useAuthStore';
import useTop10StockStore from '@store/useTop10StockStore';

const FavoriteStockSection = () => {
  const { isLogin } = useAuthStore();
  const { allStock } = useAllStockStore();
  const { top10Stock } = useTop10StockStore();

  // 로그인 상태가 아닐 경우 렌더링 중단
  if (!isLogin) return null;

  const { data: favoriteStockList } = useFavoriteStockQuery({
    enabled: isLogin,
    onSuccess: () => {
      toast.success('관심 주식 목록을 불러왔습니다.');
    },
    onError: () => {
      toast.error('관심 주식 목록을 불러오지 못했습니다.');
    },
  });

  // favoriteStock의 stockId를 Set으로 만들어 빠른 검색 가능
  const favoriteStockCode: Set<string> = useMemo(() => {
    return new Set(
          favoriteStockList?.data?.map(
            (stock: IFavoriteStock) => stock.stockCode
          )
        );
  }, [favoriteStockList]);

  // 관심 주식 목록 필터링
  const filterFavoriteStocks = (
    stocks: IStock[],
    favoriteStockCode: Set<string>
  ) => {
    return stocks?.filter((stock) => favoriteStockCode.has(stock.stockCode));
  };

  // 관심 주식 목록
  const favoriteStock = useMemo(() => {
    const favoriteAllStock = filterFavoriteStocks(allStock, favoriteStockCode);
    const favoriteTop10Stock = filterFavoriteStocks(
      top10Stock,
      favoriteStockCode
    );
    return [...favoriteAllStock, ...favoriteTop10Stock];
  }, [allStock, top10Stock, favoriteStockCode]);


  return (
    <>
      <StockHeader>관심 종목</StockHeader>
      <HrTag />
      {favoriteStock?.length === 0 ? (
        <TextCenter>상세 페이지에서 관심 종목을 추가해 보세요.</TextCenter>
      ) : (
        <StockGridColumn>
          {favoriteStock?.map((stock: IStock, index: number) => (
            <FavoriteStock key={index} stock={stock} />
          ))}
        </StockGridColumn>
      )}
    </>
  );
};

export default FavoriteStockSection;
