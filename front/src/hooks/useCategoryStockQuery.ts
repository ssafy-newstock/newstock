import { axiosInstance } from '@api/axiosInstance';
import { IApiCategory } from '@features/Stock/types';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

const fetchIndustry = () =>
  axiosInstance
    .get<IApiCategory>('/stock/industry-list')
    .then((res) => res.data);

export const useCategoryStockQuery = (
  options: {
    enabled?: boolean;
    refetchInterval?: number;
    onError?: (error: Error) => void;
    onSuccess?: (data: IApiCategory) => void;
  } = {}
): UseQueryResult<IApiCategory, Error> => {
  return useQuery<IApiCategory, Error>({
    queryKey: ['categoryStockData'],
    queryFn: fetchIndustry,
    // staleTime: 1000 * 60 * 1, // 기본값 0(신선한 데이터)
    gcTime: 1000 * 60 * 5, // 기본값 5분
    retry: 3, // 재시도 3번
    ...options, // 추가 옵션 사용
  });
};
