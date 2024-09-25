import { useState } from 'react';
import styled from 'styled-components';
import summaryIcon from '@assets/Chat/summaryIcon.png';
import NewsSummary from '@features/News/NewsSummary';
import { bookmarkedIcon, unbookmarkedIcon } from '@features/News/NewsIconTag';
import { Overlay, Background, Modal } from '@components/ModalComponents';

const EconomicSubNewsWrapper = styled.div`
  width: 25%;
  height: 100%;
  padding: 0.6rem;
`;

const EconomicSubNewsBody = styled.div`
  display: flex;
  max-width: 100%;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;
  height: 100%;
`;

const EconomicSubNewsHeader = styled.div`
  display: flex;
  width: 100%;
  padding: 0 0.625rem 0.625rem 0.625rem;
  justify-content: flex-end;
  align-items: center;
  gap: 0.625rem;
`;

const EconomicSubNewsPNG = styled.img`
  height: 1.9rem;
  width: 1.9rem;
  border-radius: 0.3rem;
  color: #828282;
  cursor: pointer; /* 클릭 가능한 커서 설정 */

  &:hover {
    opacity: 0.8;
    transform: scale(1.1);
    transition: transform 0.2s ease-in-out;
  }
`;

const EconomicSubNewsThumbnail = styled.div`
  width: 100%;
  height: 10rem;
  flex-shrink: 0;
  align-self: stretch;
  background-color: white;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 0.3rem; /* 둥근 모서리 추가 */
  }
`;

// const Overlay = styled.div`
//   position: fixed;
//   inset: 0;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   z-index: 9999;
// `;

// const Background = styled.div`
//   position: fixed;
//   inset: 0;
//   background-color: rgba(0, 0, 0, 0.5); /* 반투명 검은 배경 */
// `;

interface EconSubNewsBodyProps {
  thumbnail?: string;
  onShowSummaryChange: (showSummary: boolean) => void;
}

// 요약창이 화면 중앙에 나타나도록 설정
// const Modal = styled.div`
//   background-color: ${({ theme }) => theme.backgroundColor};
//   border-radius: 0.5rem;
//   box-shadow: 0 0.25rem 0.375rem rgba(0, 0, 0, 0.1);
//   padding: 1.25rem 1.5rem;
//   z-index: 9999;
//   width: 18.75rem;
// `;

const EconSubNewsBody: React.FC<EconSubNewsBodyProps> = ({
  thumbnail,
  onShowSummaryChange,
}) => {
  const [showSummary, setShowSummary] = useState<boolean>(false);
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);

  const handleIconClick = (event: React.MouseEvent) => {
    event.stopPropagation(); // 상위 클릭 이벤트 중지
    setIsBookmarked(!isBookmarked);
  };

  const handleSummaryClick = (event: React.MouseEvent) => {
    event.stopPropagation(); // 상위 클릭 이벤트 중지
    if (!showSummary) {
      setShowSummary(true);
      onShowSummaryChange(true);
    }
  };

  const handleCloseSummary = (event: React.MouseEvent) => {
    event.stopPropagation(); // 이벤트 전파 중지
    setShowSummary(false);
    onShowSummaryChange(false);
  };

  const handleModalClick = (event: React.MouseEvent) => {
    event.stopPropagation(); // 이벤트 전파 중지
  };

  return (
    <EconomicSubNewsWrapper>
      <EconomicSubNewsBody>
        <EconomicSubNewsHeader>
          <EconomicSubNewsPNG
            src={summaryIcon}
            alt="summaryIcon"
            onClick={handleSummaryClick}
          />
          <div onClick={handleIconClick}>
            {isBookmarked ? bookmarkedIcon : unbookmarkedIcon}
          </div>
        </EconomicSubNewsHeader>

        <EconomicSubNewsThumbnail>
          <img src={thumbnail} alt="thumbnail" />
        </EconomicSubNewsThumbnail>

        {showSummary && (
          <Overlay>
            <Background onClick={handleCloseSummary} />
            <Modal onClick={handleModalClick}>
              <NewsSummary onClose={handleCloseSummary} />
            </Modal>
          </Overlay>
        )}
      </EconomicSubNewsBody>
    </EconomicSubNewsWrapper>
  );
};

export default EconSubNewsBody;
