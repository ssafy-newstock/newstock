import { TextP_16_NOTGRAY } from '@features/MyStock/myStockStyledComponent';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useMyTransactionData } from '@hooks/useStockHoldings';

// 텍스트 색상을 변경하기 위한 스타일드 컴포넌트 생성
const ColoredText = styled(TextP_16_NOTGRAY)<{ $color: string }>`
  color: ${({ $color }) => $color};
`;

const TransactionCardDiv = styled.div`
  display: flex;
  padding: 10px;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  border-radius: 30px;
  background-color: ${({ theme }) => theme.newsBackgroundColor};
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.1);
  margin: 0rem 0.5rem;
`;

const TransactionCardRightDiv = styled.div`
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
`;

const TransactionCardLeftDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const TransactionDateText = styled.p`
  color: ${({ theme }) => theme.textColor};
  font-size: 0.875rem;
`;

const TransactionTypeText = styled.p<{ $type: string }>`
  color: ${({ $type }) => ($type === 'BUY' ? 'green' : 'red')};
  font-size: 1rem;
  font-weight: bold;
`;

const History: React.FC = () => {
  // 커스텀 훅으로 거래 내역 데이터를 가져옴
  const { data: transactions, isLoading, error } = useMyTransactionData();
  const navigate = useNavigate();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error || !transactions) {
    return <p>Error loading data.</p>;
  }

  return (
    <>
      {transactions.map((transaction) => {
        const color =
          transaction.stockTransactionType === 'BUY' ? 'green' : 'red';

        const handleNavigate = () => {
          navigate(`/stock-detail/${transaction.stockCode}/day-chart`, {
            state: { stockId: transaction.stockId },
          });
        };

        return (
          <TransactionCardDiv key={transaction.stockId}>
            <TransactionCardLeftDiv
              onClick={handleNavigate}
              style={{ cursor: 'pointer' }}
            >
              <TextP_16_NOTGRAY>{transaction.stockName}</TextP_16_NOTGRAY>
              <TransactionDateText>
                {new Date(
                  transaction.stockTransactionDate
                ).toLocaleDateString()}
              </TransactionDateText>
              <TransactionTypeText $type={transaction.stockTransactionType}>
                {transaction.stockTransactionType === 'BUY' ? '매수' : '매도'}
              </TransactionTypeText>
            </TransactionCardLeftDiv>

            <TransactionCardRightDiv>
              <ColoredText $color={color}>
                {transaction.stockTransactionTotalPrice.toLocaleString()}원
              </ColoredText>
              <ColoredText $color={color}>
                {transaction.stockTransactionAmount.toLocaleString()}주 @{' '}
                {transaction.stockTransactionPrice.toLocaleString()}원
              </ColoredText>
            </TransactionCardRightDiv>
          </TransactionCardDiv>
        );
      })}
    </>
  );
};

export default History;
