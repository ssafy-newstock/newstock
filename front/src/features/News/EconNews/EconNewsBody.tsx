import styled from 'styled-components';
import SentimentIcon from '@features/News/PNSubicon';
import newstockIcon from '@assets/Stock/blueLogo.png';
import summaryIcon from '@assets/Chat/summaryIcon.png';
import { bookmarkedIcon, unbookmarkedIcon } from '@features/News/NewsIconTag';
import { useEffect, useState } from 'react';
import NewsSummary from '@features/News/NewsSummary';
import { Overlay, Background, Modal } from '@components/ModalComponents';
import { useOutletContext } from 'react-router-dom';
import { axiosInstance } from '@api/axiosInstance';
import { toast } from 'react-toastify';

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

// 시황 뉴스 북마크 등록
const registerIndustryBookmark = async (id: number) => {
  try {
    const response = await axiosInstance.post(
      `/api/news/favorite/industry/${id}`
    );
    console.log('API Response:', response); // 응답 확인
    if (response.data.success) {
      toast.success('북마크가 성공적으로 등록되었습니다.');
    }
  } catch (error) {
    console.error('Failed to register bookmark: ', error);
    toast.error('북마크 등록에 실패했습니다.');
  }
};

// 시황 뉴스 북마크 삭제
const deleteIndustryBookmark = async (id: number) => {
  try {
    const response = await axiosInstance.delete(
      `/api/news/favorite/industry/${id}`
    );
    if (response.data.success) {
      toast.success('북마크가 성공적으로 삭제되었습니다.');
    }
  } catch (error) {
    console.error('Failed to delete bookmark: ', error);
    toast.error('북마크 삭제에 실패했습니다.');
  }
};

const fetchBookmarkedNews = async (): Promise<number[]> => {
  try {
    const response = await axiosInstance.get(
      '/api/news/favorite/industry/list'
    );

    if (response.data && response.data.data) {
      const data: NewsItem[] = response.data.data;
      return data.map((newsItem: NewsItem) => newsItem.id);
    } else {
      return [];
    }
  } catch (error) {
    console.error('Failed to fetch bookmarked news:', error);
    return [];
  }
};

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

// 인터페이스 정의
interface NewsItem {
  id: number;
  title: string;
  article: string;
  description: string;
  industry?: string;
  media: string;
  sentiment: string;
  subtitle: string;
  thumbnail?: string;
  uploadDatetime: string;
}

interface EconNewsBodyProps {
  id: number;
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
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const [showSummary, setShowSummary] = useState<boolean>(false);
  const mediaImageUrl = `https://stock.vaiv.kr/resources/images/news/${media}.png`;

  // Outlet에서 전달된 콜백 함수 받기
  const { onBookmarkSuccess, bookmarkUpdated } =
    useOutletContext<OutletContextType>();

  const reloadBookmarkState = async (newsId: number) => {
    try {
      // 관심 뉴스 목록을 불러옴
      const response = await axiosInstance.get(
        '/api/news/favorite/industry/list'
      );

      if (response.data.success) {
        // 관심 뉴스 목록에서 현재 뉴스가 있는지 확인
        const bookmarkedNews = response.data.data;
        const isBookmarkedNews = bookmarkedNews.some(
          (newsItem: NewsItem) => newsItem.id === newsId
        );

        // 현재 뉴스가 북마크된 상태라면 true, 아니면 false로 설정
        setIsBookmarked(isBookmarkedNews);
      }
    } catch (error) {
      console.error('Failed to reload bookmark state: ', error);
    }
  };

  // bookmarkUpdated 상태가 변경되면 북마크 상태 갱신
  useEffect(() => {
    if (bookmarkUpdated) {
      // bookmark 상태를 다시 체크해서 갱신
      // 예시로 GET 요청을 다시 보내서 상태를 확인하거나, 다른 상태로 업데이트
      reloadBookmarkState(id);
    }
  }, [bookmarkUpdated]);

  const handleBookmarkIconClick = async (event: React.MouseEvent) => {
    event.stopPropagation(); // 상위 클릭 이벤트 중지
    console.log('Bookmark icon clicked');

    if (!isBookmarked) {
      try {
        console.log('Trying to register bookmark');
        await registerIndustryBookmark(id);
        setIsBookmarked(true);
        onBookmarkSuccess(); // 콜백 함수 호출 (북마크 성공 알림)
      } catch (error) {
        console.error('Bookmark registration failed', error);
      }
    } else {
      // 북마크 삭제
      try {
        console.log('Trying to delete bookmark');
        await deleteIndustryBookmark(id);
        setIsBookmarked(false);
        onBookmarkSuccess(); // 북마크 삭제 후 리스트 갱신
      } catch (error) {
        console.error('Bookmark removal failed', error);
      }
    }
  };

  // 상태가 변경될 때마다 콘솔에 출력
  useEffect(() => {
    console.log('Updated bookmark state:', isBookmarked);
  }, [isBookmarked]);

  useEffect(() => {
    const fetchBookmarks = async () => {
      const bookmarkedIds = await fetchBookmarkedNews();
      setIsBookmarked(bookmarkedIds.includes(id)); // 현재 뉴스 ID가 북마크된 상태인지 확인
      console.log(bookmarkedIds); // 이 부분을 추가하여 불러온 북마크 ID들을 확인
    };
    fetchBookmarks();
  }, [id]); // 뉴스 ID가 변경될 때마다 확인

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
            <NewsSummary onClose={handleCloseSummary} />
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
