import { IDaily } from '@features/Stock/types';
import SimilarityChart from '@features/Stock/StockDetail/similaritySearch/SimilarityChart';
import { useFindStockByCode } from '@utils/uesFindStockByCode';
import { getStockImageUrl } from '@utils/getStockImageUrl';
import blueLogo from '@assets/Stock/blueLogo.png';

interface SelectionStockProps {
  selectionStock: IDaily[];
  stockCode: string;
  startDate: string;
  endDate: string;
}

const SelectionStock = ({
  selectionStock,
  stockCode,
  startDate,
  endDate,
}: SelectionStockProps) => {
  const stock = useFindStockByCode(stockCode);
  return (
    <div>
      <img
        src={getStockImageUrl(stockCode)}
        onError={(e) => (e.currentTarget.src = blueLogo)}
        alt=""
      />
      <h1>{stock?.stockName}</h1>
      <h1>
        {startDate}-{endDate}
      </h1>
      <SimilarityChart selectionStock={selectionStock} />
    </div>
  );
};

export default SelectionStock;
