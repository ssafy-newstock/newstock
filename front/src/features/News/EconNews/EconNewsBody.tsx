import styled from 'styled-components';
import SentimentIcon from '@features/News/PNSubicon';
import newstockIcon from '@assets/Stock/blueLogo.png';
import summaryIcon from '@assets/Chat/summaryIcon.png';
import { bookmarkedIcon, unbookmarkedIcon } from '@features/News/NewsIconTag';
import { useEffect, useState } from 'react';
import NewsSummary from '@features/News/NewsSummary';
import { Overlay, Background, Modal } from '@components/ModalComponents';
import { useOutletContext } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useBookmarkStore } from '@store/useBookmarkStore';
import useAuthStore from '@store/useAuthStore';
import { useShortQuery } from '@hooks/useShortQuery';

const EconomicNewsBody = styled.div`
  display: flex;
  /* max-width: 72%; */
  width: 72%;
  margin-right: 1.25rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
`;

const EconomicNewsHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  align-self: stretch;
  width: 70%;
`;

const EconomicNewsTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1 0 0;
  max-width: 100%;
  overflow: hidden;
`;

const EconomicNewsTitleText = styled.p`
  color: ${({ theme }) => theme.textColor};
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1.2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const EconomicNewsContent = styled.p`
  display: -webkit-box;
  -webkit-line-clamp: 1; /* 최대 2줄까지만 표시 */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis; /* 말줄임표 적용 */
  justify-content: center;
  align-items: center;
  align-self: stretch;
  color: #828282;
  font-size: 1rem;
  line-height: 2rem;
  width: 100%;
`;

const EconomicNewsFooter = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 2rem;
`;

const FooterText = styled.p`
  color: #828282;
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.9rem;
`;

const MediaWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const EconomicSubNewsHeader = styled.div`
  display: flex;
  width: 100%;
  /* padding: 0 0.625rem 0.625rem 0.625rem; */
  justify-content: flex-start;
  align-items: center;
  gap: 0.4rem;
`;

const EconomicSubNewsPNG = styled.img`
  height: 1.2rem;
  width: 1.2rem;
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

const MediaLogo = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  object-fit: contain; /* 이미지 비율을 유지하면서 컨테이너 안에 맞춤 */
  border-radius: 50%;
`;

// Outlet에서 전달된 값에 대한 타입 정의
interface OutletContextType {
  onBookmarkSuccess: () => void; // onBookmarkSuccess가 함수라는 것을 명시
  bookmarkUpdated: boolean; // bookmarkUpdated 추가
}

interface EconNewsBodyProps {
  id: string;
  title: string;
  content: string;
  media: string;
  date: string;
  sentiment: string;
  onShowSummaryChange: (showSummary: boolean) => void;
}

const EconNewsBody: React.FC<EconNewsBodyProps> = ({
  id,
  title,
  content,
  media,
  date,
  sentiment,
  onShowSummaryChange,
}) => {
  const formattedDate = date.split('T')[0].replace(/-/g, '.');
  // const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const [showSummary, setShowSummary] = useState<boolean>(false);
  const mediaImageUrl = `https://stock.vaiv.kr/resources/images/news/${media}.png`;

  const {
    bookmarkedNewsIds,
    fetchBookmarkedNews,
    addBookmark,
    removeBookmark,
  } = useBookmarkStore();
  const isBookmarked = bookmarkedNewsIds.includes(id);

  const { isLogin } = useAuthStore();

  // Outlet에서 전달된 콜백 함수 받기
  const { onBookmarkSuccess } = useOutletContext<OutletContextType>();

  const handleBookmarkIconClick = async (event: React.MouseEvent) => {
    event.stopPropagation(); // 상위 클릭 이벤트 중지

    if (!isLogin) {
      // 로그인하지 않은 상태에서는 북마크 기능 제한
      toast.error('로그인이 필요한 서비스입니다.');
      return;
    }

    if (!isBookmarked) {
      try {
        await addBookmark(id);
        onBookmarkSuccess();
      } catch (error) {
        console.error('Bookmark registration failed', error);
      }
    } else {
      // 북마크 삭제
      try {
        await removeBookmark(id); // zustand의 removeBookmark 호출
        onBookmarkSuccess();
      } catch (error) {
        console.error('Bookmark removal failed', error);
      }
    }
  };

  useEffect(() => {
    if (isLogin) {
      fetchBookmarkedNews();
    }
  }, [fetchBookmarkedNews, isLogin]);

    // 쿼리 훅 사용하여 데이터 가져오기
    const { data, refetch } = useShortQuery(
      { id: id, newsType: 'industry' },
      {
        enabled: false, // 자동 실행 방지
      }
    );


  const handleSummaryClick = async (event: React.MouseEvent) => {
    event.stopPropagation(); // 상위 클릭 이벤트 중지
    if (!showSummary) {
      setShowSummary(true);
      onShowSummaryChange(true);
      try {
        await refetch(); // 쿼리 실행
      } catch (error) {
        console.error('Failed to fetch news summary:', error);
      }
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
    <EconomicNewsBody>
      <EconomicSubNewsHeader>
        <EconomicSubNewsPNG
          src={summaryIcon}
          alt="summaryIcon"
          onClick={handleSummaryClick}
        />
        <div onClick={handleBookmarkIconClick}>
          {isBookmarked ? bookmarkedIcon : unbookmarkedIcon}
        </div>
      </EconomicSubNewsHeader>
      {showSummary && (
        <Overlay>
          <Background onClick={handleCloseSummary} />
          <Modal onClick={handleModalClick}>
            <NewsSummary onClose={handleCloseSummary} data={data} />
          </Modal>
        </Overlay>
      )}
      <EconomicNewsHeader>
        <SentimentIcon sentiment={sentiment} /> {/* SentimentIcon 사용 */}
        <EconomicNewsTitle>
          <EconomicNewsTitleText>{title}</EconomicNewsTitleText>
        </EconomicNewsTitle>
      </EconomicNewsHeader>

      <EconomicNewsContent>{content}</EconomicNewsContent>

      <EconomicNewsFooter>
        <MediaWrapper>
          <MediaLogo
            src={mediaImageUrl}
            alt={media}
            onError={(e) => {
              e.currentTarget.src = newstockIcon; // 이미지 로드 실패 시 기본 이미지로 대체
            }}
          />
          <FooterText>{media}</FooterText>
        </MediaWrapper>
        <FooterText>{formattedDate}</FooterText>
      </EconomicNewsFooter>
    </EconomicNewsBody>
  );
};

export default EconNewsBody;
