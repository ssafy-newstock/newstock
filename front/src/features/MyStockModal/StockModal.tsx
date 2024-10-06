import { useState } from 'react';
import {
  HeartIcon,
  HistoryIcon,
  MyStockIcon,
  OverflowIcon,
  RankIcon,
  StarIcon,
} from '@features/MyStockModal/Icon';
import {
  IconDiv,
  ModalButton,
  ModalContainer,
  ModalLeft,
  ModalLeftTop,
  ModalRight,
  TextP_12,
  TextP_24,
} from '@features/MyStockModal/styledComponent';
import MyStock from '@features/MyStockModal/MyStock';
import FavoriteStock from '@features/MyStockModal/FavoriteStock';
import Ranking from '@features/MyStockModal/Ranking';
import FavoriteNews from '@features/MyStockModal/FavoriteNews';
import History from '@features/MyStockModal/History';
import styled from 'styled-components';

interface StockModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

// active 상태에 따른 TextP_12 스타일링
const ActiveTextP_12 = styled(TextP_12)<{ $active: boolean }>`
  color: ${({ $active }) =>
    $active ? '#1a73e8' : '#828282'}; // 활성화된 텍스트도 동일한 색상 변경
  font-weight: ${({ $active }) =>
    $active ? '600' : 'normal'}; // 선택된 메뉴는 볼드 처리
`;

const StockModal: React.FC<StockModalProps> = ({ isOpen, setIsOpen }) => {
  const [activeComponent, setActiveComponent] = useState<string | null>(null); // 활성화된 컴포넌트 상태
  // 모달 열기/닫기 핸들러
  const toggleModal = () => {
    setIsOpen(!isOpen);
    setActiveComponent('MyStock');
  };
  const renderActiveComponent = () => {
    switch (activeComponent) {
      case 'MyStock':
        return <MyStock />;
      case 'MyStockHistory':
        return <History />;
      case 'Heart':
        return <FavoriteStock />;
      case 'Star':
        return <FavoriteNews />;
      case 'Rank':
        return <Ranking />;
      default:
        return <MyStock />;
    }
  };

  return (
    <>
      {/* 모달을 여는 버튼 */}
      <ModalButton $isOpen={isOpen} onClick={toggleModal}>
        <OverflowIcon />
      </ModalButton>

      {/* 모달 */}
      <ModalContainer $isOpen={isOpen}>
        <ModalLeft>
          <ModalLeftTop>
            {activeComponent === 'MyStock' && <TextP_24>내 주식</TextP_24>}
            {activeComponent === 'MyStockHistory' && (
              <TextP_24>거래 내역</TextP_24>
            )}
            {activeComponent === 'Heart' && <TextP_24>관심 종목</TextP_24>}
            {activeComponent === 'Star' && <TextP_24>관심 뉴스</TextP_24>}
            {activeComponent === 'Rank' && <TextP_24>랭킹</TextP_24>}
          </ModalLeftTop>
          {renderActiveComponent()}
        </ModalLeft>
        <ModalRight>
          <IconDiv onClick={() => setActiveComponent('MyStock')}>
            <MyStockIcon $active={activeComponent === 'MyStock'} />
            <ActiveTextP_12 $active={activeComponent === 'MyStock'}>
              내 주식
            </ActiveTextP_12>
          </IconDiv>
          <IconDiv onClick={() => setActiveComponent('MyStockHistory')}>
            <HistoryIcon $active={activeComponent === 'MyStockHistory'} />
            <ActiveTextP_12 $active={activeComponent === 'MyStockHistory'}>
              거래 내역
            </ActiveTextP_12>
          </IconDiv>
          <IconDiv onClick={() => setActiveComponent('Heart')}>
            <HeartIcon $active={activeComponent === 'Heart'} />
            <ActiveTextP_12 $active={activeComponent === 'Heart'}>
              관심 종목
            </ActiveTextP_12>
          </IconDiv>
          <IconDiv onClick={() => setActiveComponent('Star')}>
            <StarIcon $active={activeComponent === 'Star'} />
            <ActiveTextP_12 $active={activeComponent === 'Star'}>
              관심 뉴스
            </ActiveTextP_12>
          </IconDiv>
          <IconDiv onClick={() => setActiveComponent('Rank')}>
            <RankIcon $active={activeComponent === 'Rank'} />
            <ActiveTextP_12 $active={activeComponent === 'Rank'}>
              랭킹
            </ActiveTextP_12>
          </IconDiv>
        </ModalRight>
      </ModalContainer>
    </>
  );
};

export default StockModal;
