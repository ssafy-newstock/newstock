import { HoldingStockCardRow, HoldingStockGridRow, HrTag } from "@features/Stock/styledComponent";

const StockHoldingSkeleton = () => {
  return (
    <>
      <HrTag />
      <HoldingStockGridRow>
        <HoldingStockCardRow/>
        <HoldingStockCardRow/>
      </HoldingStockGridRow>
    </>
  );
};
export default StockHoldingSkeleton;
