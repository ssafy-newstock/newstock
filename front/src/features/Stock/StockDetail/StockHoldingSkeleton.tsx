import { HoldingStockCardRowSkeleton, HoldingStockGridRow, HrTag } from "@features/Stock/styledComponent";

const StockHoldingSkeleton = () => {
  return (
    <>
      <HrTag />
      <HoldingStockGridRow>
        <HoldingStockCardRowSkeleton/>
        <HoldingStockCardRowSkeleton/>
      </HoldingStockGridRow>
    </>
  );
};
export default StockHoldingSkeleton;
