import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import EconNewsDetailHeader from '@features/News/EconNewsDetail/EconNewsDetailHeader';
import EconNewsDetailBody from '@features/News/EconNewsDetail/EconNewsDetailBody';
import axios from 'axios';
import { useEffect, useState } from 'react';
import NewsDetailSkeleton from '@features/News/skeleton/NewsDetailSkeleton';

const SubCenter = styled.div`
  display: flex;
  width: 100%;
  padding: 0 1.5rem;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  max-width: 106rem;
  width: 100%;
`;

const NewsWrapper = styled.div`
  display: flex;
  padding: 1.6rem 1.25rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.625rem;
  align-self: stretch;
  border-radius: 2rem;
  background-color: ${({ theme }) => theme.newsBackgroundColor};
  box-shadow: 0rem 0.25rem 0.25rem rgba(0, 0, 0, 0.1);
`;

interface NewsItem {
  id: number;
  title: string;
  article: string;
  content: string;
  industry: string;
  media: string;
  sentiment: string;
  thumbnail?: string;
  uploadDatetime: string;
  imageUrl?: string;
  subtitle?: string;
}

const fetchDetailNewsData = async (id: string): Promise<NewsItem | null> => {
  try {
    const response = await axios.get(
      `https://newstock.info/api/news/industry/${id}`
    );
    return response.data.data;
  } catch (error) {
    console.error('Failed to fetch EconomicDetailNews: ', error);
    return null;
  }
};

const EconomicNewsDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [detailNews, setDetailNews] = useState<NewsItem | null>(null);

  useEffect(() => {
    const loadNews = async () => {
      if (id) {
        // id가 존재하는 경우에만 데이터를 가져옴
        const detailNewsData = await fetchDetailNewsData(id);
        setDetailNews(detailNewsData);
      } else {
        console.error('No id provided in the URL'); // id가 없는 경우 오류 처리
      }
    };
    loadNews();
  }, [id]);

  return (
    <div>
      <SubCenter>
        {detailNews ? (
          <NewsWrapper>
            <EconNewsDetailHeader
              title={detailNews.title}
              media={detailNews.media}
              uploadDate={detailNews.uploadDatetime}
              sentiment={detailNews.sentiment}
              id={detailNews.id}
            />
            <EconNewsDetailBody
              subtitle={detailNews.subtitle}
              article={detailNews.article}
            />
          </NewsWrapper>
        ) : (
          <NewsDetailSkeleton />
        )}
      </SubCenter>
    </div>
  );
};

export default EconomicNewsDetailPage;
