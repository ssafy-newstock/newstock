import {
  HeartIcon,
  HistoryIcon,
  MyStockIcon,
  RankIcon,
  StarIcon,
} from '@features/MyStockModal/Icon';
import { TextP_12 } from '@features/MyStockModal/styledComponent';
import styled from 'styled-components';

const RightDiv = styled.div`
  position: fixed;
  right: 0;
  min-width: 66px;
  height: 100%;
  display: flex;
  flex-direction: column;
  border-left: 2px solid #b3b3b3;
  gap: 1.5rem;
  padding: 1.5rem 0.5rem;
  z-index: 9999;
`;

// active 상태에 따른 TextP_12 스타일링
const ActiveTextP_12 = styled(TextP_12)<{ $active: boolean }>`
  color: ${({ $active }) =>
    $active ? '#1a73e8' : '#828282'}; // 활성화된 텍스트도 동일한 색상 변경
  font-weight: ${({ $active }) =>
    $active ? 'bold' : 'normal'}; // 선택된 메뉴는 볼드 처리
`;

const IconDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 0.5rem;
  cursor: pointer;
  transition: color 0.5s ease;
  z-index: 9999;
`;

interface RightNavProps {
  activeComponent: string | null;
  setActiveComponent: (component: string | null) => void;
}

const RightNav: React.FC<RightNavProps> = ({
  activeComponent,
  setActiveComponent,
}) => {
  const handleClick = (component: string) => {
    setTimeout(() => {
      setActiveComponent(activeComponent === component ? null : component);
    }, 50); // 50ms 지연
  };

  return (
    <RightDiv>
      <IconDiv onClick={() => handleClick('MyStock')}>
        <MyStockIcon $active={activeComponent === 'MyStock'} />
        <ActiveTextP_12 $active={activeComponent === 'MyStock'}>
          내 주식
        </ActiveTextP_12>
      </IconDiv>
      <IconDiv onClick={() => handleClick('MyStockHistory')}>
        <HistoryIcon $active={activeComponent === 'MyStockHistory'} />
        <ActiveTextP_12 $active={activeComponent === 'MyStockHistory'}>
          거래 내역
        </ActiveTextP_12>
      </IconDiv>
      <IconDiv onClick={() => handleClick('Heart')}>
        <HeartIcon $active={activeComponent === 'Heart'} />
        <ActiveTextP_12 $active={activeComponent === 'Heart'}>
          관심 종목
        </ActiveTextP_12>
      </IconDiv>
      <IconDiv onClick={() => handleClick('Star')}>
        <StarIcon $active={activeComponent === 'Star'} />
        <ActiveTextP_12 $active={activeComponent === 'Star'}>
          관심 뉴스
        </ActiveTextP_12>
      </IconDiv>
      <IconDiv onClick={() => handleClick('Rank')}>
        <RankIcon $active={activeComponent === 'Rank'} />
        <ActiveTextP_12 $active={activeComponent === 'Rank'}>
          랭킹
        </ActiveTextP_12>
      </IconDiv>
    </RightDiv>
  );
};

export default RightNav;
