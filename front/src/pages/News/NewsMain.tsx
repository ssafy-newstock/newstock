// 메인 페이지
import styled from 'styled-components';
import { Center } from '@components/Center';
import NewsMainHeader from '@features/News/NewsMainHeader';
import NewsMainBody from '@features/News/NewsMainBody';
import { translateIndustry } from '@api/dummyData/DummyData';
import useAllStockStore from '@store/useAllStockStore';

import axios from 'axios';
import { useState, useEffect } from 'react';
import useTop10StockStore from '@store/useTop10StockStore';
import NewsMainSkeleton from '@features/News/skeleton/NewsMainSkeleton';

interface NewsData {
  id: string;
  title: string;
  description: string;
  media: string;
  newsId: string;
  uploadDatetime: string;
  industry?: string;
  sentiment: string;
  stockNewsStockCodes?: string[];
}

// 스타일드 컴포넌트 정의
const NewsMainCenter = styled.div`
  display: flex;
  width: 95%;
  // 화면 퍼지는거 보기 싫어서 일단 최댓값 박아둠.
  max-width: 100rem;
  min-width: 65rem;
  /* padding: 1.25rem 3rem; */
  padding: 1rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
  flex: 1 0 0;
  align-self: stretch;
`;

const NewsMainBodyWrapper = styled.div`
  display: flex;
  padding: 1.2rem 0.25rem;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  gap: 1.25rem;
`;

const fetchEconomicNews = async (): Promise<NewsData[]> => {
  try {
    const response = await axios.get(
      `https://newstock.info/api/news/industry/top4`
    );
    return response.data.data;
  } catch (error) {
    console.error('Failed to fetch EconomicNews:', error);
    return [];
  }
};

const fetchStockNews = async (): Promise<NewsData[]> => {
  try {
    const response = await axios.get(
      `https://newstock.info/api/news/stock/top4`
    );
    return response.data.data;
  } catch (error) {
    console.log('Failed to fetch StockNews: ', error);
    return [];
  }
};

const NewsMainPage: React.FC = () => {
  const [economicNews, setEconomicNews] = useState<NewsData[]>([]);
  const [stockNews, setStockNews] = useState<NewsData[]>([]);
  const { allStock } = useAllStockStore();
  const { top10Stock } = useTop10StockStore();

  useEffect(() => {
    const loadNews = async () => {
      const economicNewsData = await fetchEconomicNews();
      const stockNewsData = await fetchStockNews();
      setEconomicNews(economicNewsData);
      setStockNews(stockNewsData);
    };
    loadNews();
  }, []);

  return (
    <>
      <Center>
        <NewsMainCenter>
          {/* 시황 뉴스 헤더 텍스트 */}
          <NewsMainHeader newsType="시황" />
          {economicNews.length === 0 && <NewsMainSkeleton />}
          <NewsMainBodyWrapper>
            {economicNews.map((news, index) => (
              <NewsMainBody
                key={index}
                newsType="시황"
                title={news.title}
                description={news.description}
                media={news.media}
                date={news.uploadDatetime}
                // header={translateIndustry(news.industry)}
                header={translateIndustry(news.industry!)}
                id={news.id}
                sentiment={news.sentiment}
              />
            ))}
          </NewsMainBodyWrapper>
          <NewsMainHeader newsType="종목" />
          {stockNews.length === 0 && <NewsMainSkeleton />}
          <NewsMainBodyWrapper>
            {stockNews.map((news, index) => {
              // stockNewsStockCodes의 첫 번째 stockCode에 해당하는 stockName을 찾음
              const stockCode = news.stockNewsStockCodes![0];
              const stockDetail =
                allStock?.find((s) => s.stockCode === stockCode) ||
                top10Stock?.find((s) => s.stockCode === stockCode);
              // const stockName = stockDetail?.stockName;
              return (
                <NewsMainBody
                  key={index}
                  newsType="종목"
                  title={news.title}
                  description={news.description}
                  media={news.media}
                  date={news.uploadDatetime}
                  header={stockDetail?.stockName || 'Unknown Stock'}
                  stockDetail={stockDetail}
                  id={news.id}
                  sentiment={news.sentiment}
                />
              );
            })}
          </NewsMainBodyWrapper>
        </NewsMainCenter>
      </Center>
    </>
  );
};

export default NewsMainPage;
