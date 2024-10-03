import { NewsContainerSkeleton, RowNewsCardSkeleton } from "./styledComponent";

const StockNewsSkeleton = () => {
  return (
    <NewsContainerSkeleton>
      {Array.from({ length: 4 }).map((_, index) => (
        <RowNewsCardSkeleton key={index} />
      ))}
    </NewsContainerSkeleton>
  );
}
export default StockNewsSkeleton;