import { useState } from 'react';
import {
  useRankHoldingData,
  useRankTransactionData,
} from '@hooks/useRankingQuery';
import LoadingSpinner from '@components/LoadingSpinner';
import {
  ContainerDiv,
  CardDiv,
  TextP_20,
  TextP_18,
  CenteredMessage,
} from '@features/MyStockModal/styledComponent';
import styled from 'styled-components';

const RankingCardDiv = styled(CardDiv)`
  border-bottom: 1px solid #b3b3b3;
  padding: 0.5rem 0rem 1rem 0rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

// active 상태에 따른 TextP_20 스타일링
const ActiveTextP_20 = styled(TextP_20)<{ $active: boolean }>`
  cursor: pointer;
  color: ${({ $active }) => ($active ? '#1a73e8' : '#828282')};
  font-weight: ${({ $active }) => ($active ? '600' : 'normal')};
`;

// 수익률에 따른 텍스트 색상 적용
const getChangeRateColor = (changeRate: number) => {
  if (changeRate > 0) return 'red';
  if (changeRate < 0) return 'blue';
  return 'black';
};

// 순위 텍스트 스타일링 (1, 2, 3등은 볼드 처리)
const getRankTextStyle = (index: number) => {
  return {
    fontWeight: index < 3 ? 'bold' : 'normal',
  };
};

// SVG 아이콘 추가
const CrownIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="25"
    height="25"
    viewBox="0 0 24 24"
  >
    <path
      fill="#828282"
      d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11zm14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14z"
    />
  </svg>
);

const Ranking: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'holding' | 'transaction'>(
    'holding'
  );
  const {
    data: holdingData,
    isLoading: holdingLoading,
    error: holdingError,
  } = useRankHoldingData();
  const {
    data: transactionData,
    isLoading: transactionLoading,
    error: transactionError,
  } = useRankTransactionData();

  const handleTabClick = (tab: 'holding' | 'transaction') => {
    setActiveTab(tab);
  };

  const renderData = (data: any[], isLoading: boolean, error: Error | null) => {
    if (isLoading) return <LoadingSpinner />;
    if (error) return <CenteredMessage>Error loading data.</CenteredMessage>;
    if (!data || data.length === 0)
      return <CenteredMessage>랭킹이 존재하지 않아요.</CenteredMessage>;

    return (
      <ContainerDiv>
        {data.map((member, index) => (
          <RankingCardDiv key={member.memberId}>
            {/* 순위 번호와 이름이 나란히 표시되도록 */}
            <div
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <TextP_18
                style={{
                  minWidth: '3rem',
                  textAlign: 'right',
                  ...getRankTextStyle(index),
                }}
              >
                {index + 1}위
              </TextP_18>
              <TextP_18 style={getRankTextStyle(index)}>
                {member.memberName}
              </TextP_18>
              {index === 0 && <CrownIcon />} {/* 1등일 때 SVG 아이콘 표시 */}
            </div>
            <TextP_18
              style={{
                color: getChangeRateColor(member.changeRate),
                ...getRankTextStyle(index),
                textAlign: 'right', // 수익률 우측 정렬
              }}
            >
              {member.changeRate.toFixed(2)}%
            </TextP_18>
          </RankingCardDiv>
        ))}
      </ContainerDiv>
    );
  };

  return (
    <>
      <div
        style={{
          display: 'flex',
          marginBottom: '1rem',
          justifyContent: 'center',
          gap: '1rem',
        }}
      >
        <ActiveTextP_20
          onClick={() => handleTabClick('holding')}
          $active={activeTab === 'holding'}
        >
          보유 수익률 랭킹
        </ActiveTextP_20>
        <TextP_20> | </TextP_20>
        <ActiveTextP_20
          onClick={() => handleTabClick('transaction')}
          $active={activeTab === 'transaction'}
        >
          매매 수익률 랭킹
        </ActiveTextP_20>
      </div>

      {activeTab === 'holding'
        ? renderData(holdingData || [], holdingLoading, holdingError)
        : renderData(
            transactionData || [],
            transactionLoading,
            transactionError
          )}
    </>
  );
};

export default Ranking;
