import { axiosInstance } from '@api/axiosInstance';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export interface INewsResponse {
  success: boolean;
  data: IStockNews[];
}

export interface IStockNews {
  id: string;
  article: string;
  description: string;
  media: string;
  sentiment: number;
  subtitle: string | null;
  thumbnail: string;
  title: string;
  uploadDatetime: string;
  stockNewsStockCodes: string[];
  stockKeywords: string[];
}

// API 호출 함수
const fetchTop4News = async (): Promise<INewsResponse | null> => {
  try {
    const { data } = await axiosInstance.get<INewsResponse>(
      '/news/stock/top4',
    );
    return data;
  } catch (error) {
    console.error('뉴스 데이터 fetch 중 에러 발생:', error);
    return null;
  }
};

// Custom Hook
export const useTop4NewsQuery = (
  options?: Omit<
    UseQueryOptions<
      INewsResponse | null,
      AxiosError,
      INewsResponse | null
    >,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery<
    INewsResponse | null,
    AxiosError,
    INewsResponse | null
  >({
    queryKey: ['top4News'],
    queryFn: fetchTop4News,
    staleTime: Infinity,
    ...options,
  });
};