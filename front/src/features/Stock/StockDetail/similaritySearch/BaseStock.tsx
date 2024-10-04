import { IDaily, ISimilarityStockData } from '@features/Stock/types';
import SimilarityChart from '@features/Stock/StockDetail/similaritySearch/SimilarityChart';

const BaseStock = ({ baseStock, selectionStock }: { baseStock: ISimilarityStockData, selectionStock: IDaily[]}) => {
  return (
    <div>
      <h1>{baseStock.stockCode}</h1>
      <h1>{baseStock.similarityScore}</h1>
      <h1>
        {baseStock.startDate} - {baseStock.endDate}
      </h1>
      <SimilarityChart stock={baseStock.candleData} selectionStock={selectionStock}/>
    </div>
  );
};

export default BaseStock;
