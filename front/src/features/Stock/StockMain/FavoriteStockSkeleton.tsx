import { HrTag, StockCardColumnSkeleton, StockGridColumn, StockHeader } from '@features/Stock/styledComponent';

const FavoriteStockSkeleton = () => {
  return (
    <>
    <StockHeader>관심 종목</StockHeader>
    <HrTag />
      <StockGridColumn>
        <StockCardColumnSkeleton></StockCardColumnSkeleton>
        <StockCardColumnSkeleton></StockCardColumnSkeleton>
        <StockCardColumnSkeleton></StockCardColumnSkeleton>
        <StockCardColumnSkeleton></StockCardColumnSkeleton>
        <StockCardColumnSkeleton></StockCardColumnSkeleton>
      </StockGridColumn>
      </>
  );
}

export default FavoriteStockSkeleton;