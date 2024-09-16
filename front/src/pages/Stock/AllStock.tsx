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
import { useLocation } from 'react-router-dom';


const AllStockPage = () => {
  const location = useLocation();
  const { allStockData } = location.state as { allStockData: IStock[] };
  return (
    <>
      <LeftStock />
      <Center>
        <StockHeader>전체 종목</StockHeader>
        <HrTag />
        <StockGridRow>
          <AllStockFirstRow />
          {allStockData.map((stock: IStock, index: number) => (
            <AllStock key={index} stock={stock} />
          ))}
        </StockGridRow>
      </Center>
      <RightVacant />
    </>
  );
};

export default AllStockPage;