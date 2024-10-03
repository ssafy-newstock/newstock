import { Fragment } from 'react/jsx-runtime';
import { StockCardRowSkeleton } from '@features/Stock/styledComponent';

const RealTimeStockSkeleton = () => {
  return (
    <Fragment>
      {/* StockCardRowSkeleton 10개 반복 */}
      {Array.from({ length: 10 }).map((_, index) => (
        <StockCardRowSkeleton key={index} />
      ))}
    </Fragment>
  );
};

export default RealTimeStockSkeleton;
