import { IDaily, ISimilarityStockData } from '@features/Stock/types';
import SimilarityChart from '@features/Stock/StockDetail/similaritySearch/SimilarityChart';

const OtherStock = ({ otherStock, selectionStock }: { otherStock: ISimilarityStockData, selectionStock: IDaily[] }) => {
  return (
    <div>
      <h1>{otherStock.stockCode}</h1>
      <h1>{otherStock.similarityScore}</h1>
      <h1>
        {otherStock.startDate} - {otherStock.endDate}
      </h1>
      <SimilarityChart stock={otherStock.candleData} selectionStock={selectionStock} />
    </div>
  );
};

export default OtherStock;
