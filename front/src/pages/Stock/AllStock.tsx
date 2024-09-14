import { Center } from '@components/Center';
import LeftStock from '@components/LeftStock';
import { Right } from '@components/Right';
import AllStock, { AllStockFirstRow } from '@features/Stock/AllStock/AllStock';
import {
  HrTag,
  StockGridRow,
  StockHeader,
} from '@features/Stock/styledComponent';
import { IStock } from '@features/Stock/types';
import { stockData } from '@features/Stock/stock';


const AllStockPage = () => {
  return (
    <>
      <LeftStock />
      <Center>
        <StockHeader>전체 종목</StockHeader>
        <HrTag />
        <StockGridRow>
          <AllStockFirstRow />
          {stockData.map((stock: IStock, index: number) => (
            <AllStock key={index} stock={stock} />
          ))}
        </StockGridRow>
      </Center>
      <Right />
    </>
  );
};

export default AllStockPage;
