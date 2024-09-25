import { useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import newsData from '@api/dummyData/20240907.json';
import StockNewsBody from '@features/News/StockNews/StockNewsBody';
import StockNewsHeader from '@features/News/StockNews/StockNewsHeader';
import EconSubNewsBody from '@features/News/EconNews/EconSubNewsBody';

const SubCenter = styled.div`
  display: flex;
  width: 100%;
  padding: 0 1.5rem;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  /* min-width: 900px; */
  max-width: 106rem;
  /* min-width: 1024px; */
  width: 64rem;
`;

const StockNewsOuterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 1.6rem 1.5rem;
  margin: 1.25rem 0;
  box-shadow: 0 0.25rem 0.25rem rgba(0, 0, 0, 0.25);
  background-color: ${({ theme }) => theme.newsBackgroundColor};
  border-radius: 2rem;
  align-self: stretch;
  cursor: pointer;

  transition: transform 0.3s ease; /* 부드러운 전환 효과 */

  /* hover 시 확대 */
  &:hover {
    transform: scale(1.05); /* 5% 확대 */
  }
`;

const StockNewsWrapper = styled.div`
  display: flex;
  /* padding: 1.6rem 1.5rem; */
  /* margin: 1.25rem 0; */
  align-items: flex-start;
  justify-content: space-between;
  align-self: stretch;
  width: 100%;
  /* height: 18rem; */
`;

const ObserverTrigger = styled.div`
  height: 0.0625rem;
`;

const LoadingIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 1rem;
  /* font-size: 1.5rem; */
`;

// 도넛 모양의 로딩 스피너
const LoadingSpinner = styled.div`
  display: inline-block;
  width: 3rem;
  height: 3rem;
  border: 0.4rem solid rgba(0, 0, 0, 0.1);
  border-top: 0.4rem solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

interface NewsItem {
  title: string;
  description: string;
  media: string;
  uploadDatetime: string;
  thumbnail: string;
  keywords: string[];
  stockId: string;
}
const StockNewsPage: React.FC = () => {
  const [newsList, setNewsList] = useState<NewsItem[]>(
    newsData.data.slice(0, 10)
  );
  const [displayedItems, setDisplayedItems] = useState<number>(10); // 처음에 표시할 데이터 개수
  const [loading, setLoading] = useState<boolean>(false); // 로딩 상태
  const observerRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  const loadMoreNews = useCallback(() => {
    if (displayedItems < newsData.data.length) {
      setLoading(true); // 로딩 시작
      setTimeout(() => {
        const moreNews = newsData.data.slice(
          displayedItems,
          displayedItems + 10
        );
        setNewsList((prevNewsList) => [...prevNewsList, ...moreNews]);
        setDisplayedItems(displayedItems + 10);
        setLoading(false); // 로딩 완료
      }, 1000); // 데이터 로드 시간 시뮬레이션 (1초 대기)
    }
  }, [displayedItems]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !loading) {
        loadMoreNews(); // 스크롤 감지 시 더 많은 데이터를 로드
      }
    });

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [loadMoreNews, loading]);

  const handleNewsClick = (stockId: string) => {
    navigate(`/subnews-main/stock-news/${stockId}`);
  };

  return (
    <>
      <SubCenter>
        {newsList.map((news, index) => (
          <StockNewsOuterWrapper
            key={index}
            onClick={() => handleNewsClick(news.stockId)}
          >
            <StockNewsHeader />
            <StockNewsWrapper>
              <StockNewsBody
                title={news.title}
                description={news.description}
                media={news.media}
                date={news.uploadDatetime}
                keywords={news.keywords}
              />
              <EconSubNewsBody thumbnail={news.thumbnail} />
            </StockNewsWrapper>
          </StockNewsOuterWrapper>
        ))}
        {loading && (
          <LoadingIcon>
            <LoadingSpinner />
          </LoadingIcon>
        )}
        {/* 감시하는 요소로 Intersection Observer가 작동하는 기준점 */}
        {/* <div ref={observerRef} style={{ height: '1px' }}></div> */}
        <ObserverTrigger ref={observerRef} />
      </SubCenter>
    </>
  );
};

export default StockNewsPage;
