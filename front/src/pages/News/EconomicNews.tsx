import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { getNewsData, translateIndustry } from '@api/dummyData/DummyData';
import EconNewsBody from '@features/News/EconNews/EconNewsBody';
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

const EconomicNewsWrapper = styled.div<{ $showSummary: boolean }>`
  display: flex;
  padding: 1.6rem 1.5rem;
  margin: 1.25rem 0;
  align-items: flex-start;
  justify-content: space-between;
  align-self: stretch;
  border-radius: 2rem;
  background-color: ${({ theme }) => theme.newsBackgroundColor};
  box-shadow: 0 0.25rem 0.25rem rgba(0, 0, 0, 0.1);
  width: 100%;
  height: 18rem;
  cursor: pointer;

  transition: ${({ $showSummary }) =>
    $showSummary ? 'none' : 'transform 0.3s ease'};

  &:hover {
    transform: ${({ $showSummary }) => ($showSummary ? 'none' : 'scale(1.02)')};
  }
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
  newsId: string;
  industry: string;
  imageUrl?: string;
}

const processArticle = (article: string) => {
  const imageTagRegex = /<ImageTag>(.*?)<\/ImageTag>/;
  const match = imageTagRegex.exec(article);

  let imageUrl = '';
  let content = article;

  if (match && match[1]) {
    imageUrl = match[1];
    content = article.replace(imageTagRegex, '').trim();
  }

  return { imageUrl, content };
};

// interface ContextProps {
//   selectedCategory: string;
// }

const EconomicNewsPage: React.FC = () => {
  const { economic } = getNewsData();
  const location = useLocation();
  const selectedCategory = location.state?.selectedCategory || '전체 기사';
  // const { selectedCategory } = useOutletContext<ContextProps>();

  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [displayedItems, setDisplayedItems] = useState<number>(10); // 처음에 표시할 데이터 개수
  const [loading, setLoading] = useState<boolean>(false); // 로딩 상태
  const [showSummary, setShowSummary] = useState<boolean>(false); // 모달 상태 관리

  const observerRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  // 선택된 카테고리로 뉴스 필터링
  const filteredNewsList = useMemo(
    () =>
      economic.data
        .filter(
          (news) =>
            selectedCategory === '전체 기사' ||
            translateIndustry(news.industry) === selectedCategory
        )
        .map((news) => {
          const { imageUrl, content } = processArticle(news.article);
          return {
            ...news,
            content,
            imageUrl,
          };
        }),
    [economic.data, selectedCategory]
  );

  useEffect(() => {
    setNewsList(filteredNewsList.slice(0, 10));
    setDisplayedItems(10);
  }, [selectedCategory, filteredNewsList]);

  // Intersection Observer가 작동할 때 추가로 10개의 데이터를 보여줌
  const loadMoreNews = useCallback(() => {
    if (displayedItems < filteredNewsList.length) {
      setLoading(true); // 로딩 시작
      setTimeout(() => {
        const moreNews = filteredNewsList.slice(
          displayedItems,
          displayedItems + 10
        );
        setNewsList((prevNewsList) => [...prevNewsList, ...moreNews]);
        setDisplayedItems(displayedItems + 10);
        setLoading(false); // 로딩 완료
      }, 1000); // 데이터 로드 시간 시뮬레이션 (1초 대기)
    }
  }, [displayedItems, filteredNewsList]);

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
    navigate(`/subnews-main/economic-news/${newsId}`);
  };

  const handleShowSummaryChange = (newShowSummary: boolean) => {
    setShowSummary(newShowSummary);
  };

  return (
    <>
      <SubCenter>
        {newsList.map((news, index) => (
          <EconomicNewsWrapper
            key={index}
            onClick={() => handleNewsClick(news.newsId)}
            $showSummary={showSummary}
          >
            <EconNewsBody
              title={news.title}
              content={news.content}
              media={news.media}
              date={news.uploadDatetime}
            />
            <EconSubNewsBody
              thumbnail={news.thumbnail}
              onShowSummaryChange={handleShowSummaryChange}
            />
          </EconomicNewsWrapper>
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

export default EconomicNewsPage;
