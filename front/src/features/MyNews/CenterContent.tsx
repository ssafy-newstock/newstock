import { axiosInstance } from '@api/axiosInstance';
import NewsSection from '@features/MyNews/NewsSection';
import { CenterContentDiv } from '@features/MyNews/styledComponent';
import { parseISO, isWithinInterval } from 'date-fns';
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
    setEconomicNews(data);
  };

  const fetchNewsData = async () => {
    const response = await axiosInstance.get('/api/news/favorite/stock/list');
    const { data } = response.data.data;
    setStockNews(data);
  };

  useEffect(() => {
    fetchEconomicNews();
    fetchNewsData();
  }, []);

  useEffect(() => {
    if (selectedDateRange[0] && selectedDateRange[1]) {
      const [startDate, endDate] = selectedDateRange;
      // 선택된 날짜 범위에 맞는 뉴스 필터링
      const filtered = EconomicNews.filter((news) =>
        isWithinInterval(parseISO(news.uploadDatetime), {
          start: startDate!,
          end: endDate!,
        })
      );
      setFilteredEconomicNews(filtered);
    } else {
      setFilteredEconomicNews(EconomicNews); // 날짜가 없으면 전체 뉴스
    }

    if (selectedDateRange[0] && selectedDateRange[1]) {
      const [startDate, endDate] = selectedDateRange;
      // 선택된 날짜 범위에 맞는 뉴스 필터링
      const filtered = StockNews.filter((news) =>
        isWithinInterval(parseISO(news.uploadDatetime), {
          start: startDate!,
          end: endDate!,
        })
      );
      setFilteredStockNews(filtered);
    } else {
      setFilteredStockNews(StockNews); // 날짜가 없으면 전체 뉴스
    }
  }, [selectedDateRange]);

  return (
    <CenterContentDiv>
      <NewsSection title={'시황 뉴스'} datas={filteredEconomicNews} />
      <NewsSection title={'종목 뉴스'} datas={filteredStockNews} />
    </CenterContentDiv>
  );
};

export default CenterContent;
