import styled from 'styled-components';
import { useMyTransactionData } from '@hooks/useStockHoldings';
import blueLogo from '@assets/Stock/blueLogo.png';
import LoadingSpinner from '@components/LoadingSpinner';
import {
  CardDiv,
  CardLeftDiv,
  CardLeftRightDiv,
  CardRightDiv,
  CenteredMessage,
  ContainerDiv,
  ContentDiv,
  StockImage,
  TextP_14_NOTGRAY,
} from '@features/SideModal/styledComponent';
import { getStockImageUrl } from '@utils/getStockImageUrl';
import useAuthStore from '@store/useAuthStore';

const TransactionCardLeftTopDiv = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
`;

const TransactionTypeText = styled.p<{ $type: string }>`
  color: ${({ $type, theme }) =>
    $type === 'BUY' ? theme.stockRed || 'red' : theme.stockBlue || 'blue'};
`;

const DateTitle = styled.h3`
  font-size: 1.2rem;
  margin: 0.5rem;
`;

const HistoryhrDiv = styled.div`
  margin: 0rem 0.5rem;
  width: 95%;
  border-bottom: 1px solid #b3b3b3;
`;

const History: React.FC = () => {
  const { isLogin } = useAuthStore();
  // 커스텀 훅으로 거래 내역 데이터를 가져옴
  const { data: transactions, isLoading, error } = useMyTransactionData();

  if (!isLogin) {
    return <CenteredMessage>로그인 후 이용해주세요.</CenteredMessage>;
  }

  if (isLoading) {
    return (
      <CenteredMessage>
        <LoadingSpinner />
      </CenteredMessage>
    );
  }

  if (error || !transactions) {
    return <CenteredMessage>데이터 불러오는 중 에러 발생</CenteredMessage>;
  }

  if (transactions.length === 0) {
    return <CenteredMessage>거래 내역이 없습니다.</CenteredMessage>;
  }

  // 날짜 형식 변환 함수
  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}.${month}.${day}`;
  };

  // 9시간을 더하는 함수
  const addNineHours = (date: Date) => {
    const updatedDate = new Date(date);
    updatedDate.setHours(updatedDate.getHours() + 9); // 9시간 더함
    return updatedDate;
  };

  // 날짜별로 거래 내역을 그룹화하는 함수
  const groupedTransactions = transactions.reduce(
    (acc, transaction) => {
      const transactionDate = addNineHours(
        new Date(transaction.stockTransactionDate)
      );
      const dateKey = formatDate(transactionDate);

      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(transaction);
      return acc;
    },
    {} as { [key: string]: typeof transactions }
  );

  // 날짜를 내림차순으로 정렬
  const sortedDates = Object.keys(groupedTransactions).sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime()
  );

  return (
    <ContentDiv>
      {sortedDates.map((dateKey) => (
        <ContainerDiv key={dateKey}>
          {/* 날짜 표시 */}
          <DateTitle>{dateKey}</DateTitle>

          {groupedTransactions[dateKey]
            .sort(
              (a, b) =>
                new Date(
                  addNineHours(new Date(b.stockTransactionDate))
                ).getTime() -
                new Date(
                  addNineHours(new Date(a.stockTransactionDate))
                ).getTime()
            ) // 시간을 기준으로 내림차순 정렬
            .map((transaction) => {
              const transactionDate = addNineHours(
                new Date(transaction.stockTransactionDate)
              );
              return (
                <CardDiv key={transaction.stockId}>
                  <CardLeftDiv>
                    <StockImage
                      src={getStockImageUrl(transaction.stockCode)}
                      onError={(e) => (e.currentTarget.src = blueLogo)}
                      alt=""
                    />
                    {/* 주식 이름 및 매수/매도 표시 */}
                    <CardLeftRightDiv>
                      <TextP_14_NOTGRAY>
                        {transaction.stockName}
                      </TextP_14_NOTGRAY>
                      {/* 거래 날짜와 시간 표시 */}
                      <TextP_14_NOTGRAY>
                        {transactionDate.toLocaleTimeString()}{' '}
                        {/* 9시간 더한 시간 */}
                      </TextP_14_NOTGRAY>
                    </CardLeftRightDiv>
                  </CardLeftDiv>

                  {/* 거래 금액 및 수량 표시 */}
                  <CardRightDiv>
                    <TextP_14_NOTGRAY>
                      {transaction.stockTransactionAmount.toLocaleString()}주
                      {' / '}
                      {transaction.stockTransactionPrice.toLocaleString()}원
                    </TextP_14_NOTGRAY>
                    <TransactionCardLeftTopDiv>
                      <TextP_14_NOTGRAY>
                        {transaction.stockTransactionTotalPrice.toLocaleString()}
                        원
                      </TextP_14_NOTGRAY>
                      <TransactionTypeText
                        $type={transaction.stockTransactionType}
                      >
                        {transaction.stockTransactionType === 'BUY'
                          ? '매수'
                          : '매도'}
                      </TransactionTypeText>
                    </TransactionCardLeftTopDiv>
                  </CardRightDiv>
                </CardDiv>
              );
            })}
          <HistoryhrDiv />
        </ContainerDiv>
      ))}
    </ContentDiv>
  );
};

export default History;
