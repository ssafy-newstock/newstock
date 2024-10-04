import { useForm } from 'react-hook-form';
import {SimilarityFormValues} from '@features/Stock/types';
import { useSimilaritySearchQuery } from '@hooks/useSimilaritySearchQuery';

interface SimilaritySearchProps {
  stockCode: string;
}

const SimilaritySearch = ({ stockCode }: SimilaritySearchProps) => {
  const { register, handleSubmit, watch } = useForm<SimilarityFormValues>();

  const { start_date, end_date } = watch();

  const { data, isPending, error } = useSimilaritySearchQuery({ stockCode, start_date, end_date });

  // const baseStock = data?.baseStock;
  // const otherStocks = data?.otherStock

  const onSubmit = handleSubmit((data) => {
    console.log('Submitted data: ', data);
  });

  if (isPending) return <p>Loading...</p>;
  if (error) return <p>Error occurred: {(error as Error).message}</p>;

  return (
    <div>
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
          <input
            id="end_date"
            type="date"
            {...register('end_date')}
            required
          />
        </div>

        <button type="submit">Search</button>
      </form>

      {data && (
        <div>
          {/* <h3>Similarity Search Results:</h3>
          <pre>{JSON.stringify(data, null, 2)}</pre> */}
          {data.otherStock.map((otherstock) => (
            <div>
              <h3>{otherstock.stockCode}</h3>
              {otherstock.candleData.map((candle) => (
                <div>
                  <p>{candle.date}</p>
                  <p>Open: {candle.open}</p>
                  <p>Close: {candle.close}</p>
                  <p>High: {candle.high}</p>
                  <p>Low: {candle.low}</p>
                </div>
              ))}
            </div>
          ))}

        </div>
      )}
    </div>
  );
};

export default SimilaritySearch;