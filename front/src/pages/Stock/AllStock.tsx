import { useState, useEffect, useCallback } from 'react';
import { Center } from '@components/Center';
import LeftStock from '@components/LeftStock';
import AllStock, { AllStockFirstRow } from '@features/Stock/AllStock/AllStock';
import {
  HrTag,
  StockGridRow,
  StockHeader,
} from '@features/Stock/styledComponent';
import { IStock } from '@features/Stock/types';
import { RightVacant } from '@components/RightVacant';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';

const ITEMS_PER_PAGE = 15; // 한 번에 표시할 항목 수.

const AllStockPage: React.FC = () => {
  const [displayedItems, setDisplayedItems] = useState<IStock[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const { ref, inView } = useInView();

  const { data: allStockData, isLoading: isAllStockLoading } = useQuery({
    queryKey: ['allStockData'],
    queryFn: async () => {
      const response = await axios.get(
        'http://newstock.info/api/stock/price-list'
      );
      return response.data.data;
    },
  });

  const loadMore = useCallback(() => {
    if (Array.isArray(allStockData)) {
      const nextPage = currentPage + 1;
      const endIndex = nextPage * ITEMS_PER_PAGE;
      setDisplayedItems(allStockData.slice(0, endIndex));
      setCurrentPage(nextPage);
    }
  }, [allStockData, currentPage]);

  useEffect(() => {
    if (Array.isArray(allStockData)) {
      setDisplayedItems(allStockData.slice(0, ITEMS_PER_PAGE));
      setCurrentPage(1);
    }
  }, [allStockData]);

  useEffect(() => {
    if (inView && allStockData && displayedItems.length < allStockData.length) {
      loadMore();
    }
  }, [inView, allStockData, displayedItems.length, loadMore]);

  if (isAllStockLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <LeftStock />
      <Center style={{ paddingBottom: '1rem' }}>
        <StockHeader>전체 종목</StockHeader>
        <HrTag />
        <StockGridRow>
          <AllStockFirstRow />
          {displayedItems.map((stock: IStock, index: number) => (
            <AllStock key={index} stock={stock} />
          ))}
        </StockGridRow>
        {allStockData && displayedItems.length < allStockData.length && (
          <div
            ref={ref}
            style={{ height: '20px', background: 'transparent' }}
          />
        )}
      </Center>
      <RightVacant />
    </>
  );
};

export default AllStockPage;
