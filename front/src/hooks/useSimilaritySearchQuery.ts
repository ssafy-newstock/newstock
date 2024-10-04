import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { SimilaritySearchParams, SimilaritySearchResponse } from '@features/Stock/types';

const fetchSimilarityData = async ({
  stockCode,
  start_date,
  end_date,
}: SimilaritySearchParams): Promise<SimilaritySearchResponse | null> => {
  if (!start_date || !end_date) return null;
  
  const { data } = await axios.get<SimilaritySearchResponse>('http://localhost:8001/similarity', {
    params: { base_stock_code: stockCode, start_date, end_date },
  });
  return data;
};

export function useSimilaritySearchQuery(params: SimilaritySearchParams) {
  return useQuery({
    queryKey: ['similaritySearch', params.stockCode, params.start_date, params.end_date],
    queryFn: () => fetchSimilarityData(params),
  });
}