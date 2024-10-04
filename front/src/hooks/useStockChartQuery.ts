// hooks/useStockChartData.ts
import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '@api/axiosInstance';
import { toast } from 'react-toastify';
import { IDaily, IStock } from '@features/Stock/types';

interface DateParams {
  startDate: string;
  endDate: string;
}

const fetchStockCandleData = async (stock: IStock, params: DateParams): Promise<IDaily[]> => {
  const response = await axiosInstance.get(
    `/stock/${stock.stockCode}/candle`,
    { params }
  );
  return response.data.data;
};

export const useStockChartQuery = (stock: IStock, params: DateParams) => {
  return useQuery<IDaily[]>({
    queryKey: [
      'stockDailyChart',
      stock.stockCode,
      params.startDate,
      params.endDate,
    ],
    queryFn: async () => {
      const data = await fetchStockCandleData(stock, params);
      toast.success(`${stock.stockName} 조회 완료`);
      return data;
    },
  });
};