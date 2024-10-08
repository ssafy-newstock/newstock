import { useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { useBookmarkStore } from '@store/useBookmarkStore';
import { NewsTag } from '@features/News/NewsIconTag';
import { bookmarkedIcon } from '@features/News/NewsIconTag';
import { useNavigate } from 'react-router-dom';
import {
  CenteredMessage,
  ModalContainer,
  ModalLeftTop,
  TextP_24,
} from './styledComponent';
// import noDataPng from '@assets/News/noDataPng.png';

const FavoriteNewsCenter = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  gap: 1rem;
`;

const BookmarkedNewsWrapper = styled.div`
  display: flex;
  padding: 0.8rem 1rem;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  align-self: stretch;
  gap: 0.5rem;
  background-color: ${({ theme }) => theme.newsBackgroundColor};
  border-radius: 1.25rem;
  box-shadow: 0 0.25rem 0.25rem rgba(0, 0, 0, 0.1);
  cursor: pointer;

  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const BookmarkedNewsTitle = styled.p`
  color: ${({ theme }) => theme.textColor};
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.25rem;
  width: 80%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const BookmarkedNewsMiddle = styled.div`
  display: flex;
  padding: 0 0.5rem;
  align-items: center;
  gap: 0.5rem;
  align-self: stretch;
`;

const BookmarkedNewsMiddleText = styled.p`
  color: ${({ theme }) => theme.grayTextColor};
  font-size: 0.8rem;
  line-height: 1.875rem;
`;

const BookmarkedNewsMiddleLine = styled.div`
  width: 0.09rem;
  height: 1.25rem;
  background: #e0e0e0;
`;

const BookmarkedNewsFooter = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: flex-start;
  align-items: stretch;
`;

interface FavoriteNewsProps {
  isOpen: boolean;
}

const FavoriteNews: React.FC<FavoriteNewsProps> = ({ isOpen }) => {
  const {
    bookmarkedDetailNews,
    bookmarkedDetailStockNews,
    fetchBookmarkedDetailNews,
    fetchBookmarkedDetailStockNews,
    removeBookmark,
    removeStockBookmark,
  } = useBookmarkStore();

  const navigate = useNavigate();

  const allBookmarkedNews = [
    ...new Set([...bookmarkedDetailNews, ...bookmarkedDetailStockNews]),
  ];

  // 북마크된 뉴스 데이터를 불러오는 함수들을 useCallback으로 메모이제이션하여 중복 호출 방지
  const loadBookmarks = useCallback(async () => {
    try {
      await Promise.all([
        fetchBookmarkedDetailNews(),
        fetchBookmarkedDetailStockNews(),
      ]);
    } catch (error) {
      console.error('Failed to load bookmarks:', error);
    }
  }, [
    fetchBookmarkedDetailNews,
    fetchBookmarkedDetailStockNews,
    bookmarkedDetailNews,
    bookmarkedDetailStockNews,
  ]);

  // useEffect는 의존성 배열에 있는 값이 변화할 때만 호출
  useEffect(() => {
    loadBookmarks(); // 상태가 변할 때마다 북마크된 뉴스 불러오기
  }, [loadBookmarks]);

  // 뉴스 클릭 이벤트에서 stockNews와 industryNews를 구분하여 navigate
  const handleNewsClick = (id: string, isStockNews: boolean) => {
    const url = isStockNews
      ? `/subnews-main/stock-news/${id}`
      : `/subnews-main/economic-news/${id}`;
    navigate(url);
  };

  const handleBookmarkClick = async (
    id: string,
    event: React.MouseEvent,
    isStockNews: boolean
  ) => {
    event.stopPropagation(); // 이벤트 전파 중지
    if (isStockNews) {
      await removeStockBookmark(id); // 종목 뉴스 북마크 삭제
    } else {
      await removeBookmark(id); // 시황 뉴스 북마크 삭제
    }
  };

  return (
    <ModalContainer $isOpen={isOpen}>
      <ModalLeftTop>
        <TextP_24>관심 뉴스</TextP_24>
      </ModalLeftTop>
      <FavoriteNewsCenter>
        {allBookmarkedNews.length > 0 ? (
          allBookmarkedNews.map((newsItem, index) => {
            const uploadDate = newsItem.uploadDatetime
              ? newsItem.uploadDatetime.split('T')[0].replace(/-/g, '.')
              : '날짜 없음';

            const isStockNews = bookmarkedDetailStockNews.includes(newsItem);

            return (
              <BookmarkedNewsWrapper
                key={index}
                onClick={() => handleNewsClick(newsItem.id, isStockNews)}
              >
                <BookmarkedNewsTitle>
                  {newsItem.title || '제목 없음'}
                </BookmarkedNewsTitle>
                <BookmarkedNewsMiddle>
                  <BookmarkedNewsMiddleText>
                    {newsItem.media || '미디어 정보 없음'}
                  </BookmarkedNewsMiddleText>
                  <BookmarkedNewsMiddleLine />
                  <BookmarkedNewsMiddleText>
                    {uploadDate}
                  </BookmarkedNewsMiddleText>
                </BookmarkedNewsMiddle>

                <BookmarkedNewsFooter>
                  <NewsTag $tagName={isStockNews ? '종목' : '시황'}>
                    #{isStockNews ? '종목' : '시황'}
                  </NewsTag>
                  <div
                    onClick={(e) =>
                      handleBookmarkClick(newsItem.id, e, isStockNews)
                    }
                  >
                    {bookmarkedIcon}
                  </div>
                </BookmarkedNewsFooter>
              </BookmarkedNewsWrapper>
            );
          })
        ) : (
          <CenteredMessage>데이터가 존재하지 않습니다.</CenteredMessage>
        )}
      </FavoriteNewsCenter>
    </ModalContainer>
  );
};

export default FavoriteNews;
