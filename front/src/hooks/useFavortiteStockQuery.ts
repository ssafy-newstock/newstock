import { authRequest } from '@api/axiosInstance';
import { IApiFavorite } from '@features/Stock/types';
import {
  UseSuspenseQueryResult,
  useSuspenseQuery,
} from '@tanstack/react-query';

const fetchFavoriteStock = () =>
  authRequest.get<IApiFavorite>('/stock/favorite').then((res) => res.data);

export const useFavoriteStockQuery = (
  options: {
    enabled?: boolean;
    refetchInterval?: number;
    onError?: (error: Error) => void;
    onSuccess?: (data: IApiFavorite) => void;
  } = {}
): UseSuspenseQueryResult<IApiFavorite, Error> => {
  return useSuspenseQuery<IApiFavorite, Error>({
    queryKey: ['favoriteStockList'],
    queryFn: fetchFavoriteStock,
    gcTime: 1000 * 60 * 5, // 기본값 5분
    retry: 3, // 재시도 3번
    ...options, // 추가 옵션 사용
  });
};
