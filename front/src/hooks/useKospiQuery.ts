import { axiosInstance } from '@api/axiosInstance';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

interface IKospi {
  industryCode: string;
  industryName: string;
  bstpNmixPrpr: string; // 현재가
  bstpNmixPrdyVrss: string; // 전일대비
  bstpNmixPrdyCtrt: string; // 전일대비율
}

// KOSPI 차트 데이터에 대한 타입 정의
interface IKospiChart {
  industryCode: string;
  industryName: string;
  bstpNmixPrpr: string; // 가격
  time: string; // 시간
}

// 전체 데이터 구조에 대한 타입 정의
interface IKospiData {
  kospi: IKospi;
  kospiChart: IKospiChart[];
}

interface IKospiResponse {
  success: boolean;
  data: IKospiData[];
}

// API 호출 함수
const fetchKospi = async (): Promise<IKospiResponse | null> => {
  try {
    const { data } = await axiosInstance.get<IKospiResponse>('/stock/kospi');
    return data;
  } catch (error) {
    console.error('코스피 데이터 fetch 중 에러 발생:', error);
    return null;
  }
};

// Custom Hook
export const useKospiQuery = (
  options?: Omit<
    UseQueryOptions<IKospiResponse | null, AxiosError, IKospiResponse | null>,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery<IKospiResponse | null, AxiosError, IKospiResponse | null>({
    queryKey: ['kospi'],
    queryFn: fetchKospi,
    ...options,
  });
};

export default useKospiQuery;