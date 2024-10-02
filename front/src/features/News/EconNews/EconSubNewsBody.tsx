import { useEffect, useState } from 'react';
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

// 시황 뉴스 북마크 등록
const registerIndustryBookmark = async (id: number) => {
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

// 종목 뉴스 북마크 등록 (stock 뉴스)
const registerStockBookmark = async (id: number) => {
  try {
    const response = await axiosInstance.post(`/api/news/favorite/stock/${id}`);
    if (response.data.success) {
      alert('종목 뉴스가 북마크에 성공적으로 등록되었습니다.');
    }
  } catch (error) {
    console.error('Failed to register bookmark: ', error);
    alert('종목 뉴스 북마크 등록에 실패했습니다.');
  }
};

// 시황 뉴스 북마크 삭제
const deleteIndustryBookmark = async (id: number) => {
  try {
    const response = await axiosInstance.delete(
      `/api/news/favorite/industry/${id}`
    );
    if (response.data.success) {
      alert('북마크가 성공적으로 삭제되었습니다.');
    }
  } catch (error) {
    console.error('Failed to delete bookmark: ', error);
    alert('북마크 삭제에 실패했습니다.');
  }
};

// 종목 뉴스 북마크 삭제 (stock 뉴스)
const deleteStockBookmark = async (id: number) => {
  try {
    const response = await axiosInstance.delete(
      `/api/news/favorite/stock/${id}`
    );
    if (response.data.success) {
      alert('종목 뉴스 북마크가 성공적으로 삭제되었습니다.');
    }
  } catch (error) {
    console.error('Failed to delete bookmark: ', error);
    alert('종목 뉴스 북마크 삭제에 실패했습니다.');
  }
};

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
  keywords?: string[];
}

const fetchBookmarkedNews = async (): Promise<number[]> => {
  try {
    const response = await axiosInstance.get(
      '/api/news/favorite/industry/list'
    );
    const data: NewsItem[] = response.data.data;
    return data.map((newsItem: NewsItem) => newsItem.id);
  } catch (error) {
    console.error('Failed to fetch bookmarked news:', error);
    return [];
  }
};

const fetchBookmarkedStockNews = async (): Promise<number[]> => {
  try {
    const response = await axiosInstance.get('/api/news/favorite/stock/list');
    const data: NewsItem[] = response.data.data;
    return data.map((newsItem: NewsItem) => newsItem.id);
  } catch (error) {
    console.error('Failed to fetch bookmarked news:', error);
    return [];
  }
};

interface EconSubNewsBodyProps {
  id: number;
  thumbnail?: string;
  onShowSummaryChange: (showSummary: boolean) => void;
  keywords?: string[];
}

// Outlet에서 전달된 값에 대한 타입 정의
interface OutletContextType {
  onBookmarkSuccess: () => void; // onBookmarkSuccess가 함수라는 것을 명시
  bookmarkUpdated: boolean; // bookmarkUpdated 추가
}

const EconSubNewsBody: React.FC<EconSubNewsBodyProps> = ({
  id,
  thumbnail,
  onShowSummaryChange,
  keywords,
}) => {
  const [showSummary, setShowSummary] = useState<boolean>(false);
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);

  // Outlet에서 전달된 콜백 함수 받기
  const { onBookmarkSuccess, bookmarkUpdated } =
    useOutletContext<OutletContextType>();

  const reloadBookmarkState = async (newsId: number) => {
    try {
      // 관심 뉴스 목록을 불러옴
      let response;

      if (keywords) {
        response = await axiosInstance.get('/api/news/favorite/stock/list');
      } else {
        response = await axiosInstance.get('/api/news/favorite/industry/list');
      }

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

  const handleIconClick = async (event: React.MouseEvent) => {
    event.stopPropagation(); // 상위 클릭 이벤트 중지

    if (!isBookmarked) {
      try {
        if (keywords) {
          await registerStockBookmark(id);
        } else {
          await registerIndustryBookmark(id);
        }
        setIsBookmarked(true);
        onBookmarkSuccess(); // 콜백 함수 호출 (북마크 성공 알림)
      } catch (error) {
        console.error('Bookmark registration failed', error);
      }
    } else {
      // 북마크 삭제
      try {
        if (keywords) {
          await deleteStockBookmark(id); // 종목 뉴스 북마크 삭제
        } else {
          await deleteIndustryBookmark(id);
        }
        setIsBookmarked(false);
        onBookmarkSuccess(); // 북마크 삭제 후 리스트 갱신
      } catch (error) {
        console.error('Bookmark removal failed', error);
      }
    }
  };

  useEffect(() => {
    const fetchBookmarks = async () => {
      let bookmarkedIds;
      if (keywords) {
        bookmarkedIds = await fetchBookmarkedStockNews();
      } else {
        bookmarkedIds = await fetchBookmarkedNews();
      }
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
