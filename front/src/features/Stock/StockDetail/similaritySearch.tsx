import { useForm } from 'react-hook-form';
import { useSuspenseQuery } from '@tanstack/react-query';
import axios from 'axios';

interface FormValues {
  start_date: string;
  end_date: string;
}

interface SimilaritySearchProps {
  stockCode: string;
}

const fetchSimilarityData = async ({
  stockCode,
  start_date,
  end_date,
}: {
  stockCode: string;
  start_date?: string;
  end_date?: string;
}) => {
  if (!start_date || !end_date) return null;
  
  const { data } = await axios.get(`http://localhost:8001/similarity`, {
    params: { base_stock_code: stockCode, start_date, end_date },
  });
  return data;
};

const SimilaritySearch = ({ stockCode }: SimilaritySearchProps) => {
  const { register, handleSubmit, watch } = useForm<FormValues>();

  const { start_date, end_date } = watch();

  const { data, isPending, error } = useSuspenseQuery({
    queryKey: ['similaritySearch', stockCode, start_date, end_date],
    queryFn: () => fetchSimilarityData({ stockCode, start_date, end_date }),
  });

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
          <h3>Similarity Search Results:</h3>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default SimilaritySearch;