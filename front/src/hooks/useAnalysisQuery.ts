import { axiosInstance } from '@api/axiosInstance';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

interface IStockParmas {
  stockCode: string;
  stockName: string;
}

interface IAnalysisParams {
  analysisStock: IStockParmas;
  startDate: string;
  endDate: string;
}

interface IRelatedNews {
  id: number;
  upload_datetime: string;
  title: string;
  sentiment: number;
  thumbnail: string;
  media: string;
}

interface IAnalysisResponse {
  macroReport: string;
  microReport: string;
  relatedNews: IRelatedNews[];
}

// 공통 파라미터 생성 함수
const createParams = ({ analysisStock, startDate, endDate }: IAnalysisParams) => ({
  params: {
    base_stock_code: analysisStock.stockCode,
    stock_name: analysisStock.stockName,
    start_date: startDate,
    end_date: endDate,
  },
});

// API 호출 함수
const fetchAnalysis = async (
  params: IAnalysisParams
): Promise<IAnalysisResponse> => {
  try {
    const { data } = await axiosInstance.get<IAnalysisResponse>(
      '/newsai/summary',
      createParams(params)
    );
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 404) {
        return {
          macroReport: '',
          microReport: '',
          relatedNews: [],
        };
      }
      throw error;
    }
    throw new Error('알 수 없는 오류가 발생했습니다.');
  }
};

type AnalysisQueryKey = readonly [
  'analysis',
  string,
  string,
  string,
  string
];

// Custom Hook
export const useAnalysisQuery = (
  params: IAnalysisParams,
  options?: Omit<
    UseQueryOptions<
      IAnalysisResponse,
      AxiosError,
      IAnalysisResponse,
      AnalysisQueryKey
    >,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery<
    IAnalysisResponse,
    AxiosError,
    IAnalysisResponse,
    AnalysisQueryKey
  >({
    queryKey: [
      'analysis',
      params.analysisStock.stockCode,
      params.analysisStock.stockName,
      params.startDate,
      params.endDate,
    ],
    queryFn: () => fetchAnalysis(params),
    enabled: Boolean(params.analysisStock.stockCode && params.analysisStock.stockName && params.startDate && params.endDate),
    staleTime: Infinity,
    ...options,
  });
};