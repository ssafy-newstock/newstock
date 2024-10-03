import {
  HoldingStockCardRowNone,
  HoldingStockGridRow,
  HrTag,
  Text,
} from '@features/Stock/styledComponent';

const StockHoldingError = () => {
  return (
    <>
      <HrTag />
      <HoldingStockGridRow>
        <HoldingStockCardRowNone>
          <Text>해당 종목의 보유 주식이 없습니다.</Text>
        </HoldingStockCardRowNone>
      </HoldingStockGridRow>
    </>
  );
};

export default StockHoldingError;
