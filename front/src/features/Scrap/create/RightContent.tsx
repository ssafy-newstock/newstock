import { NoMessageP } from '@features/Scrap/scrapStyledComponent';
import RightNewsCard from '@features/Scrap/create/RightNewsCard';
import { useEffect, useState } from 'react';
import { isWithinInterval, parse } from 'date-fns';
import { NewsData } from '@pages/News/ScrapNewsInterface';

interface CenterContentProps {
  selectedDateRange: [Date | null, Date | null];
  economicNews: NewsData[];
  stockNews: NewsData[];
}
const RightContent: React.FC<CenterContentProps> = ({
  selectedDateRange,
  economicNews,
  stockNews,
}) => {
  // const [allNews, setAllNews] = useState<NewsData[]>([]);
  const [filteredNews, setFilteredNews] = useState<NewsData[]>([]);

  useEffect(() => {
    const combinedNews = [...economicNews, ...stockNews];
    if (selectedDateRange[0] && selectedDateRange[1]) {
      const [startDate, endDate] = selectedDateRange;
      const filtered = combinedNews.filter((news) => {
        if (!news.uploadDatetime) {
          return false;
        }
        const newsDate = parse(news.uploadDatetime, 'yyyy.MM.dd', new Date());
        return isWithinInterval(newsDate, { start: startDate, end: endDate });
      });
      setFilteredNews(filtered);
    } else {
      setFilteredNews(combinedNews);
    }
  }, [selectedDateRange, economicNews, stockNews]);
  return (
    <>
      {filteredNews.length > 0 ? (
        filteredNews.map((News, index) => (
          <RightNewsCard key={index} data={News} />
        ))
      ) : (
        <NoMessageP>북마크한 뉴스가 없습니다.</NoMessageP>
      )}
    </>
  );
};

export default RightContent;
