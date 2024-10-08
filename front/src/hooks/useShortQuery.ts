import { axiosInstance } from '@api/axiosInstance';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

interface IShortParams {
  id: string;
  newsType: string;
}

interface IShortResponse {
  newsOne: string;
  newsTwo: string;
  newsThree: string;
}

// 공통 파라미터 생성 함수
const createParams = ({ id, newsType }: IShortParams) => ({
  params: {
    news_id: id,
    news_type: newsType,
  },
});

// API 호출 함수
const fetchShort = async (params: IShortParams): Promise<IShortResponse> => {
  try {
    const { data } = await axiosInstance.get<IShortResponse>(
      '/newsai/short',
      createParams(params)
    );
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 404) {
        return {
          newsOne: '',
          newsTwo: '',
          newsThree: '',
        };
      }
      throw error;
    }
    throw new Error('알 수 없는 오류가 발생했습니다.');
  }
};

// Custom Hook
export const useShortQuery = (
  params: IShortParams,
  options?: Omit<
    UseQueryOptions<
      IShortResponse,
      AxiosError,
      IShortResponse,
      [string, string, string]
    >,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery<
    IShortResponse,
    AxiosError,
    IShortResponse,
    [string, string, string]
  >({
    queryKey: ['short', params.id, params.newsType],
    queryFn: () => fetchShort(params),
    staleTime: Infinity,
    ...options,
  });
};
