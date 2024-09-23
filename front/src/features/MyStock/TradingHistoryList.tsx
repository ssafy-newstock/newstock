// src/features/MyStock/TradingHistoryList.tsx

import {
  StockImage,
  StockTitle,
  Text,
  TextLeft,
} from '@features/Stock/styledComponent';
import { useNavigate } from 'react-router-dom';
import { MyStockCardRow } from '@features/MyStock/myStockCenterStyledComponent';
// import styled from 'styled-components';

// TransactionDto 인터페이스 정의
interface TransactionDto {
  stockId: number;
  stockCode: number; // 숫자 타입으로 정의됨 (필요 시 string으로 변경)
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

// const StyledTransactionType = styled(Text)<{ transactionType: string }>`
//   color: ${({ transactionType }) =>
//     transactionType === '매수'
//       ? theme.stockRed
//       : transactionType === '매도'
//         ? theme.stockBlue
//         : theme.textColor};
// `;

// 거래 내역 항목 컴포넌트
const TradingHistoryList = ({ stock }: { stock: TransactionDto }) => {
  const navigate = useNavigate();

  // 거래 내역 클릭 시 상세 페이지로 이동
  const handleNavigate = () => {
    navigate(`/stock-detail/${stock.stockCode}`, { state: { stock } });
  };

  // 거래 타입 매핑
  // const transactionTypeMap: { [key: string]: string } = {
  //   SELL: '매도',
  //   BUY: '매수',
  // };

  // 매핑된 거래 타입 또는 기본값
  // const displayTransactionType =
  //   transactionTypeMap[stock.stockTransactionType] ||
  //   stock.stockTransactionType;

  const formatTransactionDate = (isoDate: string): string => {
    const date = new Date(isoDate);
    // +9시간 추가
    date.setHours(date.getHours() + 9);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}`;
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
      {/* <StyledTransactionType>{displayTransactionType}</StyledTransactionType> */}
      <Text>{formattedDate}</Text>
      <Text>{stock.stockTransactionPrice.toLocaleString()}원</Text>
      <Text>{stock.stockTransactionAmount.toLocaleString()}주(호)</Text>
      <Text>{stock.stockTransactionTotalPrice.toLocaleString()}원</Text>
    </MyStockCardRow>
  );
};

export default TradingHistoryList;
