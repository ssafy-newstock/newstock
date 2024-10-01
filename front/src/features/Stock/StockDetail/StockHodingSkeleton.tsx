import { HoldingStockCardRow, HoldingStockGridRow, HrTag, StockHeader } from "@features/Stock/styledComponent";

const StockHodingSkeleton = () => {
  return (
    <>
      <StockHeader> 나의 주식 보유 내역</StockHeader>
      <HrTag />
      <HoldingStockGridRow>
        <HoldingStockCardRow/>
        <HoldingStockCardRow/>
      </HoldingStockGridRow>
    </>
  );
};
export default StockHodingSkeleton;
