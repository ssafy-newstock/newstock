import { authRequest } from '@api/axiosInstance';
import { useQuery } from '@tanstack/react-query';

interface StockHolding {
  stockId: number;
  stockCode: string;
  stockName: string;
  stockHoldingBuyAmount: number;
  stockHoldingBuyPrice: number;
  stockHoldingChange: number;
  stockHoldingChangeRate: number;
}

interface TransactionDto {
  stockId: number;
  stockCode: string;
  stockName: string;
  stockTransactionAmount: number;
  stockTransactionPrice: number;
  stockTransactionTotalPrice: number;
  stockTransactionType: string;
  stockTransactionDate: string;
}

interface StockFavoriteDto {
  stockFavoriteId: number;
  stockId: number;
  stockCode: string;
  stockName: string;
}
// API 응답 데이터 타입 정의
interface ApiResponse {
  success: boolean;
  data: {
    stockMyPageHoldingDtoList: StockHolding[];
    stockMyPageTransactionDtoList: TransactionDto[];
    stockFavoriteDtoList: StockFavoriteDto[];
  };
}

// 보유 내역 API 응답 타입 정의
interface StockHoldingApiResponse {
  status: string;
  data: StockHolding[];
}

// 거래 내역 API 응답 타입 정의
interface TransactionApiResponse {
  status: string;
  data: TransactionDto[];
}

// 찜 목록 API 응답 타입 정의
interface StockFavoriteApiResponse {
  success: string;
  data: StockFavoriteDto[];
}

// 마이페이지 데이터를 가져오는 함수
const fetchMyStockData = async (): Promise<ApiResponse['data']> => {
  const response = await authRequest.get<ApiResponse>('/stock/mypage');
  return response.data.data;
};

// 주식 보유 목록을 가져오는 함수 수정
const fetchMyStockHoldingData = async (): Promise<StockHolding[]> => {
  const response =
    await authRequest.get<StockHoldingApiResponse>('/stock/my-holding');
  return response.data.data; // 배열 반환
};

// 거래 내역 데이터를 가져오는 함수
const fetchMyTransactionData = async (): Promise<TransactionDto[]> => {
  const response = await authRequest.get<TransactionApiResponse>(
    '/api/stock/my-transaction'
  );
  return response.data.data;
};

// 찜 목록 데이터를 가져오는 함수
const fetchMyStockFavoriteData = async (): Promise<StockFavoriteDto[]> => {
  const response = await authRequest.get<StockFavoriteApiResponse>(
    '/api/stock/favorite'
  );
  return response.data.data;
};

// 커스텀 훅
export const useMyStockData = () => {
  return useQuery<ApiResponse['data'], Error>({
    queryKey: ['myStockData'],
    queryFn: fetchMyStockData,
  });
};

export const useMyStockHoldingData = () => {
  return useQuery<StockHolding[], Error>({
    queryKey: ['myStockHolding'],
    queryFn: fetchMyStockHoldingData,
  });
};

// 거래 내역 데이터 커스텀 훅
export const useMyTransactionData = () => {
  return useQuery<TransactionDto[], Error>({
    queryKey: ['myTransactionData'],
    queryFn: fetchMyTransactionData,
  });
};

// 찜 목록 데이터 커스텀 훅
export const useMyStockFavoriteData = () => {
  return useQuery<StockFavoriteDto[], Error>({
    queryKey: ['myStockFavoriteData'],
    queryFn: fetchMyStockFavoriteData,
  });
};
