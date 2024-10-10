import NewsSection from '@features/MyNews/NewsSection';
import { CenterContentDiv } from '@features/MyNews/styledComponent';
import { isWithinInterval, parse } from 'date-fns';
import { useEffect, useState } from 'react';
import { useBookmarkStore } from '@store/useBookmarkStore';
import { useScrapStore } from '@store/useScrapStore';
import { NewsData } from '@features/News/ScrapNewsInterface';

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

  const {
    scraps,
    scrapNews,
    stockScraps, // 종목 스크랩 데이터
    scrapStockNews,
    fetchScrapData, // 시황 뉴스 스크랩 함수
    fetchScrapStockData, // 종목 뉴스 스크랩 함수
  } = useScrapStore();

  const [filteredEconomicNews, setFilteredEconomicNews] =
    useState<NewsData[]>(economicNews);
  const [filteredStockNews, setFilteredStockNews] =
    useState<NewsData[]>(stockNews);

  // zustand 스토어에서 북마크된 뉴스 데이터 불러오기
  useEffect(() => {
    fetchBookmarkedDetailNews();
    fetchBookmarkedDetailStockNews();

    const [startDate, endDate] = selectedDateRange;

    if (startDate && endDate) {
      // 날짜 범위가 선택된 경우 해당 날짜 범위를 기반으로 스크랩 뉴스 데이터를 가져옵니다.
      fetchScrapData(
        1,
        10,
        startDate.toISOString().split('T')[0],
        endDate.toISOString().split('T')[0]
      );
      fetchScrapStockData(
        1,
        10,
        startDate.toISOString().split('T')[0],
        endDate.toISOString().split('T')[0]
      );
    } else {
      // 날짜 범위가 선택되지 않은 경우 기본값으로 스크랩 뉴스 데이터를 가져옵니다.
      fetchScrapData();
      fetchScrapStockData();
    }
  }, [
    fetchBookmarkedDetailNews,
    fetchBookmarkedDetailStockNews,
    selectedDateRange,
    fetchScrapData,
    fetchScrapStockData,
  ]);

  useEffect(() => {
    if (selectedDateRange[0] && selectedDateRange[1]) {
      const [startDate, endDate] = selectedDateRange;

      // EconomicNews 필터링
      const filteredEconomicNews = economicNews.filter((news) => {
        if (news.uploadDatetime) {
          const newsDate = parse(news.uploadDatetime, 'yyyy.MM.dd', new Date()); // 뉴스 날짜를 Date 객체로 변환
          return isWithinInterval(newsDate, {
            start: startDate, // Date 객체로 비교
            end: endDate,
          });
        }
      });
      setFilteredEconomicNews(filteredEconomicNews);

      // StockNews 필터링
      const filteredStockNews = stockNews.filter((news) => {
        if (news.uploadDatetime) {
          const newsDate = parse(news.uploadDatetime, 'yyyy.MM.dd', new Date()); // 뉴스 날짜를 Date 객체로 변환
          return isWithinInterval(newsDate, {
            start: startDate, // Date 객체로 비교
            end: endDate,
          });
        }
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
      <NewsSection
        title={'시황 스크랩'}
        datas={scrapNews}
        scrapDatas={scraps}
      />
      <NewsSection
        title={'종목 스크랩'}
        datas={scrapStockNews}
        scrapDatas={stockScraps}
      />
    </CenterContentDiv>
  );
};

export default CenterContent;
