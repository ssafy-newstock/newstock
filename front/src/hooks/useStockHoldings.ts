import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// 주식 보유 내역 데이터 타입 정의
interface StockHolding {
  stockId: number;
  stockCode: string;
  stockName: string;
  stockHoldingBuyAmount: number;
  stockHoldingBuyPrice: number;
  stockHoldingChange: number;
  stockHoldingChangeRate: number;
}

// API 응답 데이터 타입 정의
interface ApiResponse {
  success: boolean;
  data: {
    stockMyPageHoldingDtoList: StockHolding[];
    stockMyPageTransactionDtoList: any[]; // 필요에 따라 타입 정의
  };
}

// 주식 보유 내역 데이터를 가져오는 함수
const fetchStockHoldings = async (): Promise<StockHolding[]> => {
  // 실제 API 엔드포인트로 교체하세요
  // const response = await axios.get<ApiResponse>('https://api.example.com/your-endpoint');
  // return response.data.data.stockMyPageHoldingDtoList;

  // 예제용 정적 데이터
  return [
    {
      stockId: 294,
      stockCode: '005930',
      stockName: '삼성전자',
      stockHoldingBuyAmount: 2,
      stockHoldingBuyPrice: 63700,
      stockHoldingChange: -100,
      stockHoldingChangeRate: -0.15698587127158556,
    },
    {
      stockId: 610,
      stockCode: '035720',
      stockName: '카카오',
      stockHoldingBuyAmount: 3,
      stockHoldingBuyPrice: 35350,
      stockHoldingChange: -150,
      stockHoldingChangeRate: -0.4243281471004243,
    },
    {
      stockId: 662,
      stockCode: '035725',
      stockName: '삼성화재',
      stockHoldingBuyAmount: 5,
      stockHoldingBuyPrice: 72160,
      stockHoldingChange: -150,
      stockHoldingChangeRate: -0.4243281471004243,
    },
    {
      stockId: 456,
      stockCode: '035722',
      stockName: '셀트리온',
      stockHoldingBuyAmount: 6,
      stockHoldingBuyPrice: 123450,
      stockHoldingChange: -150,
      stockHoldingChangeRate: -0.4243281471004243,
    },
    {
      stockId: 643,
      stockCode: '035723',
      stockName: '현대자동차',
      stockHoldingBuyAmount: 7,
      stockHoldingBuyPrice: 243240,
      stockHoldingChange: 3000,
      stockHoldingChangeRate: 3.32131252,
    },
    {
      stockId: 123,
      stockCode: '035721',
      stockName: 'SK 하이닉스',
      stockHoldingBuyAmount: 7,
      stockHoldingBuyPrice: 12450,
      stockHoldingChange: -150,
      stockHoldingChangeRate: -0.4243281471004243,
    },
  ];
};

// 커스텀 훅
export const useStockHoldings = () => {
  return useQuery<StockHolding[], Error>({
    queryKey: ['stockHoldings'],
    queryFn: fetchStockHoldings,
    refetchInterval: 60000, // 60초마다 데이터 다시 가져오기 (필요에 따라 조정)
    // 기타 옵션 추가 가능
  });
};
