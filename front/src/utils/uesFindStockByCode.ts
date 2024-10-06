import { useMemo } from 'react';
import useAllStockStore from '@store/useAllStockStore';
import useTop10StockStore from '@store/useTop10StockStore';

export const useFindStockByCode = (stockCode: string) => {
  const { allStock } = useAllStockStore();
  const { top10Stock } = useTop10StockStore();

  const stock = useMemo(() => {
    return (
      allStock?.find((s) => s.stockCode === stockCode) ||
      top10Stock?.find((s) => s.stockCode === stockCode)
    );
  }, [allStock, top10Stock, stockCode]);

  return stock;
};
