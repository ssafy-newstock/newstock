import { create } from 'zustand';
import { authRequest } from '@api/axiosInstance';
import { toast } from 'react-toastify';

interface NewsDetail {
  id: number; // 뉴스 ID
  title: string; // 뉴스 제목
  media: string; // 미디어 정보
  uploadDatetime: string; // 업로드 날짜
}

// 북마크된 뉴스 상태를 관리하는 인터페이스 정의
interface BookmarkStoreState {
  // ---------> Industry 뉴스 관련 함수
  bookmarkedNewsIds: number[]; // 북마크된 뉴스 ID 배열
  bookmarkedDetailNews: NewsDetail[];
  fetchBookmarkedNews: () => Promise<void>; // 서버에서 북마크된 뉴스 목록을 불러오는 함수
  fetchBookmarkedDetailNews: () => Promise<void>;
  addBookmark: (id: number) => Promise<void>; // 북마크 추가 함수
  removeBookmark: (id: number) => Promise<void>; // 북마크 삭제 함수

  // ------------> Stock 뉴스 관련 함수
  bookmarkedStockNewsIds: number[]; // 북마크된 뉴스 ID 배열
  bookmarkedDetailStockNews: NewsDetail[];
  fetchBookmarkedStockNews: () => Promise<void>; // 서버에서 북마크된 뉴스 목록을 불러오는 함수
  fetchBookmarkedDetailStockNews: () => Promise<void>;
  addStockBookmark: (id: number) => Promise<void>; // 북마크 추가 함수
  removeStockBookmark: (id: number) => Promise<void>; // 북마크 삭제 함수
}

// zustand 스토어 생성
export const useBookmarkStore = create<BookmarkStoreState>((set) => ({
  bookmarkedNewsIds: [], // 기본값은 빈 배열

  // 서버에서 북마크된 뉴스 목록을 불러오는 함수
  fetchBookmarkedNews: async () => {
    try {
      const response = await authRequest.get('/news/favorite/industry'); // 서버로부터 북마크된 뉴스 목록 불러옴
      if (response.data.success) {
        const bookmarkedNews = response.data.data.map(
          (newsItem: { id: number }) => newsItem.id
        );
        set({ bookmarkedNewsIds: bookmarkedNews }); // 상태에 불러온 뉴스 ID 저장
      }
    } catch (error) {
      console.error('Failed to fetch bookmarked news:', error);
      toast.error('북마크 목록을 불러오는 데 실패했습니다.');
    }
  },

  bookmarkedDetailNews: [],

  // 서버에서 북마크된 뉴스 목록을 불러오는 함수
  fetchBookmarkedDetailNews: async () => {
    try {
      const response = await authRequest.get('/news/favorite/industry'); // 서버로부터 북마크된 뉴스 목록 불러옴
      if (response.data.success) {
        // 각 뉴스 아이템을 NewsDetail 인터페이스에 맞게 매핑
        const bookmarkedNews = response.data.data.map(
          (newsItem: NewsDetail) => ({
            id: newsItem.id,
            title: newsItem.title,
            media: newsItem.media,
            uploadDatetime: newsItem.uploadDatetime,
          })
        );
        set({ bookmarkedDetailNews: bookmarkedNews }); // 상태에 불러온 뉴스 상세 정보 저장
      }
    } catch (error) {
      console.error('Failed to fetch bookmarked news details:', error);
      // toast.error('북마크된 뉴스의 세부 정보를 불러오는 데 실패했습니다.');
    }
  },

  // 북마크 추가 함수
  addBookmark: async (id: number) => {
    try {
      const response = await authRequest.post(`/news/favorite/industry/${id}`); // 서버에 북마크 추가 요청
      if (response.data.success) {
        set((state) => ({
          bookmarkedNewsIds: [...state.bookmarkedNewsIds, id], // 상태에 추가된 북마크 ID 저장
        }));
        toast.success('북마크가 성공적으로 등록되었습니다.');
      }
    } catch (error) {
      console.error('Failed to add bookmark:', error);
      toast.error('북마크 등록에 실패했습니다.');
    }
  },

  // 북마크 삭제 함수
  removeBookmark: async (id: number) => {
    try {
      const response = await authRequest.delete(
        `/news/favorite/industry/${id}`
      ); // 서버에 북마크 삭제 요청
      if (response.data.success) {
        set((state) => ({
          bookmarkedNewsIds: state.bookmarkedNewsIds.filter(
            (newsId) => newsId !== id
          ), // 상태에서 삭제된 ID 제거
        }));
        toast.success('북마크가 성공적으로 삭제되었습니다.');
      }
    } catch (error) {
      console.error('Failed to remove bookmark:', error);
      toast.error('북마크 삭제에 실패했습니다.');
    }
  },

  // ---------> Stock 뉴스 관련 상태 및 함수 구현
  bookmarkedStockNewsIds: [], // 기본값은 빈 배열

  // 서버에서 북마크된 Stock 뉴스 목록을 불러오는 함수
  fetchBookmarkedStockNews: async () => {
    try {
      const response = await authRequest.get('/news/favorite/stock'); // 서버로부터 북마크된 Stock 뉴스 목록 불러옴
      if (response.data.success) {
        const bookmarkedNews = response.data.data.map(
          (newsItem: { id: number }) => newsItem.id
        );
        set({ bookmarkedStockNewsIds: bookmarkedNews }); // 상태에 불러온 Stock 뉴스 ID 저장
      }
    } catch (error) {
      console.error('Failed to fetch bookmarked stock news:', error);
      toast.error('북마크 목록을 불러오는 데 실패했습니다.');
    }
  },

  bookmarkedDetailStockNews: [],

  // 서버에서 북마크된 뉴스 목록을 불러오는 함수
  fetchBookmarkedDetailStockNews: async () => {
    try {
      const response = await authRequest.get('/news/favorite/stock'); // 서버로부터 북마크된 뉴스 목록 불러옴
      if (response.data.success) {
        // 각 뉴스 아이템을 NewsDetail 인터페이스에 맞게 매핑
        const bookmarkedNews = response.data.data.map(
          (newsItem: NewsDetail) => ({
            id: newsItem.id,
            title: newsItem.title,
            media: newsItem.media,
            uploadDatetime: newsItem.uploadDatetime,
          })
        );
        set({ bookmarkedDetailStockNews: bookmarkedNews }); // 상태에 불러온 뉴스 상세 정보 저장
      }
    } catch (error) {
      console.error('Failed to fetch bookmarked news details:', error);
      // toast.error('북마크된 종목뉴스의 세부 정보를 불러오는 데 실패했습니다.');
    }
  },

  // Stock 북마크 추가 함수
  addStockBookmark: async (id: number) => {
    try {
      const response = await authRequest.post(`/news/favorite/stock/${id}`); // 서버에 Stock 북마크 추가 요청
      if (response.data.success) {
        set((state) => ({
          bookmarkedStockNewsIds: [...state.bookmarkedStockNewsIds, id], // 상태에 추가된 북마크 ID 저장
        }));
        toast.success('북마크가 성공적으로 등록되었습니다.');
      }
    } catch (error) {
      console.error('Failed to add stock bookmark:', error);
      toast.error('북마크 등록에 실패했습니다.');
    }
  },

  // Stock 북마크 삭제 함수
  removeStockBookmark: async (id: number) => {
    try {
      const response = await authRequest.delete(`/news/favorite/stock/${id}`); // 서버에 Stock 북마크 삭제 요청
      if (response.data.success) {
        set((state) => ({
          bookmarkedStockNewsIds: state.bookmarkedStockNewsIds.filter(
            (newsId) => newsId !== id
          ), // 상태에서 삭제된 Stock ID 제거
        }));
        toast.success('북마크가 성공적으로 삭제되었습니다.');
      }
    } catch (error) {
      console.error('Failed to remove stock bookmark:', error);
      toast.error('북마크 삭제에 실패했습니다.');
    }
  },
}));
