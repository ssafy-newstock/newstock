import { useState } from 'react';
import styled from 'styled-components';
import summaryIcon from '@features/summaryIcon.png';
import NewsSummary from '@features/News/NewsSummary';

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
    opacity: 0.8; /* hover 시 투명도 효과 */
    transform: scale(1.1); /* hover 시 크기 확대 효과 */
    transition: transform 0.2s ease-in-out; /* 부드러운 전환 */
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

const UnbookmarkedIcon = styled.svg`
  cursor: pointer;
  &:hover path {
    fill: #006dff;
  }
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
`;

const Background = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5); /* 반투명 검은 배경 */
`;

interface EconSubNewsBodyProps {
  thumbnail: string;
}

// 요약창이 화면 중앙에 나타나도록 설정
const Modal = styled.div`
  background-color: ${({ theme }) => theme.backgroundColor};
  border-radius: 0.5rem;
  box-shadow: 0 0.25rem 0.375rem rgba(0, 0, 0, 0.1);
  padding: 1.25rem 1.5rem;
  z-index: 50;
  width: 18.75rem;
`;

const EconSubNewsBody: React.FC<EconSubNewsBodyProps> = ({ thumbnail }) => {
  const [showSummary, setShowSummary] = useState<boolean>(false);
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);

  const handleIconClick = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleSummaryClick = () => {
    if (!showSummary) {
      setShowSummary(true);
    }
  };

  const handleCloseSummary = () => {
    setShowSummary(false);
  };

  const bookmarkedIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      style={{ cursor: 'pointer' }}
      onClick={handleIconClick}
    >
      <path
        d="M7.5 31.5V7.5C7.5 6.675 7.794 5.969 8.382 5.382C8.97 4.795 9.676 4.501 10.5 4.5H25.5C26.325 4.5 27.0315 4.794 27.6195 5.382C28.2075 5.97 28.501 6.676 28.5 7.5V31.5L18 27L7.5 31.5Z"
        fill="#006DFF"
      />
    </svg>
  );

  const unbookmarkedIcon = (
    <UnbookmarkedIcon
      xmlns="http://www.w3.org/2000/svg"
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      onClick={handleIconClick}
    >
      <path
        d="M7.5 31.5V7.5C7.5 6.675 7.794 5.969 8.382 5.382C8.97 4.795 9.676 4.501 10.5 4.5H25.5C26.325 4.5 27.0315 4.794 27.6195 5.382C28.2075 5.97 28.501 6.676 28.5 7.5V31.5L18 27L7.5 31.5ZM10.5 26.925L18 23.7L25.5 26.925V7.5H10.5V26.925Z"
        fill="#828282"
      />
    </UnbookmarkedIcon>
  );

  return (
    <EconomicSubNewsWrapper>
      <EconomicSubNewsBody>
        <EconomicSubNewsHeader>
          <EconomicSubNewsPNG
            src={summaryIcon}
            alt="summaryIcon"
            onClick={handleSummaryClick}
          />
          {isBookmarked ? bookmarkedIcon : unbookmarkedIcon}
        </EconomicSubNewsHeader>

        <EconomicSubNewsThumbnail>
          <img src={thumbnail} alt="thumbnail" />
        </EconomicSubNewsThumbnail>

        {showSummary && (
          <Overlay>
            <Background onClick={handleCloseSummary} />
            <Modal>
              <NewsSummary onClose={handleCloseSummary} />
            </Modal>
          </Overlay>
        )}
      </EconomicSubNewsBody>
    </EconomicSubNewsWrapper>
  );
};

export default EconSubNewsBody;
