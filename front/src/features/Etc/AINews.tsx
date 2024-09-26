import React from 'react';
import styled from 'styled-components';
import newsData from '@api/dummyData/20210624-industry.json';

const NewsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  margin-top: 1.25rem;
  gap: 1.25rem;
`;

const NewsHeaderText = styled.p`
  font-weight: 600;
  font-size: 1.25rem;
`;

const NewsOuterWrapper = styled.div`
  display: flex;
  overflow-x: auto;
  width: 100%;
`;

const NewsItemWrapper = styled.div`
  flex: 0 0 auto; /* 아이템이 가로로 배치되도록 설정 */
  width: 20%;
  height: 12.5rem;
  padding: 1.25rem 1rem;
  border: 1px solid #d1d1d1;
  border-radius: 0.3rem;

  background-color: white;
  /* text-align: center; */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const NewsMedia = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
`;

const NewsTitle = styled.p`
  font-size: 0.9rem;
  color: #666;
`;

const NewsDate = styled.p`
  font-size: 0.625rem;
  color: #e0e0e0;
  margin-bottom: 1rem;
`;

interface NewsItem {
  title: string;
  subtitle?: string;
  media: string;
  description: string;
  thumbnail?: string;
  uploadDatetime: string;
  article: string;
  newsId: string;
  industry: string;
}

interface NewsData {
  newsDate: string;
  collectDate: string;
  totalCnt: number;
  data: NewsItem[];
}

const AINews: React.FC = () => {
  const limitedNewsData: NewsItem[] = (newsData as NewsData).data.slice(0, 5);
  //   const formattedDate = date?.split(' ')[0].replace(/-/g, '.') || '날짜 불명';
  return (
    <NewsWrapper>
      <NewsHeaderText>관련 뉴스</NewsHeaderText>
      <NewsOuterWrapper>
        {limitedNewsData.map((news, index) => (
          <NewsItemWrapper key={index}>
            <NewsMedia>{news.media}</NewsMedia>
            <NewsDate>
              {news.uploadDatetime.split(' ')[0].replace(/-/g, '.')}
            </NewsDate>
            <NewsTitle>{news.title}</NewsTitle>
          </NewsItemWrapper>
        ))}
      </NewsOuterWrapper>
    </NewsWrapper>
  );
};

export default AINews;
