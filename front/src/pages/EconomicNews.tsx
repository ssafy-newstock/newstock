import { useState, useRef, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import newsData from '@api/dummyData/20240907.json';
import EconNewsBody from '@features/News/EconNews/EconNewsBody';
import EconSubNewsBody from '@features/News/EconNews/EconSubNewsBody';

const SubCenter = styled.div`
  display: flex;
  width: 100%;
  padding: 0px 20px;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
`;

const EconomicNewsWrapper = styled.div`
  display: flex;
  padding: 25px 20px 25px 20px;
  margin: 20px 0px;
  align-items: flex-start;
  justify-content: space-between;
  gap: 10px;
  align-self: stretch;
  border-radius: 33px;
  background: #fff;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;

const EconomicNewsPage: React.FC = () => {
  const [newsList, setNewsList] = useState(newsData.data.slice(0, 10));
  const [displayedItems, setDisplayedItems] = useState<number>(10); // 처음에 표시할 데이터 개수
  const observerRef = useRef<HTMLDivElement | null>(null);

  // Intersection Observer가 작동할 때 추가로 10개의 데이터를 보여줌
  const loadMoreNews = useCallback(() => {
    if (displayedItems < newsData.data.length) {
      const moreNews = newsData.data.slice(displayedItems, displayedItems + 10);
      setNewsList((prevNewsList) => [...prevNewsList, ...moreNews]);
      setDisplayedItems(displayedItems + 10);
    }
  }, [displayedItems]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
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
  }, [loadMoreNews]);

  return (
    <>
      <SubCenter>
        {newsList.map((news, index) => (
          <EconomicNewsWrapper key={index}>
            <EconNewsBody
              title={news.title}
              description={news.description}
              media={news.media}
              date={news.uploadDatetime}
            />
            <EconSubNewsBody thumbnail={news.thumbnail} />
          </EconomicNewsWrapper>
        ))}
        {/* 감시하는 요소로 Intersection Observer가 작동하는 기준점 */}
        <div ref={observerRef} style={{ height: '1px' }}></div>
      </SubCenter>
    </>
  );
};

export default EconomicNewsPage;
