import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useRef, useEffect, useCallback } from 'react';
import noData from '@assets/News/noData.png';
import styled from 'styled-components';
import EconNewsBody from '@features/News/EconNews/EconNewsBody';
import EconSubNewsBody from '@features/News/EconNews/EconSubNewsBody';
import {
  translateCategoryToEnglish,
  translateIndustry,
} from '@api/dummyData/DummyData';

import axios, { AxiosResponse } from 'axios';
import EconNewsSkeleton from '@features/News/skeleton/EconNewsSkeleton';
import { UpIcon, UpIconWrapper } from '@features/News/UpIcon';

const ScrollToTopButton = styled(UpIconWrapper)`
  position: fixed;
  bottom: 1.5rem;
  right: 6rem;
  /* background-color: ${({ theme }) => theme.backgroundColor}; */
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;

  &:hover {
    transform: scale(1.1);
  }
`;

const SubCenter = styled.div`
  display: flex;
  padding: 1rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  align-self: stretch;
  max-width: 100rem;
  min-width: 50rem;
  width: 100%;
  gap: 2.5rem;
`;

const EconomicNewsWrapper = styled.div<{ $showSummary: boolean }>`
  display: flex;
  /* background-color: ${({ theme }) => theme.newsBackgroundColor}; */
  /* margin: 0 1.25rem; */
  align-items: center;
  justify-content: space-between;
  align-self: stretch;
  border-radius: 2rem;
  width: 100%;
  gap: 2rem;

  cursor: pointer;

  transition: ${({ $showSummary }) =>
    $showSummary ? 'none' : 'transform 0.3s ease'};

  &:hover {
    transform: ${({ $showSummary }) => ($showSummary ? 'none' : 'scale(1.02)')};
  }
`;

const NoDataContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  text-align: center;
  /* margin-top: 7rem; */
  gap: 3rem;
`;

const NoDataImage = styled.div`
  width: 85%; /* 이미지 크기를 원하는 대로 조정 */
  height: auto; /* 이미지 비율을 유지 */
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

// const NoNewsMessage = styled.p`
//   color: ${({ theme }) => theme.grayTextColor};
//   font-size: 1.8rem;
//   font-weight: 600;
//   text-align: center;
//   /* margin-right: 2rem; */
// `;

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
  id: string;
  title: string;
  article: string;
  content: string;
  industry: string;
  media: string;
  sentiment: string;
  thumbnail?: string;
  uploadDatetime: string;
  imageUrl?: string;
}

const processArticle = (
  article: string
): { imageUrls: string[]; content: string } => {
  const imageTagRegex = /<ImageTag>(.*?)<\/ImageTag>/g;
  const imageUrls: string[] = [];
  let content = article;
  let match;

  // 모든 ImageTag를 찾고, 해당하는 이미지 URL을 배열에 저장
  while ((match = imageTagRegex.exec(article)) !== null) {
    imageUrls.push(match[1]); // 이미지 URL을 배열에 추가
  }

  // 모든 ImageTag를 텍스트에서 제거
  content = article.replace(imageTagRegex, '').trim();

  return { imageUrls, content };
};

const fetchEconomyNewsData = async (
  category: string,
  page: number
): Promise<NewsItem[]> => {
  try {
    console.log(`Fetching news for page ${page}`); // 페이지 정보를 출력
    const translatedCategory =
      category !== '전체 기사'
        ? translateCategoryToEnglish(category)
        : undefined;

    const response: AxiosResponse<{ data: NewsItem[] }> = await axios.get(
      'https://newstock.info/api/news/industry',
      {
        params: {
          industry: translatedCategory, // 영문으로 변환된 값을 사용
          page: page,
        },
      }
    );

    // console.log('Fetched data:', response.data); // 가져온 데이터를 출력
    if (response.data && response.data.data.length > 0) {
      const newsData = response.data.data.map((newsItem: NewsItem) => {
        const { imageUrls, content } = processArticle(newsItem.article);
        return {
          ...newsItem,
          content,
          imageUrls,
          industry: translateIndustry(newsItem.industry), // industry 값을 한글로 변환
        };
      });
      return newsData;
    } else {
      return []; // 데이터가 없는 경우 빈 배열 반환
    }
  } catch (error) {
    console.error('Failed to fetch Economic news: ', error);
    return [];
  }
};

const EconomicNewsPage: React.FC = () => {
  const location = useLocation();
  const selectedCategory = location.state?.selectedCategory || '전체 기사';

  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false); // 로딩 상태
  const [showSummary, setShowSummary] = useState<boolean>(false); // 모달 상태 관리
  const [page, setPage] = useState<number>(1);
  const [initialLoadComplete, setInitialLoadComplete] =
    useState<boolean>(false);
  const [hasMoreNews, setHasMoreNews] = useState<boolean>(true); // 추가된 상태

  const observerRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const firstNewsRef = useRef<HTMLDivElement | null>(null); // 첫 번째 뉴스 항목을 참조

  const fetchNews = useCallback(async () => {
    setLoading(true);
    try {
      const newNews = await fetchEconomyNewsData(selectedCategory, page);
      if (newNews.length === 0) {
        setHasMoreNews(false);
      } else {
        setNewsList((prevNewsList) => [...prevNewsList, ...newNews]);
        setPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      console.error('Error loading news:', error);
    } finally {
      setLoading(false); // 로딩 상태 해제
      setInitialLoadComplete(true); // 첫 페이지 로드가 완료된 상태 설정
    }
  }, [selectedCategory, page]);

  // 선택된 카테고리가 변경될 때 데이터를 새로 불러옴
  useEffect(() => {
    setNewsList([]); // 새로운 카테고리에서는 기존 뉴스 목록을 초기화
    setPage(1); // 페이지를 초기화
    setHasMoreNews(true); // 카테고리 변경 시 다시 true로 설정
    fetchNews(); // 새로운 카테고리에 맞는 데이터를 로드
  }, [selectedCategory]);

  useEffect(() => {
    // console.log('Initial data fetch'); // 초기 데이터 로드 로그 출력
    if (!initialLoadComplete) {
      fetchNews(); // 초기 데이터 로드
    }
  }, [fetchNews, initialLoadComplete]);

  // Intersection Observer를 사용하여 스크롤 하단에 도달할 때 추가 로드
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !loading && initialLoadComplete) {
        fetchNews(); // 스크롤 감지 시 더 많은 데이터를 로드
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
  }, [fetchNews, loading, initialLoadComplete]);

  const handleNewsClick = (id: string) => {
    navigate(`/subnews-main/economic-news/${id}`);
  };

  const handleShowSummaryChange = (newShowSummary: boolean) => {
    setShowSummary(newShowSummary);
  };

  // 첫 번째 뉴스 항목으로 스크롤 이동
  const handleScrollToTop = () => {
    if (firstNewsRef.current) {
      firstNewsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {loading && <EconNewsSkeleton />}
      <SubCenter>
        {/* <UpIcon /> */}
        {newsList.length === 0 && !loading && (
          <NoDataContainer>
            {/* <NoDataImage>
              <img src={noDataPng} alt="noDataPng" />
            </NoDataImage>
            <NoNewsMessage>
              해당 카테고리에 뉴스가 존재하지 않습니다.
            </NoNewsMessage> */}
            <NoDataImage>
              <img src={noData} alt="noDataPng" />
            </NoDataImage>
          </NoDataContainer>
        )}
        {newsList.map((news, index) => (
          <EconomicNewsWrapper
            key={`${news.id}-${index}`} // id와 index 결합하여 고유한 key 생성
            ref={index === 0 ? firstNewsRef : null}
            onClick={() => handleNewsClick(news.id)}
            $showSummary={showSummary}
          >
            <EconSubNewsBody thumbnail={news.thumbnail} />
            <EconNewsBody
              id={news.id}
              title={news.title}
              content={news.content}
              media={news.media}
              date={news.uploadDatetime}
              sentiment={news.sentiment}
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
        {hasMoreNews && <ObserverTrigger ref={observerRef} />}
      </SubCenter>

      <ScrollToTopButton onClick={handleScrollToTop}>
        <UpIcon />
      </ScrollToTopButton>
    </>
  );
};

export default EconomicNewsPage;
