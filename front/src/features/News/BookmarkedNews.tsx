import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { ArrowIcon, bookmarkedIcon, NewsTag } from './NewsIconTag';
import { axiosInstance } from '@api/axiosInstance';
import { useEffect, useState } from 'react';

const BookmarkedNewsHeader = styled.div`
  display: flex;
  align-items: center;
  align-self: stretch;
  gap: 0.625rem;
`;

const BookmarkedNewsHeaderText = styled.p`
  color: ${({ theme }) => theme.textColor};
  font-family: Inter;
  font-size: 1.25rem;
  font-style: normal;
  line-height: 1.875rem;
`;

const BookmarkedNewsHeaderSVG = styled.div`
  width: 0.5rem;
  height: 1rem;
`;

const BookmarkedNewsWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 10rem;
  padding: 1rem 1.3rem;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  align-self: stretch;
  gap: 0.625rem;
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
  font-family: Inter;
  font-size: 1.25rem;
  font-style: normal;
  line-height: 1.25rem;
  width: 80%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const BookmarkedNewsMiddle = styled.div`
  display: flex;
  padding: 0 0.625rem;
  align-items: center;
  gap: 0.75rem;
  align-self: stretch;
`;

const BookmarkedNewsMiddleText = styled.p`
  /* color: #828282; */
  color: ${({ theme }) => theme.grayTextColor};
  font-family: Inter;
  font-size: 1.125rem;
  font-style: normal;
  line-height: 1.875rem;
`;

const BookmarkedNewsMiddleLine = styled.div`
  width: 0.09rem;
  height: 1.75rem;
  background: #e0e0e0;
`;

const BookmarkedNewsFooter = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: flex-start;
  align-items: stretch;
`;

const fetchBookmarkedNews = async () => {
  try {
    const response = await axiosInstance.get(
      '/api/news/favorite/industry/list'
    );
    if (response.data.success) {
      return response.data.data;
    } else {
      throw new Error('북마크된 뉴스 조회 실패');
    }
  } catch (error) {
    console.error('Failed to fetch bookmarked news:', error);
    throw error;
  }
};

// 인터페이스 정의
interface NewsItem {
  id: number;
  title: string;
  article: string;
  description: string;
  industry: string;
  media: string;
  sentiment: string;
  subtitle: string;
  thumbnail?: string;
  uploadDatetime: string;
}

const BookmarkedNews: React.FC<{
  bookmarkUpdated: boolean;
  resetBookmarkUpdated: () => void;
}> = ({ bookmarkUpdated, resetBookmarkUpdated }) => {
  const [bookmarkedNews, setBookmarkedNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  // 북마크 리스트를 다시 불러오는 함수
  const reloadBookmarkedNews = async () => {
    setLoading(true);
    try {
      const data = await fetchBookmarkedNews();
      setBookmarkedNews(data);
    } catch (error) {
      console.error('Failed to load bookmarked news', error);
    } finally {
      setLoading(false); // 데이터가 로드되면 로딩 상태 해제
    }
  };

  useEffect(() => {
    reloadBookmarkedNews(); // 첫 로드 시 관심 뉴스 불러오기

    if (bookmarkUpdated) {
      reloadBookmarkedNews(); // 북마크 업데이트 발생 시 다시 로드
      resetBookmarkUpdated(); // 상태 초기화
    }
  }, [bookmarkUpdated, resetBookmarkUpdated]);

  const handleInterestNewsClick = () => {
    navigate(`/my-news`);
  };

  const handleNewsClick = (stockId: string) => {
    navigate(`/subnews-main/economic-news/${stockId}`);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <BookmarkedNewsHeader
        onClick={handleInterestNewsClick}
        style={{ cursor: 'pointer' }}
      >
        <BookmarkedNewsHeaderText>관심 뉴스</BookmarkedNewsHeaderText>
        <BookmarkedNewsHeaderSVG>
          <ArrowIcon />
        </BookmarkedNewsHeaderSVG>
      </BookmarkedNewsHeader>

      {bookmarkedNews.length > 0 ? (
        bookmarkedNews.map((news, index) => (
          <BookmarkedNewsWrapper
            key={index}
            onClick={() => handleNewsClick(news.id.toString())}
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
              <NewsTag $tagName="관심"># 관심</NewsTag>
              {bookmarkedIcon}
            </BookmarkedNewsFooter>
          </BookmarkedNewsWrapper>
        ))
      ) : (
        <p>북마크된 뉴스가 없습니다.</p>
      )}
    </>
  );
};

export default BookmarkedNews;
