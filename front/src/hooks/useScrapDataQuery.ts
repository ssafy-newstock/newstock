// useScrapDataQuery.ts
import { useQuery } from '@tanstack/react-query';
import { authRequest } from '@api/axiosInstance';
import { ScrapData, NewsData } from '@features/News/ScrapNewsInterface';

interface ScrapResponse {
  scraps: ScrapData[];
  scrapInNews: NewsData[];
}

// 시황 뉴스 스크랩 데이터 조회 훅
export const useScrapData = (page: number = 1, size: number = 10) => {
  return useQuery<ScrapResponse, Error>(
    ['scrapData', page, size],
    async () => {
      const response = await authRequest.get(`/news/scrap/industry`, {
        params: {
          page,
          size,
        },
      });

      if (!response.data.success) {
        throw new Error('시황 뉴스 스크랩 데이터 조회에 실패했습니다.');
      }

      return {
        scraps: response.data.data.scraps,
        scrapInNews: response.data.data.scrapInNews,
      };
    },
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  );
};

// 종목 뉴스 스크랩 데이터 조회 훅
export const useScrapStockData = (page: number = 1, size: number = 10) => {
  return useQuery<ScrapResponse, Error>(
    ['scrapStockData', page, size],
    async () => {
      const response = await authRequest.get(`/news/scrap/stock`, {
        params: {
          page,
          size,
        },
      });

      if (!response.data.success) {
        throw new Error('종목 뉴스 스크랩 데이터 조회에 실패했습니다.');
      }

      return {
        scraps: response.data.data.scraps,
        scrapInNews: response.data.data.scrapInNews,
      };
    },
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  );
};
