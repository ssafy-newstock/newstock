import { authRequest } from '@api/axiosInstance';
import { useQuery } from '@tanstack/react-query';

interface MemberData {
  memberId: number;
  memberName: string;
  changeRate: number;
}

// 보유 내역 API 응답 타입 정의
interface ApiResponse {
  success: string;
  data: MemberData[];
}

// 보유 수익률 랭킹
const fetchRankHoldingData = async (): Promise<ApiResponse['data']> => {
  const response = await authRequest.get<ApiResponse>('/member/rank/holding');
  return response.data.data;
};

// 매매 수익률 랭킹
const fetchRankTransactionData = async (): Promise<ApiResponse['data']> => {
  const response = await authRequest.get<ApiResponse>(
    '/member/rank/transaction'
  );
  return response.data.data;
};

// 커스텀 훅
export const useRankHoldingData = () => {
  return useQuery<ApiResponse['data'], Error>({
    queryKey: ['rankHoldingData'],
    queryFn: fetchRankHoldingData,
  });
};

export const useRankTransactionData = () => {
  return useQuery<ApiResponse['data'], Error>({
    queryKey: ['rankTransactionData'],
    queryFn: fetchRankTransactionData,
  });
};
