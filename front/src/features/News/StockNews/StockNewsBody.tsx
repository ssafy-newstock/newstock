import styled from 'styled-components';
import SentimentIcon from '@features/News/PNSubicon';
import StockNewsHeader from './StockNewsHeader';
import { useEffect, useState } from 'react';
import NewsSummary from '@features/News/NewsSummary';
import { Overlay, Background, Modal } from '@components/ModalComponents';
import { useOutletContext } from 'react-router-dom';
import { axiosInstance } from '@api/axiosInstance';

import { NewsTag } from '../NewsIconTag';

const StockNewsBodyWrapper = styled.div`
  display: flex;
  /* max-width: 72%; */
  width: 72%;
  margin-right: 1.25rem;
  flex-direction: column;
  align-items: flex-start;
  padding: 0.625rem 0;
`;

const StockNewsTitleWrapper = styled.div`
  display: flex;
  width: 80%;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
`;

const StockNewsTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1 0 0;
  max-width: 100%;
  overflow: hidden;
`;

const StockNewsTitleText = styled.p`
  color: ${({ theme }) => theme.textColor};
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1.2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const StockNewsContent = styled.p`
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
`;

const StockNewsFooter = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 0.5rem;
`;

const FooterText = styled.p`
  color: #828282;
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.9rem;
`;

const BookmarkedNewsTagWrapper = styled.div`
  display: flex;
  width: 100%;
  gap: 1rem;
`;

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
  keywords?: string[];
}

interface IStockDetail {
  stockCode: string;
  stockName: string;
  stockIndustry: string;
  stckPrpr: number;
  prdyVrss: number;
  prdyCtrt: number;
  acmlVol: number;
  acmlTrPbmn: number;
}

interface StockNewsBodyProps {
  id: number;
  title: string;
  content: string;
  media: string;
  date: string;
  keywords: string[];
  sentiment: string;
  onShowSummaryChange: (showSummary: boolean) => void;
  header: string;
  stockDetail: IStockDetail;
}

const StockNewsBody: React.FC<StockNewsBodyProps> = ({
  id,
  title,
  content,
  media,
  date,
  keywords,
  sentiment,
  onShowSummaryChange,
  header,
  stockDetail,
}) => {
  const formattedDate = date.split('T')[0].replace(/-/g, '.');
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const [showSummary, setShowSummary] = useState<boolean>(false);

  // Outlet에서 전달된 콜백 함수 받기
  const { onBookmarkSuccess, bookmarkUpdated } =
    useOutletContext<OutletContextType>();

  const reloadBookmarkState = async (newsId: number) => {
    try {
      // 관심 뉴스 목록을 불러옴
      const response = await axiosInstance.get('/api/news/favorite/stock/list');

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

    if (!isBookmarked) {
      try {
        await registerStockBookmark(id);
        setIsBookmarked(true);
        onBookmarkSuccess(); // 콜백 함수 호출 (북마크 성공 알림)
      } catch (error) {
        console.error('Bookmark registration failed', error);
      }
    } else {
      // 북마크 삭제
      try {
        await deleteStockBookmark(id);
        setIsBookmarked(false);
        onBookmarkSuccess(); // 북마크 삭제 후 리스트 갱신
      } catch (error) {
        console.error('Bookmark removal failed', error);
      }
    }
  };

  useEffect(() => {
    const fetchBookmarks = async () => {
      const bookmarkedIds = await fetchBookmarkedStockNews();
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
    <StockNewsBodyWrapper>
      {/* stockName을 전달 */}
      <StockNewsHeader
        header={header}
        stockDetail={stockDetail!}
        isBookmarked={isBookmarked}
        onBookmarkIconClick={handleBookmarkIconClick}
        onSummaryClick={handleSummaryClick}
      />
      {showSummary && (
        <Overlay>
          <Background onClick={handleCloseSummary} />
          <Modal onClick={handleModalClick}>
            <NewsSummary onClose={handleCloseSummary} />
          </Modal>
        </Overlay>
      )}
      <StockNewsTitleWrapper>
        <SentimentIcon sentiment={sentiment} /> {/* SentimentIcon 사용 */}
        <StockNewsTitle>
          <StockNewsTitleText>{title}</StockNewsTitleText>
        </StockNewsTitle>
      </StockNewsTitleWrapper>

      <StockNewsContent>{content}</StockNewsContent>

      <StockNewsFooter>
        <FooterText>{media}</FooterText>
        <FooterText>{formattedDate}</FooterText>
      </StockNewsFooter>

      <BookmarkedNewsTagWrapper>
        {Array.isArray(keywords) && keywords.length > 0 ? (
          keywords.map((keyword, index) => (
            <NewsTag key={index} $tagName={keyword}>
              # {keyword}
            </NewsTag>
          ))
        ) : (
          <p>키워드 없음</p> // 키워드가 없을 경우 처리
        )}
      </BookmarkedNewsTagWrapper>
    </StockNewsBodyWrapper>
  );
};

export default StockNewsBody;
