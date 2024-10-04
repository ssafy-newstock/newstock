import { ISimilarityStockData } from '@features/Stock/types';
import SimilarityChart from '@features/Stock/StockDetail/similaritySearch/SimilarityChart';

const OtherStock = ({otherStock}: {otherStock: ISimilarityStockData}) => {
  return (
    <div>
      <h1>{otherStock.stockCode}</h1>
      <h1>{otherStock.similarityScore}</h1>
      <h1>
        {otherStock.startDate} - {otherStock.endDate}
      </h1>
      <SimilarityChart stock={otherStock.candleData} />
    </div>
  );
};

export default OtherStock;