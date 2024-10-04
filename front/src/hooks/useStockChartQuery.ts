import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '@api/axiosInstance';
import { IApiDaily } from '@features/Stock/types';
import { ChartDateParams } from '@features/Stock/types';

export const useStockChartQuery = (stockCode: string, params: ChartDateParams) => {
  const { startDate, endDate } = params;
  
  return useQuery<IApiDaily>({
    queryKey: ['stockDailyChart', stockCode, startDate, endDate],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/stock/${stockCode}/candle`, {
        params: { startDate, endDate },
      });
      return data;
    },
    enabled: Boolean(stockCode && startDate && endDate),
  });
};