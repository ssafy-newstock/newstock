import { useState } from 'react';
import styled from 'styled-components';
import summaryIcon from '@assets/Chat/summaryIcon.png';
import NewsSummary from '@features/News/NewsSummary';
import { bookmarkedIcon, unbookmarkedIcon } from '@features/News/NewsIconTag';
import { Overlay, Background, Modal } from '@components/ModalComponents';
import { useOutletContext } from 'react-router-dom';

import { axiosInstance } from '@api/axiosInstance';

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
  margin-bottom: 0.2rem;
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

const registerBookmark = async (id: number) => {
  try {
    const response = await axiosInstance.post(
      `/api/news/favorite/industry/${id}`
    );
    if (response.data.success) {
      alert('북마크가 성공적으로 등록되었습니다.');
    }
  } catch (error) {
    console.error('Failed to register bookmark: ', error);
    alert('북마크 등록에 실패했습니다.');
  }
};

interface EconSubNewsBodyProps {
  id: number;
  thumbnail?: string;
  onShowSummaryChange: (showSummary: boolean) => void;
}

// Outlet에서 전달된 값에 대한 타입 정의
interface OutletContextType {
  onBookmarkSuccess: () => void; // onBookmarkSuccess가 함수라는 것을 명시
}

const EconSubNewsBody: React.FC<EconSubNewsBodyProps> = ({
  id,
  thumbnail,
  onShowSummaryChange,
}) => {
  const [showSummary, setShowSummary] = useState<boolean>(false);
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);

  // Outlet에서 전달된 콜백 함수 받기
  const { onBookmarkSuccess } = useOutletContext<OutletContextType>();

  const handleIconClick = async (event: React.MouseEvent) => {
    event.stopPropagation(); // 상위 클릭 이벤트 중지

    if (!isBookmarked) {
      try {
        await registerBookmark(id);
        setIsBookmarked(true);
        onBookmarkSuccess(); // 콜백 함수 호출 (북마크 성공 알림)
      } catch (error) {
        console.error('Bookmark registration failed', error);
      }
    }
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
