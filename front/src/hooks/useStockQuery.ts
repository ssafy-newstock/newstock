import { useQuery, QueryKey } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";

// API 응답 데이터의 기본 형태를 정의하는 타입
interface ApiResponse<T> {
  data: T;
}

// useStockQuery에서 사용할 props의 타입
interface UseStockQueryProps<T> {
  queryKey: QueryKey;
  url: string;
  setData: (data: T) => void;
}

// 리팩토링된 useStockQuery 훅
const useStockQuery = <T,>({ queryKey, url, setData }: UseStockQueryProps<T>) => {
  return useQuery<T>({
    queryKey: [queryKey],
    queryFn: async (): Promise<T> => {
      const response: AxiosResponse<ApiResponse<T>> = await axios.get(url);
      const responseData = response.data.data;
      setData(responseData);
      return responseData;
    },
  });
};

export default useStockQuery;