import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '@api/axiosInstance';
import { IDaily } from '@features/Stock/types';
import { ChartDateParams } from '@features/Stock/types';


const fetchStockCandleData = async (stockCode: string, { startDate, endDate }: ChartDateParams): Promise<IDaily[]> => {
  const { data } = await axiosInstance.get(`/stock/${stockCode}/candle`, {
    params: { startDate, endDate },
  });
  return data.data;
};

export const useStockChartQuery = (stockCode: string, params: ChartDateParams) => 
  useQuery<IDaily[]>({
    queryKey: ['stockDailyChart', stockCode, params.startDate, params.endDate],
    queryFn: () => fetchStockCandleData(stockCode, params),
  });
