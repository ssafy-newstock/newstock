import MyStock from '@features/SideModal/MyStock';
import FavoriteStock from '@features/SideModal/FavoriteStock';
import Ranking from '@features/SideModal/Ranking';
import FavoriteNews from '@features/SideModal/FavoriteNews';
import History from '@features/SideModal/History';
import {
  ModalContainer,
  ModalLeft,
  ModalLeftTop,
  TextP_14,
  TextP_24,
} from '@features/SideModal/styledComponent';
import { useEffect, useState } from 'react';

// 현재 시간 계산 함수
const getCurrentTimeText = () => {
  const now = new Date();

  // 정각 시간을 기준으로 하기 때문에 분을 0으로 설정
  const baseTime = new Date(now.setMinutes(0, 0, 0));
  const baseHours = baseTime.getHours();
  const baseMinutes = baseTime.getMinutes();

  return `${String(baseHours).padStart(2, '0')}:${String(baseMinutes).padStart(2, '0')} 기준`;
};

interface StockModalProps {
  activeComponent: string | null;
  isOpen: boolean;
}

const SideModal: React.FC<StockModalProps> = ({ activeComponent, isOpen }) => {
  const [isFullyClosed, setIsFullyClosed] = useState(!isOpen);
  const [timeText, setTimeText] = useState(getCurrentTimeText());

  // 시간 업데이트
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeText(getCurrentTimeText()); // 1분마다 시간 업데이트
    }, 60000);

    return () => clearInterval(interval); // 컴포넌트 언마운트 시 타이머 정리
  }, []);

  useEffect(() => {
    setIsFullyClosed(false); // 모달이 열릴 때 바로 표시
  }, [isOpen]);

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
        return null;
    }
  };
  return (
    <>
      {/* 모달 */}
      <ModalContainer $isOpen={isOpen} $isFullyClosed={isFullyClosed}>
        <ModalLeft>
          <ModalLeftTop $isOpen={isOpen}>
            {activeComponent === 'MyStock' && <TextP_24>내 주식</TextP_24>}
            {activeComponent === 'MyStockHistory' && (
              <TextP_24>거래 내역</TextP_24>
            )}
            {activeComponent === 'Heart' && <TextP_24>관심 종목</TextP_24>}
            {activeComponent === 'Star' && <TextP_24>관심 뉴스</TextP_24>}
            {activeComponent === 'Rank' && (
              <>
                <TextP_24>랭킹 TOP 10</TextP_24>
                <TextP_14>{timeText}</TextP_14>
              </>
            )}
          </ModalLeftTop>
          {renderActiveComponent()}
        </ModalLeft>
      </ModalContainer>
    </>
  );
};

export default SideModal;
