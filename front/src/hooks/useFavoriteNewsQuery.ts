import { useQuery } from '@tanstack/react-query';
import { authRequest } from '@api/axiosInstance';

// 1. 타입 정의

export interface StockNews {
  id: number;
  article: string;
  description: string;
  industry: string;
  media: string;
  sentiment: string;
  subtitle: string | null;
  thumbnail: string;
  title: string;
  uploadDatetime: string;
  stockNewsStockCodes: string[];
  stockKeywords: string[];
}

export interface IndustryNews {
  id: number;
  article: string;
  description: string;
  industry: string;
  media: string;
  sentiment: string;
  subtitle: string | null;
  thumbnail: string;
  title: string;
  uploadDatetime: string;
}

interface NewsApiResponse<T> {
  success: boolean;
  data: T[];
}

// 2. API 호출 함수

// 주식 뉴스 즐겨찾기 데이터를 가져오는 함수
const fetchStockNews = async (): Promise<StockNews[]> => {
  const response = await authRequest.get<NewsApiResponse<StockNews>>(
    '/news/favorite/stock'
  );
  return response.data.data;
};

// 산업 뉴스 즐겨찾기 데이터를 가져오는 함수
const fetchIndustryNews = async (): Promise<IndustryNews[]> => {
  const response = await authRequest.get<NewsApiResponse<IndustryNews>>(
    '/news/favorite/industry'
  );
  return response.data.data;
};

// 3. React Query 훅

// 주식 뉴스 즐겨찾기 데이터를 가져오는 커스텀 훅
export const useStockNews = () => {
  return useQuery<StockNews[], Error>({
    queryKey: ['favoriteStockNews'],
    queryFn: fetchStockNews,
  });
};

// 산업 뉴스 즐겨찾기 데이터를 가져오는 커스텀 훅
export const useIndustryNews = () => {
  return useQuery<IndustryNews[], Error>({
    queryKey: ['favoriteIndustryNews'],
    queryFn: fetchIndustryNews,
  });
};
