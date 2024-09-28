import { useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { getNewsData } from '@api/dummyData/DummyData';
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

const StockNewsOuterWrapper = styled.div<{ $showSummary: boolean }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 1.6rem 1.5rem;
  margin: 1.25rem 0;
  box-shadow: 0 0.25rem 0.25rem rgba(0, 0, 0, 0.1);
  background-color: ${({ theme }) => theme.newsBackgroundColor};
  border-radius: 2rem;
  align-self: stretch;
  cursor: pointer;

  transition: ${({ $showSummary }) =>
    $showSummary ? 'none' : 'transform 0.3s ease'};

  &:hover {
    transform: ${({ $showSummary }) => ($showSummary ? 'none' : 'scale(1.02)')};
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
  article: string;
  content: string;
  media: string;
  uploadDatetime: string;
  thumbnail?: string;
  keywords: string[];
  newsId: string;
  imageUrl?: string;
}

// 이미지 URL과 나머지 기사 내용을 분리하는 함수
const processArticle = (
  article: string
): { imageUrl: string; content: string } => {
  const imageTagRegex = /<ImageTag>(.*?)<\/ImageTag>/;
  const match = imageTagRegex.exec(article);

  let imageUrl = '';
  let content = article;

  if (match && match[1]) {
    imageUrl = match[1]; // 이미지 URL 추출
    content = article.replace(imageTagRegex, '').trim(); // 이미지 태그 제거 후 남은 기사 내용
  }

  return { imageUrl, content };
};

const StockNewsPage: React.FC = () => {
  const { stock } = getNewsData();

  const [newsList, setNewsList] = useState<NewsItem[]>(() => {
    return stock.data.slice(0, 10).map((newsItem) => {
      const { imageUrl, content } = processArticle(newsItem.article);
      return { ...newsItem, content, imageUrl };
    });
  });

  const [displayedItems, setDisplayedItems] = useState<number>(10); // 처음에 표시할 데이터 개수
  const [loading, setLoading] = useState<boolean>(false); // 로딩 상태
  const [showSummary, setShowSummary] = useState<boolean>(false); // 모달 상태 관리

  const observerRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  const loadMoreNews = useCallback(() => {
    if (displayedItems < stock.data.length) {
      setLoading(true); // 로딩 시작
      setTimeout(() => {
        const moreNews = stock.data
          .slice(displayedItems, displayedItems + 10)
          .map((newsItem) => {
            const { imageUrl, content } = processArticle(newsItem.article); // article에서 imageUrl과 content 추출
            return {
              ...newsItem,
              content, // content 추가
              imageUrl, // imageUrl 추가
            };
          });

        setNewsList((prevNewsList) => [...prevNewsList, ...moreNews]);
        setDisplayedItems(displayedItems + 10);
        setLoading(false); // 로딩 완료
      }, 1000); // 데이터 로드 시간 시뮬레이션 (1초 대기)
    }
  }, [displayedItems, stock.data]);

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

  const handleNewsClick = (newsId: string) => {
    navigate(`/subnews-main/stock-news/${newsId}`);
  };

  const handleShowSummaryChange = (newShowSummary: boolean) => {
    setShowSummary(newShowSummary);
  };

  return (
    <>
      <SubCenter>
        {newsList.map((news, index) => (
          <StockNewsOuterWrapper
            key={index}
            onClick={() => handleNewsClick(news.newsId)}
            $showSummary={showSummary}
          >
            <StockNewsHeader />
            <StockNewsWrapper>
              <StockNewsBody
                title={news.title}
                content={news.content}
                media={news.media}
                date={news.uploadDatetime}
                keywords={news.keywords}
              />
              <EconSubNewsBody
                thumbnail={news.thumbnail}
                onShowSummaryChange={handleShowSummaryChange}
              />
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
