import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import EconNewsDetailHeader from '@features/News/EconNewsDetail/EconNewsDetailHeader';
import EconNewsDetailBody from '@features/News/EconNewsDetail/EconNewsDetailBody';
import useAuthStore from '@store/useAuthStore';
import usePointStore from '@store/usePointStore';
import axios from 'axios';
import { useEffect, useState } from 'react';
import useSocketStore from '@store/useSocketStore';

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

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (id) {
      timer = setTimeout(async () => {
        try {
          await axios.get(`https://newstock.info/api/news/industry/${id}/read`),
            { Headers: `Bearer ${a}` };
          console.log('Read request sent for article:', id);
        } catch (error) {
          console.error('Failed to send read request: ', error);
        }
      }, 5000); // 5초 후에 실행

      // 컴포넌트가 언마운트되면 타이머 해제
      return () => clearTimeout(timer);
    }
  }, [id]);

  const { memberId } = useAuthStore();
  const { point, setPoint } = usePointStore();

  useEffect(() => {
    const client = useSocketStore.getState().client;

    if (client && memberId) {
      const subscription = client.subscribe(
        `/api/sub/member/info/point/increase/${id}`,
        (message) => {
          const newPoint = message.body;
          console.log('Received message in Header:', newPoint);
          setPoint((newPoint) => point + newPoint);
          console.log('새롭게 받은 포인트 :', newPoint);
          console.log('현재 포인트 :', point);
        }
      );

      // 구독 해제 및 WebSocket 해제 처리
      return () => {
        if (subscription) {
          subscription.unsubscribe();
        }
      };
    }
  });

  return (
    <div>
      <SubCenter>
        <NewsWrapper>
          {detailNews && (
            <EconNewsDetailHeader
              title={detailNews.title}
              media={detailNews.media}
              uploadDate={detailNews.uploadDatetime}
              sentiment={detailNews.sentiment}
              id={detailNews.id}
            />
          )}
          {detailNews && (
            <EconNewsDetailBody
              subtitle={detailNews.subtitle}
              article={detailNews.article}
            />
          )}
        </NewsWrapper>
      </SubCenter>
    </div>
  );
};

export default EconomicNewsDetailPage;
