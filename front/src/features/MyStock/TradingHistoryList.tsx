// src/features/MyStock/TradingHistoryList.tsx

import styled from 'styled-components';
import {
  StockImage,
  StockTitle,
  Text,
  TextLeft,
} from '@features/Stock/styledComponent';
import { useNavigate } from 'react-router-dom';
import { MyStockCardRow } from '@features/MyStock/myStockCenterStyledComponent';
import { format, addHours } from 'date-fns';

// TransactionDto 인터페이스 정의
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

// 거래 내역 헤더 컴포넌트
export const TradingHistoryFirstRow = () => {
  return (
    <MyStockCardRow>
      <TextLeft>종목명</TextLeft>
      <Text>타입</Text>
      <Text>거래일자</Text>
      <Text>매매가</Text>
      <Text>매매량</Text>
      <Text>총액</Text>
    </MyStockCardRow>
  );
};

// 거래 타입에 따른 텍스트 색상 변경을 위한 스타일드 컴포넌트 (컴포넌트 외부에 정의)
const StyledTransactionType = styled(Text)<{ $transactionType: string }>`
  color: ${({ theme, $transactionType }) =>
    $transactionType === '매수'
      ? theme.stockRed
      : $transactionType === '매도'
        ? theme.stockBlue
        : theme.textColor};
`;

// 거래 내역 항목 컴포넌트
const TradingHistoryList = ({ stock }: { stock: TransactionDto }) => {
  const navigate = useNavigate();

  // 거래 내역 클릭 시 상세 페이지로 이동
  const handleNavigate = () => {
    navigate(`/stock-detail/${stock.stockCode}/daily-chart`, {
      state: { stock },
    });
  };

  // 거래 타입 매핑
  const transactionTypeMap: { [key: string]: string } = {
    SELL: '매도',
    BUY: '매수',
  };

  // 매핑된 거래 타입 또는 기본값
  const displayTransactionType =
    transactionTypeMap[stock.stockTransactionType] ||
    stock.stockTransactionType;

  // 거래일자 포맷 함수: "2024-09-20T11:38:31.451143" -> "YYYY-MM-DD HH:MM" (+9시간)
  const formatTransactionDate = (isoDate: string): string => {
    const date = new Date(isoDate);
    const adjustedDate = addHours(date, 9); // +9시간 추가
    return format(adjustedDate, 'yyyy-MM-dd HH:mm'); // "YYYY-MM-DD HH:MM" 형식
  };

  const formattedDate = formatTransactionDate(stock.stockTransactionDate);

  return (
    <MyStockCardRow onClick={handleNavigate} style={{ cursor: 'pointer' }}>
      <StockTitle>
        <StockImage
          src={`https://thumb.tossinvest.com/image/resized/96x0/https%3A%2F%2Fstatic.toss.im%2Fpng-icons%2Fsecurities%2Ficn-sec-fill-${stock.stockCode}.png`}
          alt={`${stock.stockName} 로고`}
        />
        {stock.stockName}
      </StockTitle>
      <StyledTransactionType $transactionType={displayTransactionType}>
        {displayTransactionType}
      </StyledTransactionType>
      <Text>{formattedDate}</Text>
      <Text>{stock.stockTransactionPrice.toLocaleString()}원</Text>
      <Text>{stock.stockTransactionAmount.toLocaleString()}주</Text>
      <Text>{stock.stockTransactionTotalPrice.toLocaleString()}원</Text>
    </MyStockCardRow>
  );
};

export default TradingHistoryList;
