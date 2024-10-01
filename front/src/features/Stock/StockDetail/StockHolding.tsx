import { authRequest } from '@api/axiosInstance';
import {
  useSuspenseQuery,
  UseSuspenseQueryResult,
} from '@tanstack/react-query';
import { useState } from 'react';
import {
  HrTag,
  HoldingStockCardRow,
  HoldingStockGridRow,
  StockHeader,
  StockImage,
  HoldingStockPrev,
  StockTitle,
  Text,
  TextLeft,
} from '@features/Stock/styledComponent';
import { formatNumber } from '@utils/formatNumber';
import { formatChange } from '@utils/formatChange';
import blueLogo from '@assets/Stock/blueLogo.png';

interface IStockHolding {
  stockId: number;
  stockCode: string;
  stockName: string;
  stockHoldingBuyAmount: number;
  stockHoldingBuyPrice: number;
  stockHoldingChange: number;
  stockHoldingChangeRate: number;
}

interface IApiStockHolding {
  success: boolean;
  data?: IStockHolding;
  errorMsg?: string;
}

const fetchStockHolding = async (
  stockCode: string
): Promise<IApiStockHolding> => {
  const response = await authRequest.get<IApiStockHolding>(
    `/stock/my-holding/${stockCode}`
  );
  return response.data;
};

const useStockHoldingQuery = (
  stockCode: string,
  options: {
    enabled?: boolean;
    refetchInterval?: number;
    onError?: (error: Error) => void;
    onSuccess?: (data: IApiStockHolding) => void;
  } = {}
): UseSuspenseQueryResult<IApiStockHolding, Error> => {
  return useSuspenseQuery<IApiStockHolding, Error>({
    queryKey: ['my-Holding', stockCode],
    queryFn: () => fetchStockHolding(stockCode),
    retry: 3,
    ...options,
  });
};

const StockHolding = ({ stockCode }: { stockCode: string }) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // 에러 메시지 상태
  const { data } = useStockHoldingQuery(stockCode, {
    onSuccess: (data) => {
      if (!data.success || !data.data) {
        setErrorMessage('주식 정보를 찾을 수 없습니다.');
      }
    },
    onError: (error) => {
      // 404 외 다른 에러 처리
      console.error(error);
      setErrorMessage('데이터를 불러오는 중 문제가 발생했습니다.');
      console.log('errorMessage', errorMessage);
    },
  });

  const stock = data?.data;

  // 이미지 URL 생성 함수
  const getStockImageUrl = () => {
    if (!stock) return '';
    const url = `https://thumb.tossinvest.com/image/resized/96x0/https%3A%2F%2Fstatic.toss.im%2Fpng-icons%2Fsecurities%2Ficn-sec-fill-${stock.stockCode}.png`;
    return url;
  };

  return (
    <>
      <StockHeader> 나의 {stock?.stockName} 보유 내역</StockHeader>
      <HrTag />
      <HoldingStockGridRow>
        <HoldingStockCardRow>
          <TextLeft>종목명</TextLeft>
          <Text>보유 수량</Text>
          <Text>1주 평균 구매</Text>
          <Text>투자금</Text>
          <Text>평가 금액</Text>
        </HoldingStockCardRow>
        {stock && (
          <HoldingStockCardRow>
            <StockTitle>
              <StockImage
                src={getStockImageUrl()}
                onError={(e) => (e.currentTarget.src = blueLogo)}
                alt=""
              />
              {stock.stockName}
            </StockTitle>
            <Text>{formatNumber(stock.stockHoldingBuyAmount)}주</Text>
            <Text>{formatNumber(stock.stockHoldingBuyPrice)}원</Text>
            <Text>{formatNumber(stock.stockHoldingBuyPrice * stock.stockHoldingBuyAmount)}원</Text>
            <HoldingStockPrev
              $isPositive={stock.stockHoldingChange.toString().startsWith('-')}
            >
              {formatChange(formatNumber(stock.stockHoldingChange))}원 ({(stock.stockHoldingChangeRate.toFixed(2))}%)
            </HoldingStockPrev>
          </HoldingStockCardRow>
        )}
      </HoldingStockGridRow>
    </>
  );
};
export default StockHolding;
