import { axiosInstance } from '@api/axiosInstance';
import NewsSection from '@features/MyNews/NewsSection';
import { CenterContentDiv } from '@features/MyNews/styledComponent';
import { isWithinInterval, parse } from 'date-fns';
import { useEffect, useState } from 'react';

interface NewsData {
  id: number;
  title: string;
  subtitle: string | null;
  media: string;
  description: string;
  thumbnail: string;
  uploadDatetime: string;
  article: string;
  sentiment: string;
  industry?: string;
  stockNewsStockCodes?: { stockCode: string; stockName: string }[]; // 종목 뉴스만 해당되는 부분
  stockKeywords?: string[]; // 종목 뉴스만 해당되는 부분
}

interface CenterContentProps {
  selectedDateRange: [Date | null, Date | null];
}

const CenterContent: React.FC<CenterContentProps> = ({ selectedDateRange }) => {
  const [EconomicNews, setEconomicNews] = useState<NewsData[]>([]);
  const [StockNews, setStockNews] = useState<NewsData[]>([]);

  const [filteredEconomicNews, setFilteredEconomicNews] =
    useState(EconomicNews);
  const [filteredStockNews, setFilteredStockNews] = useState(StockNews);

  const fetchEconomicNews = async () => {
    const response = await axiosInstance.get(
      '/api/news/favorite/industry/list'
    );
    const { data } = response.data;
    setEconomicNews(data || []);
  };

  const fetchNewsData = async () => {
    const response = await axiosInstance.get('/api/news/favorite/stock/list');
    const { data } = response.data.data;
    setStockNews(data || []);
  };

  useEffect(() => {
    fetchEconomicNews();
    fetchNewsData();
  }, []);

  useEffect(() => {
    if (selectedDateRange[0] && selectedDateRange[1]) {
      const [startDate, endDate] = selectedDateRange;

      // EconomicNews 필터링
      const filteredEconomicNews = EconomicNews.filter((news) => {
        const newsDate = parse(news.uploadDatetime, 'yyyy.MM.dd', new Date()); // 뉴스 날짜를 Date 객체로 변환
        return isWithinInterval(newsDate, {
          start: startDate, // Date 객체로 비교
          end: endDate,
        });
      });
      setFilteredEconomicNews(filteredEconomicNews);

      // StockNews 필터링
      const filteredStockNews = StockNews.filter((news) => {
        const newsDate = parse(news.uploadDatetime, 'yyyy.MM.dd', new Date()); // 뉴스 날짜를 Date 객체로 변환
        return isWithinInterval(newsDate, {
          start: startDate, // Date 객체로 비교
          end: endDate,
        });
      });
      setFilteredStockNews(filteredStockNews);
    } else {
      // 선택된 날짜가 없을 경우 전체 뉴스로 설정
      setFilteredEconomicNews(EconomicNews);
      setFilteredStockNews(StockNews);
    }
  }, [selectedDateRange, EconomicNews, StockNews]);

  return (
    <CenterContentDiv>
      <NewsSection title={'시황 뉴스'} datas={filteredEconomicNews} />
      <NewsSection title={'종목 뉴스'} datas={filteredStockNews} />
      <NewsSection title={'시황 스크랩'} datas={filteredStockNews} />
      <NewsSection title={'종목 스크랩'} datas={filteredStockNews} />
    </CenterContentDiv>
  );
};

export default CenterContent;
