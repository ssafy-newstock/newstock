import { axiosInstance } from '@api/axiosInstance';
import { IApiStock } from '@features/Stock/types';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

const fetchTop10Stock = () =>
  axiosInstance
    .get<IApiStock>('/stock/price-list/live')
    .then((res) => res.data);

export const useTop10StockQuery = (
  options: {
    enabled?: boolean;
    refetchInterval?: number;
    onError?: (error: Error) => void;
    onSuccess?: (data: IApiStock) => void;
  } = {}
): UseQueryResult<IApiStock, Error> => {
  return useQuery<IApiStock, Error>({
    queryKey: ['top10StockData'],
    queryFn: fetchTop10Stock,
    // staleTime: 1000 * 60 * 1, // 기본값 0(신선한 데이터)
    gcTime: 1000 * 60 * 5, // 기본값 5분
    retry: 3, // 재시도 3번
    ...options, // 추가 옵션 사용
  });
};
