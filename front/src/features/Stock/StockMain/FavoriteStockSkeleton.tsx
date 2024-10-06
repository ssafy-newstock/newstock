import {
  HrTag,
  StockCardColumnSkeleton,
  StockGridColumn,
  StockHeader,
} from '@features/Stock/styledComponent';

const FavoriteStockSkeleton = () => {
  return (
    <>
      <StockHeader>관심 종목</StockHeader>
      <HrTag />
      <StockGridColumn>
        {Array.from({ length: 5 }).map((_, index) => (
          <StockCardColumnSkeleton key={index} />
        ))}
      </StockGridColumn>
    </>
  );
};

export default FavoriteStockSkeleton;
