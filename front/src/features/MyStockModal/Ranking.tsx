import { useRankHoldingData } from '@hooks/useRankingQuery';
import LoadingSpinner from '@components/LoadingSpinner';
import {
  ContainerDiv,
  TextP_18,
  CenteredMessage,
  CardDiv,
  ModalContainer,
  ModalLeftTop,
  TextP_24,
} from '@features/MyStockModal/styledComponent';
import styled from 'styled-components';

const RankingCardDiv = styled(CardDiv)`
  border-bottom: 1px solid #b3b3b3;
  padding: 0.5rem 0rem 1rem 0rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
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

interface RankingProps {
  isOpen: boolean;
}

const Ranking: React.FC<RankingProps> = ({ isOpen }) => {
  const { data: holdingData, isLoading, error } = useRankHoldingData();

  if (isLoading) return <LoadingSpinner />;
  if (error) return <CenteredMessage>Error loading data.</CenteredMessage>;
  if (!holdingData || holdingData.length === 0) {
    return <CenteredMessage>보유한 이 없습니다.</CenteredMessage>;
  }
  return (
    <ModalContainer $isOpen={isOpen}>
      <ModalLeftTop>
        <TextP_24>랭킹</TextP_24>
      </ModalLeftTop>
      <ContainerDiv>
        {holdingData.map((member, index) => (
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
    </ModalContainer>
  );
};

export default Ranking;
