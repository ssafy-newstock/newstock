import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useBookmarkStore } from '@store/useBookmarkStore';
import { NewsTag } from '@features/News/NewsIconTag';
import { bookmarkedIcon } from '@features/News/NewsIconTag';
import { useNavigate } from 'react-router-dom';
import { authRequest } from '@api/axiosInstance';

const BookmarkedNewsWrapper = styled.div`
  display: flex;
  width: 100%;
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
  /* color: #828282; */
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

// 북마크된 뉴스의 ID로부터 뉴스 정보를 가져오는 함수
const fetchNewsDetailsById = async (id: number, isStockNews: boolean) => {
  const url = isStockNews
    ? `/news/stock/${id}` // 종목 뉴스 API 엔드포인트
    : `/news/industry/${id}`; // 시황 뉴스 API 엔드포인트

  try {
    const response = await authRequest.get(url);
    return response.data.data; // 뉴스 상세 정보 반환
  } catch (error) {
    console.error('Failed to fetch news details:', error);
    return null;
  }
};

interface newsItem {
  id: number;
  title: string;
  media: string;
  uploadDatetime: string;
}

const FavoriteNews: React.FC = () => {
  const {
    bookmarkedNewsIds,
    bookmarkedStockNewsIds,
    fetchBookmarkedNews,
    fetchBookmarkedStockNews,
    removeBookmark,
    removeStockBookmark,
  } = useBookmarkStore();

  const [newsDetails, setNewsDetails] = useState<newsItem[]>([]); // 뉴스 세부 정보 저장
  const navigate = useNavigate();

  // 북마크된 뉴스의 세부 정보를 불러오는 함수
  const loadNewsDetails = async () => {
    const allIds = [...bookmarkedNewsIds, ...bookmarkedStockNewsIds];
    const newsPromises = allIds.map((id) =>
      fetchNewsDetailsById(
        id,
        bookmarkedStockNewsIds.includes(id) // stock 뉴스인지 여부
      )
    );

    const results = await Promise.all(newsPromises);
    setNewsDetails(results.filter((news) => news !== null)); // null이 아닌 결과만 저장
  };

  // 북마크된 뉴스 데이터를 다시 불러오는 함수
  useEffect(() => {
    const loadBookmarks = async () => {
      await Promise.all([fetchBookmarkedNews(), fetchBookmarkedStockNews()]);
      await loadNewsDetails();
    };
    loadBookmarks();
  }, [fetchBookmarkedNews, fetchBookmarkedStockNews]);

  // 뉴스 클릭 이벤트에서 stockNews와 industryNews를 구분하여 navigate
  const handleNewsClick = (id: number, isStockNews: boolean) => {
    const url = isStockNews
      ? `/subnews-main/stock-news/${id}`
      : `/subnews-main/economic-news/${id}`;
    navigate(url);
  };

  const handleBookmarkClick = async (
    id: number,
    event: React.MouseEvent,
    isStockNews: boolean
  ) => {
    event.stopPropagation(); // 이벤트 전파 중지
    if (isStockNews) {
      await removeStockBookmark(id); // 종목 뉴스 북마크 삭제
    } else {
      await removeBookmark(id); // 시황 뉴스 북마크 삭제
    }
    loadNewsDetails();
  };

  return (
    <>
      {newsDetails.length > 0 ? (
        newsDetails.map((news, index) => (
          <BookmarkedNewsWrapper
            key={index}
            onClick={() =>
              handleNewsClick(news.id, bookmarkedStockNewsIds.includes(news.id))
            }
          >
            <BookmarkedNewsTitle>{news.title}</BookmarkedNewsTitle>
            <BookmarkedNewsMiddle>
              <BookmarkedNewsMiddleText>{news.media}</BookmarkedNewsMiddleText>
              <BookmarkedNewsMiddleLine />
              <BookmarkedNewsMiddleText>
                {news.uploadDatetime.split(' ')[0].replace(/-/g, '.')}
              </BookmarkedNewsMiddleText>
            </BookmarkedNewsMiddle>

            <BookmarkedNewsFooter>
              <NewsTag
                $tagName={
                  bookmarkedStockNewsIds.includes(news.id) ? '종목' : '시황'
                }
              >
                # {bookmarkedStockNewsIds.includes(news.id) ? '종목' : '시황'}
              </NewsTag>
              <div
                onClick={(e) =>
                  handleBookmarkClick(
                    news.id,
                    e,
                    bookmarkedStockNewsIds.includes(news.id)
                  )
                }
              >
                {bookmarkedIcon}
              </div>
            </BookmarkedNewsFooter>
          </BookmarkedNewsWrapper>
        ))
      ) : (
        <p>북마크된 뉴스가 없습니다.</p>
      )}
    </>
  );
};

export default FavoriteNews;
