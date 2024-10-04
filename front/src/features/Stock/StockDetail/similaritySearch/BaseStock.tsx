import { ISimilarityStockData } from '@features/Stock/types';
import SimilarityChart from '@features/Stock/StockDetail/similaritySearch/SimilarityChart';

const BaseStock = ({ baseStock }: { baseStock: ISimilarityStockData }) => {
  return (
    <div>
      <h1>{baseStock.stockCode}</h1>
      <h1>
        {baseStock.startDate} - {baseStock.endDate}
      </h1>
      <SimilarityChart stock={baseStock.candleData} />
    </div>
  );
};

export default BaseStock;
