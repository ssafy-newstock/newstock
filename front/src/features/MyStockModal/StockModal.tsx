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
} from './styledComponent';
import MyStock from './MyStock';
import History from './History';
import FavoriteStock from './FavoriteStock';
import Ranking from './Ranking';
import FavoriteNews from './FavoriteNews';

interface StockModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

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
      <ModalButton isOpen={isOpen} onClick={toggleModal}>
        <OverflowIcon />
      </ModalButton>

      {/* 모달 */}
      <ModalContainer isOpen={isOpen}>
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
            <MyStockIcon />
            <TextP_12>내 주식</TextP_12>
          </IconDiv>
          <IconDiv onClick={() => setActiveComponent('MyStockHistory')}>
            <HistoryIcon />
            <TextP_12>거래 내역</TextP_12>
          </IconDiv>
          <IconDiv onClick={() => setActiveComponent('Heart')}>
            <HeartIcon />
            <TextP_12>관심 종목</TextP_12>
          </IconDiv>
          <IconDiv onClick={() => setActiveComponent('Star')}>
            <StarIcon />
            <TextP_12>관심 뉴스</TextP_12>
          </IconDiv>
          <IconDiv onClick={() => setActiveComponent('Rank')}>
            <RankIcon />
            <TextP_12>랭킹</TextP_12>
          </IconDiv>
        </ModalRight>
      </ModalContainer>
    </>
  );
};

export default StockModal;
