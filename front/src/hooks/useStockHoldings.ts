import { axiosInstance } from '@api/axiosInstance';
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

interface stockFavoriteDto {
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
    stockMyPageTransactionDtoList: TransactionDto[]; // 필요에 따라 타입 정의
    stockFavoriteDtoList: stockFavoriteDto[];
  };
}

// 주식 보유 내역 데이터를 가져오는 함수
const fetchMyStockData = async (): Promise<ApiResponse['data']> => {
  const response = await axiosInstance.get<ApiResponse>('/api/stock/mypage');
  return response.data.data;
};

// 커스텀 훅
export const useMyStockData = () => {
  return useQuery<ApiResponse['data'], Error>({
    queryKey: ['data'],
    queryFn: fetchMyStockData,
  });
};
