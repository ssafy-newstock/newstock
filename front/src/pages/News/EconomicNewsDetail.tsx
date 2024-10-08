import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import EconNewsDetailHeader from '@features/News/EconNewsDetail/EconNewsDetailHeader';
import EconNewsDetailBody from '@features/News/EconNewsDetail/EconNewsDetailBody';
import useAuthStore from '@store/useAuthStore';
import usePointStore from '@store/usePointStore';
import useSocketStore from '@store/useSocketStore';
import axios from 'axios';
import { useEffect, useState } from 'react';
import NewsDetailSkeleton from '@features/News/skeleton/NewsDetailSkeleton';
import { authRequest } from '@api/axiosInstance';
import { toast } from 'react-toastify';

const SubCenter = styled.div`
  display: flex;
  width: 100%;
  padding: 0 1.5rem;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  max-width: 100rem;
  min-width: 50rem;
  width: 100%;
  margin-top: 1.2rem;
`;

const NewsWrapper = styled.div`
  display: flex;
  /* padding: 1.6rem 1.25rem; */
  padding: 2rem 2rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.625rem;
  align-self: stretch;
  border-radius: 2rem;
  background-color: ${({ theme }) => theme.newsBackgroundColor};
  box-shadow: 0rem 0.25rem 0.25rem rgba(0, 0, 0, 0.1);
  width: 90%;
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
  const { client, connectSocket } = useSocketStore();

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

  const { setPlusPoint } = usePointStore();
  const { memberId } = useAuthStore();

  // 요청 메시지를 WebSocket으로 전송

  useEffect(() => {
    const fetchEconomicDetail = async () => {
      await authRequest.get(`/news/industry/${id}/read`);
      console.log(`/api/news/industry/${id}/read`);
      console.log('API 요청이 성공적으로 전송되었습니다.');
    };

    // 5초 뒤에 요청 보내기
    const timeoutId = setTimeout(() => {
      console.log('5초 뒤에 요청을 전송합니다...');
      fetchEconomicDetail();
    }, 5000); // 5000 밀리초 = 5초

    return () => {
      clearTimeout(timeoutId); // 컴포넌트가 언마운트 될 때 타임아웃 클리어
    };
  }, [id]);

  useEffect(() => {
    // WebSocket 연결
    connectSocket();

    if (client && memberId) {
      const subscription = client.subscribe(
        `/api/sub/member/info/point/increase/${memberId}`,
        (response) => {
          const parsedData = JSON.parse(response.body);
          const plusPoint = parsedData.point;
          console.log(`Received new points: ${plusPoint}`);
          setPlusPoint((prevPoint) =>
            prevPoint !== null ? prevPoint + plusPoint : plusPoint
          );
          if (plusPoint) {
            toast.success(`${plusPoint}원 충전되었습니다!`);
          }
        }
      );

      return () => {
        // 구독 해제
        subscription.unsubscribe();
      };
    }
  }, [client, memberId]);

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
