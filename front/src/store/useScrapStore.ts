import { create } from 'zustand';
import { authRequest } from '@api/axiosInstance';
import { ScrapData, NewsData } from '@features/News/ScrapNewsInterface';
import { toast } from 'react-toastify';

interface ScrapStore {
  scraps: ScrapData[];
  stockScraps: ScrapData[];
  scrapNews: NewsData[]; // 시황 뉴스 스크랩
  scrapStockNews: NewsData[]; // 종목 뉴스 스크랩
  industryScrapDto: ScrapData[];
  industryNewsDto: NewsData[];
  fetchScrapData: (
    page?: number,
    size?: number,
    startDate?: string,
    endDate?: string
  ) => Promise<void>;
  fetchScrapStockData: (
    page?: number,
    size?: number,
    startDate?: string,
    endDate?: string
  ) => Promise<void>;
  createScrap: (
    title: string,
    newsId: string,
    newsType: string,
    content: string
  ) => Promise<void>; // 스크랩 작성 함수
  createStockScrap: (
    title: string,
    newsId: string,
    newsType: string,
    content: string
  ) => Promise<void>;
  // 시황 뉴스 스크랩 삭제
  deleteScrap: (scrapId: number) => Promise<void>;
  // 종목 뉴스 스크랩 삭제
  deleteStockScrap: (scrapId: number) => Promise<void>;
  // 시황 뉴스 스크랩 수정
  updateScrap: (
    scrapId: number,
    title: string,
    newsId: string,
    newsType: string,
    content: string
  ) => Promise<void>;
  // 종목 뉴스 스크랩 수정
  updateStockScrap: (
    scrapId: number,
    title: string,
    newsId: string,
    newsType: string,
    content: string
  ) => Promise<void>;
  // 특정 시황 뉴스 스크랩 조회
  fetchSpecificScrap: (scrapId: number) => Promise<void>;
}

export const useScrapStore = create<ScrapStore>((set) => ({
  scraps: [],
  stockScraps: [],
  scrapNews: [], // 시황 뉴스 스크랩 데이터
  scrapStockNews: [], // 종목 뉴스 스크랩 데이터
  industryScrapDto: [], // 기본값 설정
  industryNewsDto: [], // 기본값 설정

  fetchScrapData: async (
    page = 1,
    size = 10,
    startDate?: string,
    endDate?: string
  ) => {
    try {
      const response = await authRequest.get(`/news/scrap/industry`, {
        params: {
          page,
          size,
          ...(startDate && { startDate }), // 날짜가 선택된 경우에만 포함
          ...(endDate && { endDate }), // 날짜가 선택된 경우에만 포함
        },
      });
      console.log('현재 시황 스크랩 뉴스 : ', response.data.data.scraps);
      set({
        scraps: response.data.data.scraps,
        scrapNews: response.data.data.scrapInNews,
      });
    } catch (error) {
      console.error('스크랩 조회 중 오류 발생:', error);
    }
  },

  // 종목 뉴스 스크랩 조회
  fetchScrapStockData: async (
    page = 1,
    size = 10,
    startDate?: string,
    endDate?: string
  ) => {
    try {
      const response = await authRequest.get(`/news/scrap/stock`, {
        params: {
          page,
          size,
          ...(startDate && { startDate }), // 날짜가 선택된 경우에만 포함
          ...(endDate && { endDate }), // 날짜가 선택된 경우에만 포함
        },
      });
      console.log('현재 종목 스크랩 뉴스 : ', response.data.data.scraps);
      set({
        stockScraps: response.data.data.scraps,
        scrapStockNews: response.data.data.scrapInNews, // 종목 뉴스 스크랩 데이터
      });
    } catch (error) {
      console.error('종목 뉴스 스크랩 조회 중 오류 발생:', error);
    }
  },
  // 스크랩 작성 기능
  createScrap: async (title, newsId, newsType, content) => {
    try {
      const response = await authRequest.post(
        '/news/scrap/industry/write',
        new URLSearchParams({
          title,
          newsId: newsId.toString(),
          newsType,
          content,
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      if (response.data.success) {
        toast.success('스크랩이 성공적으로 작성되었습니다.');
        console.log('스크랩 작성 성공:', response.data.data);
      } else {
        console.error('스크랩 작성 실패:', response.data);
      }
    } catch (error) {
      toast.error('스크랩 작성에 실패했습니다.');
      console.error('스크랩 작성 중 오류 발생:', error);
    }
  },

  // 종목 뉴스 스크랩 작성 기능
  createStockScrap: async (
    title: string,
    newsId: string,
    newsType: string,
    content: string
  ) => {
    try {
      const response = await authRequest.post(
        '/news/scrap/stock/write',
        new URLSearchParams({
          title,
          newsId: newsId.toString(),
          newsType,
          content,
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      if (response.data.success) {
        toast.success('스크랩이 성공적으로 작성되었습니다.');
        console.log('종목 스크랩 작성 성공:', response.data.data);
      } else {
        console.error('종목 스크랩 작성 실패:', response.data);
      }
    } catch (error) {
      toast.error('스크랩 작성에 실패했습니다.');
      console.error('종목 스크랩 작성 중 오류 발생:', error);
    }
  },
  // 시황 뉴스 스크랩 삭제 기능
  deleteScrap: async (scrapId: number) => {
    try {
      const response = await authRequest.delete(
        `/news/scrap/industry/${scrapId}`
      );

      if (response.data.success) {
        toast.success('스크랩이 성공적으로 삭제되었습니다.');
        console.log('시황 뉴스 스크랩 삭제 성공:', response.data.data);
        // 필요시 스토어 업데이트 로직 추가
      } else {
        console.error('시황 뉴스 스크랩 삭제 실패:', response.data);
      }
    } catch (error) {
      toast.error('스크랩 삭제에 실패했습니다.');
      console.error('시황 뉴스 스크랩 삭제 중 오류 발생:', error);
    }
  },

  // 종목 뉴스 스크랩 삭제 기능
  deleteStockScrap: async (scrapId: number) => {
    try {
      const response = await authRequest.delete(`/news/scrap/stock/${scrapId}`);

      if (response.data.success) {
        toast.success('스크랩이 성공적으로 삭제되었습니다.');
        console.log('종목 뉴스 스크랩 삭제 성공:', response.data.data);
        // 필요시 스토어 업데이트 로직 추가
      } else {
        console.error('종목 뉴스 스크랩 삭제 실패:', response.data);
      }
    } catch (error) {
      toast.error('스크랩 삭제에 실패했습니다.');
      console.error('종목 뉴스 스크랩 삭제 중 오류 발생:', error);
    }
  },

  // 시황 뉴스 스크랩 수정 기능 추가
  updateScrap: async (
    scrapId: number,
    title: string,
    newsId: string,
    newsType: string,
    content: string
  ) => {
    try {
      const response = await authRequest.post(
        `/news/scrap/industry/${scrapId}`,
        new URLSearchParams({
          title,
          newsId: newsId.toString(),
          newsType,
          content,
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      if (response.data.success) {
        toast.success('스크랩이 성공적으로 수정되었습니다.');
        console.log('시황 뉴스 스크랩 수정 성공:', response.data.data);
        // 필요시 스토어 업데이트 로직 추가
      } else {
        console.error('시황 뉴스 스크랩 수정 실패:', response.data);
      }
    } catch (error) {
      toast.error('스크랩 수정에 실패했습니다.');
      console.error('시황 뉴스 스크랩 수정 중 오류 발생:', error);
    }
  },

  // 종목 뉴스 스크랩 수정 기능 추가
  updateStockScrap: async (
    scrapId: number,
    title: string,
    newsId: string,
    newsType: string,
    content: string
  ) => {
    try {
      const response = await authRequest.post(
        `/news/scrap/stock/${scrapId}`,
        new URLSearchParams({
          title,
          newsId: newsId.toString(),
          newsType,
          content,
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      if (response.data.success) {
        toast.success('스크랩이 성공적으로 수정되었습니다.');
        console.log('종목 뉴스 스크랩 수정 성공:', response.data.data);
        // 필요시 스토어 업데이트 로직 추가
      } else {
        console.error('종목 뉴스 스크랩 수정 실패:', response.data);
      }
    } catch (error) {
      toast.error('스크랩 수정에 실패했습니다.');
      console.error('종목 뉴스 스크랩 수정 중 오류 발생:', error);
    }
  },

  fetchSpecificScrap: async (scrapId: number) => {
    try {
      const response = await authRequest.get(`/news/scrap/industry/${scrapId}`);

      if (response.data.success) {
        const { industryScrapDto, industryNewsDto } = response.data.data;
        console.log('조회된 스크랩:', industryScrapDto);
        console.log('관련 뉴스:', industryNewsDto);

        // 필요한 경우 스토어에 조회된 데이터 저장 로직 추가
        // 예: set({ scrapNews: [industryNewsDto] });
        set({
          industryScrapDto: response.data.data.scraps,
          industryNewsDto: response.data.data.scrapInNews, // 종목 뉴스 스크랩 데이터
        });
      } else {
        console.error('시황 뉴스 스크랩 조회 실패:', response.data);
      }
    } catch (error) {
      console.error('시황 뉴스 스크랩 조회 중 오류 발생:', error);
    }
  },
}));
