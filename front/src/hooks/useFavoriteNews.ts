import { axiosInstance } from '@api/axiosInstance';
import { useQuery } from '@tanstack/react-query';
// 시황 뉴스 관심 리스트 응답 타입
interface IndustryNews {
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

// 종목 뉴스 관심 리스트 응답 타입
interface StockNews {
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
  stockNewsStockCodes: { stockCode: string; stockName: string }[];
  stockKeywords: string[];
}

// 시황 뉴스 관심 리스트 조회 API 호출 함수
const fetchFavoriteIndustryNews = async (): Promise<IndustryNews[]> => {
  const response = await axiosInstance.get<{
    success: boolean;
    data: IndustryNews[];
  }>('/api/news/favorite/industry/list');
  return response.data.data;
};

// 종목 뉴스 관심 리스트 조회 API 호출 함수
const fetchFavoriteStockNews = async (): Promise<StockNews[]> => {
  const response = await axiosInstance.get<{
    success: boolean;
    data: StockNews[];
  }>('/api/news/favorite/stock/list');
  return response.data.data;
};

// 시황 뉴스 관심 리스트 훅
export const useFavoriteIndustryNews = () => {
  return useQuery<IndustryNews[], Error>({
    queryKey: ['favoriteIndustryNews'],
    queryFn: fetchFavoriteIndustryNews,
  });
};

// 종목 뉴스 관심 리스트 훅
export const useFavoriteStockNews = () => {
  return useQuery<StockNews[], Error>({
    queryKey: ['favoriteStockNews'],
    queryFn: fetchFavoriteStockNews,
  });
};
