// hooks/useStockChartData.ts
import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '@api/axiosInstance';
import { IDaily } from '@features/Stock/types';

interface DateParams {
  startDate: string;
  endDate: string;
}

const fetchStockCandleData = async (stockCode: string, params: DateParams): Promise<IDaily[]> => {
  const response = await axiosInstance.get(
    `/stock/${stockCode}/candle`,
    { params }
  );
  return response.data.data;
};

export const useStockChartQuery = (stockCode: string, params: DateParams) => {
  return useQuery<IDaily[]>({
    queryKey: [
      'stockDailyChart',
      stockCode,
      params.startDate,
      params.endDate,
    ],
    queryFn: async () => {
      const data = await fetchStockCandleData(stockCode, params);
      // toast.success(`${stock.stockName} 조회 완료`);
      return data;
    },
  });
};