import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { SimilaritySearchParams, SimilaritySearchResponse } from '@features/Stock/types';

export function useSimilaritySearchQuery(params: SimilaritySearchParams, isEnabled: boolean = false) {
  const { stockCode, start_date, end_date } = params;
  
  return useQuery<SimilaritySearchResponse>({
    queryKey: ['similaritySearch', stockCode, start_date, end_date],
    queryFn: async () => {
      const { data } = await axios.get<SimilaritySearchResponse>('http://localhost:8001/similarity', {
        params: { base_stock_code: stockCode, start_date, end_date },
      });
      return data;
    },
    enabled: isEnabled && Boolean(stockCode && start_date && end_date),
  });
}