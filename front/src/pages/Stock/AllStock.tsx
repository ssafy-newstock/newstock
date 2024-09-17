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


const AllStockPage = () => {
  const { data: allStockData, isLoading: isAllStockLoading } = useQuery({
    queryKey: ['allStockData'],
    queryFn: async () => {
      const response = await axios.get(
        'http://newstock.info/api/stock/price-list'
      );
      return response.data;
    },
  });

  if (isAllStockLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <LeftStock />
      <Center>
        <StockHeader>전체 종목</StockHeader>
        <HrTag />
        <StockGridRow>
          <AllStockFirstRow />
          {allStockData?.data.map((stock: IStock, index: number) => (
            <AllStock key={index} stock={stock} />
          ))}
        </StockGridRow>
      </Center>
      <RightVacant />
    </>
  );
};

export default AllStockPage;