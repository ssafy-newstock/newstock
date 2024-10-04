import { IDaily } from "@features/Stock/types";
import SimilarityChart from "@features/Stock/StockDetail/similaritySearch/SimilarityChart";

interface SelectionStockProps {
  selectionStock: IDaily[];
  stockCode: string;
  startDate: string;
  endDate: string;
}

const SelectionStock = ({ selectionStock, stockCode, startDate, endDate }:SelectionStockProps) => {
  return (
    <div>
      <h1>{stockCode}</h1>
      <h1>{startDate}-{endDate}</h1>
      <SimilarityChart selectionStock={selectionStock} />
    </div>
  );
}

export default SelectionStock;