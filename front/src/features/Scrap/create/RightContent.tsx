import { NoMessageP } from '@features/Scrap/scrapStyledComponent';
import RightNewsCard from '@features/Scrap/create/RightNewsCard';
import { useEffect, useState } from 'react';
import { axiosInstance } from '@api/axiosInstance';
import { isWithinInterval, parse } from 'date-fns';

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
const RightContent: React.FC<CenterContentProps> = ({ selectedDateRange }) => {
  const [allNews, setAllNews] = useState<NewsData[]>([]);
  const [filteredNews, setFilteredNews] = useState<NewsData[]>([]);

  const fetchNewsData = async () => {
    const economicResponse = await axiosInstance.get(
      '/api/news/favorite/industry/list'
    );
    const stockResponse = await axiosInstance.get(
      '/api/news/favorite/stock/list'
    );

    const economicNews = economicResponse.data.data || [];
    const stockNews = stockResponse.data.data || [];

    // 경제 뉴스와 종목 뉴스를 합친 배열로 설정
    const combinedNews = [...economicNews, ...stockNews];
    setAllNews(combinedNews);
  };

  useEffect(() => {
    fetchNewsData();
  }, []);

  useEffect(() => {
    if (selectedDateRange[0] && selectedDateRange[1]) {
      const [startDate, endDate] = selectedDateRange;

      // 선택된 날짜 범위에 맞는 뉴스 필터링
      const filtered = allNews.filter((news) => {
        const newsDate = parse(news.uploadDatetime, 'yyyy.MM.dd', new Date()); // 뉴스 날짜를 Date 객체로 변환
        return isWithinInterval(newsDate, {
          start: startDate, // Date 객체로 비교
          end: endDate,
        });
      });
      setFilteredNews(filtered);
    } else {
      setFilteredNews(allNews); // 날짜가 선택되지 않은 경우 전체 뉴스를 설정
    }
  }, [selectedDateRange, allNews]);

  return (
    <>
      {filteredNews.length > 0 ? (
        filteredNews.map((News, index) => (
          <RightNewsCard key={index} data={News} />
        ))
      ) : (
        <NoMessageP>스크랩한 뉴스가 없습니다.</NoMessageP>
      )}
    </>
  );
};

export default RightContent;
