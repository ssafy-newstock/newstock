import { useForm } from 'react-hook-form';
import { SimilarityFormValues } from '@features/Stock/types';
import { useSimilaritySearchQuery } from '@hooks/useSimilaritySearchQuery';
import SimilarityChart from '@features/Stock/StockDetail/similaritySearch/SimilarityChart';

interface SimilaritySearchProps {
  stockCode: string;
}

const SimilaritySearch = ({ stockCode }: SimilaritySearchProps) => {
  const { register, handleSubmit, watch } = useForm<SimilarityFormValues>();

  const { start_date, end_date } = watch();

  const { data, isPending, error } = useSimilaritySearchQuery({
    stockCode,
    start_date,
    end_date,
  });

  // const baseStock = data?.baseStock;
  // const otherStocks = data?.otherStock

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
        <div style={{display:'flex'}}>
          <div>
            <h1>{data.baseStock.stockCode}</h1>
            <h1>{data.baseStock.similarityScore}</h1>
            <h1>
              {data.baseStock.startDate} - {data.baseStock.endDate}
            </h1>
            <SimilarityChart stock={data.baseStock.candleData} />
          </div>

          {data.otherStock.map((otherstock) => (
            <div>
              <h1>{otherstock.stockCode}</h1>
              <h1>{otherstock.similarityScore}</h1>
              <h1>
                {otherstock.startDate} - {otherstock.endDate}
              </h1>
              <SimilarityChart stock={otherstock.candleData} />
            </div>
          ))}
        </div>
      )}
      {/* <h3>Similarity Search Results:</h3>
      <pre>{JSON.stringify(data, null, 2)}</pre> */}
    </>
  );
};

export default SimilaritySearch;
