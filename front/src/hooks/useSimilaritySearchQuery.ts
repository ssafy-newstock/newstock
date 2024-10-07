import { useQuery } from '@tanstack/react-query';
import {
  SimilaritySearchParams,
  SimilaritySearchResponse,
} from '@features/Stock/types';
import axios from 'axios';

export function useSimilaritySearchQuery(
  params: SimilaritySearchParams,
  isEnabled: boolean = false
) {
  const { stockCode, start_date, end_date } = params;

  return useQuery<SimilaritySearchResponse>({
    queryKey: ['similaritySearch', stockCode, start_date, end_date],
    queryFn: async () => {
      // const { data } = await axiosInstance.get<SimilaritySearchResponse>('/newsai/similarity', {
      const { data } = await axios.get<SimilaritySearchResponse>(
        'https://j11c207a.p.ssafy.io/api/newsai/similarity',
        {
          params: { base_stock_code: stockCode, start_date, end_date },
        }
      );
      return data;
    },
    enabled: isEnabled && Boolean(stockCode && start_date && end_date),
  });
}
