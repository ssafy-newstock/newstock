import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface StockHolding {
  stockId: number;
  stockCode: string;
  stockName: string;
  stockHoldingBuyAmount: number;
  stockHoldingBuyPrice: number;
  stockHoldingChange: number;
  stockHoldingChangeRate: number;
}

interface TransactionDto {
  stockId: number;
  stockCode: string;
  stockName: string;
  stockTransactionAmount: number;
  stockTransactionPrice: number;
  stockTransactionTotalPrice: number;
  stockTransactionType: string;
  stockTransactionDate: string;
}

// API 응답 데이터 타입 정의
interface ApiResponse {
  success: boolean;
  data: {
    stockMyPageHoldingDtoList: StockHolding[];
    stockMyPageTransactionDtoList: TransactionDto[]; // 필요에 따라 타입 정의
  };
}

// 주식 보유 내역 데이터를 가져오는 함수
const fetchMyStockData = async (): Promise<ApiResponse['data']> => {
  const accessToken =
    'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxMTYxODI2NjI5MTU2MDk4MzY4MjAiLCJyb2xlIjoiUk9MRV9VU0VSIiwibWVtYmVySWQiOjEsImlhdCI6MTcyNjcyOTUwOCwiZXhwIjoxNzI5MzIxNTA4fQ.Pbt8vCn7uiV5KIZAX0XpIEN8Ysi2dTlch0Ty_gWpB8t-STtELADpBcw-oGBfeFoPr1PfbmKX8nI5gjguSJAYmQ';
  const response = await axios.get<ApiResponse>(
    'https://newstock.info/api/stock/mypage',
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return response.data.data;
};

// 예제용 정적 데이터
//   return {
//     stockMyPageHoldingDtoList: [
//       {
//         stockId: 294,
//         stockCode: '005930',
//         stockName: '삼성전자',
//         stockHoldingBuyAmount: 2,
//         stockHoldingBuyPrice: 63700,
//         stockHoldingChange: -100,
//         stockHoldingChangeRate: -0.15698587127158556,
//       },
//       {
//         stockId: 610,
//         stockCode: '035720',
//         stockName: '카카오',
//         stockHoldingBuyAmount: 3,
//         stockHoldingBuyPrice: 35350,
//         stockHoldingChange: -150,
//         stockHoldingChangeRate: -0.4243281471004243,
//       },
//     ],
//     stockMyPageTransactionDtoList: [
//       {
//         stockId: 294,
//         stockCode: '005930',
//         stockName: '삼성전자',
//         stockTransactionAmount: 1,
//         stockTransactionPrice: 63700,
//         stockTransactionTotalPrice: 63700,
//         stockTransactionType: 'BUY',
//         stockTransactionDate: '2024-09-20T11:27:27.24405',
//       },
//       {
//         stockId: 294,
//         stockCode: '005930',
//         stockName: '삼성전자',
//         stockTransactionAmount: 1,
//         stockTransactionPrice: 63800,
//         stockTransactionTotalPrice: 63800,
//         stockTransactionType: 'SELL',
//         stockTransactionDate: '2024-09-20T11:32:11.38858',
//       },
//       {
//         stockId: 610,
//         stockCode: '035720',
//         stockName: '카카오',
//         stockTransactionAmount: 3,
//         stockTransactionPrice: 35350,
//         stockTransactionTotalPrice: 106050,
//         stockTransactionType: 'BUY',
//         stockTransactionDate: '2024-09-20T11:38:31.451143',
//       },
//     ],
//   };

// 커스텀 훅
export const useMyStockData = () => {
  return useQuery<ApiResponse['data'], Error>({
    queryKey: ['data'],
    queryFn: fetchMyStockData,
  });
};
