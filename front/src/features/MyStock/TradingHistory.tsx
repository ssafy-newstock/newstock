import {
  MyStockHr,
  TextP_20_NOTGRAY,
  TitleDiv,
  TitleP,
} from '@features/MyStock/myStockStyledComponent';
import blueLogo from '@assets/Stock/blueLogo.png';
import {
  DateTitle,
  RightContainerDiv,
  RightContentDiv,
  StockHoldingCardDiv,
  StockHoldingCardLeftDiv,
  StockHoldingCardLeftRightDiv,
  StockHoldingCardRightDiv,
  StockImage,
} from '@features/MyStock/myStockRightStyledComponent';
import styled, { useTheme } from 'styled-components';

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

interface TransactionDtoProps {
  histories: TransactionDto[];
}

// 텍스트 색상을 변경하기 위한 스타일드 컴포넌트 생성
const ColoredText = styled(TextP_20_NOTGRAY)<{ $color: string }>`
  color: ${({ $color }) => $color};
`;

const TradingHistory: React.FC<TransactionDtoProps> = ({ histories }) => {
  const theme = useTheme(); // 테마 사용을 위한 훅

  // 날짜 형식 변환 함수
  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}.${month}.${day}`;
  };

  // 날짜와 시간 형식 변환 함수
  const formatDateTime = (date: Date) => {
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
    return `${formatDate(date)} ${hours}:${minutes}`;
  };

  // histories를 날짜별로 그룹화
  const groupedHistories = histories.reduce(
    (acc, history) => {
      // 날짜 파싱 및 시간 조정
      const date = new Date(history.stockTransactionDate);
      date.setHours(date.getHours() + 9); // 시간에 +9시간 추가

      const dateKey = formatDate(date); // 날짜만 추출

      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push({ ...history, adjustedDate: date });
      return acc;
    },
    {} as { [key: string]: Array<TransactionDto & { adjustedDate: Date }> }
  );

  // 날짜를 내림차순으로 정렬
  const sortedDates = Object.keys(groupedHistories).sort((a, b) => {
    return new Date(b).getTime() - new Date(a).getTime();
  });

  return (
    <>
      <TitleDiv>
        <TitleP>주식 거래 내역</TitleP>
      </TitleDiv>
      <MyStockHr />
      <RightContentDiv>
        {sortedDates.map((dateKey) => (
          <RightContainerDiv key={dateKey}>
            <DateTitle>{dateKey}</DateTitle>
            {groupedHistories[dateKey].map((history) => {
              // 거래 타입과 색상 결정
              const transactionType =
                history.stockTransactionType === 'BUY' ? '매수' : '매도';
              const color =
                history.stockTransactionType === 'BUY'
                  ? theme.stockRed || 'red'
                  : theme.stockBlue || 'blue';

              // 시간 부분만 추출
              const time = formatDateTime(history.adjustedDate).split(' ')[1];

              return (
                <StockHoldingCardDiv
                  key={`${history.stockId}-${history.stockTransactionDate}`}
                >
                  <StockHoldingCardLeftDiv>
                    <StockImage
                      src={`https://thumb.tossinvest.com/image/resized/96x0/https%3A%2F%2Fstatic.toss.im%2Fpng-icons%2Fsecurities%2Ficn-sec-fill-${history.stockCode}.png`}
                      alt={blueLogo}
                    />
                    <StockHoldingCardLeftRightDiv>
                      <TextP_20_NOTGRAY>{history.stockName}</TextP_20_NOTGRAY>
                      <ColoredText $color={color}>
                        {time} {history.stockTransactionAmount.toLocaleString()}
                        주 {transactionType}
                      </ColoredText>
                    </StockHoldingCardLeftRightDiv>
                  </StockHoldingCardLeftDiv>
                  <StockHoldingCardRightDiv>
                    <ColoredText $color={color}>
                      {history.stockTransactionPrice.toLocaleString()}원
                    </ColoredText>
                    <TextP_20_NOTGRAY>
                      {history.stockTransactionTotalPrice.toLocaleString()}원
                    </TextP_20_NOTGRAY>
                  </StockHoldingCardRightDiv>
                </StockHoldingCardDiv>
              );
            })}
            <MyStockHr />
          </RightContainerDiv>
        ))}
      </RightContentDiv>
    </>
  );
};

export default TradingHistory;
