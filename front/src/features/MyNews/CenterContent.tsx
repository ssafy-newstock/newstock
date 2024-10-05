import NewsSection from '@features/MyNews/NewsSection';
import { CenterContentDiv } from '@features/MyNews/styledComponent';
import { isWithinInterval, parse } from 'date-fns';
import { useEffect, useState } from 'react';
import { useBookmarkStore } from '@store/useBookmarkStore';

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
  stockNewsStockCodes?: string[]; // 종목 뉴스만 해당되는 부분
  stockKeywords?: string[]; // 종목 뉴스만 해당되는 부분
}

interface CenterContentProps {
  selectedDateRange: [Date | null, Date | null];
}

const CenterContent: React.FC<CenterContentProps> = ({ selectedDateRange }) => {
  const {
    bookmarkedDetailNews: economicNews,
    bookmarkedDetailStockNews: stockNews,
    fetchBookmarkedDetailNews,
    fetchBookmarkedDetailStockNews,
  } = useBookmarkStore();

  const [filteredEconomicNews, setFilteredEconomicNews] =
    useState<NewsData[]>(economicNews);
  const [filteredStockNews, setFilteredStockNews] =
    useState<NewsData[]>(stockNews);

  // zustand 스토어에서 북마크된 뉴스 데이터 불러오기
  useEffect(() => {
    fetchBookmarkedDetailNews();
    fetchBookmarkedDetailStockNews();
  }, [fetchBookmarkedDetailNews, fetchBookmarkedDetailStockNews]);

  useEffect(() => {
    if (selectedDateRange[0] && selectedDateRange[1]) {
      const [startDate, endDate] = selectedDateRange;

      // EconomicNews 필터링
      const filteredEconomicNews = economicNews.filter((news) => {
        const newsDate = parse(news.uploadDatetime, 'yyyy.MM.dd', new Date()); // 뉴스 날짜를 Date 객체로 변환
        return isWithinInterval(newsDate, {
          start: startDate, // Date 객체로 비교
          end: endDate,
        });
      });
      setFilteredEconomicNews(filteredEconomicNews);

      // StockNews 필터링
      const filteredStockNews = stockNews.filter((news) => {
        const newsDate = parse(news.uploadDatetime, 'yyyy.MM.dd', new Date()); // 뉴스 날짜를 Date 객체로 변환
        return isWithinInterval(newsDate, {
          start: startDate, // Date 객체로 비교
          end: endDate,
        });
      });
      setFilteredStockNews(filteredStockNews);
    } else {
      // 선택된 날짜가 없을 경우 전체 뉴스로 설정
      setFilteredEconomicNews(economicNews);
      setFilteredStockNews(stockNews);
    }
  }, [selectedDateRange, economicNews, stockNews]);

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
