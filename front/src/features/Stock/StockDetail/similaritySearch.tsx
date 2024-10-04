import { useForm } from 'react-hook-form';
import { SimilarityFormValues } from '@features/Stock/types';
import { useSimilaritySearchQuery } from '@hooks/useSimilaritySearchQuery';
import BaseStock from '@features/Stock/StockDetail/similaritySearch/BaseStock';
import OtherStock from '@features/Stock/StockDetail/similaritySearch/OtherStock';
import { useStockChartQuery } from '@hooks/useStockChartQuery';
import SelectionStock from '@features/Stock/StockDetail/similaritySearch/SelectionStock';
import { FlexWrapBetween } from '@components/styledComponent';

interface SimilaritySearchProps {
  stockCode: string;
}

const SimilaritySearch = ({ stockCode }: SimilaritySearchProps) => {
  const { register, handleSubmit, watch } = useForm<SimilarityFormValues>();

  const { start_date, end_date } = watch();

  // 유사도 데이터
  const { data, isPending, error } = useSimilaritySearchQuery({
    stockCode,
    start_date,
    end_date,
  });

  // 기준 데이터
  const { data: selectionData } = useStockChartQuery(stockCode, {
    startDate: start_date,
    endDate: end_date,
  });

  const onSubmit = handleSubmit((data) => {
    console.log('Submitted data: ', data);
  });

  if (isPending) return <p>Loading...</p>;
  if (error) return <p>Error occurred: {(error as Error).message}</p>;

  return (
    <>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="start_date">Start Date:</label>
          <input
            id="start_date"
            type="date"
            {...register('start_date')}
            required
          />
        </div>

        <div>
          <label htmlFor="end_date">End Date:</label>
          <input id="end_date" type="date" {...register('end_date')} required />
        </div>

        <button type="submit">Search</button>
      </form>

      {data && (
        <FlexWrapBetween>
          <SelectionStock
            selectionStock={selectionData ?? []}
            stockCode={stockCode}
            startDate={start_date}
            endDate={end_date}
          />
          <BaseStock baseStock={data.baseStock} />
          {data.otherStock.map((otherStock) => (
            <OtherStock key={otherStock.stockCode} otherStock={otherStock} />
          ))}
        </FlexWrapBetween>
      )}
    </>
  );
};

export default SimilaritySearch;
